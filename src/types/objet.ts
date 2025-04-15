export interface Objet {
  id: string;
  titre: string;
  description?: string;
  artiste?: string;
  categorie: string;
  technique?: string;
  dimensions?: string;
  date_creation?: string;
  images?: {
    url: string;
    alt?: string;
    order?: number;
  }[];
  estimation_min?: number;
  estimation_max?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
} 