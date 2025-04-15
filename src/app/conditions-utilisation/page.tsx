'use client'

import { Box, Container, Heading, Text, VStack, UnorderedList, ListItem } from '@chakra-ui/react'

export default function ConditionsUtilisation() {
  return (
    <Container maxW="container.lg" py={12}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          Conditions Générales d'Utilisation
        </Heading>

        <Box>
          <Text mb={4}>
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </Text>
          <Text mb={4}>
            Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique
            des modalités de mise à disposition du site et des services par UStock et de définir les conditions
            d'accès et d'utilisation des services par l'Utilisateur.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            1. Accès au site
          </Heading>
          <Text mb={4}>
            Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet.
            Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique,
            logiciels, connexion Internet, etc.) sont à sa charge.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            2. Services fournis
          </Heading>
          <Text mb={4}>
            UStock fournit un service de gestion d'inventaire pour les maisons de vente aux enchères.
            L'Utilisateur dispose de la faculté de publier et gérer son inventaire d'objets selon les
            conditions définies dans les présentes Conditions Générales d'Utilisation.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            3. Responsabilités
          </Heading>
          <Text mb={2}>L'Utilisateur est responsable :</Text>
          <UnorderedList mb={4} spacing={2}>
            <ListItem>De maintenir la confidentialité de son compte</ListItem>
            <ListItem>De l'exactitude des informations fournies</ListItem>
            <ListItem>De l'utilisation qu'il fait du service</ListItem>
            <ListItem>Du respect des droits de propriété intellectuelle</ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            4. Propriété intellectuelle
          </Heading>
          <Text mb={4}>
            Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l'objet
            d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            5. Données personnelles
          </Heading>
          <Text mb={4}>
            Les informations demandées à l'inscription au site sont nécessaires et obligatoires pour la création
            du compte de l'Utilisateur. Pour plus d'informations sur le traitement de vos données personnelles,
            veuillez consulter notre Politique de Confidentialité.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            6. Liens hypertextes
          </Heading>
          <Text mb={4}>
            Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet.
            Les liens vers ces autres ressources vous font quitter le site. Ces liens ne constituent en aucun
            cas une approbation ou validation de ces sites et de leur contenu par UStock.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            7. Évolution du contrat
          </Heading>
          <Text mb={4}>
            Le site se réserve le droit de modifier les clauses de ces CGU à tout moment. L'Utilisateur
            est invité à consulter régulièrement cette page pour prendre connaissance des modifications éventuelles.
          </Text>
        </Box>
      </VStack>
    </Container>
  )
} 