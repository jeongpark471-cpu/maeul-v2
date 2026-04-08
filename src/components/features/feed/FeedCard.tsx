'use client'

import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import { useLike } from '@/hooks/useLike'
import { timeAgo } from '@/lib/utils/timeAgo'
import type { Post } from '@/types'

const CATEGORY_COLORS: Record<string, string> = {
  일상: 'bg-blue-50 text-blue-600',
  잡담: 'bg-blue-50 text-blue-600',
  맛집: 'bg-orange-50 text-orange-600',
  육아: 'bg-pink-50 text-pink-600',
  질문: 'bg-green-50 text-green-600',
  나눔: 'bg-emerald-50 text-emerald-600',
  이슈: 'bg-red-50 text-red-600',
  생활정보: 'bg-yellow-50 text-yellow-700',
  부동산: 'bg-indigo-50 text-indigo-600',
}

export default function FeedCard({ post }: { post: Post }) {
  const { liked, count, toggleLike } = useLike(post.id, post.like_count)
  const catColor = CATEGORY_COLORS[post.category] ?? 'bg-gray-50 text-gray-600'

  return (
    <article className="border-b border-gray-50 px-4 py-4">
      {/* 헤더 */}
      <div className="mb-2 flex items-center gap-2">
        <Avatar src={post.users?.avatar_url} name={post.users?.full_name ?? '?'} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-gray-900">
              {post.users?.full_name}
            </span>
            {post.users?.level && <Badge level={post.users.level} />}
          </div>
          <span className="text-xs text-gray-400">{timeAgo(post.created_at)}</span>
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${catColor}`}>
          {post.category}
        </span>
      </div>

      {/* 본문 */}
      <Link href={`/plaza/${post.id}`} className="block">
        {post.title && (
          <h3 className="mb-0.5 text-sm font-bold text-gray-900">{post.title}</h3>
        )}
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-700">
          {post.content}
        </p>
      </Link>

      {/* 액션 바 */}
      <div className="mt-2.5 flex items-center gap-4 text-xs text-gray-400">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'hover:text-gray-600'}`}
        >
          <span>{liked ? '❤️' : '🤍'}</span>
          <span>{count}</span>
        </button>
        <Link href={`/plaza/${post.id}`} className="flex items-center gap-1 hover:text-gray-600">
          <span>💬</span>
          <span>{post.comment_count}</span>
        </Link>
        <span className="flex items-center gap-1">
          <span>👁️</span>
          <span>{post.view_count ?? 0}</span>
        </span>
      </div>
    </article>
  )
}
