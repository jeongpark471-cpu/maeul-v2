'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import toast from 'react-hot-toast'

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSend() {
    if (!title.trim() || !message.trim()) return
    setSending(true)

    const supabase = createClient()
    const { data: users } = await supabase.from('users').select('id')

    if (users) {
      const notifications = users.map((u: { id: string }) => ({
        user_id: u.id,
        type: 'announcement',
        title: title.trim(),
        message: message.trim(),
        is_read: false,
      }))

      const { error } = await supabase.from('notifications').insert(notifications)
      if (error) {
        toast.error('발송에 실패했어요')
      } else {
        toast.success(`${users.length}명에게 발송 완료!`)
        setTitle('')
        setMessage('')
      }
    }
    setSending(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/admin" className="text-gray-400">←</Link>
        <h2 className="text-lg font-bold text-gray-900">🔔 공지/알림</h2>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <Input label="제목" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="공지 제목" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">내용</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="공지 내용을 입력하세요"
            className="h-32 resize-none rounded-lg border border-gray-300 p-3 text-sm placeholder:text-gray-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>
        <Button fullWidth onClick={handleSend} disabled={sending || !title.trim() || !message.trim()}>
          {sending ? '발송 중...' : '전체 발송'}
        </Button>
      </div>
    </div>
  )
}
