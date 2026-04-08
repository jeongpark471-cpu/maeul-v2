'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import { timeAgo } from '@/lib/utils/timeAgo'

interface Report {
  id: string
  reporter_id: string
  target_type: string
  target_id: string
  reason: string
  status: string
  created_at: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('reports').select('*').order('created_at', { ascending: false }).limit(30)
      setReports((data ?? []) as Report[])
      setLoading(false)
    }
    load()
  }, [])

  async function handleResolve(id: string) {
    const supabase = createClient()
    await supabase.from('reports').update({ status: 'resolved' }).eq('id', id)
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/admin" className="text-gray-400">←</Link>
        <h2 className="text-lg font-bold text-gray-900">📝 신고 관리</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-8"><div className="h-5 w-5 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div>
      ) : reports.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">신고 내역이 없어요</p>
      ) : (
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
          {reports.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm text-gray-900">{r.reason}</p>
                <p className="text-xs text-gray-400">{r.target_type} · {timeAgo(r.created_at)}</p>
              </div>
              {r.status === 'pending' ? (
                <Button onClick={() => handleResolve(r.id)}>처리</Button>
              ) : (
                <span className="text-xs text-green-600">처리 완료</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
