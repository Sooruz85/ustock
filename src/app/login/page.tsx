'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const toast = useToast()
  const router = useRouter()

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast({
        title: 'Connexion réussie',
        status: 'success',
        duration: 3000,
      })

      router.push('/')
      router.refresh()
    } catch (error: any) {
      toast({
        title: 'Erreur de connexion',
        description: error.message,
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validatePassword(password)) {
      toast({
        title: 'Mot de passe invalide',
        description: 'Le mot de passe doit contenir au moins 6 caractères',
        status: 'error',
        duration: 5000,
      })
      return
    }

    setIsSigningUp(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error

      toast({
        title: 'Inscription réussie',
        description: 'Vérifiez votre email pour confirmer votre compte',
        status: 'success',
        duration: 5000,
      })

      // Redirection vers la page de connexion après inscription
      setEmail('')
      setPassword('')
      setMode('login')
      
    } catch (error: any) {
      toast({
        title: 'Erreur d\'inscription',
        description: error.message,
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsSigningUp(false)
    }
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
    setEmail('')
    setPassword('')
  }

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>{mode === 'login' ? 'Connexion' : 'Inscription'}</Heading>
        <Box
          as="form"
          onSubmit={mode === 'login' ? handleLogin : handleSignUp}
          w="100%"
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="sm"
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Mot de passe</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
              />
              <Text fontSize="sm" color="gray.500" mt={1}>
                Le mot de passe doit contenir au moins 6 caractères
              </Text>
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isLoading={mode === 'login' ? isLoggingIn : isSigningUp}
              w="100%"
            >
              {mode === 'login' ? 'Se connecter' : 'S\'inscrire'}
            </Button>
            <Button
              onClick={toggleMode}
              variant="ghost"
              size="lg"
              w="100%"
            >
              {mode === 'login' ? 'Créer un compte' : 'Déjà un compte ? Se connecter'}
            </Button>
          </Stack>
        </Box>
      </VStack>
    </Container>
  )
} 