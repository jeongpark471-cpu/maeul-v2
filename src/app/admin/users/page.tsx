'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import type { User } from '@/types'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()
      let query = supabase.from('users').select('*').order('created_at', { ascending: false }).limit(50)
      if (search) query = query.ilike('full_name', `%${search}%`)
      const { data } = await query
      setUsers((data ?? []) as User[])
      setLoading(false)
    }
    const t = setTimeout(load, 300)
    return () => clearTimeout(t)
  }, [search])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/admin" className="text-gray-400">←</Link>
        <h2 className="text-lg font-bold text-gray-900">👥 유저 관리</h2>
      </div>
      <Input placeholder="이름으로 검색..." value={search} onChange={(e) => setSearch(e.target.value)} />

      {loading ? (
        <div className="flex justify-center py-8"><div className="h-5 w-5 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /></div>
      ) : (
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{u.full_name}</span>
                  <Badge level={u.level} />
                  {u.role === 'admin' && <span className="rounded bg-red-100 px-1 text-[10px] text-red-600">admin</span>}
                </div>
                <p className="text-xs text-gray-400">{u.email}</p>
              </div>
              <span className="text-xs text-gray-400">{u.xp} XP</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
