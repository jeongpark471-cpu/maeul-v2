'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useAuth() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('이메일 또는 비밀번호가 올바르지 않아요')
      setLoading(false)
      return
    }

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setError('세션을 가져올 수 없어요')
      setLoading(false)
      return
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role, onboarding_completed')
      .eq('id', session.user.id)
      .single()

    if (userData?.role === 'admin') {
      router.push('/admin')
    } else if (!userData?.onboarding_completed) {
      router.push('/onboarding')
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true)
    setError(null)
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { full_name: name },
      },
    })
    if (authError) {
      setError('회원가입에 실패했어요. 다시 시도해주세요')
      setLoading(false)
      return
    }
    router.push('/onboarding')
    setLoading(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return { signIn, signUp, signOut, loading, error }
}
