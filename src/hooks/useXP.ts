'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/useAuthStore'
import toast from 'react-hot-toast'

const XP_ACTIONS = {
  attendance: 5,
  post: 20,
  comment: 10,
  like: 1,
  campaign: 30,
  mission_bonus: 10,
} as const

type XPAction = keyof typeof XP_ACTIONS

const XP_LABELS: Record<XPAction, string> = {
  attendance: '출석 체크',
  post: '글 작성',
  comment: '댓글 작성',
  like: '좋아요',
  campaign: '캠페인 참여',
  mission_bonus: '미션 보너스',
}

export interface LevelUpData {
  prevLevel: number
  newLevel: number
}

function calculateLevel(xp: number): number {
  const thresholds = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000, 6500]
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) return i + 1
  }
  return 1
}

export function useXP() {
  const [levelUpData, setLevelUpData] = useState<LevelUpData | null>(null)
  const { user, setUser } = useAuthStore()

  async function awardXP(action: XPAction) {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return null

    const xpAmount = XP_ACTIONS[action]

    const { error: logError } = await supabase.from('xp_logs').insert({
      user_id: session.user.id,
      action,
      xp_amount: xpAmount,
    })

    if (logError) {
      toast.error('XP 적립에 실패했어요')
      return null
    }

    const { data: userData } = await supabase
      .from('users')
      .select('xp, level, weekly_xp')
      .eq('id', session.user.id)
      .single()

    if (!userData) return null

    const newXP = userData.xp + xpAmount
    const newWeeklyXP = userData.weekly_xp + xpAmount
    const newLevel = calculateLevel(newXP)
    const leveledUp = newLevel > userData.level

    await supabase.from('users').update({
      xp: newXP,
      weekly_xp: newWeeklyXP,
      level: newLevel,
    }).eq('id', session.user.id)

    if (user) {
      setUser({ ...user, xp: newXP, weekly_xp: newWeeklyXP, level: newLevel })
    }

    toast.success(`+${xpAmount} XP (${XP_LABELS[action]})`)

    if (leveledUp) {
      setLevelUpData({ prevLevel: userData.level, newLevel })
    }

    return { xpAmount, newLevel, leveledUp }
  }

  function clearLevelUp() {
    setLevelUpData(null)
  }

  return { awardXP, levelUpData, clearLevelUp }
}

export { XP_ACTIONS, calculateLevel }
export type { XPAction }
