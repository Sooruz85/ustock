-- Création de la table objets si elle n'existe pas
CREATE TABLE IF NOT EXISTS objets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titre VARCHAR NOT NULL,
  description TEXT,
  artiste VARCHAR,
  dimensions VARCHAR,
  technique VARCHAR,
  date_creation VARCHAR,
  estimation_min INTEGER,
  estimation_max INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  categorie VARCHAR
);

-- Activer RLS
ALTER TABLE objets ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture publique
CREATE POLICY "Permettre la lecture publique des objets" ON objets
  FOR SELECT
  USING (true);

-- Créer une politique pour permettre l'insertion par les utilisateurs authentifiés
CREATE POLICY "Permettre l'insertion par les utilisateurs authentifiés" ON objets
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Créer une politique pour permettre la mise à jour par le créateur
CREATE POLICY "Permettre la mise à jour par le créateur" ON objets
  FOR UPDATE
  USING (auth.uid() = created_by);

-- Créer une politique pour permettre la suppression par le créateur
CREATE POLICY "Permettre la suppression par le créateur" ON objets
  FOR DELETE
  USING (auth.uid() = created_by);

-- Créer un trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_objets_updated_at
  BEFORE UPDATE ON objets
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column(); 