'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useXP } from '@/hooks/useXP'
import LevelUpModal from '@/components/features/LevelUpModal'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function WritePage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const { awardXP, levelUpData, clearLevelUp } = useXP()
  const router = useRouter()

  async function handleSubmit() {
    if (!content.trim()) return
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast.error('로그인이 필요해요')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('feed_posts').insert({
      user_id: user.id,
      content: content.trim(),
    })

    if (error) {
      toast.error('글 작성에 실패했어요')
      setLoading(false)
      return
    }

    const result = await awardXP('post')

    if (result?.leveledUp) {
      // LevelUpModal이 표시되므로 잠시 대기
      setTimeout(() => router.push('/'), 2000)
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">글쓰기</h1>
        <span className="text-xs text-gray-400">{content.length}/2000</span>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="동네 이웃에게 공유하고 싶은 이야기를 적어주세요"
        className="h-60 resize-none rounded-xl border border-gray-200 p-4 text-sm leading-relaxed placeholder:text-gray-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
        maxLength={2000}
        autoFocus
      />

      <p className="text-xs text-gray-400">
        등록 시 <span className="font-semibold text-violet-600">+20 XP</span> 획득
      </p>

      <Button
        fullWidth
        onClick={handleSubmit}
        disabled={loading || !content.trim()}
      >
        {loading ? '등록 중...' : '등록하기'}
      </Button>

      {levelUpData && (
        <LevelUpModal data={levelUpData} onClose={clearLevelUp} />
      )}
    </div>
  )
}
