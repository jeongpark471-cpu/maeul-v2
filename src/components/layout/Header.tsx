'use client'

import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { useNotifications } from '@/hooks/useNotifications'
import { useEffect } from 'react'

export default function Header() {
  const user = useAuthStore((s) => s.user)
  const { unreadCount, fetchNotifications } = useNotifications()

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(200,170,100,0.2)] bg-[rgba(255,250,238,0.85)] backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black text-[#B8820A]">마을광장</span>
          <button className="flex items-center gap-0.5 rounded-full border border-[rgba(200,170,100,0.3)] bg-[rgba(255,250,235,0.6)] px-2.5 py-1 text-xs font-medium text-[#5A5040]">
            <span>📍</span>
            <span>{user?.region_name ?? '동네 설정'}</span>
            <span className="text-[#8A7D6B]">▾</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button className="rounded-full p-2 text-[#5A5040] hover:bg-[rgba(200,170,100,0.1)]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link href="/notifications" className="relative rounded-full p-2 text-[#5A5040] hover:bg-[rgba(200,170,100,0.1)]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B8820A] px-1 text-[10px] font-bold text-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
