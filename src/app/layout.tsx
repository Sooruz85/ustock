import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider, Box, Container, Stack, Text, HStack, Divider } from "@chakra-ui/react";
import Link from 'next/link';
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UStock - Gestion de Stock pour Maison de Vente aux Enchères",
  description: "Application de gestion de stock pour maison de vente aux enchères",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ChakraProvider>
          <Box minH="100vh" display="flex" flexDirection="column">
            <NavBar />
            <Box flex="1" pt="80px">
              <main>
                {children}
              </main>
            </Box>
            <Box as="footer" borderTop="1px" borderColor="gray.200" py={4}>
              <Container maxW="container.xl">
                <Stack spacing={4}>
                  <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: 3, md: 4 }}
                    justify="space-between"
                    align={{ base: 'flex-start', md: 'center' }}
                  >
                    <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
                      <Link href="/mentions-legales">
                        <Text fontSize="sm" color="gray.600" _hover={{ color: 'gray.900' }}>
                          Mentions légales
                        </Text>
                      </Link>
                      <Link href="/conditions-utilisation">
                        <Text fontSize="sm" color="gray.600" _hover={{ color: 'gray.900' }}>
                          CGU
                        </Text>
                      </Link>
                      <Link href="/politique-de-confidentialite">
                        <Text fontSize="sm" color="gray.600" _hover={{ color: 'gray.900' }}>
                          Politique de confidentialité
                        </Text>
                      </Link>
                    </Stack>
                    <HStack spacing={4}>
                      <Link href="mailto:contact@ustock.fr">
                        <Text fontSize="sm" color="gray.600" _hover={{ color: 'gray.900' }}>
                          Contact
                        </Text>
                      </Link>
                      <Link href="/aide">
                        <Text fontSize="sm" color="gray.600" _hover={{ color: 'gray.900' }}>
                          Aide
                        </Text>
                      </Link>
                    </HStack>
                  </Stack>
                  <Divider />
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    &copy; {new Date().getFullYear()} UStock. Tous droits réservés.
                  </Text>
                </Stack>
              </Container>
            </Box>
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
