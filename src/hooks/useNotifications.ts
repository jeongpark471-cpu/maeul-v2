'use client'

import { useCallback, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/useAuthStore'
import type { Notification } from '@/types'

const NOTI_ROUTES: Record<string, string> = {
  comment: '/plaza/',
  like: '/plaza/',
  levelup: '/profile',
  tier_change: '/profile',
  announcement: '/',
  campaign: '/campaigns',
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const user = useAuthStore((s) => s.user)

  const fetchNotifications = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    const list = (data ?? []) as Notification[]
    setNotifications(list)
    setUnreadCount(list.filter(n => !n.is_read).length)
    setIsLoading(false)
  }, [user])

  async function markAsRead(id: string) {
    const supabase = createClient()
    await supabase.from('notifications').update({ is_read: true }).eq('id', id)
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  async function markAllAsRead() {
    if (!user) return
    const supabase = createClient()
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false)
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
    setUnreadCount(0)
  }

  function getRoute(n: Notification): string {
    const base = NOTI_ROUTES[n.type] ?? '/'
    if ((n.type === 'comment' || n.type === 'like') && n.post_id) {
      return `${base}${n.post_id}`
    }
    return base
  }

  return { notifications, unreadCount, isLoading, fetchNotifications, markAsRead, markAllAsRead, getRoute }
}
