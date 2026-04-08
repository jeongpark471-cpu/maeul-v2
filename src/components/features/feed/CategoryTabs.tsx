'use client'

const CATEGORIES = ['전체', '일상', '맛집', '육아', '질문', '나눔', '이슈', '부동산'] as const

interface CategoryTabsProps {
  active: string
  onChange: (cat: string) => void
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2.5 scrollbar-none">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            active === cat
              ? 'bg-violet-600 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
