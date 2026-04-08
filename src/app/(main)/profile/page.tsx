'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import TierCard from '@/components/features/profile/TierCard'
import XPProgress from '@/components/features/profile/XPProgress'
import ActivityStats from '@/components/features/profile/ActivityStats'

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const { signOut } = useAuth()
  const [stats, setStats] = useState({ posts: 0, comments: 0, likes: 0 })

  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    Promise.all([
      supabase.from('feed_posts').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('comments').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('feed_reactions').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('type', 'like'),
    ]).then(([p, c, l]) => {
      setStats({ posts: p.count ?? 0, comments: c.count ?? 0, likes: l.count ?? 0 })
    })
  }, [user])

  if (!user) {
    return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div>
  }

  return (
    <div className="flex flex-col gap-5 px-4 py-6">
      {/* 프로필 헤더 */}
      <div className="flex items-center gap-4">
        <Avatar src={user.avatar_url} name={user.full_name} size="lg" />
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900">{user.full_name}</h1>
          <p className="text-xs text-gray-500">{user.region_name ?? user.email}</p>
          <div className="mt-1 flex items-center gap-2">
            <Badge level={user.level} />
          </div>
        </div>
        <Link href="/profile/settings" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">편집</Link>
      </div>

      <TierCard tier={user.tier} weeklyXp={user.weekly_xp} />
      <XPProgress xp={user.xp} level={user.level} />
      <ActivityStats posts={stats.posts} comments={stats.comments} likes={stats.likes} />

      {/* 메뉴 */}
      <div className="divide-y divide-gray-50 rounded-xl border border-gray-100">
        {[
          { label: '내가 쓴 글', href: '#' },
          { label: '좋아요한 글', href: '#' },
          { label: '알림 설정', href: '#' },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
            {item.label}
            <span className="text-gray-400">›</span>
          </Link>
        ))}
      </div>

      {user.role === 'admin' && (
        <Link href="/admin" className="flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700">
          🛡️ 관리자 페이지
        </Link>
      )}

      <Button variant="ghost" fullWidth onClick={signOut}>로그아웃</Button>
    </div>
  )
}
