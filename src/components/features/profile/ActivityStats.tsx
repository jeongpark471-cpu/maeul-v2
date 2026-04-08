interface Props {
  posts: number
  comments: number
  likes: number
}

export default function ActivityStats({ posts, comments, likes }: Props) {
  const items = [
    { label: '게시글', value: posts, emoji: '✍️' },
    { label: '댓글', value: comments, emoji: '💬' },
    { label: '좋아요', value: likes, emoji: '❤️' },
  ]

  return (
    <div className="flex gap-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-gray-100 py-3">
          <span className="text-xl">{item.emoji}</span>
          <span className="text-lg font-bold text-gray-900">{item.value}</span>
          <span className="text-[11px] text-gray-500">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
