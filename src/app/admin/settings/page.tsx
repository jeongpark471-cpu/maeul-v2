'use client'

import Link from 'next/link'

const XP_SETTINGS = [
  { action: '출석 체크', xp: 5 },
  { action: '글 작성', xp: 20 },
  { action: '댓글 작성', xp: 10 },
  { action: '좋아요', xp: 1 },
  { action: '캠페인 참여', xp: 30 },
  { action: '미션 보너스', xp: 10 },
]

const TIER_SETTINGS = [
  { tier: '브론즈', range: '0~499 XP', mult: 'x1.0' },
  { tier: '실버', range: '500~1499 XP', mult: 'x1.2' },
  { tier: '골드', range: '1500~2999 XP', mult: 'x1.5' },
  { tier: '플래티넘', range: '3000~4999 XP', mult: 'x2.0' },
  { tier: '다이아몬드', range: '5000+ XP', mult: 'x3.0' },
]

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/admin" className="text-gray-400">←</Link>
        <h2 className="text-lg font-bold text-gray-900">⚙️ 시스템 설정</h2>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-bold text-gray-900">XP 설정</h3>
        <div className="divide-y divide-gray-50">
          {XP_SETTINGS.map((s) => (
            <div key={s.action} className="flex justify-between py-2 text-sm">
              <span className="text-gray-700">{s.action}</span>
              <span className="font-semibold text-violet-600">+{s.xp} XP</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-bold text-gray-900">티어 설정</h3>
        <div className="divide-y divide-gray-50">
          {TIER_SETTINGS.map((s) => (
            <div key={s.tier} className="flex items-center justify-between py-2 text-sm">
              <div>
                <span className="font-medium text-gray-900">{s.tier}</span>
                <span className="ml-2 text-xs text-gray-400">{s.range}</span>
              </div>
              <span className="font-semibold text-violet-600">{s.mult}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
