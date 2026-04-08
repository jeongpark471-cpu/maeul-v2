import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const today = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString()

  const [users, todayPosts, weekPosts, comments] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('feed_posts').select('id', { count: 'exact', head: true }).gte('created_at', today),
    supabase.from('feed_posts').select('id', { count: 'exact', head: true }).gte('created_at', weekAgo),
    supabase.from('comments').select('id', { count: 'exact', head: true }).gte('created_at', today),
  ])

  const cards = [
    { label: '전체 유저', value: users.count ?? 0 },
    { label: '오늘 게시글', value: todayPosts.count ?? 0 },
    { label: '주간 게시글', value: weekPosts.count ?? 0 },
    { label: '오늘 댓글', value: comments.count ?? 0 },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/admin" className="text-gray-400">←</Link>
        <h2 className="text-lg font-bold text-gray-900">📊 대시보드</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-400">
        차트 영역 (추후 구현)
      </div>
    </div>
  )
}
