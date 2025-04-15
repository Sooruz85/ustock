'use client'

import {
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Category } from '@/types/database.types'

interface CategoryChipProps {
  category: Category
  isActive?: boolean
  count?: number
  onClick?: () => void
}

export default function CategoryChip({ category, isActive = false, count, onClick }: CategoryChipProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'white')
  const activeBg = useColorModeValue('blue.50', 'blue.900')
  const activeBorder = useColorModeValue('blue.500', 'blue.200')

  return (
    <Box
      onClick={onClick}
      bg={isActive ? activeBg : bgColor}
      border="1px"
      borderColor={isActive ? activeBorder : borderColor}
      borderRadius="full"
      px={4}
      py={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      transition="all 0.2s"
      cursor="pointer"
      _hover={{
        transform: 'translateY(-1px)',
        boxShadow: 'sm',
        borderColor: isActive ? activeBorder : 'blue.200',
      }}
      role="group"
    >
      <Text
        color={textColor}
        fontSize="sm"
        fontWeight={isActive ? "semibold" : "medium"}
      >
        {category.label}
      </Text>
      
      {count !== undefined && (
        <Box
          ml={2}
          px={2}
          py={0.5}
          borderRadius="full"
          bg={isActive ? 'blue.100' : 'gray.100'}
          color={isActive ? 'blue.700' : 'gray.600'}
          fontSize="xs"
          fontWeight="bold"
          _groupHover={{
            bg: isActive ? 'blue.200' : 'blue.50',
            color: isActive ? 'blue.800' : 'blue.600',
          }}
        >
          {count}
        </Box>
      )}
    </Box>
  )
} 