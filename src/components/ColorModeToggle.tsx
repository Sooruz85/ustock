'use client'

import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function ColorModeToggle() {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={<SwitchIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      colorScheme="purple"
      size="sm"
    />
  )
} 