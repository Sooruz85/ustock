'use client'

import { useEffect, useState } from 'react'
import { Box, Container, Flex, Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function Navigation() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Vérifier l'état de connexion initial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <Box as="nav" bg="white" py={4} borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            fontFamily="serif"
            fontSize="xl"
          >
            UStock
          </Button>
          <Flex gap={4}>
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/objets/nouveau')}
                >
                  Ajouter un objet
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
              >
                Connexion
              </Button>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
} 