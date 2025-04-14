'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Container, Heading, Text, VStack, Image, SimpleGrid, Box, Badge, Button, Flex, IconButton, useToast } from '@chakra-ui/react'
import { ShareIcon } from '@/components/Icons'
import type { Objet } from '@/types/database.types'

export default function ObjetDetail({ params }: { params: { id: string } }) {
  const [objet, setObjet] = useState<Objet | null>(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const fetchObjet = async () => {
      const { data, error } = await supabase
        .from('objets')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) {
        console.error('Error fetching objet:', error)
      } else {
        setObjet(data)
      }
      setLoading(false)
    }

    fetchObjet()
  }, [params.id])

  const handleShare = async () => {
    if (!objet) return
    
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Lien copié !",
        description: "Le lien a été copié dans votre presse-papiers.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  if (loading) {
    return (
      <Container maxW="container.lg" py={16}>
        <Text fontSize="xl" textAlign="center">Chargement...</Text>
      </Container>
    )
  }

  if (!objet) {
    return (
      <Container maxW="container.lg" py={16}>
        <Text fontSize="xl" textAlign="center">Objet non trouvé</Text>
      </Container>
    )
  }

  return (
    <Box bg="gray.50" minH="100vh" py={16}>
      <Container maxW="container.lg">
        <VStack spacing={12} align="stretch">
          <Flex justify="space-between" align="center">
            <Box>
              <Heading 
                size="2xl" 
                fontFamily="serif"
                fontWeight="light"
                mb={4}
              >
                {objet.titre}
              </Heading>
              <Text 
                fontSize="xl" 
                color="gray.600"
                fontStyle="italic"
              >
                {objet.artiste}
              </Text>
            </Box>
            <IconButton
              aria-label="Partager"
              icon={<ShareIcon />}
              onClick={handleShare}
              size="lg"
              colorScheme="blackAlpha"
              variant="outline"
              rounded="full"
            />
          </Flex>

          <SimpleGrid columns={[1, 2]} spacing={12}>
            <Box>
              {objet.image_url ? (
                <Image
                  src={objet.image_url}
                  alt={objet.titre}
                  borderRadius="lg"
                  objectFit="cover"
                  w="100%"
                  h="auto"
                  shadow="lg"
                />
              ) : (
                <Box
                  bg="gray.100"
                  height="500px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="lg"
                >
                  <Text color="gray.500" fontSize="lg">Aucune photo disponible</Text>
                </Box>
              )}
            </Box>

            <VStack align="stretch" spacing={8}>
              <Box 
                bg="white" 
                p={8} 
                borderRadius="lg"
                shadow="sm"
              >
                <VStack align="stretch" spacing={6}>
                  {objet.date_creation && (
                    <Box>
                      <Text fontWeight="medium" color="gray.500" mb={2}>Date de création</Text>
                      <Text fontSize="lg">{objet.date_creation}</Text>
                    </Box>
                  )}

                  {objet.dimensions && (
                    <Box>
                      <Text fontWeight="medium" color="gray.500" mb={2}>Dimensions</Text>
                      <Text fontSize="lg">{objet.dimensions}</Text>
                    </Box>
                  )}

                  {objet.technique && (
                    <Box>
                      <Text fontWeight="medium" color="gray.500" mb={2}>Technique</Text>
                      <Text fontSize="lg">{objet.technique}</Text>
                    </Box>
                  )}

                  {(objet.estimation_min || objet.estimation_max) && (
                    <Box>
                      <Text fontWeight="medium" color="gray.500" mb={2}>Estimation</Text>
                      <Text fontSize="lg">
                        {objet.estimation_min && objet.estimation_max 
                          ? `${objet.estimation_min.toLocaleString()} € - ${objet.estimation_max.toLocaleString()} €`
                          : objet.estimation_min 
                            ? `À partir de ${objet.estimation_min.toLocaleString()} €`
                            : objet.estimation_max
                              ? `Jusqu'à ${objet.estimation_max.toLocaleString()} €`
                              : ''
                        }
                      </Text>
                    </Box>
                  )}
                </VStack>
              </Box>

              {objet.description && (
                <Box 
                  bg="white" 
                  p={8} 
                  borderRadius="lg"
                  shadow="sm"
                >
                  <Text fontWeight="medium" color="gray.500" mb={4}>Description</Text>
                  <Text fontSize="lg" lineHeight="tall">
                    {objet.description}
                  </Text>
                </Box>
              )}
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
