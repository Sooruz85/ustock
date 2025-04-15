'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Image,
  IconButton,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

interface PhotoFile {
  file: File
  preview: string
}

export default function NouvelObjet() {
  const [photos, setPhotos] = useState<PhotoFile[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    artiste: '',
    dimensions: '',
    technique: '',
    date_creation: '',
    estimation_min: '',
    estimation_max: '',
    categorie: ''
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const checkAuth = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast({
          title: 'Non autorisé',
          description: 'Vous devez être connecté pour ajouter un objet',
          status: 'error',
          duration: 5000,
        })
        router.push('/login')
      }
    } catch (error) {
      console.error('Erreur de vérification de session:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de vérifier votre session',
        status: 'error',
        duration: 5000,
      })
      router.push('/login')
    }
  }, [toast, router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: 'Fichier trop volumineux',
        description: 'La taille maximum est de 5MB',
        status: 'error',
        duration: 3000,
      })
      return false
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: 'Type de fichier non supporté',
        description: 'Utilisez des fichiers JPG, PNG ou WebP',
        status: 'error',
        duration: 3000,
      })
      return false
    }

    return true
  }

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      if (!validateFile(file)) return
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotos(prev => [...prev, {
          file,
          preview: reader.result as string
        }])
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const movePhoto = (fromIndex: number, toIndex: number) => {
    const newPhotos = [...photos]
    const [movedPhoto] = newPhotos.splice(fromIndex, 1)
    newPhotos.splice(toIndex, 0, movedPhoto)
    setPhotos(newPhotos)
  }

  const showPhotoPreview = (preview: string) => {
    setSelectedPhoto(preview)
    onOpen()
  }

  const validateEstimations = (min: string, max: string): boolean => {
    if (min && max) {
      const minValue = Number(min)
      const maxValue = Number(max)
      if (minValue > maxValue) {
        toast({
          title: 'Erreur de validation',
          description: 'L\'estimation minimum ne peut pas être supérieure à l\'estimation maximum',
          status: 'error',
          duration: 5000,
        })
        return false
      }
    }
    return true
  }

  const uploadPhotos = async (): Promise<string[]> => {
    if (photos.length === 0) return []
    
    try {
      const uploadPromises = photos.map(async ({ file }, index) => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${index}-${Math.random().toString(36).substring(7)}.${fileExt}`
        
        const { data, error: uploadError } = await supabase.storage
          .from('photos')
          .upload(`objets/${fileName}`, file, {
            cacheControl: '3600',
            upsert: false
          })
        
        if (uploadError) {
          console.error(`Erreur d'upload pour le fichier ${index + 1}:`, uploadError)
          throw uploadError
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('photos')
          .getPublicUrl(`objets/${fileName}`)
          
        return publicUrl
      })

      const urls = await Promise.all(uploadPromises)
      return urls
    } catch (error) {
      console.error('Erreur détaillée lors de l\'upload:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validation des champs requis
      if (!formData.titre.trim()) {
        throw new Error('Le titre est requis')
      }

      if (!formData.categorie) {
        throw new Error('La catégorie est requise')
      }

      if (!photos.length) {
        throw new Error('Au moins une photo est requise')
      }

      // Validation des estimations
      if (!validateEstimations(formData.estimation_min, formData.estimation_max)) {
        return
      }

      // Upload des photos
      const imageUrls = await uploadPhotos()

      // Récupérer l'utilisateur connecté
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Vous devez être connecté pour ajouter un objet')
      }

      // Préparation des données de l'objet
      const objetData = {
        ...formData,
        titre: formData.titre.trim(),
        description: formData.description.trim() || null,
        artiste: formData.artiste.trim() || null,
        dimensions: formData.dimensions.trim() || null,
        technique: formData.technique.trim() || null,
        date_creation: formData.date_creation || null,
        estimation_min: formData.estimation_min ? Number(formData.estimation_min) : null,
        estimation_max: formData.estimation_max ? Number(formData.estimation_max) : null,
        images: imageUrls.map((url, index) => ({
          url,
          alt: `${formData.titre} - Image ${index + 1}`,
          order: index
        })),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: session.user.id
      }

      // Insertion dans la base de données
      const { error } = await supabase
        .from('objets')
        .insert([objetData])

      if (error) throw error

      toast({
        title: 'Succès',
        description: 'Objet ajouté avec succès',
        status: 'success',
        duration: 5000,
      })

      router.push('/inventaire')
    } catch (error) {
      console.error('Erreur complète:', error)
      toast({
        title: 'Erreur',
        description: error instanceof Error 
          ? error.message 
          : error?.message || 'Erreur lors de l\'ajout de l\'objet',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
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
          alt="Add item background"
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
        <VStack spacing={8} align="stretch">
          <Heading size="lg" color="white" fontFamily="serif">Ajouter un nouvel objet</Heading>
          
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <FormControl isRequired mb={4}>
                <FormLabel color="white">Titre</FormLabel>
                <Input
                  name="titre"
                  value={formData.titre}
                  onChange={handleInputChange}
                  placeholder="Titre de l'œuvre"
                  bg="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  borderColor="whiteAlpha.400"
                  _hover={{ borderColor: 'whiteAlpha.500' }}
                  _focus={{ borderColor: 'white', bg: 'whiteAlpha.300' }}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel color="white">Artiste</FormLabel>
                <Input
                  name="artiste"
                  value={formData.artiste}
                  onChange={handleInputChange}
                  placeholder="Nom de l'artiste"
                  bg="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  borderColor="whiteAlpha.400"
                  _hover={{ borderColor: 'whiteAlpha.500' }}
                  _focus={{ borderColor: 'white', bg: 'whiteAlpha.300' }}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel color="white">Date de création</FormLabel>
                <Input
                  name="date_creation"
                  value={formData.date_creation}
                  onChange={handleInputChange}
                  placeholder="Date de création"
                  bg="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  borderColor="whiteAlpha.400"
                  _hover={{ borderColor: 'whiteAlpha.500' }}
                  _focus={{ borderColor: 'white', bg: 'whiteAlpha.300' }}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel color="white">Dimensions</FormLabel>
                <Input
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="ex: 75cm x 75cm"
                  bg="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  borderColor="whiteAlpha.400"
                  _hover={{ borderColor: 'whiteAlpha.500' }}
                  _focus={{ borderColor: 'white', bg: 'whiteAlpha.300' }}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel color="white">Technique</FormLabel>
                <Input
                  name="technique"
                  value={formData.technique}
                  onChange={handleInputChange}
                  placeholder="Huile sur toile"
                  bg="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  borderColor="whiteAlpha.400"
                  _hover={{ borderColor: 'whiteAlpha.500' }}
                  _focus={{ borderColor: 'white', bg: 'whiteAlpha.300' }}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel color="white">Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description détaillée de l'œuvre"
                  bg="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  borderColor="whiteAlpha.400"
                  _hover={{ borderColor: 'whiteAlpha.500' }}
                  _focus={{ borderColor: 'white', bg: 'whiteAlpha.300' }}
                  minH="150px"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel color="white">Catégorie</FormLabel>
                <Select
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleInputChange}
                  placeholder="Sélectionnez une catégorie"
                  bg="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  borderColor="whiteAlpha.400"
                  _hover={{ borderColor: 'whiteAlpha.500' }}
                  _focus={{ borderColor: 'white', bg: 'whiteAlpha.300' }}
                >
                  <option value="art_19e_siecle">Art du 19e Siècle</option>
                  <option value="art_africain_oceanien">Art Africain et Océanien</option>
                  <option value="art_americain">Art Américain</option>
                  <option value="art_ancien_antiquites">Art Ancien et Antiquités</option>
                  <option value="art_islamique_indien">Art Islamique et Indien</option>
                  <option value="art_japonais">Art Japonais</option>
                  <option value="art_latino_americain">Art Latino-Américain</option>
                  <option value="art_moderne_contemporain_asiatique">Art Moderne et Contemporain Asiatique</option>
                  <option value="art_moderne_contemporain_moyen_oriental">Art Moderne et Contemporain Moyen-Oriental</option>
                  <option value="art_moderne_britannique_irlandais">Art Moderne Britannique et Irlandais</option>
                  <option value="automobiles_vehicules">Automobiles et Véhicules</option>
                  <option value="ceramiques_chinoises">Céramiques Chinoises</option>
                  <option value="design">Design</option>
                  <option value="estampes_multiples">Estampes et Multiples</option>
                  <option value="instruments_musique">Instruments de Musique</option>
                  <option value="judaica">Judaïca</option>
                  <option value="livres_manuscrits">Livres et Manuscrits</option>
                  <option value="maroquinerie_accessoires">Maroquinerie et Accessoires</option>
                  <option value="mobilier_europeen">Mobilier Européen</option>
                  <option value="montres_horlogerie">Montres et Horlogerie</option>
                  <option value="objets_collection">Objets de Collection</option>
                  <option value="peintures_anciennes">Peintures Anciennes</option>
                  <option value="peintures_chinoises">Peintures Chinoises</option>
                  <option value="photographies">Photographies</option>
                  <option value="sculptures_europeennes">Sculptures Européennes</option>
                  <option value="sciences_histoire_naturelle">Sciences et Histoire Naturelle</option>
                  <option value="sport_memorabilia">Sport et Memorabilia</option>
                  <option value="tapis_tapisseries">Tapis et Tapisseries</option>
                  <option value="vins_spiritueux">Vins et Spiritueux</option>
                </Select>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel color="white">Estimation minimum (€)</FormLabel>
                <Input
                  name="estimation_min"
                  value={formData.estimation_min}
                  onChange={handleInputChange}
                  placeholder="Prix minimum estimé"
                  type="number"
                  bg="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  borderColor="whiteAlpha.400"
                  _hover={{ borderColor: 'whiteAlpha.500' }}
                  _focus={{ borderColor: 'white', bg: 'whiteAlpha.300' }}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel color="white">Estimation maximum (€)</FormLabel>
                <Input
                  name="estimation_max"
                  value={formData.estimation_max}
                  onChange={handleInputChange}
                  placeholder="Prix maximum estimé"
                  type="number"
                  bg="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  borderColor="whiteAlpha.400"
                  _hover={{ borderColor: 'whiteAlpha.500' }}
                  _focus={{ borderColor: 'white', bg: 'whiteAlpha.300' }}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel color="white">Photos</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoCapture}
                  ref={fileInputRef}
                  display="none"
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  isDisabled={photos.length >= 10}
                >
                  Ajouter une photo
                </Button>
                {photos.length >= 10 && (
                  <Text color="red.500" fontSize="sm" mt={2}>
                    Nombre maximum de photos atteint (10)
                  </Text>
                )}
              </FormControl>

              {photos.length > 0 && (
                <Flex wrap="wrap" gap={4}>
                  {photos.map((photo, index) => (
                    <Box key={index} position="relative">
                      <Image
                        src={photo.preview}
                        alt={`Photo ${index + 1}`}
                        boxSize="150px"
                        style={{ objectFit: 'cover' }}
                        cursor="pointer"
                        onClick={() => showPhotoPreview(photo.preview)}
                      />
                      <IconButton
                        aria-label="Supprimer la photo"
                        icon={<CloseIcon />}
                        size="sm"
                        position="absolute"
                        top={1}
                        right={1}
                        onClick={() => removePhoto(index)}
                      />
                      {index > 0 && (
                        <IconButton
                          aria-label="Déplacer vers la gauche"
                          icon={<ChevronLeftIcon />}
                          size="sm"
                          position="absolute"
                          bottom={1}
                          left={1}
                          onClick={() => movePhoto(index, index - 1)}
                        />
                      )}
                      {index < photos.length - 1 && (
                        <IconButton
                          aria-label="Déplacer vers la droite"
                          icon={<ChevronRightIcon />}
                          size="sm"
                          position="absolute"
                          bottom={1}
                          right={1}
                          onClick={() => movePhoto(index, index + 1)}
                        />
                      )}
                    </Box>
                  ))}
                </Flex>
              )}

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                isLoading={loading}
                loadingText="Ajout en cours..."
              >
                Ajouter l'objet
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            {selectedPhoto && (
              <Image
                src={selectedPhoto}
                alt="Aperçu"
                width="100%"
                height="auto"
                style={{ objectFit: 'contain' }}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}