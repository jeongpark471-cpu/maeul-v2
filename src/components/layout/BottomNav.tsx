'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'

const ITEMS = [
  { href: '/', label: '홈', emoji: '🏠' },
  { href: '/campaigns', label: '캠페인', emoji: '🎯' },
  { href: '/plaza/write', label: '', emoji: '✍️', isFab: true },
  { href: '/ranking', label: '동네', emoji: '🗺️' },
  { href: '/profile', label: 'MY', emoji: '👤' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const user = useAuthStore((s) => s.user)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white pb-safe">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        {ITEMS.map((item) => {
          const active =
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

          if (item.isFab) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="-mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-lg text-white shadow-lg shadow-violet-200 transition-transform hover:scale-105"
              >
                {item.emoji}
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5"
            >
              <span className={`text-xl ${active ? '' : 'grayscale opacity-50'}`}>
                {item.emoji}
              </span>
              <span
                className={`text-[10px] ${
                  active ? 'font-bold text-violet-600' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}

        {user?.role === 'admin' && (
          <Link href="/admin" className="flex flex-col items-center gap-0.5">
            <span className="text-xl">🛡️</span>
            <span className="text-[10px] text-gray-400">관리</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
