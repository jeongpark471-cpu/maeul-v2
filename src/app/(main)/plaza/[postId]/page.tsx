'use client'

import { useEffect, useState, use } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/useAuthStore'
import { useLike } from '@/hooks/useLike'
import { useComments } from '@/hooks/useComments'
import { useXP } from '@/hooks/useXP'
import PostHeader from '@/components/features/post/PostHeader'
import PostBody from '@/components/features/post/PostBody'
import CommentList from '@/components/features/post/CommentList'
import CommentInput from '@/components/features/post/CommentInput'
import LevelUpModal from '@/components/features/LevelUpModal'
import type { Post } from '@/types'

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = use(params)
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const user = useAuthStore((s) => s.user)
  const { levelUpData, clearLevelUp } = useXP()

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('feed_posts')
        .select('*, users(id, full_name, avatar_url, level, tier)')
        .eq('id', postId)
        .single()
      setPost(data as Post | null)
      setLoading(false)
    }
    load()
  }, [postId])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    )
  }

  if (!post) {
    return <div className="py-12 text-center text-sm text-gray-400">글을 찾을 수 없어요</div>
  }

  return (
    <PostContent post={post} postId={postId} user={user} levelUpData={levelUpData} clearLevelUp={clearLevelUp} />
  )
}

function PostContent({
  post, postId, user, levelUpData, clearLevelUp,
}: {
  post: Post
  postId: string
  user: ReturnType<typeof useAuthStore.getState>['user']
  levelUpData: ReturnType<typeof useXP>['levelUpData']
  clearLevelUp: () => void
}) {
  const { liked, count, toggleLike } = useLike(postId, post.like_count)
  const { comments, loading: commentsLoading, newComment, setNewComment, submitComment, submitting } = useComments(postId)

  return (
    <div className="flex flex-col">
      <div className="border-b border-gray-100 px-4 py-4">
        <PostHeader user={post.users} createdAt={post.created_at} />
        <PostBody title={post.title} content={post.content} viewCount={post.view_count} />
        <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'hover:text-gray-600'}`}
          >
            <span>{liked ? '❤️' : '🤍'}</span>
            <span>{count}</span>
          </button>
          <span className="flex items-center gap-1">💬 {comments.length}</span>
          <span className="flex items-center gap-1">👁️ {post.view_count ?? 0}</span>
        </div>
      </div>

      <CommentList comments={comments} loading={commentsLoading} />

      {user && (
        <CommentInput
          value={newComment}
          onChange={setNewComment}
          onSubmit={submitComment}
          disabled={submitting}
        />
      )}

      {levelUpData && <LevelUpModal data={levelUpData} onClose={clearLevelUp} />}
    </div>
  )
}
