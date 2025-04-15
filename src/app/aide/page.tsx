'use client'

import { Box, Container, Heading, Text, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'

export default function Aide() {
  return (
    <Container maxW="container.lg" py={12}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          Centre d'aide
        </Heading>

        <Text fontSize="lg" mb={8}>
          Retrouvez ici toutes les informations pour utiliser au mieux UStock.
        </Text>

        <Box>
          <Heading as="h2" size="lg" mb={6}>
            Questions fréquentes
          </Heading>
          <Accordion allowMultiple>
            <AccordionItem>
              <h3>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    Comment ajouter un nouvel objet ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                Pour ajouter un nouvel objet, cliquez sur le bouton "Ajouter un objet" dans votre inventaire.
                Remplissez ensuite les informations requises : titre, description, catégorie, photos, etc.
                N'oubliez pas de bien décrire l'état de l'objet et d'ajouter des photos de qualité.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h3>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    Comment gérer mes catégories ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                Les catégories vous permettent d'organiser votre inventaire. Vous pouvez créer, modifier
                et supprimer des catégories selon vos besoins. Chaque objet peut être assigné à une
                catégorie pour faciliter la recherche et le tri.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h3>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    Comment partager un objet sur les plateformes de vente ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                UStock vous permet de partager facilement vos objets sur différentes plateformes de vente.
                Depuis la page de détail d'un objet, cliquez sur le bouton de partage et sélectionnez
                la plateforme de votre choix. Le système formatera automatiquement l'annonce selon
                les critères de la plateforme sélectionnée.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h3>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    Comment gérer les photos de mes objets ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                Vous pouvez ajouter jusqu'à 10 photos par objet. Les photos peuvent être réorganisées
                par glisser-déposer. La première photo sera utilisée comme image principale dans votre
                inventaire. Veillez à utiliser des photos bien éclairées et nettes pour mettre en valeur
                vos objets.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={6}>
            Guides d'utilisation
          </Heading>
          <VStack spacing={4} align="stretch">
            <Box p={6} borderWidth="1px" borderRadius="lg">
              <Heading as="h3" size="md" mb={4}>
                Guide du débutant
              </Heading>
              <Text>
                Découvrez les fonctionnalités essentielles d'UStock : ajout d'objets, gestion des
                catégories, partage sur les plateformes de vente, et plus encore.
              </Text>
            </Box>

            <Box p={6} borderWidth="1px" borderRadius="lg">
              <Heading as="h3" size="md" mb={4}>
                Optimiser vos annonces
              </Heading>
              <Text>
                Apprenez à créer des descriptions efficaces, à prendre de belles photos et à
                choisir les meilleures plateformes pour vendre vos objets.
              </Text>
            </Box>

            <Box p={6} borderWidth="1px" borderRadius="lg">
              <Heading as="h3" size="md" mb={4}>
                Gestion avancée de l'inventaire
              </Heading>
              <Text>
                Découvrez les fonctionnalités avancées : filtres personnalisés, exports de données,
                statistiques de vente, et plus encore.
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
} 