'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import HotCard from '@/components/features/feed/HotCard'
import type { Post } from '@/types'

type Period = 'today' | 'week' | 'month'
const PERIOD_MS: Record<Period, number> = {
  today: 86400000,
  week: 7 * 86400000,
  month: 30 * 86400000,
}

export default function HotPage() {
  const [period, setPeriod] = useState<Period>('week')
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()
      const since = new Date(Date.now() - PERIOD_MS[period]).toISOString()
      const { data } = await supabase
        .from('feed_posts')
        .select('*, users(id, full_name, avatar_url, level, tier)')
        .gte('created_at', since)
        .order('like_count', { ascending: false })
        .limit(20)
      setPosts((data as Post[]) ?? [])
      setLoading(false)
    }
    load()
  }, [period])

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <button onClick={() => router.back()} className="text-gray-500">←</button>
        <h1 className="text-lg font-bold text-gray-900">🔥 인기글</h1>
      </div>

      <div className="flex border-b border-gray-100">
        {(['today', 'week', 'month'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 py-2.5 text-sm font-semibold ${period === p ? 'border-b-2 border-violet-600 text-violet-600' : 'text-gray-400'}`}
          >
            {p === 'today' ? '오늘' : p === 'week' ? '이번 주' : '이번 달'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div>
      ) : posts.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-400">인기글이 없어요</div>
      ) : (
        <div className="divide-y divide-gray-50">
          {posts.map((post, i) => <HotCard key={post.id} post={post} rank={i + 1} />)}
        </div>
      )}
    </div>
  )
}
