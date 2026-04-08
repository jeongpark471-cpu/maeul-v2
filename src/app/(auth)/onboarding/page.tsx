'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const REGIONS = [
  { code: 'seoul-gangnam', name: '서울 강남구', full: '서울특별시 강남구' },
  { code: 'seoul-seocho', name: '서울 서초구', full: '서울특별시 서초구' },
  { code: 'seoul-songpa', name: '서울 송파구', full: '서울특별시 송파구' },
  { code: 'seoul-mapo', name: '서울 마포구', full: '서울특별시 마포구' },
  { code: 'seoul-yongsan', name: '서울 용산구', full: '서울특별시 용산구' },
  { code: 'seoul-jongno', name: '서울 종로구', full: '서울특별시 종로구' },
  { code: 'seoul-jung', name: '서울 중구', full: '서울특별시 중구' },
  { code: 'seoul-seodaemun', name: '서울 서대문구', full: '서울특별시 서대문구' },
  { code: 'gyeonggi-seongnam', name: '경기 성남시', full: '경기도 성남시' },
  { code: 'gyeonggi-suwon', name: '경기 수원시', full: '경기도 수원시' },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [nickname, setNickname] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const filtered = REGIONS.filter((r) => r.name.includes(search))
  const selectedRegionData = REGIONS.find((r) => r.code === selectedRegion)

  async function handleComplete() {
    if (!selectedRegion || !nickname.trim()) return
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('로그인이 필요합니다')
      setLoading(false)
      return
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({
        full_name: nickname.trim(),
        region_code: selectedRegion,
        region_name: selectedRegionData?.full,
        onboarding_completed: true,
      })
      .eq('id', user.id)

    if (updateError) {
      setError('설정에 실패했어요. 다시 시도해주세요')
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 진행 표시 */}
      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${
              s <= step ? 'bg-orange-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Step 1: 환영 */}
      {step === 1 && (
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="text-6xl">🏘️</div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              마을광장에 오신 걸 환영해요!
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              우리 동네 이웃들과 소통하고
              <br />
              다양한 활동으로 보상을 받아보세요
            </p>
          </div>
          <Button fullWidth onClick={() => setStep(2)}>
            시작하기
          </Button>
        </div>
      )}

      {/* Step 2: 닉네임 */}
      {step === 2 && (
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              이웃들에게 보여줄 이름을 정해주세요
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              나중에 프로필에서 변경할 수 있어요
            </p>
          </div>
          <Input
            label="닉네임"
            placeholder="예: 강남주민홍길동"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={20}
          />
          <p className="text-right text-xs text-gray-400">
            {nickname.length}/20
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(1)}>
              이전
            </Button>
            <Button
              fullWidth
              disabled={nickname.trim().length < 2}
              onClick={() => setStep(3)}
            >
              다음
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: 동네 선택 */}
      {step === 3 && (
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              활동할 동네를 선택해주세요
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              선택한 동네의 소식을 볼 수 있어요
            </p>
          </div>
          <Input
            placeholder="동네 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex max-h-52 flex-col gap-2 overflow-y-auto">
            {filtered.map((region) => (
              <button
                key={region.code}
                type="button"
                onClick={() => setSelectedRegion(region.code)}
                className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                  selectedRegion === region.code
                    ? 'border-orange-500 bg-orange-50 font-semibold text-orange-700'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(2)}>
              이전
            </Button>
            <Button
              fullWidth
              disabled={!selectedRegion || loading}
              onClick={handleComplete}
            >
              {loading ? '설정 중...' : '완료'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
