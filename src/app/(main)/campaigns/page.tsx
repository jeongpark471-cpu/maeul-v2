'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCampaigns } from '@/hooks/useCampaigns'
import type { Campaign } from '@/types'

type Filter = 'all' | 'recruiting' | 'closed'
const FILTER_LABELS: Record<Filter, string> = { all: '전체', recruiting: '모집중', closed: '마감' }

export default function CampaignsPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const { campaigns, loading } = useCampaigns(filter)

  return (
    <div className="flex flex-col">
      <div className="border-b border-gray-100 px-4 py-3">
        <h1 className="text-lg font-bold text-gray-900">🎯 캠페인</h1>
      </div>

      <div className="flex gap-2 px-4 py-3">
        {(Object.keys(FILTER_LABELS) as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              filter === f ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div>
      ) : campaigns.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16"><span className="text-4xl">📭</span><p className="text-sm text-gray-400">캠페인이 없어요</p></div>
      ) : (
        <div className="flex flex-col gap-3 px-4">
          {campaigns.map((c) => <CampaignCard key={c.id} campaign={c} />)}
        </div>
      )}
    </div>
  )
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const pct = Math.min((campaign.current_participants / campaign.max_participants) * 100, 100)
  const isRecruiting = campaign.status === 'recruiting'

  return (
    <Link href={`/campaigns/${campaign.id}`} className="rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50">
      <div className="mb-1.5 flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${isRecruiting ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {isRecruiting ? '모집중' : '마감'}
        </span>
        <span className="text-[10px] text-violet-500">참여 시 +30 XP</span>
      </div>
      <h3 className="font-bold text-gray-900">{campaign.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-gray-500">{campaign.description}</p>
      <p className="mt-2 text-sm font-semibold text-violet-600">{campaign.reward_description}</p>
      <div className="mt-2">
        <div className="mb-1 flex justify-between text-xs text-gray-400">
          <span>{campaign.current_participants}명 지원</span>
          <span>{campaign.max_participants}명 모집</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </Link>
  )
}
