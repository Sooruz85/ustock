'use client'

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Badge,
  Image,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'

// Fonction de formatage des nombres cohérente
const formatNumber = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Données d'exemple - Ventes terminées
const ventesExemples = [
  {
    id: 1,
    titre: "Vase Art Nouveau en verre de Murano",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c",
    categorie: "Art Ancien et Antiquités",
    prixVente: 2800,
    prixEstime: 2500,
    dateListing: "2024-02-15",
    dateVente: "2024-03-01",
    plateforme: "SELENCY",
    performance: "+12%",
  },
  {
    id: 2,
    titre: "Table basse scandinave années 60",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d",
    categorie: "Design",
    prixVente: 1200,
    prixEstime: 1500,
    dateListing: "2024-02-20",
    dateVente: "2024-03-05",
    plateforme: "LEBONCOIN",
    performance: "-20%",
  },
  {
    id: 3,
    titre: "Sculpture en bronze Art Déco",
    image: "https://images.unsplash.com/photo-1581281863883-2469417a1668",
    categorie: "Art Moderne",
    prixVente: 3500,
    prixEstime: 3000,
    dateListing: "2024-02-25",
    dateVente: "2024-03-10",
    plateforme: "EBAY",
    performance: "+17%",
  },
  {
    id: 4,
    titre: "Commode Louis XV marquetée",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    categorie: "Art Ancien et Antiquités",
    prixVente: 4800,
    prixEstime: 5000,
    dateListing: "2024-03-01",
    dateVente: "2024-03-15",
    plateforme: "SELENCY",
    performance: "-4%",
  },
]

// Données d'exemple - Ventes en cours
const ventesEnCours = [
  {
    id: 5,
    titre: "Miroir vénitien XIXe siècle",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    categorie: "Art Ancien et Antiquités",
    prixDemande: 3200,
    prixEstime: 3000,
    dateListing: "2024-03-10",
    plateforme: "SELENCY",
    vues: 156,
    messages: 4,
    status: "En négociation",
  },
  {
    id: 6,
    titre: "Lampadaire italien années 70",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15",
    categorie: "Design",
    prixDemande: 850,
    prixEstime: 900,
    dateListing: "2024-03-15",
    plateforme: "LEBONCOIN",
    vues: 89,
    messages: 2,
    status: "En ligne",
  },
]

