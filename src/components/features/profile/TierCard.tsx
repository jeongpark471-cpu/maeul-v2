const TIER_CONFIG: Record<string, { emoji: string; label: string; gradient: string; mult: string }> = {
  bronze: { emoji: '🥉', label: '브론즈', gradient: 'from-amber-700 to-amber-600', mult: 'x1.0' },
  silver: { emoji: '🥈', label: '실버', gradient: 'from-gray-400 to-gray-300', mult: 'x1.2' },
  gold: { emoji: '🥇', label: '골드', gradient: 'from-yellow-500 to-amber-400', mult: 'x1.5' },
  platinum: { emoji: '💎', label: '플래티넘', gradient: 'from-cyan-500 to-blue-400', mult: 'x2.0' },
  diamond: { emoji: '👑', label: '다이아몬드', gradient: 'from-violet-500 to-purple-400', mult: 'x3.0' },
}

interface Props {
  tier: string
  weeklyXp: number
}

export default function TierCard({ tier, weeklyXp }: Props) {
  const cfg = TIER_CONFIG[tier] ?? TIER_CONFIG.bronze

  return (
    <div className={`rounded-xl bg-gradient-to-r ${cfg.gradient} p-4 text-white`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{cfg.emoji}</span>
          <div>
            <p className="text-xs font-medium opacity-80">이번 달 티어</p>
            <p className="text-lg font-black">{cfg.label}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-80">배율</p>
          <p className="text-lg font-black">{cfg.mult}</p>
        </div>
      </div>
      <p className="mt-2 text-xs opacity-80">
        이번 주 획득 XP: <strong className="text-white">{weeklyXp.toLocaleString()}</strong>
      </p>
    </div>
  )
}
