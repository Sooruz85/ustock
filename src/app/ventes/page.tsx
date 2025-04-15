'use client'

import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export default function SuiviVentes() {
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
          alt="Sales tracking background"
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
          <Heading
            as="h1"
            size="lg"
            color="white"
            fontFamily="serif"
          >
            Suivi des Ventes
          </Heading>
          
          <Box
            p={6}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="xl"
            boxShadow="xl"
          >
            <Text fontSize="lg">
              Le suivi des ventes sera bientôt disponible.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
} 