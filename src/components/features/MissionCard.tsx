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
    <div className="mx-4 my-3 rounded-xl border border-violet-100 bg-violet-50/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">오늘의 미션</h3>
        <span className="text-xs font-semibold text-violet-600">
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
                  completed
                    ? 'bg-violet-100 opacity-60'
                    : 'bg-white shadow-sm'
                }`}
              >
                {completed ? '✅' : m.emoji}
              </div>
              <span className="text-[10px] text-gray-500">{m.label}</span>
              <span className="text-[10px] font-semibold text-violet-600">
                +{m.xp}
              </span>
            </div>
          )
        })}
      </div>

      {done < total && (
        <p className="mt-3 text-center text-[11px] text-gray-400">
          모든 미션 완료 시 보너스 <strong className="text-violet-600">+50 XP</strong>
        </p>
      )}
    </div>
  )
}
