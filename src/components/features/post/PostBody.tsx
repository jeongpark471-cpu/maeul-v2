interface Props {
  title: string
  content: string
  viewCount: number
}

export default function PostBody({ title, content }: Props) {
  return (
    <div>
      {title && <h1 className="mb-2 text-lg font-bold text-gray-900">{title}</h1>}
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
        {content}
      </p>
    </div>
  )
}
