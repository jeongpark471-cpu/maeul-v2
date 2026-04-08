'use client'

import { useEffect, useRef, useState } from 'react'
import Input from '@/components/ui/Input'

const SIDO_LIST = [
  '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
  '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '전체',
] as const

interface RegionItem {
  code: string
  name: string
  full: string
  sido: string
}

const REGIONS: RegionItem[] = [
  { code: 'seoul-gangnam', name: '강남구', full: '서울특별시 강남구', sido: '서울' },
  { code: 'seoul-seocho', name: '서초구', full: '서울특별시 서초구', sido: '서울' },
  { code: 'seoul-songpa', name: '송파구', full: '서울특별시 송파구', sido: '서울' },
  { code: 'seoul-mapo', name: '마포구', full: '서울특별시 마포구', sido: '서울' },
  { code: 'seoul-yongsan', name: '용산구', full: '서울특별시 용산구', sido: '서울' },
  { code: 'seoul-jongno', name: '종로구', full: '서울특별시 종로구', sido: '서울' },
  { code: 'seoul-jung', name: '중구', full: '서울특별시 중구', sido: '서울' },
  { code: 'seoul-seodaemun', name: '서대문구', full: '서울특별시 서대문구', sido: '서울' },
  { code: 'seoul-gwanak', name: '관악구', full: '서울특별시 관악구', sido: '서울' },
  { code: 'seoul-nowon', name: '노원구', full: '서울특별시 노원구', sido: '서울' },
  { code: 'gyeonggi-seongnam', name: '성남시', full: '경기도 성남시', sido: '경기' },
  { code: 'gyeonggi-suwon', name: '수원시', full: '경기도 수원시', sido: '경기' },
  { code: 'gyeonggi-goyang', name: '고양시', full: '경기도 고양시', sido: '경기' },
  { code: 'gyeonggi-yongin', name: '용인시', full: '경기도 용인시', sido: '경기' },
  { code: 'busan-haeundae', name: '해운대구', full: '부산광역시 해운대구', sido: '부산' },
  { code: 'busan-jung', name: '중구', full: '부산광역시 중구', sido: '부산' },
  { code: 'incheon-namdong', name: '남동구', full: '인천광역시 남동구', sido: '인천' },
  { code: 'daegu-suseong', name: '수성구', full: '대구광역시 수성구', sido: '대구' },
]

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelect: (code: string, fullName: string) => void
}

export default function RegionSelectModal({ isOpen, onClose, onSelect }: Props) {
  const [search, setSearch] = useState('')
  const [activeSido, setActiveSido] = useState('서울')
  const overlayRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    debounceRef.current = setTimeout(() => setDebouncedSearch(search), 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [search])

  if (!isOpen) return null

  const filtered = REGIONS.filter((r) => {
    if (debouncedSearch) {
      return r.name.includes(debouncedSearch) || r.full.includes(debouncedSearch)
    }
    return activeSido === '전체' || r.sido === activeSido
  })

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="flex h-[80dvh] w-full max-w-lg flex-col rounded-t-2xl bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="text-lg font-bold text-gray-900">동네 선택</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="px-4 py-3">
          <Input
            placeholder="동네 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {!debouncedSearch && (
          <div className="flex gap-1 overflow-x-auto px-4 pb-2 scrollbar-none">
            {SIDO_LIST.map((sido) => (
              <button
                key={sido}
                onClick={() => setActiveSido(sido)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  activeSido === sido
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {sido}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 divide-y divide-gray-50 overflow-y-auto px-4">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">검색 결과가 없어요</p>
          ) : (
            filtered.map((r) => (
              <button
                key={r.code}
                className="w-full py-3 text-left text-sm text-gray-700 hover:text-violet-600"
                onClick={() => {
                  onSelect(r.code, r.full)
                  onClose()
                }}
              >
                <span className="font-medium">{r.name}</span>
                <span className="ml-2 text-xs text-gray-400">{r.full}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
