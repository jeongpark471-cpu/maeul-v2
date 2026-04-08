'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Step = 1 | 2 | 3

interface Region {
  code: string
  display_name: string
  city: string
  district: string
  neighborhood: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState<Step>(1)
  const [nickname, setNickname] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [keyword, setKeyword] = useState('')
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchRegions = async (kw: string) => {
    setKeyword(kw)
    if (!kw.trim()) { setRegions([]); return }
    const { data } = await supabase
      .from('regions')
      .select('code, display_name, city, district, neighborhood')
      .or(`display_name.ilike.%${kw}%,district.ilike.%${kw}%,neighborhood.ilike.%${kw}%`)
      .limit(20)
    setRegions((data ?? []) as Region[])
  }

  const handleComplete = async () => {
    setLoading(true)
    setError('')
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('로그인 정보를 찾을 수 없어요')
        setLoading(false)
        return
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: nickname.trim() || '마을주민',
          region_code: selectedRegion?.code ?? null,
          region_name: selectedRegion?.display_name ?? null,
          onboarding_completed: true,
        })
        .eq('id', session.user.id)

      if (updateError) {
        console.error('온보딩 업데이트 에러:', updateError)
        setError('설정 저장에 실패했어요: ' + updateError.message)
        setLoading(false)
        return
      }

      router.push('/')
    } catch (err) {
      console.error('온보딩 에러:', err)
      setError('예상치 못한 오류가 발생했어요')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-b from-purple-50 to-white">
      {/* 진행 표시 */}
      <div className="flex justify-center gap-2 pb-6 pt-12">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all ${
              s === step ? 'w-6 bg-purple-600' : s < step ? 'w-2 bg-purple-300' : 'w-2 bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="flex-1 px-6">
        {/* Step 1: 환영 */}
        {step === 1 && (
          <div className="flex flex-col items-center pt-8 text-center">
            <div className="mb-6 text-6xl">👋</div>
            <h1 className="mb-3 text-2xl font-black text-gray-900">
              마을광장에 오신 걸<br />환영해요!
            </h1>
            <p className="mb-10 text-sm leading-relaxed text-gray-500">
              우리 동네 이야기를 나누고<br />리워드도 받아보세요
            </p>
            <button
              onClick={() => setStep(2)}
              className="w-full rounded-2xl bg-purple-600 py-4 text-base font-bold text-white"
            >
              시작하기 →
            </button>
          </div>
        )}

        {/* Step 2: 닉네임 */}
        {step === 2 && (
          <div className="pt-8">
            <h1 className="mb-2 text-2xl font-black text-gray-900">
              어떻게 불러드릴까요?
            </h1>
            <p className="mb-8 text-sm text-gray-500">닉네임은 나중에 변경할 수 있어요</p>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임 입력 (최대 10자)"
              maxLength={10}
              className="mb-2 w-full rounded-2xl border-2 border-gray-200 px-4 py-4 text-base outline-none focus:border-purple-500"
            />
            <div className="mb-8 text-right text-xs text-gray-400">{nickname.length}/10</div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 rounded-2xl border-2 border-gray-200 py-4 font-bold text-gray-500"
              >
                이전
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!nickname.trim()}
                className="flex-[2] rounded-2xl bg-purple-600 py-4 font-bold text-white disabled:opacity-40"
              >
                다음 →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: 동네 선택 */}
        {step === 3 && (
          <div className="pt-8">
            <h1 className="mb-2 text-2xl font-black text-gray-900">
              어느 동네에 사세요?
            </h1>
            <p className="mb-6 text-sm text-gray-500">동네 소식을 바로 받아볼 수 있어요</p>

            {/* 검색창 */}
            <div className="relative mb-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                value={keyword}
                onChange={(e) => searchRegions(e.target.value)}
                placeholder="동네 이름으로 검색 (예: 정자동)"
                className="w-full rounded-2xl border-2 border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-purple-500"
              />
            </div>

            {/* 선택된 동네 */}
            {selectedRegion && (
              <div className="mb-4 flex items-center gap-2 rounded-2xl border-2 border-purple-200 bg-purple-50 px-4 py-3">
                <span>📍</span>
                <div>
                  <div className="text-sm font-bold text-purple-700">{selectedRegion.display_name}</div>
                  <div className="text-xs text-purple-400">{selectedRegion.city} {selectedRegion.district} {selectedRegion.neighborhood}</div>
                </div>
                <button onClick={() => setSelectedRegion(null)} className="ml-auto text-lg text-purple-400">✕</button>
              </div>
            )}

            {/* 검색 결과 */}
            {regions.length > 0 && (
              <div className="mb-4 max-h-48 overflow-y-auto rounded-2xl border border-gray-100">
                {regions.map((r) => (
                  <button
                    key={r.code}
                    onClick={() => { setSelectedRegion(r); setRegions([]); setKeyword('') }}
                    className="flex w-full items-center gap-3 border-b border-gray-50 px-4 py-3 text-left hover:bg-purple-50"
                  >
                    <span className="text-red-400">📍</span>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{r.display_name}</div>
                      <div className="text-xs text-gray-400">{r.city} {r.district} {r.neighborhood}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {keyword && regions.length === 0 && (
              <div className="py-6 text-center text-sm text-gray-400">
                검색 결과가 없어요
              </div>
            )}

            {!keyword && !selectedRegion && (
              <div className="py-8 text-center text-sm text-gray-400">
                🔍 동네 이름을 검색해주세요
              </div>
            )}

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 rounded-2xl border-2 border-gray-200 py-4 font-bold text-gray-500"
              >
                이전
              </button>
              <button
                onClick={handleComplete}
                disabled={!selectedRegion || loading}
                className="flex-[2] rounded-2xl bg-purple-600 py-4 font-bold text-white disabled:opacity-40"
              >
                {loading ? '설정 중...' : '완료 🎉'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
