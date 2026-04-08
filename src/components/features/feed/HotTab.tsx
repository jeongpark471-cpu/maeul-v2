'use client'

import { useHotPosts } from '@/hooks/usePosts'
import HotCard from './HotCard'

export default function HotTab() {
  const { posts, loading } = useHotPosts()

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-gray-400">
        이번 주 인기 글이 없어요
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-50">
      <div className="px-4 py-3">
        <h2 className="text-sm font-bold text-gray-900">🔥 이번 주 인기글</h2>
        <p className="text-xs text-gray-400">지난 7일간 좋아요를 많이 받은 글</p>
      </div>
      {posts.map((post, i) => (
        <HotCard key={post.id} post={post} rank={i + 1} />
      ))}
    </div>
  )
}
