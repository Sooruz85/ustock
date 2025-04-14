'use client'

import { Box, Container, SimpleGrid, Button, Heading, VStack } from '@chakra-ui/react'
import Link from 'next/link'

const CATEGORIES = [
  { label: 'Art du 19e Siècle', value: 'art_19e_siecle' },
  { label: 'Art Africain et Océanien', value: 'art_africain_oceanien' },
  { label: 'Art Américain', value: 'art_americain' },
  { label: 'Art Ancien et Antiquités', value: 'art_ancien_antiquites' },
  { label: 'Art Islamique et Indien', value: 'art_islamique_indien' },
  { label: 'Art Japonais', value: 'art_japonais' },
  { label: 'Art Latino-Américain', value: 'art_latino_americain' },
  { label: 'Art Moderne et Contemporain Asiatique', value: 'art_moderne_contemporain_asiatique' },
  { label: 'Art Moderne et Contemporain Moyen-Oriental', value: 'art_moderne_contemporain_moyen_oriental' },
  { label: 'Art Moderne Britannique et Irlandais', value: 'art_moderne_britannique_irlandais' },
  { label: 'Automobiles et Véhicules', value: 'automobiles_vehicules' },
  { label: 'Céramiques Chinoises', value: 'ceramiques_chinoises' },
  { label: 'Design', value: 'design' },
  { label: 'Estampes et Multiples', value: 'estampes_multiples' },
  { label: 'Instruments de Musique', value: 'instruments_musique' },
  { label: 'Judaïca', value: 'judaica' },
  { label: 'Livres et Manuscrits', value: 'livres_manuscrits' },
  { label: 'Maroquinerie et Accessoires', value: 'maroquinerie_accessoires' },
  { label: 'Mobilier Européen', value: 'mobilier_europeen' },
  { label: 'Montres et Horlogerie', value: 'montres_horlogerie' },
  { label: 'Objets de Collection', value: 'objets_collection' },
  { label: 'Peintures Anciennes', value: 'peintures_anciennes' },
  { label: 'Peintures Chinoises', value: 'peintures_chinoises' },
  { label: 'Photographies', value: 'photographies' },
  { label: 'Sculptures Européennes', value: 'sculptures_europeennes' },
  { label: 'Sciences et Histoire Naturelle', value: 'sciences_histoire_naturelle' },
  { label: 'Sport et Memorabilia', value: 'sport_memorabilia' },
  { label: 'Tapis et Tapisseries', value: 'tapis_tapisseries' },
  { label: 'Vins et Spiritueux', value: 'vins_spiritueux' }
]

export default function Categories() {
  return (
    <Box bg="gray.50" minH="100vh" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Heading
              fontSize="6xl"
              fontFamily="serif"
              fontWeight="light"
              fontStyle="italic"
              mb={4}
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
              cursor="pointer"
            >
              Catégories
            </Heading>
          </Link>
          
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {CATEGORIES.map((category) => (
              <Link 
                key={category.value} 
                href={`/?category=${category.value}`}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  w="100%"
                  h="100px"
                  p={6}
                  whiteSpace="normal"
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="medium"
                  bg="white"
                  color="gray.800"
                  boxShadow="md"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    bg: 'gray.50'
                  }}
                  transition="all 0.2s"
                >
                  {category.label}
                </Button>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
} 