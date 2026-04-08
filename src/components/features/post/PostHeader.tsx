import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import { timeAgo } from '@/lib/utils/timeAgo'
import type { User } from '@/types'

interface Props {
  user?: Pick<User, 'id' | 'full_name' | 'avatar_url' | 'level' | 'tier'>
  createdAt: string
}

export default function PostHeader({ user, createdAt }: Props) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Avatar src={user?.avatar_url} name={user?.full_name ?? '?'} />
      <div>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-gray-900">{user?.full_name}</span>
          {user?.level && <Badge level={user.level} />}
        </div>
        <span className="text-xs text-gray-400">{timeAgo(createdAt)}</span>
      </div>
    </div>
  )
}
