'use client'

import { Box, HStack, useColorModeValue, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import TextPressure from './TextPressure'

export default function NavBar() {
  const pathname = usePathname()
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')
  const inactiveColor = useColorModeValue('gray.400', 'gray.600')

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/auth/signin'
  }

  const navItems = [
    { path: '/inventaire', label: 'Mon Inventaire' },
    { path: '/objets/nouveau', label: 'Ajouter un Objet' },
    { path: '/suivi-ventes', label: 'Suivi des Ventes' },
  ]

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
      borderBottom="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Flex maxW="8xl" w="100%" mx="auto" justify="space-between" align="center">
        <Link href="/" passHref>
          <Box 
            h="80px"
            display="flex"
            alignItems="center"
            cursor="pointer"
            sx={{
              'h1': {
                color: textColor + ' !important',
                fontSize: '48px !important',
                lineHeight: '80px !important',
                height: '80px !important',
                display: 'flex !important',
                alignItems: 'center !important'
              },
              'span': {
                color: textColor + ' !important',
                fontSize: '48px !important'
              }
            }}
          >
            <TextPressure />
          </Box>
        </Link>

        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} passHref>
              <Text
                fontSize="md"
                fontWeight="medium"
                color={pathname === item.path ? textColor : inactiveColor}
                cursor="pointer"
                transition="all 0.2s"
                position="relative"
                _hover={{
                  color: textColor,
                  _after: {
                    width: '100%'
                  }
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  width: pathname === item.path ? '100%' : '0%',
                  height: '2px',
                  bg: textColor,
                  transition: 'all 0.2s'
                }}
              >
                {item.label}
              </Text>
            </Link>
          ))}
        </HStack>

        <Box as="span" fontWeight="medium" cursor="pointer" onClick={handleSignOut} fontSize="sm">
          Déconnexion
        </Box>
      </Flex>
    </Box>
  )
} 