export default function SuiviVentes() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  const getPerformanceColor = (performance: string) => {
    return performance.startsWith('+') ? 'green.500' : 'red.500'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Calcul des statistiques
  const totalVentes = ventesExemples.reduce((sum, vente) => sum + vente.prixVente, 0)
  const nombreVentes = ventesExemples.length
  
  const performanceMoyenne = ventesExemples.reduce((sum, vente) => {
    const performance = parseFloat(vente.performance)
    return sum + performance
  }, 0) / nombreVentes

  const delaiMoyen = ventesExemples.reduce((sum, vente) => {
    const listing = new Date(vente.dateListing)
    const vente_date = new Date(vente.dateVente)
    return sum + (vente_date.getTime() - listing.getTime()) / (1000 * 60 * 60 * 24)
  }, 0) / nombreVentes

  const plateformes = ventesExemples.reduce((acc, vente) => {
    acc[vente.plateforme] = (acc[vente.plateforme] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const meilleurePlateforme = Object.entries(plateformes).reduce((a, b) => 
    a[1] > b[1] ? a : b
  )[0]

  return (
    <Box bg="gray.50" minH="100vh" py={16}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* En-tête avec statistiques */}
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
            <Box bg={bgColor} p={6} borderRadius="lg" shadow="sm">
              <Stat>
                <StatLabel>Ventes totales</StatLabel>
                <StatNumber>{formatNumber(totalVentes)} €</StatNumber>
                <StatHelpText>{nombreVentes} objets vendus</StatHelpText>
              </Stat>
            </Box>
            <Box bg={bgColor} p={6} borderRadius="lg" shadow="sm">
              <Stat>
                <StatLabel>Performance moyenne</StatLabel>
                <StatNumber color={performanceMoyenne > 0 ? "green.500" : "red.500"}>
                  {performanceMoyenne > 0 ? '+' : ''}{performanceMoyenne.toFixed(2)}%
                </StatNumber>
                <StatHelpText>vs estimation</StatHelpText>
              </Stat>
            </Box>
            <Box bg={bgColor} p={6} borderRadius="lg" shadow="sm">
              <Stat>
                <StatLabel>Délai moyen de vente</StatLabel>
                <StatNumber>{Math.round(delaiMoyen)} jours</StatNumber>
                <StatHelpText>après mise en ligne</StatHelpText>
              </Stat>
            </Box>
            <Box bg={bgColor} p={6} borderRadius="lg" shadow="sm">
              <Stat>
                <StatLabel>Meilleure plateforme</StatLabel>
                <StatNumber>{meilleurePlateforme}</StatNumber>
                <StatHelpText>{Math.round((plateformes[meilleurePlateforme] / nombreVentes) * 100)}% des ventes</StatHelpText>
              </Stat>
            </Box>
          </SimpleGrid>

          {/* Onglets Ventes en cours / Historique */}
          <Tabs variant="enclosed" colorScheme="purple">
            <TabList>
              <Tab fontWeight="medium">Ventes en cours ({ventesEnCours.length})</Tab>
              <Tab fontWeight="medium">Historique ({ventesExemples.length})</Tab>
            </TabList>

            <TabPanels>
              {/* Ventes en cours */}
              <TabPanel px={0}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {ventesEnCours.map((vente) => (
                    <Box
                      key={vente.id}
                      bg={bgColor}
                      borderRadius="lg"
                      overflow="hidden"
                      shadow="sm"
                      transition="all 0.2s"
                      _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                    >
                      <Box position="relative" h="250px">
                        <Image
                          src={vente.image}
                          alt={vente.titre}
                          objectFit="cover"
                          w="100%"
                          h="100%"
                        />
                        <Badge
                          position="absolute"
                          top={4}
                          right={4}
                          colorScheme={vente.status === "En négociation" ? "orange" : "blue"}
                          fontSize="md"
                          px={3}
                          py={1}
                        >
                          {vente.status}
                        </Badge>
                      </Box>
                      
                      <VStack p={6} align="stretch" spacing={4}>
                        <Box>
                          <Text fontSize="xl" fontWeight="semibold" mb={2}>
                            {vente.titre}
                          </Text>
                          <Badge colorScheme="blue">
                            {vente.categorie}
                          </Badge>
                        </Box>

                        <SimpleGrid columns={2} spacing={4}>
                          <Box>
                            <Text color={textColor} fontSize="sm">Prix demandé</Text>
                            <Text fontSize="lg" fontWeight="bold">
                              {formatNumber(vente.prixDemande)} €
                            </Text>
                          </Box>
                          <Box>
                            <Text color={textColor} fontSize="sm">Estimation</Text>
                            <Text fontSize="lg">
                              {formatNumber(vente.prixEstime)} €
                            </Text>
                          </Box>
                        </SimpleGrid>

                        <HStack justify="space-between">
                          <Box>
                            <Text color={textColor} fontSize="sm">Plateforme</Text>
                            <Text fontWeight="medium">{vente.plateforme}</Text>
                          </Box>
                          <Box textAlign="right">
                            <Text color={textColor} fontSize="sm">Mis en ligne le</Text>
                            <Text>{formatDate(vente.dateListing)}</Text>
                          </Box>
                        </HStack>

                        <HStack spacing={4}>
                          <Badge colorScheme="gray" variant="subtle">
                            {vente.vues} vues
                          </Badge>
                          <Badge colorScheme="gray" variant="subtle">
                            {vente.messages} messages
                          </Badge>
                        </HStack>
                      </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </TabPanel>

              {/* Historique des ventes */}
              <TabPanel px={0}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {ventesExemples.map((vente) => (
                    <Box
                      key={vente.id}
                      bg={bgColor}
                      borderRadius="lg"
                      overflow="hidden"
                      shadow="sm"
                      transition="all 0.2s"
                      _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                    >
                      <Box position="relative" h="250px">
                        <Image
                          src={vente.image}
                          alt={vente.titre}
                          objectFit="cover"
                          w="100%"
                          h="100%"
                        />
                        <Badge
                          position="absolute"
                          top={4}
                          right={4}
                          colorScheme={vente.performance.startsWith('+') ? 'green' : 'red'}
                          fontSize="md"
                          px={3}
                          py={1}
                        >
                          {vente.performance}
                        </Badge>
                      </Box>
                      
                      <VStack p={6} align="stretch" spacing={4}>
                        <Box>
                          <Text fontSize="xl" fontWeight="semibold" mb={2}>
                            {vente.titre}
                          </Text>
                          <Badge colorScheme="blue">
                            {vente.categorie}
                          </Badge>
                        </Box>

                        <SimpleGrid columns={2} spacing={4}>
                          <Box>
                            <Text color={textColor} fontSize="sm">Prix de vente</Text>
                            <Text fontSize="lg" fontWeight="bold">
                              {formatNumber(vente.prixVente)} €
                            </Text>
                          </Box>
                          <Box>
                            <Text color={textColor} fontSize="sm">Estimation</Text>
                            <Text fontSize="lg">
                              {formatNumber(vente.prixEstime)} €
                            </Text>
                          </Box>
                        </SimpleGrid>

                        <HStack justify="space-between">
                          <Box>
                            <Text color={textColor} fontSize="sm">Vendu sur</Text>
                            <Text fontWeight="medium">{vente.plateforme}</Text>
                          </Box>
                          <Box textAlign="right">
                            <Text color={textColor} fontSize="sm">Date de vente</Text>
                            <Text>{formatDate(vente.dateVente)}</Text>
                          </Box>
                        </HStack>
                      </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  )
} 