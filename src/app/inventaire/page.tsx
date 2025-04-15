'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  useColorModeValue,
  Wrap,
  WrapItem,
  Image,
} from '@chakra-ui/react'
import { SearchIcon, AddIcon } from '@chakra-ui/icons'
import { supabase } from '@/lib/supabase'
import { Objet, Category, Platform } from '@/types/database.types'
import ObjectCard from '@/components/ObjectCard'
import CategoryChip from '@/components/CategoryChip'
import { SharePreview } from '@/components/SharePreview'
import Link from 'next/link'
import CustomButton from '@/components/CustomButton'

// Définition des catégories
const CATEGORIES: Category[] = [
  { value: 'art_19e_siecle', label: 'Art du 19e Siècle', color: '#2D3748' },
  { value: 'art_africain_oceanien', label: 'Art Africain et Océanien', color: '#C53030' },
  { value: 'art_americain', label: 'Art Américain', color: '#2C7A7B' },
  { value: 'art_ancien_antiquites', label: 'Art Ancien et Antiquités', color: '#6B46C1' },
  { value: 'art_islamique_indien', label: 'Art Islamique et Indien', color: '#B7791F' },
  { value: 'art_japonais', label: 'Art Japonais', color: '#2F855A' },
  { value: 'art_latino_americain', label: 'Art Latino-Américain', color: '#9B2C2C' },
  { value: 'art_moderne_contemporain_asiatique', label: 'Art Moderne et Contemporain Asiatique', color: '#702459' },
  { value: 'art_moderne_contemporain_moyen_oriental', label: 'Art Moderne et Contemporain Moyen-Oriental', color: '#2A4365' },
  { value: 'art_moderne_britannique_irlandais', label: 'Art Moderne Britannique et Irlandais', color: '#975A16' },
  { value: 'automobiles_vehicules', label: 'Automobiles et Véhicules', color: '#285E61' },
  { value: 'ceramiques_chinoises', label: 'Céramiques Chinoises', color: '#744210' },
  { value: 'design', label: 'Design', color: '#22543D' },
  { value: 'estampes_multiples', label: 'Estampes et Multiples', color: '#322659' },
  { value: 'instruments_musique', label: 'Instruments de Musique', color: '#702459' },
  { value: 'judaica', label: 'Judaica', color: '#2A4365' },
  { value: 'livres_manuscrits', label: 'Livres et Manuscrits', color: '#285E61' },
  { value: 'maroquinerie_accessoires', label: 'Maroquinerie et Accessoires', color: '#744210' },
  { value: 'mobilier_europeen', label: 'Mobilier Européen', color: '#22543D' },
  { value: 'montres_horlogerie', label: 'Montres et Horlogerie', color: '#322659' },
  { value: 'objets_collection', label: 'Objets de Collection', color: '#702459' },
  { value: 'peintures_anciennes', label: 'Peintures Anciennes', color: '#2A4365' },
  { value: 'peintures_chinoises', label: 'Peintures Chinoises', color: '#285E61' },
  { value: 'photographies', label: 'Photographies', color: '#744210' },
]

export default function Inventaire() {
  const [objets, setObjets] = useState<Objet[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [selectedObjet, setSelectedObjet] = useState<Objet | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('SELENCY')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    fetchObjets()
  }, [searchTerm, selectedCategory])

  const fetchObjets = async () => {
    setLoading(true)
    try {
      let query = supabase.from('objets').select(`
        *,
        images
      `)

      if (searchTerm) {
        query = query.or(`titre.ilike.%${searchTerm}%,artiste.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      }

      if (selectedCategory) {
        query = query.eq('categorie', selectedCategory)
      }

      const { data, error } = await query

      if (error) throw error

      console.log('Objets reçus:', data)
      setObjets(data || [])
    } catch (error) {
      console.error('Error fetching objets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = (objet: Objet) => {
    setSelectedObjet(objet)
    setSelectedPlatform('SELENCY')
    onOpen()
  }

  const getCategoryCount = (categoryValue: string) => {
    return objets.filter(obj => obj.categorie === categoryValue).length
  }

  const handleCategoryClick = (categoryValue: string) => {
    setSelectedCategory(categoryValue === selectedCategory ? '' : categoryValue)
  }

  return (
    <Box position="relative" minH="100vh">
      {/* Image de fond */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
      >
        <Box
          as="img"
          src="/images/background.jpg"
          alt="Inventory background"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          width="100%"
          height="100%"
          objectFit="cover"
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.45)"
        />
      </Box>

      <Container maxW="container.xl" py={8}>
        {/* En-tête */}
        <VStack spacing={8} align="stretch" mb={8}>
          <Heading
            size="lg"
            color="white"
            fontFamily="serif"
          >
            Mon Inventaire
          </Heading>

          {/* Filtres */}
          <HStack spacing={4}>
            <InputGroup maxW="400px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Rechercher un objet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg={useColorModeValue('white', 'gray.800')}
                borderColor={borderColor}
              />
            </InputGroup>
          </HStack>

          {/* Catégories */}
          <Box>
            <Text
              fontSize="sm"
              fontWeight="medium"
              color={useColorModeValue('gray.600', 'gray.400')}
              mb={3}
            >
              Catégories
            </Text>
            <Wrap spacing={3}>
              <WrapItem>
                <CategoryChip
                  category={{ value: '', label: 'Tous' }}
                  isActive={!selectedCategory}
                  count={objets.length}
                  onClick={() => handleCategoryClick('')}
                />
              </WrapItem>
              {CATEGORIES.map((category) => (
                <WrapItem key={category.value}>
                  <CategoryChip
                    category={category}
                    isActive={selectedCategory === category.value}
                    count={getCategoryCount(category.value)}
                    onClick={() => handleCategoryClick(category.value)}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </VStack>

        {/* Grille d'objets */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={6}
          mb={8}
        >
          {objets.map((objet) => (
            <ObjectCard
              key={objet.id}
              objet={objet}
              onShare={() => handleShare(objet)}
            />
          ))}
        </SimpleGrid>

        {/* Message si aucun objet */}
        {!loading && objets.length === 0 && (
          <Box
            textAlign="center"
            p={8}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="xl"
            border="1px"
            borderColor={borderColor}
          >
            <Text fontSize="lg" mb={4}>
              Aucun objet trouvé
              {selectedCategory && ' dans cette catégorie'}
              {searchTerm && ' pour cette recherche'}
            </Text>
            <Link href="/objets/nouveau" passHref>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="blue"
                variant="outline"
              >
                Ajouter un objet
              </Button>
            </Link>
          </Box>
        )}
      </Container>

      {/* Modal de partage */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent maxW="5xl" bg="transparent">
          {selectedObjet && (
            <SharePreview
              objet={selectedObjet}
              platforms={['VINTED', 'SELENCY', 'LEBONCOIN', 'GENSDECONFIANCE', 'EBAY']}
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
              onShare={() => {
                // Implémenter la logique de partage
                onClose()
              }}
              onClose={onClose}
            />
          )}
        </ModalContent>
      </Modal>
    </Box>
  )
} 