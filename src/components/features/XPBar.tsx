'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { calculateLevel } from '@/hooks/useXP'

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000, 6500]

const LEVEL_NAMES: Record<number, string> = {
  1: '나그네', 2: '새내기', 3: '주민', 4: '이웃사촌', 5: '토박이',
  6: '터줏대감', 7: '마을 어른', 8: '이장', 9: '촌장', 10: '군수', 11: '마을 수호자',
}

const TIER_MULTIPLIER: Record<string, number> = {
  bronze: 1.0, silver: 1.2, gold: 1.5, platinum: 2.0, diamond: 3.0,
}

export default function XPBar() {
  const user = useAuthStore((s) => s.user)
  if (!user) return null

  const level = user.level
  const currentMin = LEVEL_THRESHOLDS[level - 1] ?? 0
  const nextMin = LEVEL_THRESHOLDS[level] ?? null
  const multiplier = TIER_MULTIPLIER[user.tier] ?? 1.0
  const name = LEVEL_NAMES[level] ?? `Lv.${level}`

  const progressPct = nextMin
    ? Math.min(((user.xp - currentMin) / (nextMin - currentMin)) * 100, 100)
    : 100
  const remaining = nextMin ? nextMin - user.xp : 0

  return (
    <div className="mx-4 my-3 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-violet-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            Lv.{level}
          </span>
          <span className="text-sm font-semibold text-gray-800">{name}</span>
        </div>
        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
          x{multiplier} 배율
        </span>
      </div>

      <div className="mb-1.5 h-2 overflow-hidden rounded-full bg-violet-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-gray-500">
        <span>{user.xp.toLocaleString()} XP</span>
        {nextMin ? (
          <span>다음 레벨까지 <strong className="text-violet-600">{remaining.toLocaleString()}</strong> XP</span>
        ) : (
          <span className="font-semibold text-violet-600">최고 레벨!</span>
        )}
      </div>
    </div>
  )
}
