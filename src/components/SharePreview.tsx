'use client'

import React from 'react';
import {
  Box,
  VStack,
  Text,
  Badge,
  Button,
  useToast,
  Heading,
  HStack,
  Icon,
  FormControl,
  FormLabel,
  FormHelperText,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
  Image,
  Flex,
  CloseButton,
} from '@chakra-ui/react';
import { Objet } from '@/types/database.types';
import type { Platform } from '@/types/database.types';
import ImagePreview from './ImagePreview';
import { formatPrice } from '@/utils/format';
import { VintedIcon, SelencyIcon, LeboncoinIcon, GensDeConfianceIcon, EbayIcon } from './Icons';
import { useState } from 'react';
import { templates } from '@/services/shareTemplates';

interface SharePreviewProps {
  objet: Objet;
  platforms: Platform[];
  selectedPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
  onShare: () => void;
  onClose: () => void;
}

const platformColors: Record<Platform, string> = {
  VINTED: 'teal',
  SELENCY: 'blue',
  LEBONCOIN: 'orange',
  GENSDECONFIANCE: 'purple',
  EBAY: 'red',
};

const platformLabels: Record<Platform, string> = {
  VINTED: 'Vinted',
  SELENCY: 'Selency',
  LEBONCOIN: 'Leboncoin',
  GENSDECONFIANCE: 'Gens de Confiance',
  EBAY: 'eBay',
};

const platformIcons: Record<Platform, React.ComponentType<any>> = {
  VINTED: VintedIcon,
  SELENCY: SelencyIcon,
  LEBONCOIN: LeboncoinIcon,
  GENSDECONFIANCE: GensDeConfianceIcon,
  EBAY: EbayIcon,
};

export function SharePreview({
  objet,
  platforms,
  selectedPlatform,
  onPlatformChange,
  onShare,
  onClose,
}: SharePreviewProps) {
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleShare = () => {
    if (!objet.titre || !objet.description || !objet.images?.length) {
      toast({
        title: "Impossible de partager",
        description: "Veuillez remplir tous les champs requis et ajouter au moins une image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    onShare();
  };

  const template = templates[selectedPlatform];
  if (!template) {
    console.error(`Template not found for platform: ${selectedPlatform}`);
    return null;
  }

  const formattedData = {
    title: template.formatTitle(objet),
    description: template.formatDescription(objet),
    price: template.formatPrice(objet),
    categories: template.formatCategories(objet.categorie || ''),
  };

  return (
    <Box
      bg={bgColor}
      borderRadius="xl"
      overflow="hidden"
      position="relative"
    >
      <Flex justify="space-between" align="center" p={4} borderBottom="1px" borderColor={borderColor}>
        <Heading size="md" fontFamily="serif">
          Partager sur{' '}
          <Text as="span" color={`${platformColors[selectedPlatform]}.500`}>
            {platformLabels[selectedPlatform]}
          </Text>
        </Heading>
        <CloseButton onClick={onClose} />
      </Flex>

      <Flex p={4}>
        <VStack spacing={4} minW="200px" borderRight="1px" borderColor={borderColor} pr={4}>
          {platforms.map((platform) => {
            const PlatformIcon = platformIcons[platform];
            return (
              <Button
                key={platform}
                onClick={() => onPlatformChange(platform)}
                colorScheme={platformColors[platform]}
                variant={platform === selectedPlatform ? 'solid' : 'outline'}
                width="full"
                justifyContent="flex-start"
                leftIcon={
                  <PlatformIcon 
                    boxSize="20px"
                    color={platform === selectedPlatform ? 'white' : `${platformColors[platform]}.500`}
                  />
                }
              >
                {platformLabels[platform]}
              </Button>
            );
          })}
        </VStack>

        <Box flex={1} pl={4}>
          <VStack align="stretch" spacing={4}>
            <Box>
              <Text fontWeight="bold" mb={1}>Titre</Text>
              <Text>{formattedData.title}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={1}>Description</Text>
              <Text whiteSpace="pre-wrap">{formattedData.description}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={1}>Prix</Text>
              <Text>{formattedData.price}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={1}>Catégories</Text>
              <HStack spacing={2}>
                {formattedData.categories.map((cat: string, index: number) => (
                  <Badge key={index} colorScheme={platformColors[selectedPlatform]}>
                    {cat}
                  </Badge>
                ))}
              </HStack>
            </Box>

            {objet.images && objet.images.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={1}>Photos</Text>
                <Flex wrap="wrap" gap={2}>
                  {objet.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image.url}
                      alt={image.alt || `Photo ${index + 1}`}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  ))}
                </Flex>
              </Box>
            )}
          </VStack>
        </Box>
      </Flex>

      <Box p={4} borderTop="1px" borderColor={borderColor}>
        <Button
          colorScheme={platformColors[selectedPlatform]}
          size="lg"
          width="full"
          onClick={handleShare}
        >
          Partager sur {platformLabels[selectedPlatform]}
        </Button>
      </Box>
    </Box>
  );
}
