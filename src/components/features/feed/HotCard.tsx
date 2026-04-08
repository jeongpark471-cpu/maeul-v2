import Link from 'next/link'
import type { Post } from '@/types'

const RANK_STYLES = [
  'bg-amber-400 text-white',
  'bg-gray-300 text-white',
  'bg-amber-700 text-white',
]

export default function HotCard({ post, rank }: { post: Post; rank: number }) {
  const style = RANK_STYLES[rank - 1] ?? 'bg-violet-100 text-violet-600'

  return (
    <Link
      href={`/plaza/${post.id}`}
      className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${style}`}
      >
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-medium text-gray-900">
          {post.title || post.content}
        </p>
        <div className="mt-1 flex gap-3 text-xs text-gray-400">
          <span>❤️ {post.like_count}</span>
          <span>💬 {post.comment_count}</span>
        </div>
      </div>
    </Link>
  )
}
