'use client'

import { useState, useEffect } from 'react'
import { supabase } from "@/lib/supabase"
import { Box, Container, Heading, SimpleGrid, Card, CardBody, Text, VStack, Button } from '@chakra-ui/react'
import Link from 'next/link'
import type { Objet } from '@/types/database.types'

const CATEGORIES = {
  art_19e_siecle: 'Art du 19e Siècle',
  art_africain_oceanien: 'Art Africain',
  art_americain: 'Art Américain',
  art_ancien_antiquites: 'Antiquités',
  art_moderne_contemporain_asiatique: 'Art Asiatique',
  design: 'Design',
  photographies: 'Photographies',
  sculptures_europeennes: 'Sculptures',
  bijoux: 'Bijoux',
  montres_horlogerie: 'Montres',
  livres_manuscrits: 'Livres',
  vins_spiritueux: 'Vins'
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [objets, setObjets] = useState<Objet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchObjets()
  }, [params.category])

  const fetchObjets = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('objets')
        .select('*')
        .eq('categorie', params.category)

      if (error) {
        console.error('Error fetching objets:', error)
        setError(`Erreur lors de la récupération des objets: ${error.message}`)
        return
      }

      setObjets(data || [])
    } catch (error) {
      console.error('Error in fetchObjets:', error)
      setError('Erreur lors de la récupération des objets')
    } finally {
      setLoading(false)
    }
  }

  const categoryName = CATEGORIES[params.category as keyof typeof CATEGORIES] || params.category

  return (
    <Box bg="#000D4D" minH="100vh" py={16}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="outline"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              leftIcon={<span>←</span>}
            >
              Retour à la collection
            </Button>
          </Link>

          <Heading
            fontSize="6xl"
            fontFamily="serif"
            fontWeight="light"
            color="white"
            textAlign="center"
          >
            {categoryName}
          </Heading>

          <Box w="100%" bg="white" p={8} borderRadius="xl">
            {loading ? (
              <Text textAlign="center" fontSize="xl">Chargement des objets...</Text>
            ) : objets.length === 0 ? (
              <VStack spacing={4}>
                <Text textAlign="center" fontSize="xl">Aucun objet dans cette catégorie</Text>
                <Link href="/objets/nouveau">
                  <Button colorScheme="blue">Ajouter un objet</Button>
                </Link>
              </VStack>
            ) : (
              <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
                {objets.map((objet) => (
                  <Card
                    key={objet.id}
                    overflow="hidden"
                    variant="outline"
                    _hover={{
                      transform: 'translateY(-4px)',
                      shadow: 'lg',
                    }}
                    transition="all 0.2s"
                    as={Link}
                    href={`/objets/${objet.id}`}
                  >
                    <Box position="relative" height="250px">
                      {objet.image_url ? (
                        <Box
                          as="img"
                          src={objet.image_url}
                          alt={objet.titre}
                          objectFit="cover"
                          w="100%"
                          h="100%"
                        />
                      ) : (
                        <Box
                          bg="gray.100"
                          w="100%"
                          h="100%"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text color="gray.500">Aucune image</Text>
                        </Box>
                      )}
                    </Box>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Heading size="md">{objet.titre}</Heading>
                        {objet.artiste && (
                          <Text fontSize="sm" color="gray.600">
                            {objet.artiste}
                          </Text>
                        )}
                        {objet.date_creation && (
                          <Text fontSize="sm" color="gray.600">
                            {objet.date_creation}
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  )
} 