import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
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
          <NavBar />
          <main className="max-w-7xl mx-auto px-6 py-10">
            {children}
          </main>
          <footer className="border-t text-center text-sm text-gray-500 py-6">
            &copy; {new Date().getFullYear()} Ustock. Tous droits réservés.
          </footer>
        </ChakraProvider>
      </body>
    </html>
  );
}
