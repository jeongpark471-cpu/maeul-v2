'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { createClient } from '@/lib/supabase/client'
import Header from '@/components/layout/Header'
import BottomNav from '@/components/layout/BottomNav'
import Footer from '@/components/layout/Footer'
import Toast from '@/components/ui/Toast'
import type { User } from '@/types'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const supabase = createClient()

    async function loadUser() {
      setLoading(true)
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) {
        setUser(null)
        return
      }

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (profile) {
        setUser(profile as User)
      }
    }

    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) setUser(null)
      },
    )

    return () => subscription.unsubscribe()
  }, [setUser, setLoading])

  return (
    <div className="glass-layer relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col shadow-2xl">
      <Header />
      <main className="flex-1 pb-20">{children}</main>
      <Footer />
      <BottomNav />
      <Toast />
    </div>
  )
}
