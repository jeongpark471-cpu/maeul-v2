'use client'

import { useState } from 'react'
import { usePosts } from '@/hooks/usePosts'
import CategoryTabs from './CategoryTabs'
import FeedCard from './FeedCard'
import MissionCard from '@/components/features/MissionCard'
import AdPlaceholder from '@/components/common/AdPlaceholder'

export default function FeedTab() {
  const [category, setCategory] = useState('전체')
  const { posts, loading } = usePosts(category)

  // TODO: 실제 완료 미션은 서버에서 가져오기
  const completedMissions = new Set<string>()

  return (
    <div>
      <CategoryTabs active={category} onChange={setCategory} />
      <MissionCard completedIds={completedMissions} />

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        </div>
      ) : posts.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-400">
          아직 글이 없어요. 첫 글을 작성해보세요!
        </div>
      ) : (
        <>
          {posts.map((post, i) => (
            <div key={post.id}>
              <FeedCard post={post} />
              {i === 2 && <AdPlaceholder type="feed" />}
            </div>
          ))}
          <AdPlaceholder type="banner" />
        </>
      )}
    </div>
  )
}
