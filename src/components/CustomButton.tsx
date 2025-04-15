'use client'

import { Button, ButtonProps, Box } from '@chakra-ui/react'
import { forwardRef } from 'react'

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, variant = 'primary', ...props }, ref) => {
    const getColors = () => {
      switch (variant) {
        case 'primary':
          return {
            bg: 'pink.100',
            color: 'gray.800',
            _hover: {
              bg: 'pink.200',
              transform: 'scale(1.02)',
            }
          }
        case 'secondary':
          return {
            bg: 'gray.100',
            color: 'gray.800',
            _hover: {
              bg: 'gray.200',
              transform: 'scale(1.02)',
            }
          }
        case 'outline':
          return {
            bg: 'transparent',
            color: 'gray.800',
            border: '2px solid',
            borderColor: 'pink.100',
            _hover: {
              bg: 'pink.50',
              transform: 'scale(1.02)',
            }
          }
        default:
          return {}
      }
    }

    return (
      <Button
        ref={ref}
        position="relative"
        borderRadius="full"
        px={8}
        py={4}
        fontWeight="normal"
        letterSpacing="wide"
        transition="all 0.3s"
        _active={{
          transform: 'scale(0.98)',
        }}
        _focus={{
          boxShadow: 'none',
        }}
        {...getColors()}
        {...props}
      >
        {children}
        <Box
          as="span"
          position="absolute"
          right={3}
          top="50%"
          transform="translateY(-50%)"
          opacity={0.6}
          transition="all 0.3s"
          _groupHover={{ opacity: 1 }}
        >
          👆
        </Box>
      </Button>
    )
  }
)

CustomButton.displayName = 'CustomButton'

export default CustomButton 