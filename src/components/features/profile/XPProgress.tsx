const THRESHOLDS = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000, 6500]
const LEVEL_NAMES: Record<number, string> = {
  1: '나그네', 2: '새내기', 3: '주민', 4: '이웃사촌', 5: '토박이',
  6: '터줏대감', 7: '마을 어른', 8: '이장', 9: '촌장', 10: '군수', 11: '마을 수호자',
}

interface Props {
  xp: number
  level: number
}

export default function XPProgress({ xp, level }: Props) {
  const currentMin = THRESHOLDS[level - 1] ?? 0
  const nextMin = THRESHOLDS[level] ?? null
  const pct = nextMin ? Math.min(((xp - currentMin) / (nextMin - currentMin)) * 100, 100) : 100
  const name = LEVEL_NAMES[level] ?? ''

  return (
    <div className="rounded-xl bg-violet-50 p-4">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-violet-700">Lv.{level} {name}</span>
        <span className="text-violet-500">{xp.toLocaleString()} XP</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-violet-200">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
      {nextMin ? (
        <p className="mt-1 text-right text-xs text-violet-400">다음 레벨까지 {(nextMin - xp).toLocaleString()} XP</p>
      ) : (
        <p className="mt-1 text-right text-xs font-semibold text-violet-600">최고 레벨!</p>
      )}
    </div>
  )
}
