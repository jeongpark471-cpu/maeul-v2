'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useXP } from '@/hooks/useXP'
import type { Comment } from '@/types'

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { awardXP } = useXP()

  useEffect(() => {
    fetchComments()
  }, [postId])

  async function fetchComments() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('comments')
      .select('*, users(id, full_name, level, tier, avatar_url)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (!error) {
      setComments((data ?? []) as Comment[])
    }
    setLoading(false)
  }

  async function submitComment() {
    if (!newComment.trim() || submitting) return
    setSubmitting(true)

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setSubmitting(false)
      return
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: session.user.id,
        content: newComment.trim(),
      })
      .select('*, users(id, full_name, level, tier, avatar_url)')
      .single()

    if (!error && data) {
      setComments((prev) => [...prev, data as Comment])
      setNewComment('')
      await awardXP('comment')
    }
    setSubmitting(false)
  }

  return { comments, loading, newComment, setNewComment, submitComment, submitting }
}
