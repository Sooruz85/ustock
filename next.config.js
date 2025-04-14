/** @type {import('next').NextConfig} */
const nextConfig = {
  // Activation du mode strict pour React
  reactStrictMode: true,
  // Configuration pour Chakra UI
  transpilePackages: ['@chakra-ui/react', '@chakra-ui/next-js'],
  // Configuration du serveur de développement
  webpack: (config, { dev, isServer }) => {
    // Optimisations pour le développement
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
  // Configurations supplémentaires
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig 