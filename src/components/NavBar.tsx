'use client'

import { Box, HStack, useColorModeValue, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import TextPressure from './TextPressure'

export default function NavBar() {
  const pathname = usePathname()
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/auth/signin'
  }

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      bg={bgColor}
      zIndex={100}
      h="80px"
      px={8}
      display="flex"
      alignItems="center"
    >
      <Flex maxW="8xl" w="100%" mx="auto" justify="space-between" align="center">
        <Link href="/" passHref>
          <Box w="300px" h="40px" cursor="pointer">
            <TextPressure 
              text="U S T O C K"
              textColor={textColor}
              minFontSize={32}
              scale={true}
              width={true}
              weight={true}
              flex={true}
            />
          </Box>
        </Link>

        <Box as="span" fontWeight="medium" cursor="pointer" onClick={handleSignOut} fontSize="sm">
          Déconnexion
        </Box>
      </Flex>
    </Box>
  )
} 