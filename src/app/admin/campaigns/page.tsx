'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import type { Campaign } from '@/types'

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false }).limit(30)
      setCampaigns((data ?? []) as Campaign[])
      setLoading(false)
    }
    load()
  }, [])

  async function updateStatus(id: string, status: string) {
    const supabase = createClient()
    await supabase.from('campaigns').update({ status }).eq('id', id)
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: status as Campaign['status'] } : c))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/admin" className="text-gray-400">←</Link>
        <h2 className="text-lg font-bold text-gray-900">📢 캠페인 관리</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-8"><div className="h-5 w-5 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div>
      ) : (
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
          {campaigns.map((c) => (
            <div key={c.id} className="px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">{c.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c.status === 'recruiting' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {c.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400">{c.current_participants}/{c.max_participants}명</p>
              <div className="mt-2 flex gap-2">
                {c.status !== 'recruiting' && <Button onClick={() => updateStatus(c.id, 'recruiting')}>승인</Button>}
                {c.status === 'recruiting' && <Button variant="secondary" onClick={() => updateStatus(c.id, 'closed')}>마감</Button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
