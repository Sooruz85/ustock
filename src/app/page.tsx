'use client'

import { Box, Container, Heading, Text, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import TextPressure from '@/components/TextPressure'

export default function Home() {
  const bgGreen = useColorModeValue('#2D5A27', '#1A4021')
  const bgAccent = useColorModeValue('#B7791F', '#975A16')
  const bgPurple = useColorModeValue('#553C9A', '#44337A')

  return (
    <Box position="relative" h="calc(100vh - 64px)" overflow="hidden">
      {/* Image de fond */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
        h="100%"
        overflow="hidden"
      >
        <Box
          as="img"
          src="/images/home-background.jpg"
          alt="Brocante background"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="100%"
          h="100%"
          objectFit="cover"
          opacity={0.8}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(2px)"
          _after={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: "rgba(0, 0, 0, 0.4)",
          }}
        />
      </Box>

      {/* Contenu principal */}
      <Container 
        h="100%" 
        maxW="container.xl" 
        py={8}
        display="flex" 
        flexDirection="column"
        justifyContent="center"
        gap={12}
      >
        {/* Logo et titre */}
        <Box textAlign="center" color="white">
          <Box mb={4} className="text-pressure-title" sx={{ 'h1, span': { color: 'white !important' } }}>
            <TextPressure />
          </Box>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            fontFamily="serif"
            letterSpacing="wider"
            textTransform="uppercase"
          >
            Inventaire • Collection • Estimation
          </Text>
        </Box>

        {/* Grille principale */}
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={8}
          px={{ base: 4, md: 8 }}
        >
          {/* Section Mon Inventaire */}
          <Link href="/inventaire" passHref>
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              position="relative"
              transition="all 0.3s"
              _hover={{
                transform: 'scale(1.02)',
                boxShadow: '2xl',
                bg: 'gray.50'
              }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              cursor="pointer"
              boxShadow="xl"
              role="group"
              h={{ base: "180px", md: "200px" }}
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="6px"
                bg={bgGreen}
                borderTopRadius="xl"
                transition="height 0.3s"
                _groupHover={{ height: "8px" }}
              />
              <Heading
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
                fontFamily="serif"
                color="gray.800"
                mb={2}
              >
                MON INVENTAIRE
              </Heading>
              <Box
                w="40%"
                h="2px"
                bg="gray.300"
                my={2}
                transition="width 0.3s"
                _groupHover={{ width: "60%", bg: bgGreen }}
              />
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.600"
                maxW="90%"
                transition="color 0.3s"
                _groupHover={{ color: "gray.800" }}
              >
                Consultez et gérez votre collection d'objets
              </Text>
            </Box>
          </Link>

          {/* Section Ajouter un Objet */}
          <Link href="/objets/nouveau" passHref>
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              position="relative"
              transition="all 0.3s"
              _hover={{
                transform: 'scale(1.02)',
                boxShadow: '2xl',
                bg: 'gray.50'
              }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              cursor="pointer"
              boxShadow="xl"
              role="group"
              h={{ base: "180px", md: "200px" }}
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="6px"
                bg={bgAccent}
                borderTopRadius="xl"
                transition="height 0.3s"
                _groupHover={{ height: "8px" }}
              />
              <Heading
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
                fontFamily="serif"
                color="gray.800"
                mb={2}
              >
                AJOUTER UN OBJET
              </Heading>
              <Box
                w="40%"
                h="2px"
                bg="gray.300"
                my={2}
                transition="width 0.3s"
                _groupHover={{ width: "60%", bg: bgAccent }}
              />
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.600"
                maxW="90%"
                transition="color 0.3s"
                _groupHover={{ color: "gray.800" }}
              >
                Ajoutez un nouvel objet à votre collection
              </Text>
            </Box>
          </Link>

          {/* Section Mes Ventes */}
          <Link href="/suivi-ventes" passHref>
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              position="relative"
              transition="all 0.3s"
              _hover={{
                transform: 'scale(1.02)',
                boxShadow: '2xl',
                bg: 'gray.50'
              }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              cursor="pointer"
              boxShadow="xl"
              role="group"
              h={{ base: "180px", md: "200px" }}
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="6px"
                bg={bgPurple}
                borderTopRadius="xl"
                transition="height 0.3s"
                _groupHover={{ height: "8px" }}
              />
              <Heading
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
                fontFamily="serif"
                color="gray.800"
                mb={2}
              >
                SUIVI DES VENTES
              </Heading>
              <Box
                w="40%"
                h="2px"
                bg="gray.300"
                my={2}
                transition="width 0.3s"
                _groupHover={{ width: "60%", bg: bgPurple }}
              />
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.600"
                maxW="90%"
                transition="color 0.3s"
                _groupHover={{ color: "gray.800" }}
              >
                Suivez vos annonces et l'historique de vos ventes
              </Text>
            </Box>
          </Link>
        </SimpleGrid>
      </Container>
    </Box>
  )
}