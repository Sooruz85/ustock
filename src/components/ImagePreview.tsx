'use client'

import { ImageType } from '@/types/image.types'
import {
  Box,
  Image,
  SimpleGrid,
  IconButton,
  Text,
  VStack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons'
import { useState } from 'react'

interface ImagePreviewProps {
  images: ImageType[]
  onReorder?: (newImages: ImageType[]) => void
  onDelete?: (index: number) => void
  maxImages?: number
}

export default function ImagePreview({
  images,
  onReorder,
  onDelete,
  maxImages = Infinity
}: ImagePreviewProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const bgHover = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')

  const handleMoveUp = (index: number) => {
    if (!onReorder || index === 0) return
    const newImages = [...images]
    ;[newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]]
    onReorder(newImages)
  }

  const handleMoveDown = (index: number) => {
    if (!onReorder || index === images.length - 1) return
    const newImages = [...images]
    ;[newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]]
    onReorder(newImages)
  }

  return (
    <VStack align="stretch" spacing={4}>
      <HStack justify="space-between">
        <Text fontWeight="medium">
          Images ({images.length}/{maxImages})
        </Text>
      </HStack>
      
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {images.map((image, index) => (
          <Box
            key={`${image.url}-${index}`}
            position="relative"
            borderRadius="md"
            overflow="hidden"
            border="1px"
            borderColor={borderColor}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            transition="all 0.2s"
            _hover={{ bg: bgHover }}
          >
            <Image
              src={image.url}
              alt={image.alt || `Image ${index + 1}`}
              objectFit="cover"
              w="100%"
              h="200px"
            />
            
            {hoveredIndex === index && (
              <HStack
                position="absolute"
                top={2}
                right={2}
                spacing={1}
              >
                {onReorder && (
                  <>
                    <IconButton
                      aria-label="Monter l'image"
                      icon={<ChevronUpIcon />}
                      size="sm"
                      isDisabled={index === 0}
                      onClick={() => handleMoveUp(index)}
                      colorScheme="blue"
                      variant="solid"
                    />
                    <IconButton
                      aria-label="Descendre l'image"
                      icon={<ChevronDownIcon />}
                      size="sm"
                      isDisabled={index === images.length - 1}
                      onClick={() => handleMoveDown(index)}
                      colorScheme="blue"
                      variant="solid"
                    />
                  </>
                )}
                {onDelete && (
                  <IconButton
                    aria-label="Supprimer l'image"
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={() => onDelete(index)}
                    colorScheme="red"
                    variant="solid"
                  />
                )}
              </HStack>
            )}
            
            <Text
              position="absolute"
              bottom={2}
              left={2}
              fontSize="sm"
              color="white"
              bg="blackAlpha.700"
              px={2}
              py={1}
              borderRadius="md"
            >
              {index + 1}/{images.length}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  )
} 