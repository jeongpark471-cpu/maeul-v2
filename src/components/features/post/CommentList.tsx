import Avatar from '@/components/ui/Avatar'
import { timeAgo } from '@/lib/utils/timeAgo'
import type { Comment } from '@/types'

interface Props {
  comments: Comment[]
  loading: boolean
}

export default function CommentList({ comments, loading }: Props) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400">
        아직 댓글이 없어요. 첫 댓글을 남겨보세요!
      </p>
    )
  }

  return (
    <div className="flex-1 divide-y divide-gray-50 px-4">
      {comments.map((c) => (
        <div key={c.id} className="flex gap-2 py-3">
          <Avatar src={c.users?.avatar_url} name={c.users?.full_name ?? '?'} size="sm" />
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold">{c.users?.full_name}</span>
              <span className="text-xs text-gray-400">{timeAgo(c.created_at)}</span>
            </div>
            <p className="mt-0.5 text-sm text-gray-700">{c.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
