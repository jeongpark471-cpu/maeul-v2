'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import Button from '@/components/ui/Button'
import type { LevelUpData } from '@/hooks/useXP'

const LEVEL_NAMES: Record<number, string> = {
  1: '나그네', 2: '새내기', 3: '주민', 4: '이웃사촌', 5: '토박이',
  6: '터줏대감', 7: '마을 어른', 8: '이장', 9: '촌장', 10: '군수', 11: '마을 수호자',
}

const MULTIPLIERS: Record<number, string> = {
  1: '1.0', 2: '1.0', 3: '1.1', 4: '1.2', 5: '1.3',
  6: '1.5', 7: '1.7', 8: '2.0', 9: '2.5', 10: '3.0', 11: '5.0',
}

interface Props {
  data: LevelUpData
  onClose: () => void
}

export default function LevelUpModal({ data, onClose }: Props) {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#7c3aed', '#a78bfa', '#c4b5fd', '#fbbf24', '#f59e0b'],
    })
  }, [])

  const name = LEVEL_NAMES[data.newLevel] ?? `Lv.${data.newLevel}`
  const mult = MULTIPLIERS[data.newLevel] ?? '1.0'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xs rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mb-3 text-5xl">🎉</div>
        <h2 className="text-xl font-black text-violet-600">레벨 업!</h2>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          Lv.{data.newLevel} {name}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          XP 배율 <span className="font-bold text-violet-600">x{mult}</span>
        </p>
        <p className="mt-3 text-xs text-gray-400">
          Lv.{data.prevLevel} → Lv.{data.newLevel} 축하합니다!
        </p>
        <Button fullWidth className="mt-5" onClick={onClose}>
          확인
        </Button>
      </div>
    </div>
  )
}
