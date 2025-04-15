'use client'

import { Box, Container, Heading, Text, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import NavBar from '@/components/NavBar'

export default function Home() {
  const bgOverlay = useColorModeValue('rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)')
  const bgGreen = useColorModeValue('#2D5A27', '#1A4021')
  const bgAccent = useColorModeValue('#B7791F', '#975A16')
  const bgPurple = useColorModeValue('#553C9A', '#44337A')

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      <NavBar />
      
      {/* Image de fond */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
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
          minWidth="100%"
          minHeight="100%"
          width="auto"
          height="auto"
          objectFit="cover"
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(1px)"
          _after={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: "rgba(0, 0, 0, 0.3)",
          }}
        />
      </Box>

      {/* Contenu principal */}
      <Container maxW="container.xl" minH="100vh" py={{ base: 20, md: 24 }}>
        {/* Logo et titre */}
        <Box textAlign="center" color="white" mb={16} pt={8}>
          <Heading
            as="h1"
            fontSize={{ base: "5xl", md: "7xl" }}
            fontFamily="serif"
            letterSpacing="wide"
            mb={4}
          >
            USTOCK
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
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
          mt={16}
          px={{ base: 4, md: 8 }}
        >
          {/* Section Mon Inventaire */}
          <Link href="/inventaire" passHref>
            <Box
              bg="white"
              p={8}
              borderRadius="xl"
              h="100%"
              minH="250px"
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
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="8px"
                bg={bgGreen}
                borderTopRadius="xl"
                transition="height 0.3s"
                _groupHover={{ height: "12px" }}
              />
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontFamily="serif"
                color="gray.800"
                mb={4}
              >
                MON INVENTAIRE
              </Heading>
              <Box
                w="40%"
                h="2px"
                bg="gray.300"
                my={4}
                transition="width 0.3s"
                _groupHover={{ width: "60%", bg: bgGreen }}
              />
              <Text
                fontSize="lg"
                color="gray.600"
                maxW="80%"
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
              p={8}
              borderRadius="xl"
              h="100%"
              minH="250px"
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
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="8px"
                bg={bgAccent}
                borderTopRadius="xl"
                transition="height 0.3s"
                _groupHover={{ height: "12px" }}
              />
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontFamily="serif"
                color="gray.800"
                mb={4}
              >
                AJOUTER UN OBJET
              </Heading>
              <Box
                w="40%"
                h="2px"
                bg="gray.300"
                my={4}
                transition="width 0.3s"
                _groupHover={{ width: "60%", bg: bgAccent }}
              />
              <Text
                fontSize="lg"
                color="gray.600"
                maxW="80%"
                transition="color 0.3s"
                _groupHover={{ color: "gray.800" }}
              >
                Ajoutez un nouvel objet à votre collection
              </Text>
            </Box>
          </Link>

          {/* Section Mes Ventes */}
          <Link href="/ventes" passHref>
            <Box
              bg="white"
              p={8}
              borderRadius="xl"
              h="100%"
              minH="250px"
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
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="8px"
                bg={bgPurple}
                borderTopRadius="xl"
                transition="height 0.3s"
                _groupHover={{ height: "12px" }}
              />
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontFamily="serif"
                color="gray.800"
                mb={4}
              >
                SUIVI DES VENTES
              </Heading>
              <Box
                w="40%"
                h="2px"
                bg="gray.300"
                my={4}
                transition="width 0.3s"
                _groupHover={{ width: "60%", bg: bgPurple }}
              />
              <Text
                fontSize="lg"
                color="gray.600"
                maxW="80%"
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