'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/useAuthStore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import RegionSelectModal from '@/components/common/RegionSelectModal'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user)
  const { setUser } = useAuthStore()
  const router = useRouter()

  const [nickname, setNickname] = useState(user?.full_name ?? '')
  const [bio, setBio] = useState('')
  const [regionCode, setRegionCode] = useState(user?.region_code ?? '')
  const [regionName, setRegionName] = useState(user?.region_name ?? '')
  const [showRegion, setShowRegion] = useState(false)
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!user || !nickname.trim()) return
    setSaving(true)
    const supabase = createClient()

    const updates: Record<string, unknown> = {
      full_name: nickname.trim(),
    }
    if (regionCode) {
      updates.region_code = regionCode
      updates.region_name = regionName
    }

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)

    if (error) {
      toast.error('저장에 실패했어요')
      setSaving(false)
      return
    }

    if (password.length >= 8) {
      const { error: pwError } = await supabase.auth.updateUser({ password })
      if (pwError) {
        toast.error('비밀번호 변경에 실패했어요')
        setSaving(false)
        return
      }
    }

    setUser({
      ...user,
      full_name: nickname.trim(),
      region_code: regionCode || user.region_code,
      region_name: regionName || user.region_name,
    })

    toast.success('저장되었어요!')
    router.push('/profile')
    setSaving(false)
  }

  if (!user) return null

  return (
    <div className="flex flex-col gap-5 px-4 py-4">
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="text-gray-500">←</button>
        <h1 className="text-lg font-bold text-gray-900">프로필 편집</h1>
      </div>

      <Input label="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={20} />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">동네</label>
        <button
          onClick={() => setShowRegion(true)}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-left text-sm text-gray-700"
        >
          {regionName || '동네를 선택하세요'}
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">자기소개</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="간단한 자기소개를 적어주세요"
          className="h-24 resize-none rounded-lg border border-gray-300 p-3 text-sm placeholder:text-gray-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          maxLength={200}
        />
      </div>

      <Input
        label="비밀번호 변경"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="변경할 비밀번호 (8자 이상)"
        error={password.length > 0 && password.length < 8 ? '8자 이상 입력해주세요' : undefined}
      />

      <Button fullWidth onClick={handleSave} disabled={saving || !nickname.trim()}>
        {saving ? '저장 중...' : '저장'}
      </Button>

      <RegionSelectModal
        isOpen={showRegion}
        onClose={() => setShowRegion(false)}
        onSelect={(code, full) => {
          setRegionCode(code)
          setRegionName(full)
        }}
      />
    </div>
  )
}
