'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useNotifications } from '@/hooks/useNotifications'
import { timeAgo } from '@/lib/utils/timeAgo'
import type { Notification } from '@/types'

const NOTI_CONFIG: Record<string, { emoji: string; color: string }> = {
  levelup: { emoji: '🎉', color: 'bg-violet-100' },
  tier_change: { emoji: '👑', color: 'bg-amber-100' },
  comment: { emoji: '💬', color: 'bg-blue-100' },
  like: { emoji: '❤️', color: 'bg-red-100' },
  announcement: { emoji: '📢', color: 'bg-green-100' },
  campaign: { emoji: '🎯', color: 'bg-orange-100' },
}

export default function NotificationsPage() {
  const { notifications, isLoading, fetchNotifications, markAsRead, markAllAsRead, getRoute } = useNotifications()
  const router = useRouter()

  useEffect(() => { fetchNotifications() }, [fetchNotifications])

  function handleClick(n: Notification) {
    if (!n.is_read) markAsRead(n.id)
    router.push(getRoute(n))
  }

  return (
    <div className="flex flex-col">
      <Header onMarkAll={markAllAsRead} onBack={() => router.back()} />
      {isLoading ? <Spinner /> : notifications.length === 0 ? <Empty /> : (
        <div className="divide-y divide-gray-50">
          {notifications.map((n) => (
            <NotiItem key={n.id} noti={n} onClick={() => handleClick(n)} />
          ))}
        </div>
      )}
    </div>
  )
}

function Header({ onMarkAll, onBack }: { onMarkAll: () => void; onBack: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">←</button>
        <h1 className="text-lg font-bold text-gray-900">🔔 알림</h1>
      </div>
      <button onClick={onMarkAll} className="text-xs font-medium text-violet-600 hover:text-violet-800">전체 읽음</button>
    </div>
  )
}

function NotiItem({ noti, onClick }: { noti: Notification; onClick: () => void }) {
  const cfg = NOTI_CONFIG[noti.type] ?? { emoji: '📌', color: 'bg-gray-100' }
  return (
    <button onClick={onClick} className={`flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 ${!noti.is_read ? 'border-l-2 border-violet-500' : ''}`}>
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg ${cfg.color}`}>{cfg.emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-1">
          <p className={`text-sm ${noti.is_read ? 'text-gray-500' : 'font-semibold text-gray-900'}`}>{noti.title}</p>
          {!noti.is_read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />}
        </div>
        <p className="mt-0.5 text-sm text-gray-500">{noti.message}</p>
        <span className="text-xs text-gray-400">{timeAgo(noti.created_at)}</span>
      </div>
    </button>
  )
}

function Spinner() { return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div> }
function Empty() { return <div className="flex flex-col items-center gap-2 py-16"><span className="text-4xl">🔕</span><p className="text-sm text-gray-400">알림이 없어요</p></div> }
