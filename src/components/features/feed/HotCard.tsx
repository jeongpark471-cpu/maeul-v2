import Link from 'next/link'
import type { Post } from '@/types'

const RANK_STYLES = [
  'bg-gradient-to-br from-[#D4A030] to-[#B8820A] text-white',
  'bg-gradient-to-br from-[#A0A0A0] to-[#787878] text-white',
  'bg-gradient-to-br from-[#CD7F32] to-[#A0612B] text-white',
]

export default function HotCard({ post, rank }: { post: Post; rank: number }) {
  const style = RANK_STYLES[rank - 1] ?? 'bg-[rgba(200,170,100,0.2)] text-[#B8820A]'

  return (
    <Link
      href={`/plaza/${post.id}`}
      className="ivory-card mx-4 mb-2 flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-[rgba(255,250,235,0.7)]"
    >
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${style}`}>
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-medium text-[#0D0B08]">
          {post.title || post.content}
        </p>
        <div className="mt-1 flex gap-3 text-xs text-[#8A7D6B]">
          <span>❤️ {post.like_count}</span>
          <span>💬 {post.comment_count}</span>
        </div>
      </div>
    </Link>
  )
}
