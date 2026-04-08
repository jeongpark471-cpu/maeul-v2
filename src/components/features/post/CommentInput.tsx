'use client'

import Button from '@/components/ui/Button'

interface Props {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  disabled: boolean
}

export default function CommentInput({ value, onChange, onSubmit, disabled }: Props) {
  return (
    <div className="sticky bottom-16 border-t border-gray-100 bg-white px-4 py-3">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm focus:border-violet-500 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              onSubmit()
            }
          }}
        />
        <Button onClick={onSubmit} disabled={disabled || !value.trim()}>
          등록
        </Button>
      </div>
      <p className="mt-1 text-center text-[10px] text-gray-400">
        댓글 작성 시 <span className="text-violet-600">+10 XP</span>
      </p>
    </div>
  )
}
