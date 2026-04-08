'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/useAuthStore'
import { useXP } from '@/hooks/useXP'

export function useLike(postId: string, initialCount: number) {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(initialCount)
  const user = useAuthStore((s) => s.user)
  const { awardXP } = useXP()

  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase
      .from('feed_reactions')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .eq('type', 'like')
      .maybeSingle()
      .then(({ data }) => {
        if (data) setLiked(true)
      })
  }, [postId, user])

  async function toggleLike() {
    if (!user) return
    const prevLiked = liked
    const prevCount = count
    setLiked(!liked)
    setCount(liked ? count - 1 : count + 1)

    const supabase = createClient()

    if (prevLiked) {
      const { error } = await supabase
        .from('feed_reactions')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .eq('type', 'like')
      if (error) {
        setLiked(prevLiked)
        setCount(prevCount)
      }
    } else {
      const { error } = await supabase
        .from('feed_reactions')
        .insert({ post_id: postId, user_id: user.id, type: 'like' })
      if (error) {
        setLiked(prevLiked)
        setCount(prevCount)
      } else {
        await awardXP('like')
      }
    }
  }

  return { liked, count, toggleLike }
}
