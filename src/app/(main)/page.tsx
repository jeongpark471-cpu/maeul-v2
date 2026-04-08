'use client'

import { useState } from 'react'
import XPBar from '@/components/features/XPBar'
import TabNav from '@/components/layout/TabNav'
import FeedTab from '@/components/features/feed/FeedTab'
import HotTab from '@/components/features/feed/HotTab'

const TABS = ['피드', 'HOT', '소식', '이웃'] as const

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('피드')

  return (
    <div>
      <XPBar />
      <TabNav tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === '피드' && <FeedTab />}
      {activeTab === 'HOT' && <HotTab />}
      {activeTab === '소식' && (
        <div className="py-12 text-center text-sm text-gray-400">
          소식 기능 준비 중
        </div>
      )}
      {activeTab === '이웃' && (
        <div className="py-12 text-center text-sm text-gray-400">
          이웃 기능 준비 중
        </div>
      )}
    </div>
  )
}
