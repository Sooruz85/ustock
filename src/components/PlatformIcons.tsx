import { HStack, Box, useColorModeValue } from '@chakra-ui/react'
import { Platform } from '@/types/database.types'
import { VintedIcon, SelencyIcon, LeboncoinIcon, GensDeConfianceIcon, EbayIcon } from './Icons'

const PLATFORM_ICONS = {
  VINTED: VintedIcon,
  SELENCY: SelencyIcon,
  LEBONCOIN: LeboncoinIcon,
  GENSDECONFIANCE: GensDeConfianceIcon,
  EBAY: EbayIcon,
}

const PLATFORM_COLORS = {
  VINTED: '#09B1BA',
  SELENCY: '#4A90E2',
  LEBONCOIN: '#FF6E14',
  GENSDECONFIANCE: '#6B46C1',
  EBAY: '#E53E3E',
}

export default function PlatformIcons() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <HStack 
      spacing={2} 
      bg={bgColor} 
      p={2} 
      borderRadius="full" 
      border="1px" 
      borderColor={borderColor}
      boxShadow="sm"
    >
      {(Object.entries(PLATFORM_ICONS) as [Platform, typeof VintedIcon][]).map(([platform, Icon]) => (
        <Box
          key={platform}
          position="relative"
          opacity={0.7}
          transition="all 0.2s"
          _hover={{ opacity: 1, transform: 'scale(1.1)' }}
        >
          <Icon 
            boxSize="20px"
            color={PLATFORM_COLORS[platform]}
          />
        </Box>
      ))}
    </HStack>
  )
} 