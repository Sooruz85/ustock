import { Objet } from '@/types/database.types'
import type { Platform } from '@/types/database.types'

interface ShareTemplate {
  formatTitle: (objet: Objet) => string
  formatDescription: (objet: Objet) => string
  formatPrice: (objet: Objet) => string
  formatCategories: (category: string) => string[]
}

type TemplateMap = {
  [K in Platform]: ShareTemplate
}

export const templates: TemplateMap = {
  VINTED: {
    formatTitle: (objet) => `${objet.titre} ${objet.artiste ? `- ${objet.artiste}` : ''}`.slice(0, 80),
    formatDescription: (objet) => [
      objet.description,
      `Dimensions : ${objet.dimensions}`,
      `Technique : ${objet.technique}`,
      objet.date_creation ? `Date de création : ${objet.date_creation}` : '',
    ].filter(Boolean).join('\n\n'),
    formatPrice: (objet) => `${objet.estimation_min}€`,
    formatCategories: (category) => [category.replace(/_/g, ' ').toLowerCase()]
  },
  SELENCY: {
    formatTitle: (objet) => objet.titre,
    formatDescription: (objet) => [
      objet.description,
      `Artiste : ${objet.artiste}`,
      `Dimensions : ${objet.dimensions}`,
      `Technique : ${objet.technique}`,
      `Date de création : ${objet.date_creation}`,
    ].filter(Boolean).join('\n\n'),
    formatPrice: (objet) => `${objet.estimation_min}€ - ${objet.estimation_max}€`,
    formatCategories: (category) => [category.replace(/_/g, ' ').toLowerCase()]
  },
  LEBONCOIN: {
    formatTitle: (objet) => `${objet.titre} - ${objet.artiste || 'Artiste inconnu'}`,
    formatDescription: (objet) => [
      objet.description,
      '',
      '📏 Caractéristiques :',
      `• Dimensions : ${objet.dimensions}`,
      `• Technique : ${objet.technique}`,
      `• Date de création : ${objet.date_creation}`,
    ].filter(Boolean).join('\n'),
    formatPrice: (objet) => `${objet.estimation_min}€`,
    formatCategories: (category) => [category.replace(/_/g, ' ').toLowerCase()]
  },
  GENSDECONFIANCE: {
    formatTitle: (objet) => `${objet.titre} - ${objet.artiste || 'Artiste inconnu'}`,
    formatDescription: (objet) => [
      objet.description,
      '',
      'Informations complémentaires :',
      `• Artiste : ${objet.artiste}`,
      `• Dimensions : ${objet.dimensions}`,
      `• Technique : ${objet.technique}`,
      `• Date de création : ${objet.date_creation}`,
    ].filter(Boolean).join('\n'),
    formatPrice: (objet) => `${objet.estimation_min}€`,
    formatCategories: (category) => [category.replace(/_/g, ' ').toLowerCase()]
  },
  EBAY: {
    formatTitle: (objet) => `${objet.titre} - ${objet.artiste || 'Unknown Artist'} - ${objet.dimensions || ''}`,
    formatDescription: (objet) => [
      objet.description,
      '',
      '📦 Item Details:',
      `• Artist: ${objet.artiste}`,
      `• Dimensions: ${objet.dimensions}`,
      `• Technique: ${objet.technique}`,
      `• Creation Date: ${objet.date_creation}`,
      '',
      '🌟 Condition: Used - Excellent',
      '📬 Shipping: Contact for shipping options',
    ].filter(Boolean).join('\n'),
    formatPrice: (objet) => `${objet.estimation_min}€`,
    formatCategories: (category) => [category.replace(/_/g, ' ').toLowerCase()]
  }
}

export function getShareTemplate(platform: string): ShareTemplate | null {
  return templates[platform] || null
}

export function formatForPlatform(platform: string, objet: Objet) {
  const template = getShareTemplate(platform)
  if (!template) return null
  
  return {
    title: template.formatTitle(objet),
    description: template.formatDescription(objet),
    price: template.formatPrice(objet),
    categories: template.formatCategories(objet.categorie || ''),
    maxTitleLength: 80,
    maxDescriptionLength: 2000,
    allowedImageCount: 15
  }
} 