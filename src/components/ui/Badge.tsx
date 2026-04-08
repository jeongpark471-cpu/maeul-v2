import { USER_LEVELS } from '@/types'

interface BadgeProps {
  level: number
}

const levelColors: Record<number, string> = {
  1: 'bg-gray-100 text-gray-600',
  2: 'bg-green-100 text-green-700',
  3: 'bg-blue-100 text-blue-700',
  4: 'bg-indigo-100 text-indigo-700',
  5: 'bg-purple-100 text-purple-700',
  6: 'bg-pink-100 text-pink-700',
  7: 'bg-red-100 text-red-700',
  8: 'bg-orange-100 text-orange-700',
  9: 'bg-amber-100 text-amber-700',
  10: 'bg-yellow-100 text-yellow-700',
  11: 'bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-800',
}

export default function Badge({ level }: BadgeProps) {
  const info = USER_LEVELS.find(l => l.level === level) ?? USER_LEVELS[0]
  const color = levelColors[level] ?? levelColors[1]

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${color}`}>
      Lv.{level} {info.name}
    </span>
  )
}
