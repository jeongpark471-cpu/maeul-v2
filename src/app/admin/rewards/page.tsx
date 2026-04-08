'use client'

import Link from 'next/link'

export default function RewardsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/admin" className="text-gray-400">←</Link>
        <h2 className="text-lg font-bold text-gray-900">💰 리워드 관리</h2>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-900">이번 달 랭킹 리워드</h3>
        <div className="mt-3 divide-y divide-gray-50">
          {[
            { rank: '🥇 1위', reward: '50,000원' },
            { rank: '🥈 2위', reward: '30,000원' },
            { rank: '🥉 3위', reward: '20,000원' },
            { rank: '4~10위', reward: '10,000원' },
          ].map((r) => (
            <div key={r.rank} className="flex justify-between py-2 text-sm">
              <span className="text-gray-700">{r.rank}</span>
              <span className="font-semibold text-violet-600">{r.reward}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-400">
        리워드 배분 기능 준비 중
      </div>
    </div>
  )
}
