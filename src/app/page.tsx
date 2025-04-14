'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from "@/lib/supabase"
import { Box, Container, Heading, Input, SimpleGrid, Card, CardBody, Text, Select, Button, HStack, VStack, Flex, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { ShareIcon } from '@/components/Icons'
import Link from 'next/link'
import type { Objet } from '@/types/database.types'

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
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80',
  },
  { 
    label: 'CAFETIÈRE',
    value: 'art_africain_oceanien',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
  },
  { 
    label: 'TONGS',
    value: 'art_americain',
    image: 'https://images.unsplash.com/photo-1624385392440-a3c9d4c15177?w=500&auto=format&fit=crop&q=80',
  },
  { 
    label: 'HÔTEL',
    value: 'art_ancien_antiquites',
    image: 'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?w=500&auto=format&fit=crop&q=80',
  },
  { 
    label: 'DINO',
    value: 'art_moderne_contemporain_asiatique',
    image: 'https://images.unsplash.com/photo-1619961310056-1f5c8df685d8?w=500&auto=format&fit=crop&q=80',
  },
  { 
    label: 'CAFECITO',
    value: 'design',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
  },
  { 
    label: 'SOLEIL',
    value: 'photographies',
    image: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=500&auto=format&fit=crop&q=80',
  },
  { 
    label: 'FLAMANT',
    value: 'sculptures_europeennes',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=500&auto=format&fit=crop&q=80',
  },
  { 
    label: 'DOMINOS',
    value: 'bijoux',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&auto=format&fit=crop&q=80',
  },
  { 
    label: 'PALMIER',
    value: 'montres_horlogerie',
    image: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=500&auto=format&fit=crop&q=80',
  },
  { 
    label: 'COCKTAIL',
    value: 'livres_manuscrits',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=80',
  },
  { 
    label: 'SURF',
    value: 'vins_spiritueux',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=500&auto=format&fit=crop&q=80',
  },
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
          
          {/* Carousel des catégories */}
          <Box position="relative" w="100%" px={12}>
            <IconButton
              aria-label="Previous"
              icon={<Text fontSize="2xl">←</Text>}
              position="absolute"
              left={0}
              top="50%"
              transform="translateY(-50%)"
              onClick={prevSlide}
              isDisabled={currentIndex === 0}
              bg="white"
              color="black"
              _hover={{ bg: 'gray.100' }}
              zIndex={2}
            />
            
            <Box
              ref={carouselRef}
              overflow="hidden"
              whiteSpace="nowrap"
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                scrollbarWidth: 'none'
              }}
            >
              <Box
                display="inline-flex"
                gap={6}
                px={4}
              >
                {CATEGORIES.map((category, index) => (
                  <Box
                    key={category.value}
                    display="inline-block"
                    position="relative"
                    overflow="hidden"
                    w="250px"
                    h="350px"
                    flexShrink={0}
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
                      backgroundImage={`url(${category.image})`}
                      backgroundSize="cover"
                      backgroundPosition="center"
                      filter="sepia(1) hue-rotate(190deg)"
                      opacity={0.8}
                    />
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg="linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%)"
                    />
                    <VStack 
                      spacing={4} 
                      height="100%" 
                      justify="flex-end"
                      position="relative"
                      zIndex={1}
                      p={6}
                    >
                      <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color="white"
                        textAlign="center"
                        textShadow="2px 2px 4px rgba(0,0,0,0.5)"
                      >
                        {category.label}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </Box>
            </Box>

            <IconButton
              aria-label="Next"
              icon={<Text fontSize="2xl">→</Text>}
              position="absolute"
              right={0}
              top="50%"
              transform="translateY(-50%)"
              onClick={nextSlide}
              isDisabled={currentIndex === CATEGORIES.length - 1}
              bg="white"
              color="black"
              _hover={{ bg: 'gray.100' }}
              zIndex={2}
            />

            {/* Indicateurs de position */}
            <HStack justify="center" mt={4} spacing={2}>
              {CATEGORIES.map((_, index) => (
                <Box
                  key={index}
                  w={2}
                  h={2}
                  borderRadius="full"
                  bg={index === currentIndex ? "white" : "whiteAlpha.400"}
                  cursor="pointer"
                  onClick={() => {
                    setCurrentIndex(index)
                    if (carouselRef.current) {
                      carouselRef.current.scrollTo({
                        left: index * 280,
                        behavior: 'smooth'
                      })
                    }
                  }}
                />
              ))}
            </HStack>
          </Box>

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