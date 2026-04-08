'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import CategoryTabs from '@/components/features/feed/CategoryTabs'
import FeedCard from '@/components/features/feed/FeedCard'
import type { Post } from '@/types'

const PAGE_SIZE = 20

export default function FeedPage() {
  const [category, setCategory] = useState('전체')
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  async function loadPosts(reset = false) {
    setLoading(true)
    const supabase = createClient()
    const offset = reset ? 0 : posts.length

    let query = supabase
      .from('feed_posts')
      .select('*, users(id, full_name, avatar_url, level, tier)')
      .order('created_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1)

    if (category !== '전체') {
      query = query.eq('category', category)
    }

    const { data } = await query
    const newPosts = (data as Post[]) ?? []

    if (reset) {
      setPosts(newPosts)
    } else {
      setPosts(prev => [...prev, ...newPosts])
    }
    setHasMore(newPosts.length === PAGE_SIZE)
    setLoading(false)
  }

  useEffect(() => { loadPosts(true) }, [category])

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !loading && hasMore) loadPosts()
    }, { threshold: 0.5 })
    obs.observe(sentinelRef.current)
    return () => obs.disconnect()
  }, [posts.length, hasMore, loading])

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <button onClick={() => router.back()} className="text-gray-500">←</button>
        <h1 className="text-lg font-bold text-gray-900">📋 피드</h1>
      </div>

      <CategoryTabs active={category} onChange={(c) => { setCategory(c) }} />

      {posts.map((p) => <FeedCard key={p.id} post={p} />)}

      {loading && (
        <div className="flex justify-center py-6"><div className="h-5 w-5 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div>
      )}

      {!loading && posts.length === 0 && (
        <div className="py-12 text-center text-sm text-gray-400">글이 없어요</div>
      )}

      {hasMore && <div ref={sentinelRef} className="h-10" />}
    </div>
  )
}
