'use client'

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

export default function MentionsLegales() {
  return (
    <Container maxW="container.lg" py={12}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          Mentions Légales
        </Heading>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            1. Éditeur du site
          </Heading>
          <Text mb={4}>
            Le site UStock est édité par [Nom de la société], société [forme juridique] au capital de [montant] euros,
            immatriculée au Registre du Commerce et des Sociétés de [ville] sous le numéro [numéro],
            dont le siège social est situé [adresse].
          </Text>
          <Text mb={4}>
            Directeur de la publication : [Nom du directeur]
            <br />
            Email : contact@ustock.fr
            <br />
            Téléphone : [numéro]
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            2. Hébergement
          </Heading>
          <Text mb={4}>
            Le site est hébergé par [Nom de l'hébergeur],
            [forme juridique] au capital de [montant] euros,
            dont le siège social est situé [adresse].
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            3. Propriété intellectuelle
          </Heading>
          <Text mb={4}>
            L'ensemble du contenu de ce site, incluant, de façon non limitative, les graphismes, images, textes,
            vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive
            de UStock à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires
            ou auteurs.
          </Text>
          <Text mb={4}>
            Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle,
            de ces différents éléments est strictement interdite sans l'accord exprès par écrit de UStock.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            4. Données personnelles
          </Heading>
          <Text mb={4}>
            Les informations recueillies sur ce site sont traitées conformément au Règlement Général sur la Protection
            des Données (RGPD) et à la loi Informatique et Libertés. Pour plus d'informations sur la gestion de vos
            données personnelles, veuillez consulter notre Politique de Confidentialité.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            5. Cookies
          </Heading>
          <Text mb={4}>
            Le site UStock peut être amené à vous demander l'acceptation des cookies pour des besoins de statistiques
            et d'affichage. Un cookie est une information déposée sur votre disque dur par le serveur du site que vous
            visitez. Pour plus d'informations sur l'utilisation des cookies, veuillez consulter notre Politique de Cookies.
          </Text>
        </Box>
      </VStack>
    </Container>
  )
} 