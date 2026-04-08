import { USER_LEVELS } from '@/types'

interface BadgeProps {
  level: number
}

export default function Badge({ level }: BadgeProps) {
  const info = USER_LEVELS.find(l => l.level === level) ?? USER_LEVELS[0]

  return (
    <span className="inline-flex items-center rounded-full border border-[rgba(200,170,100,0.3)] bg-[rgba(255,250,235,0.5)] px-2 py-0.5 text-[10px] font-semibold text-[#B8820A]">
      Lv.{level} {info.name}
    </span>
  )
}
