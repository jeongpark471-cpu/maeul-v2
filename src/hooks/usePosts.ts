'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Post } from '@/types'

export function usePosts(category?: string) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const supabase = createClient()
      let query = supabase
        .from('feed_posts')
        .select('*, users(id, full_name, avatar_url, level, tier)')
        .order('created_at', { ascending: false })
        .limit(20)

      if (category && category !== '전체') {
        query = query.eq('category', category)
      }

      const { data } = await query
      setPosts((data as Post[]) ?? [])
      setLoading(false)
    }
    fetchPosts()
  }, [category])

  return { posts, loading }
}

export function useHotPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString()
      const { data } = await supabase
        .from('feed_posts')
        .select('*, users(id, full_name, avatar_url, level, tier)')
        .gte('created_at', weekAgo)
        .order('like_count', { ascending: false })
        .limit(10)

      setPosts((data as Post[]) ?? [])
      setLoading(false)
    }
    fetch()
  }, [])

  return { posts, loading }
}
