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
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { CloseIcon } from '@chakra-ui/icons'

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

  const showPhotoPreview = (preview: string) => {
    setSelectedPhoto(preview)
    onOpen()
  }

  const uploadPhotos = async (): Promise<string[]> => {
    if (photos.length === 0) return []
    
    try {
      const uploadPromises = photos.map(async ({ file }, index) => {
        try {
          const fileExt = file.name.split('.').pop()
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
          
          console.log(`Uploading file ${index + 1}/${photos.length}: ${fileName}`)
          
          const { data, error: uploadError } = await supabase.storage
            .from('photos')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: false
            })
          
          if (uploadError) {
            console.error(`Error uploading ${fileName}:`, uploadError)
            throw new Error(`Erreur lors de l'upload de ${file.name}: ${uploadError.message}`)
          }
          
          console.log(`Successfully uploaded ${fileName}`)
          
          const { data: { publicUrl } } = supabase.storage
            .from('photos')
            .getPublicUrl(fileName)
            
          return publicUrl
        } catch (error) {
          console.error(`Error in upload promise for file ${index + 1}:`, error)
          throw error
        }
      })

      const urls = await Promise.all(uploadPromises)
      console.log('URLs des photos uploadées:', urls)
      return urls
    } catch (error) {
      console.error('Detailed upload error:', error)
      throw new Error(error instanceof Error ? error.message : 'Erreur lors du téléchargement des photos')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation du titre
    if (!formData.titre.trim()) {
      toast({
        title: 'Erreur de validation',
        description: 'Le titre est requis',
        status: 'error',
        duration: 5000,
      })
      return
    }

    setLoading(true)

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
        return
      }

      let photoUrls: string[] = []
      try {
        photoUrls = await uploadPhotos()
      } catch (uploadError) {
        console.error('Erreur upload photos:', uploadError)
        toast({
          title: 'Erreur lors du téléchargement des photos',
          description: uploadError instanceof Error ? uploadError.message : 'Une erreur est survenue lors du téléchargement des photos',
          status: 'error',
          duration: 5000,
        })
        return
      }
      
      const objetData = {
        titre: formData.titre.trim(),
        description: formData.description.trim() || null,
        artiste: formData.artiste.trim() || null,
        dimensions: formData.dimensions.trim() || null,
        technique: formData.technique.trim() || null,
        date_creation: formData.date_creation || null,
        estimation_min: formData.estimation_min ? Number(formData.estimation_min) : null,
        estimation_max: formData.estimation_max ? Number(formData.estimation_max) : null,
        categorie: formData.categorie || null,
        image_url: photoUrls.length > 0 ? photoUrls[0] : null,
        created_by: session.user.id
      }

      console.log('Données à insérer:', objetData)

      const { error: insertError } = await supabase
        .from('objets')
        .insert(objetData)

      if (insertError) {
        console.error('Erreur insertion:', insertError)
        throw new Error(`Erreur lors de l'insertion: ${insertError.message}`)
      }

      toast({
        title: 'Succès',
        description: 'Objet ajouté avec succès',
        status: 'success',
        duration: 5000,
      })

      router.push('/')
    } catch (error: any) {
      console.error('Erreur complète:', error)
      toast({
        title: 'Erreur lors de l\'ajout',
        description: error instanceof Error ? error.message : 'Une erreur inattendue est survenue',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">Ajouter un nouvel objet</Heading>
        
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Titre</FormLabel>
              <Input
                name="titre"
                value={formData.titre}
                onChange={handleInputChange}
                placeholder="Titre de l'œuvre"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Artiste</FormLabel>
              <Input
                name="artiste"
                value={formData.artiste}
                onChange={handleInputChange}
                placeholder="Nom de l'artiste"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Date de création</FormLabel>
              <Input
                name="date_creation"
                value={formData.date_creation}
                onChange={handleInputChange}
                type="number"
                placeholder="Année de création"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Dimensions</FormLabel>
              <Input
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                placeholder="ex: 90cm x 75cm"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Technique</FormLabel>
              <Input
                name="technique"
                value={formData.technique}
                onChange={handleInputChange}
                placeholder="ex: Huile sur toile"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description détaillée de l'œuvre"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Catégorie</FormLabel>
              <Select
                name="categorie"
                value={formData.categorie}
                onChange={handleInputChange}
                placeholder="Sélectionnez une catégorie"
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

            <FormControl>
              <FormLabel>Estimation minimum (€)</FormLabel>
              <Input
                name="estimation_min"
                value={formData.estimation_min}
                onChange={handleInputChange}
                type="number"
                placeholder="Prix minimum estimé"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Estimation maximum (€)</FormLabel>
              <Input
                name="estimation_max"
                value={formData.estimation_max}
                onChange={handleInputChange}
                type="number"
                placeholder="Prix maximum estimé"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Photos</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoCapture}
                ref={fileInputRef}
                display="none"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                Ajouter une photo
              </Button>
            </FormControl>

            {photos.length > 0 && (
              <Flex wrap="wrap" gap={4}>
                {photos.map((photo, index) => (
                  <Box key={index} position="relative">
                    <Image
                      src={photo.preview}
                      alt={`Photo ${index + 1}`}
                      boxSize="150px"
                      objectFit="cover"
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
                  </Box>
                ))}
              </Flex>
            )}

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              loadingText="Enregistrement..."
              size="lg"
            >
              Enregistrer
            </Button>
          </VStack>
        </Box>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            {selectedPhoto && (
              <Image src={selectedPhoto} alt="Preview" w="100%" />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}
