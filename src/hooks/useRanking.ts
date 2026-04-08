'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/useAuthStore'
import type { User } from '@/types'

type Period = 'this_month' | 'last_month'

export function useRanking() {
  const [rankings, setRankings] = useState<User[]>([])
  const [myRank, setMyRank] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<Period>('this_month')
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      const supabase = createClient()

      const orderCol = period === 'this_month' ? 'weekly_xp' : 'xp'

      let query = supabase
        .from('users')
        .select('*')
        .order(orderCol, { ascending: false })
        .limit(50)

      if (user?.region_code) {
        query = query.eq('region_code', user.region_code)
      }

      const { data } = await query
      const list = (data ?? []) as User[]
      setRankings(list)

      if (user) {
        const idx = list.findIndex(r => r.id === user.id)
        setMyRank(idx >= 0 ? idx + 1 : null)
      }
      setLoading(false)
    }
    fetch()
  }, [period, user])

  return { rankings, myRank, loading, period, setPeriod }
}
