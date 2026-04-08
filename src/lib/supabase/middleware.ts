import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const GUEST_ONLY = ['/login', '/signup']
const PUBLIC = ['/auth/callback', '/_next', '/favicon.ico']

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // public 경로는 통과
  if (PUBLIC.some(p => pathname.startsWith(p))) {
    return supabaseResponse
  }

  // 로그인된 유저 → 게스트 전용 페이지 차단
  if (user && GUEST_ONLY.some(p => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 비로그인 유저 → 로그인 페이지로
  if (!user && !GUEST_ONLY.some(p => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 로그인된 유저: 온보딩/admin 체크
  if (user && !GUEST_ONLY.some(p => pathname.startsWith(p))) {
    const { data: profile } = await supabase
      .from('users')
      .select('role, onboarding_completed')
      .eq('id', user.id)
      .single()

    // 온보딩 미완료 → /onboarding 리다이렉트
    if (!profile?.onboarding_completed && !pathname.startsWith('/onboarding')) {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }

    // 온보딩 완료 유저가 /onboarding 접근 시 홈으로
    if (profile?.onboarding_completed && pathname.startsWith('/onboarding')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // /admin 경로는 admin 역할만
    if (pathname.startsWith('/admin') && profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return supabaseResponse
}
