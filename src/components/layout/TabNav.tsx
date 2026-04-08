'use client'

interface TabNavProps {
  tabs: readonly string[]
  activeTab: string
  onChange: (tab: string) => void
}

export default function TabNav({ tabs, activeTab, onChange }: TabNavProps) {
  return (
    <div className="flex border-b border-[rgba(200,170,100,0.2)]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            activeTab === tab
              ? 'border-b-2 border-[#B8820A] text-[#B8820A]'
              : 'text-[#8A7D6B] hover:text-[#5A5040]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
