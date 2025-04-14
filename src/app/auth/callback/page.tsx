'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { searchParams } = new URL(window.location.href)
      const code = searchParams.get('code')
      
      if (code) {
        await supabase.auth.exchangeCodeForSession(code)
        router.push('/')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div style={{ padding: 50, textAlign: 'center' }}>
      Finalisation de l'authentification...
    </div>
  )
} 