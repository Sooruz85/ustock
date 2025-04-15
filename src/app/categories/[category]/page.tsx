'use client'

import { useEffect, useState } from 'react'
import { Box, Container, Heading, SimpleGrid, Text, Button, Spinner, Center } from '@chakra-ui/react'
import { supabase } from "@/lib/supabase"
import { CATEGORIES } from '@/app/constants'
import Link from 'next/link'
import { Objet } from '@/types/database.types'
import ObjectCard from '@/components/ObjectCard'

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [objects, setObjects] = useState<Objet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const category = CATEGORIES[params.category]

  useEffect(() => {
    if (!category) {
      setError("Catégorie non trouvée")
      setLoading(false)
      return
    }
    fetchObjets()
  }, [category])

  const fetchObjets = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('objets')
        .select(`
          *,
          images
        `)
        .eq('categorie', params.category)

      if (error) {
        throw error
      }

      console.log('Objets reçus:', data)
      setObjects(data || [])
    } catch (err) {
      console.error('Erreur lors de la récupération des objets:', err)
      setError("Une erreur est survenue lors du chargement des objets")
    } finally {
      setLoading(false)
    }
  }

  if (!category) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text color="red.500">Catégorie non trouvée</Text>
        <Button as={Link} href="/" mt={4}>
          Retour à la collection
        </Button>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading as="h1" size="xl" color={category.color}>
          {category.label}
        </Heading>
        <Button as={Link} href="/" mt={4}>
          Retour à la collection
        </Button>
      </Box>

      {loading ? (
        <Center py={8}>
          <Spinner size="xl" />
        </Center>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : objects.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text mb={4}>Aucun objet dans cette catégorie</Text>
          <Button as={Link} href="/objets/nouveau" colorScheme="blue">
            Ajouter un objet
          </Button>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {objects.map((objet) => (
            <ObjectCard key={objet.id} objet={objet} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  )
} 