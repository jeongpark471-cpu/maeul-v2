'use client'

import { useRouter } from 'next/navigation'
import { useRanking } from '@/hooks/useRanking'
import { useAuthStore } from '@/store/useAuthStore'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'

const RANK_REWARDS = ['50,000원', '30,000원', '20,000원']

export default function RankingPage() {
  const { rankings, myRank, loading, period, setPeriod } = useRanking()
  const user = useAuthStore((s) => s.user)
  const router = useRouter()

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <button onClick={() => router.back()} className="text-gray-500">←</button>
        <h1 className="text-lg font-bold text-gray-900">🏆 랭킹</h1>
      </div>

      {/* 기간 탭 */}
      <div className="flex border-b border-gray-100">
        {(['this_month', 'last_month'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 py-2.5 text-sm font-semibold ${period === p ? 'border-b-2 border-violet-600 text-violet-600' : 'text-gray-400'}`}
          >
            {p === 'this_month' ? '이번 달' : '지난 달'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        </div>
      ) : (
        <>
          {/* Top 3 */}
          {rankings.length >= 3 && <TopThree top={rankings.slice(0, 3)} userId={user?.id} />}

          {/* 나머지 */}
          <div className="divide-y divide-gray-50">
            {rankings.slice(3).map((r, i) => (
              <RankRow key={r.id} rank={i + 4} user={r} isMe={r.id === user?.id} />
            ))}
          </div>

          {/* 내 순위 고정 */}
          {myRank && user && (
            <div className="sticky bottom-16 border-t-2 border-violet-200 bg-violet-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="w-8 text-center text-sm font-bold text-violet-600">{myRank}</span>
                <Avatar src={user.avatar_url} name={user.full_name} size="sm" />
                <div className="flex-1">
                  <span className="text-sm font-bold text-violet-700">{user.full_name} (나)</span>
                </div>
                <span className="text-sm font-bold text-violet-600">{user.weekly_xp.toLocaleString()} XP</span>
              </div>
              {myRank <= 3 && (
                <p className="mt-1 text-center text-xs text-violet-500">
                  예상 리워드: <strong>{RANK_REWARDS[myRank - 1]}</strong>
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function TopThree({ top, userId }: { top: { id: string; full_name: string; avatar_url?: string; weekly_xp: number; level: number }[]; userId?: string }) {
  const medals = ['🥇', '🥈', '🥉']
  const sizes = ['h-16 w-16', 'h-12 w-12', 'h-12 w-12']
  const order = [1, 0, 2] // 2nd, 1st, 3rd

  return (
    <div className="flex items-end justify-center gap-4 bg-gradient-to-b from-violet-50 to-white px-4 pb-4 pt-6">
      {order.map((idx) => {
        const r = top[idx]
        if (!r) return null
        return (
          <div key={r.id} className={`flex flex-col items-center gap-1 ${idx === 0 ? '-mt-4' : ''}`}>
            <span className="text-2xl">{medals[idx]}</span>
            <Avatar src={r.avatar_url} name={r.full_name} size={idx === 0 ? 'lg' : 'md'} />
            <span className={`text-xs font-bold ${r.id === userId ? 'text-violet-600' : 'text-gray-900'}`}>{r.full_name}</span>
            <span className="text-[11px] font-semibold text-violet-500">{r.weekly_xp.toLocaleString()} XP</span>
          </div>
        )
      })}
    </div>
  )
}

function RankRow({ rank, user, isMe }: { rank: number; user: { id: string; full_name: string; avatar_url?: string; weekly_xp: number; level: number }; isMe: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${isMe ? 'bg-violet-50' : ''}`}>
      <span className="w-8 text-center text-sm font-bold text-gray-400">{rank}</span>
      <Avatar src={user.avatar_url} name={user.full_name} size="sm" />
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <span className={`text-sm font-semibold ${isMe ? 'text-violet-600' : 'text-gray-900'}`}>{user.full_name}</span>
          <Badge level={user.level} />
        </div>
      </div>
      <span className="text-sm font-semibold text-violet-500">{user.weekly_xp.toLocaleString()} XP</span>
    </div>
  )
}
