'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, loading, error } = useAuth()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await signIn(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="이메일"
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </Button>

      <div className="flex items-center justify-between text-sm">
        <Link href="/signup" className="font-semibold text-orange-500">
          회원가입
        </Link>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          onClick={() => alert('비밀번호 재설정 기능은 준비 중이에요')}
        >
          비밀번호 찾기
        </button>
      </div>
    </form>
  )
}
