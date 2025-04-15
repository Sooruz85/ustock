'use client'

import { Box, Container, Heading, Text, VStack, UnorderedList, ListItem } from '@chakra-ui/react'

export default function PolitiqueConfidentialite() {
  return (
    <Container maxW="container.lg" py={12}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          Politique de Confidentialité
        </Heading>

        <Box>
          <Text mb={4}>
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </Text>
          <Text mb={4}>
            La présente politique de confidentialité décrit la manière dont UStock collecte, utilise et protège
            vos données personnelles lorsque vous utilisez notre service.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            1. Données collectées
          </Heading>
          <Text mb={2}>Nous collectons les types de données suivants :</Text>
          <UnorderedList mb={4} spacing={2}>
            <ListItem>Informations d'identification (nom, prénom, email)</ListItem>
            <ListItem>Données de connexion et d'utilisation du service</ListItem>
            <ListItem>Informations sur les objets que vous gérez</ListItem>
            <ListItem>Données techniques (adresse IP, type de navigateur)</ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            2. Utilisation des données
          </Heading>
          <Text mb={2}>Vos données sont utilisées pour :</Text>
          <UnorderedList mb={4} spacing={2}>
            <ListItem>Gérer votre compte et vous fournir nos services</ListItem>
            <ListItem>Améliorer et personnaliser votre expérience</ListItem>
            <ListItem>Vous communiquer des informations importantes</ListItem>
            <ListItem>Assurer la sécurité de nos services</ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            3. Protection des données
          </Heading>
          <Text mb={4}>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout
            accès, modification, divulgation ou destruction non autorisés.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            4. Vos droits
          </Heading>
          <Text mb={2}>Conformément au RGPD, vous disposez des droits suivants :</Text>
          <UnorderedList mb={4} spacing={2}>
            <ListItem>Droit d'accès à vos données</ListItem>
            <ListItem>Droit de rectification</ListItem>
            <ListItem>Droit à l'effacement</ListItem>
            <ListItem>Droit à la limitation du traitement</ListItem>
            <ListItem>Droit à la portabilité des données</ListItem>
            <ListItem>Droit d'opposition</ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            5. Contact
          </Heading>
          <Text mb={4}>
            Pour toute question concernant cette politique ou pour exercer vos droits, contactez-nous à :
            <br />
            Email : privacy@ustock.fr
            <br />
            Adresse : [Adresse du DPO/Responsable RGPD]
          </Text>
        </Box>
      </VStack>
    </Container>
  )
} 