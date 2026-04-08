import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const MENU_ITEMS = [
  { href: '/admin/dashboard', emoji: '📊', label: '대시보드' },
  { href: '/admin/users', emoji: '👥', label: '유저 관리' },
  { href: '/admin/reports', emoji: '📝', label: '신고 관리' },
  { href: '/admin/campaigns', emoji: '📢', label: '캠페인 관리' },
  { href: '/admin/rewards', emoji: '💰', label: '리워드 관리' },
  { href: '/admin/notifications', emoji: '🔔', label: '공지/알림' },
  { href: '/admin/settings', emoji: '⚙️', label: '시스템 설정' },
]

export default async function AdminPage() {
  const supabase = await createClient()

  const [usersRes, postsRes] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('feed_posts').select('id', { count: 'exact', head: true }).gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
  ])

  const stats = [
    { label: '전체 유저', value: usersRes.count ?? 0, emoji: '👥' },
    { label: '오늘 글', value: postsRes.count ?? 0, emoji: '📝' },
    { label: '이번달 풀', value: '준비중', emoji: '💰' },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* 빠른 통계 */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 bg-white py-4">
            <span className="text-2xl">{s.emoji}</span>
            <span className="text-lg font-bold text-gray-900">{s.value}</span>
            <span className="text-[11px] text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>

      {/* 메뉴 그리드 */}
      <div className="grid grid-cols-3 gap-3">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white py-5 text-gray-700 transition-colors hover:border-violet-300 hover:bg-violet-50"
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-xs font-semibold">{item.label}</span>
          </Link>
        ))}
      </div>

      <Link href="/" className="text-center text-sm text-gray-400 hover:text-gray-600">← 마을광장으로 돌아가기</Link>
    </div>
  )
}
