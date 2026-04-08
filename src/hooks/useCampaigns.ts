'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/useAuthStore'
import { useXP } from '@/hooks/useXP'
import type { Campaign } from '@/types'
import toast from 'react-hot-toast'

type StatusFilter = 'all' | 'recruiting' | 'closed'

export function useCampaigns(filter: StatusFilter = 'all') {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()
      let query = supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30)

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data } = await query
      setCampaigns((data ?? []) as Campaign[])
      setLoading(false)
    }
    load()
  }, [filter])

  return { campaigns, loading }
}

export function useCampaignDetail(id: string) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [applied, setApplied] = useState(false)
  const [loading, setLoading] = useState(true)
  const user = useAuthStore((s) => s.user)
  const { awardXP } = useXP()

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single()
      setCampaign(data as Campaign | null)

      if (user) {
        const { data: app } = await supabase
          .from('campaign_applications')
          .select('id')
          .eq('campaign_id', id)
          .eq('user_id', user.id)
          .maybeSingle()
        setApplied(!!app)
      }
      setLoading(false)
    }
    load()
  }, [id, user])

  async function apply() {
    if (!user || !campaign || applied) return
    const supabase = createClient()

    const { error } = await supabase.from('campaign_applications').insert({
      campaign_id: campaign.id,
      user_id: user.id,
    })

    if (error) {
      toast.error('지원에 실패했어요')
      return
    }

    setApplied(true)
    setCampaign({ ...campaign, current_participants: campaign.current_participants + 1 })
    await awardXP('campaign')
    toast.success('지원 완료! +30 XP')
  }

  return { campaign, applied, loading, apply }
}
