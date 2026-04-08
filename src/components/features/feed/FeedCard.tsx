'use client'

import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import { useLike } from '@/hooks/useLike'
import { timeAgo } from '@/lib/utils/timeAgo'
import type { Post } from '@/types'

const CATEGORY_COLORS: Record<string, string> = {
  일상: 'bg-blue-100/60 text-blue-700',
  잡담: 'bg-blue-100/60 text-blue-700',
  맛집: 'bg-orange-100/60 text-orange-700',
  육아: 'bg-pink-100/60 text-pink-700',
  질문: 'bg-green-100/60 text-green-700',
  나눔: 'bg-emerald-100/60 text-emerald-700',
  이슈: 'bg-red-100/60 text-red-700',
  생활정보: 'bg-yellow-100/60 text-yellow-800',
  부동산: 'bg-indigo-100/60 text-indigo-700',
}

export default function FeedCard({ post }: { post: Post }) {
  const { liked, count, toggleLike } = useLike(post.id, post.like_count)
  const catColor = CATEGORY_COLORS[post.category] ?? 'bg-[rgba(200,170,100,0.15)] text-[#5A5040]'

  return (
    <article className="ivory-card mx-4 mb-2.5 rounded-2xl p-4">
      <div className="mb-2 flex items-center gap-2">
        <Avatar src={post.users?.avatar_url} name={post.users?.full_name ?? '?'} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-[#0D0B08]">{post.users?.full_name}</span>
            {post.users?.level && <Badge level={post.users.level} />}
          </div>
          <span className="text-xs text-[#8A7D6B]">{timeAgo(post.created_at)}</span>
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${catColor}`}>
          {post.category}
        </span>
      </div>

      <Link href={`/plaza/${post.id}`} className="block">
        {post.title && <h3 className="mb-0.5 text-sm font-bold text-[#0D0B08]">{post.title}</h3>}
        <p className="line-clamp-2 text-sm leading-relaxed text-[#5A5040]">{post.content}</p>
      </Link>

      <div className="mt-2.5 flex items-center gap-4 text-xs text-[#8A7D6B]">
        <button onClick={toggleLike} className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'hover:text-[#5A5040]'}`}>
          <span>{liked ? '❤️' : '🤍'}</span><span>{count}</span>
        </button>
        <Link href={`/plaza/${post.id}`} className="flex items-center gap-1 hover:text-[#5A5040]">
          <span>💬</span><span>{post.comment_count}</span>
        </Link>
        <span className="flex items-center gap-1"><span>👁️</span><span>{post.view_count ?? 0}</span></span>
      </div>
    </article>
  )
}
