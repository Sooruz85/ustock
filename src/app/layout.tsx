import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ustock",
  description: "Application de gestion de stock pour maison de vente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-100 border-b">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6 text-sm">
            <a href="/" className="text-gray-800 hover:text-black">Accueil</a>
            <a href="/objets" className="text-gray-800 hover:text-black">Objets</a>
            <a href="/objets/nouveau" className="text-gray-800 hover:text-black">Ajouter un objet</a>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
