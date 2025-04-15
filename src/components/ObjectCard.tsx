'use client'

import {
  Box,
  Text,
  Badge,
  IconButton,
  useColorModeValue,
  Image,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { ShareIcon } from '@/components/Icons'
import { Objet } from '@/types/database.types'
import Link from 'next/link'

interface ObjectCardProps {
  objet: Objet
  onShare?: () => void
}

export default function ObjectCard({ objet, onShare }: ObjectCardProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  const mainImage = objet.images && objet.images.length > 0 
    ? objet.images[0].url 
    : '/images/no-image.jpg'

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      position="relative"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
      role="group"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="4px"
        bg="green.500"
        transition="height 0.3s"
        _groupHover={{ height: "8px" }}
      />

      <Link href={`/objets/${objet.id}`}>
        <Box position="relative" h="200px">
          <Image
            src={mainImage}
            alt={objet.titre}
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Badge
            position="absolute"
            top={4}
            left={4}
            colorScheme="blue"
            borderRadius="full"
            px={2}
            boxShadow="sm"
          >
            {objet.categorie}
          </Badge>
        </Box>
      </Link>

      <VStack p={4} align="stretch" spacing={3}>
        <Text 
          fontSize="xl" 
          fontWeight="semibold"
          noOfLines={1}
          transition="color 0.2s"
          _groupHover={{ color: "blue.500" }}
        >
          {objet.titre}
        </Text>

        {objet.artiste && (
          <Text 
            color={textColor} 
            fontSize="sm"
            fontStyle="italic"
            noOfLines={1}
          >
            {objet.artiste}
          </Text>
        )}

        {(objet.estimation_min || objet.estimation_max) && (
          <Text 
            color={textColor} 
            fontSize="sm"
            fontWeight="medium"
          >
            Estimation: {objet.estimation_min && `${objet.estimation_min}€`}
            {objet.estimation_min && objet.estimation_max && ' - '}
            {objet.estimation_max && `${objet.estimation_max}€`}
          </Text>
        )}

        {onShare && (
          <Box textAlign="right" pt={2}>
            <IconButton
              aria-label="Partager"
              icon={<ShareIcon />}
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault()
                onShare()
              }}
              opacity={0.7}
              _hover={{ opacity: 1 }}
            />
          </Box>
        )}
      </VStack>
    </Box>
  )
} 