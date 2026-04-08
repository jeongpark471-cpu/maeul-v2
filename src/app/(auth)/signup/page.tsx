'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [agreed, setAgreed] = useState(false)
  const { signUp, loading, error } = useAuth()

  const passwordError =
    password.length > 0 && password.length < 8
      ? '비밀번호는 8자 이상이어야 해요'
      : undefined

  const confirmError =
    passwordConfirm.length > 0 && password !== passwordConfirm
      ? '비밀번호가 일치하지 않아요'
      : undefined

  const isValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length >= 8 &&
    password === passwordConfirm &&
    agreed

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    await signUp(email, password, name.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="이름"
        placeholder="홍길동"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
        placeholder="8자 이상"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        required
      />
      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호 다시 입력"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        error={confirmError}
        required
      />

      <label className="flex items-start gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
        />
        <span>
          <span className="font-medium text-orange-500">이용약관</span> 및{' '}
          <span className="font-medium text-orange-500">개인정보처리방침</span>에
          동의합니다
        </span>
      </label>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <Button type="submit" fullWidth disabled={loading || !isValid}>
        {loading ? '가입 중...' : '가입하기'}
      </Button>

      <p className="text-center text-sm text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="font-semibold text-orange-500">
          로그인
        </Link>
      </p>
    </form>
  )
}
