'use client'

const MISSIONS = [
  { id: 'daily_checkin', emoji: '☀️', label: '출석 체크', xp: 5 },
  { id: 'post_feed', emoji: '✍️', label: '글 작성', xp: 20 },
  { id: 'comment', emoji: '💬', label: '댓글 달기', xp: 5 },
  { id: 'content_read', emoji: '📖', label: '글 읽기', xp: 2 },
  { id: 'campaign_apply', emoji: '🚀', label: '캠페인 지원', xp: 15 },
]

interface MissionCardProps {
  completedIds: Set<string>
}

export default function MissionCard({ completedIds }: MissionCardProps) {
  const done = completedIds.size
  const total = MISSIONS.length

  return (
    <div className="mx-4 my-3 overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(83,74,183,0.82)] to-[rgba(123,116,212,0.85)] p-4 text-white shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold">오늘의 미션</h3>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
          {done}/{total} 완료
        </span>
      </div>

      <div className="flex justify-between">
        {MISSIONS.map((m) => {
          const completed = completedIds.has(m.id)
          return (
            <div key={m.id} className="flex flex-col items-center gap-1">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                  completed ? 'bg-white/20 opacity-60' : 'bg-white/30 shadow-sm'
                }`}
              >
                {completed ? '✅' : m.emoji}
              </div>
              <span className="text-[10px] text-white/80">{m.label}</span>
              <span className="text-[10px] font-semibold text-white/90">+{m.xp}</span>
            </div>
          )
        })}
      </div>

      {done < total && (
        <p className="mt-3 text-center text-[11px] text-white/70">
          모든 미션 완료 시 보너스 <strong className="text-white">+50 XP</strong>
        </p>
      )}
    </div>
  )
}
