export interface Objet {
  id: string
  titre: string
  description: string | null
  artiste: string | null
  dimensions: string | null
  technique: string | null
  date_creation: string | null
  estimation_min: number | null
  estimation_max: number | null
  image_url: string | null
  created_at: string
  updated_at: string
  created_by: string | null
  categorie: string | null
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