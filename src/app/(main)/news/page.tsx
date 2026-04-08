'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/useAuthStore'
import { timeAgo } from '@/lib/utils/timeAgo'
import type { Post } from '@/types'

export default function NewsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const user = useAuthStore((s) => s.user)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      let query = supabase
        .from('feed_posts')
        .select('*, users(id, full_name, avatar_url, level, tier)')
        .in('category', ['공지', '소식', '이슈'])
        .order('created_at', { ascending: false })
        .limit(30)

      if (user?.region_code) {
        query = query.eq('region_code', user.region_code)
      }

      const { data } = await query
      setPosts((data as Post[]) ?? [])
      setLoading(false)
    }
    load()
  }, [user?.region_code])

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <button onClick={() => router.back()} className="text-gray-500">←</button>
        <h1 className="text-lg font-bold text-gray-900">📰 동네 소식</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16">
          <span className="text-4xl">📭</span>
          <p className="text-sm text-gray-400">아직 동네 소식이 없어요</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {posts.map((post) => (
            <button
              key={post.id}
              onClick={() => router.push(`/plaza/${post.id}`)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <span className="rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-medium text-violet-700">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{timeAgo(post.created_at)}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm font-medium text-gray-900">
                {post.title || post.content}
              </p>
              <div className="mt-1 flex gap-3 text-xs text-gray-400">
                <span>❤️ {post.like_count}</span>
                <span>💬 {post.comment_count}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
