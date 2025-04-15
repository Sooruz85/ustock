export interface Objet {
  id: string
  titre: string
  description?: string
  artiste?: string
  categorie: string | null
  technique?: string
  dimensions?: string
  date_creation?: string
  estimation_min?: number
  estimation_max?: number
  images?: {
    url: string
    alt?: string
    order?: number
  }[]
  created_at?: string
  updated_at?: string
  user_id?: string
}

export interface Categorie {
  id: number
  nom: string
  description: string
}

export interface Statistiques {
  id: number
  objet_id: number
  type: string
  valeur: number
  date: string
}

export interface Category {
  value: string
  label: string
  image?: string
  color?: string
}

export type Platform = 'VINTED' | 'SELENCY' | 'LEBONCOIN' | 'GENSDECONFIANCE' | 'EBAY' 