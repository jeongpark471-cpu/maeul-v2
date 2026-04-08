'use client'

interface TabNavProps {
  tabs: readonly string[]
  activeTab: string
  onChange: (tab: string) => void
}

export default function TabNav({ tabs, activeTab, onChange }: TabNavProps) {
  return (
    <div className="flex border-b border-gray-100">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            activeTab === tab
              ? 'border-b-2 border-violet-600 text-violet-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
