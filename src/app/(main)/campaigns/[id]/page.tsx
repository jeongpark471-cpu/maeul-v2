'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useCampaignDetail } from '@/hooks/useCampaigns'
import { useXP } from '@/hooks/useXP'
import Button from '@/components/ui/Button'
import LevelUpModal from '@/components/features/LevelUpModal'

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { campaign, applied, loading, apply } = useCampaignDetail(id)
  const { levelUpData, clearLevelUp } = useXP()
  const router = useRouter()

  if (loading) {
    return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div>
  }

  if (!campaign) {
    return <div className="py-12 text-center text-sm text-gray-400">캠페인을 찾을 수 없어요</div>
  }

  const pct = Math.min((campaign.current_participants / campaign.max_participants) * 100, 100)
  const isFull = campaign.current_participants >= campaign.max_participants
  const isRecruiting = campaign.status === 'recruiting'

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <button onClick={() => router.back()} className="text-gray-500">←</button>
        <h1 className="text-lg font-bold text-gray-900">캠페인 상세</h1>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${isRecruiting ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {isRecruiting ? '모집중' : '마감'}
          </span>
        </div>

        <h2 className="text-xl font-black text-gray-900">{campaign.title}</h2>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{campaign.description}</p>

        <div className="rounded-xl bg-violet-50 p-4">
          <p className="text-xs text-violet-500">보상</p>
          <p className="text-lg font-bold text-violet-700">{campaign.reward_description}</p>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-sm text-gray-500">
            <span>지원 현황</span>
            <span>{campaign.current_participants}/{campaign.max_participants}명</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {applied ? (
          <div className="rounded-xl border-2 border-green-200 bg-green-50 py-3 text-center text-sm font-semibold text-green-700">
            ✅ 지원 완료
          </div>
        ) : (
          <Button fullWidth disabled={!isRecruiting || isFull} onClick={apply}>
            {isFull ? '모집 마감' : '지원하기 (+30 XP)'}
          </Button>
        )}
      </div>

      {levelUpData && <LevelUpModal data={levelUpData} onClose={clearLevelUp} />}
    </div>
  )
}
