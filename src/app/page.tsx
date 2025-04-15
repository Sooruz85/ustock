'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from "@/lib/supabase"
import { Box, Container, Heading, Input, SimpleGrid, Card, CardBody, Text, Select, Button, HStack, VStack, Flex, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { ShareIcon } from '@/components/Icons'
import Link from 'next/link'
import type { Objet } from '@/types/database.types'
import Image from 'next/image'

const CATEGORY_COLORS = [
  '#00BCD4', // Turquoise
  '#FFC107', // Jaune
  '#FF9800', // Orange
  '#FF6F61', // Corail
  '#009688', // Vert-bleu
  '#FFB74D', // Orange clair
  '#D32F2F', // Rouge
]

const CATEGORIES = [
  { 
    label: 'SUZOU 305',
    value: 'art_19e_siecle',
    image: '/stamps/305.svg',
    color: '#00BCD4'
  },
  { 
    label: 'CAFETIÈRE',
    value: 'art_africain_oceanien',
    image: '/stamps/cafetiere.svg',
    color: '#FFC107'
  },
  { 
    label: 'TONGS',
    value: 'art_americain',
    image: '/stamps/tong.svg',
    color: '#FF9800'
  },
  { 
    label: 'HÔTEL',
    value: 'art_ancien_antiquites',
    image: '/stamps/hotel.svg',
    color: '#FF6F61'
  },
  { 
    label: 'DINO',
    value: 'art_moderne_contemporain_asiatique',
    image: '/stamps/dino.svg',
    color: '#009688'
  },
  { 
    label: 'CAFECITO',
    value: 'design',
    image: '/stamps/cafe.svg',
    color: '#FFB74D'
  },
  { 
    label: 'SOLEIL',
    value: 'photographies',
    image: '/stamps/soleil.svg',
    color: '#D32F2F'
  },
  { 
    label: 'FLAMANT',
    value: 'sculptures_europeennes',
    image: '/stamps/flamant.svg',
    color: '#FF9800'
  },
  { 
    label: 'DOMINOS',
    value: 'bijoux',
    image: '/stamps/domino.svg',
    color: '#D32F2F'
  },
  { 
    label: 'PALMIER',
    value: 'montres_horlogerie',
    image: '/stamps/palmier.svg',
    color: '#00BCD4'
  },
  { 
    label: 'COCKTAIL',
    value: 'livres_manuscrits',
    image: '/stamps/cocktail.svg',
    color: '#FFB74D'
  },
  { 
    label: 'SURF',
    value: 'vins_spiritueux',
    image: '/stamps/surf.svg',
    color: '#009688'
  }
]

// Style de dentelure de timbre amélioré
const stampNotchSize = "12px"
const stampNotchStyle = `
  radial-gradient(circle at center, transparent ${stampNotchSize}, #000D4D ${stampNotchSize}) 0 0/16px 16px round,
  radial-gradient(circle at center, transparent ${stampNotchSize}, #000D4D ${stampNotchSize}) 8px 8px/16px 16px round
`

export default function Home() {
  const [objets, setObjets] = useState<Objet[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedObjet, setSelectedObjet] = useState<Objet | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const addTestData = async () => {
    console.log('Starting addTestData...')
    try {
      const testData = [
        {
          titre: "Cafetière Vintage",
          description: "Cafetière italienne des années 50",
          artiste: "Bialetti",
          categorie: "art_africain_oceanien",
          image_url: "https://picsum.photos/400/300",
          estimation_min: 100,
          estimation_max: 200
        },
        {
          titre: "Sculpture Moderne",
          description: "Sculpture contemporaine en bronze",
          artiste: "Jean Dupont",
          categorie: "sculptures_europeennes",
          image_url: "https://picsum.photos/400/301",
          estimation_min: 5000,
          estimation_max: 8000
        },
        {
          titre: "Montre Art Déco",
          description: "Montre de collection des années 30",
          artiste: "Patek Philippe",
          categorie: "montres_horlogerie",
          image_url: "https://picsum.photos/400/302",
          estimation_min: 15000,
          estimation_max: 25000
        }
      ]

      console.log('Inserting test data:', testData)
      const { data, error } = await supabase
        .from('objets')
        .insert(testData)
        .select()

      if (error) {
        console.error('Error adding test data:', error)
        setError(`Erreur lors de l'ajout des données de test: ${error.message}`)
        return
      }

      console.log('Test data added successfully:', data)
      await fetchObjets()
    } catch (err) {
      console.error('Error in addTestData:', err)
      setError("Erreur lors de l'ajout des données de test")
    }
  }

  useEffect(() => {
    const initializeData = async () => {
      console.log('Initializing data...')
      try {
        const { data: existingData, error: countError } = await supabase
          .from('objets')
          .select('id')
        
        console.log('Checking existing data:', { existingData, countError })
        
        if (countError) {
          console.error('Error checking existing data:', countError)
          setError(`Erreur lors de la vérification des données: ${countError.message}`)
          return
        }

        if (!existingData || existingData.length === 0) {
          console.log('No data found, adding test data...')
          await addTestData()
        } else {
          console.log(`Found ${existingData.length} existing objects`)
          await fetchObjets()
        }
      } catch (err) {
        console.error('Error in initializeData:', err)
        setError('Erreur l\'initialisation des données')
      }
    }

    console.log('Starting data initialization...')
    initializeData()
  }, [])

  const fetchObjets = async () => {
    console.log('Starting fetchObjets...')
    setLoading(true)
    setError(null)
    try {
      console.log('Building query with:', { searchTerm, selectedCategory })
      let query = supabase.from("objets").select("*")
      
      if (searchTerm) {
        query = query.or(`titre.ilike.%${searchTerm}%,artiste.ilike.%${searchTerm}%`)
      }

      if (selectedCategory) {
        query = query.eq('categorie', selectedCategory)
      }

      console.log('Executing Supabase query...')
      const { data, error } = await query
      
      if (error) {
        console.error('Error fetching objets:', error)
        setError(`Erreur lors de la récupération des objets: ${error.message}`)
        return
      }
      
      console.log('Fetched objects:', { count: data?.length, data })
      setObjets(data || [])
    } catch (error) {
      console.error('Error in fetchObjets:', error)
      setError('Erreur lors de la récupération des objets')
    } finally {
      setLoading(false)
      console.log('fetchObjets completed')
    }
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    fetchObjets()
  }

  useEffect(() => {
    if (searchTerm || selectedCategory) {
      fetchObjets()
    }
  }, [searchTerm, selectedCategory])

  const handleShare = (objet: Objet) => {
    setSelectedObjet(objet)
    onOpen()
  }

  const getObjetsByCategory = (categorie: string) => {
    return objets.filter(objet => objet.categorie === categorie)
  }

  const nextSlide = () => {
    if (currentIndex < CATEGORIES.length - 1) {
      setCurrentIndex(currentIndex + 1)
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: (currentIndex + 1) * 280,
          behavior: 'smooth'
        })
      }
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: (currentIndex - 1) * 280,
          behavior: 'smooth'
        })
      }
    }
  }

  const renderCategorySection = (category: { label: string, value: string }) => {
    const categoryObjets = getObjetsByCategory(category.value)
    
    if (categoryObjets.length === 0) return null
    
    return (
      <Box key={category.value} mb={12}>
        <Heading 
          size="lg" 
          mb={6}
          fontFamily="serif"
          fontWeight="medium"
        >
          {category.label}
        </Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} position="relative">
          {categoryObjets.map((objet) => (
            <Card
              key={objet.id}
              overflow="hidden"
              variant="outline"
              position="relative"
              transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{
                transform: 'scale(1.1) translateY(-10px)',
                zIndex: 10,
                boxShadow: '2xl',
                '& > .card-content': {
                  transform: 'translateY(0)',
                  opacity: 1,
                },
              }}
              as="article"
              cursor="pointer"
              onClick={() => window.location.href = `/objets/${objet.id}`}
            >
              <Box position="relative" height="350px">
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
                <Box
                  className="card-content"
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  bg="blackAlpha.800"
                  color="white"
                  p={6}
                  transform="translateY(100%)"
                  opacity="0"
                  transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  backdropFilter="blur(10px)"
                >
                  <VStack align="start" spacing={2}>
                    <Heading 
                      size="md" 
                      fontFamily="serif"
                      fontWeight="medium"
                      color="white"
                    >
                      {objet.titre}
                    </Heading>
                    {objet.artiste && (
                      <Text fontSize="sm" color="gray.200">
                        {objet.artiste}
                      </Text>
                    )}
                    {objet.date_creation && (
                      <Text fontSize="sm" color="gray.200">
                        {objet.date_creation}
                      </Text>
                    )}
                    {objet.technique && (
                      <Text fontSize="sm" color="gray.300">
                        {objet.technique}
                      </Text>
                    )}
                    {(objet.estimation_min || objet.estimation_max) && (
                      <Text fontSize="sm" color="white" fontWeight="medium">
                        {objet.estimation_min && objet.estimation_max 
                          ? `${objet.estimation_min.toLocaleString()} € - ${objet.estimation_max.toLocaleString()} €`
                          : objet.estimation_min 
                            ? `À partir de ${objet.estimation_min.toLocaleString()} €`
                            : objet.estimation_max
                              ? `Jusqu'à ${objet.estimation_max.toLocaleString()} €`
                              : ''
                        }
                      </Text>
                    )}
                  </VStack>
                </Box>
                <IconButton
                  aria-label="Partager"
                  icon={<ShareIcon />}
                  position="absolute"
                  top={4}
                  right={4}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(objet);
                  }}
                  colorScheme="blackAlpha"
                  rounded="full"
                />
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    )
  }

  return (
    <Box bg="#000D4D" minH="100vh" py={16}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <Heading
            fontSize="6xl"
            fontFamily="serif"
            fontWeight="light"
            color="white"
            textAlign="center"
          >
            Notre Collection
          </Heading>

          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <AlertTitle>Erreur:</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Grille de timbres */}
          <SimpleGrid 
            columns={[2, 3, 4, 7]} 
            spacing={4} 
            w="full"
            px={[4, 6, 8]}
          >
            {CATEGORIES.map((category, index) => (
              <Box
                key={category.value}
                position="relative"
                bg={category.color}
                overflow="hidden"
                aspectRatio="0.7"
                cursor="pointer"
                role="group"
                onClick={() => handleCategoryClick(category.value)}
                sx={{
                  mask: stampNotchStyle,
                  WebkitMask: stampNotchStyle,
                }}
                _hover={{
                  transform: 'scale(1.05)',
                }}
                transition="all 0.3s"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  opacity={0.2}
                  backgroundImage="repeating-linear-gradient(-45deg, currentColor, currentColor 1px, transparent 1px, transparent 6px)"
                />
                <VStack 
                  spacing={4} 
                  height="100%" 
                  justify="center"
                  position="relative"
                  zIndex={1}
                  p={4}
                >
                  <Box
                    w="60%"
                    h="60%"
                    position="relative"
                    style={{
                      filter: 'brightness(0.8) contrast(1.2)',
                      mixBlendMode: 'multiply'
                    }}
                  >
                    <Image
                      src={category.image}
                      alt={category.label}
                      fill
                      style={{
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  <Text
                    fontSize={["xs", "sm"]}
                    fontWeight="bold"
                    color="currentColor"
                    textAlign="center"
                    style={{
                      opacity: 0.8,
                      mixBlendMode: 'multiply'
                    }}
                  >
                    {category.label}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          {/* Barre de recherche */}
          <HStack spacing={4} justify="center" w="100%">
            <Input
              placeholder="Rechercher un objet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="400px"
              bg="white"
              size="lg"
            />
            {selectedCategory && (
              <Button
                onClick={() => setSelectedCategory('')}
                colorScheme="red"
                variant="outline"
                color="white"
                _hover={{ bg: 'red.500' }}
              >
                Réinitialiser le filtre
              </Button>
            )}
          </HStack>

          {/* Section des objets */}
          <Box w="100%" bg="white" p={8} borderRadius="xl">
            {loading ? (
              <Text textAlign="center" fontSize="xl">Chargement de la collection...</Text>
            ) : objets.length === 0 ? (
              <Text textAlign="center" fontSize="xl">Aucun objet trouvé</Text>
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

      {/* Modal de partage */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Partager cet objet</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedObjet && (
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold">Lien de partage :</Text>
                  <Input 
                    value={`${window.location.origin}/objets/${selectedObjet.id}`}
                    readOnly
                  />
                </Box>
                <Button 
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/objets/${selectedObjet.id}`
                    )
                  }}
                >
                  Copier le lien
                </Button>
                <Text fontSize="sm" color="gray.600">
                  Partagez cet objet unique de votre collection sur vos réseaux sociaux préférés.
                </Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}