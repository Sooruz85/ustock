import { supabase } from "@/lib/supabase"
import Link from "next/link"

type Props = {
  params: { id: string }
}

export default async function FicheObjet({ params }: Props) {
  const { data: objet, error } = await supabase.from("objets").select("*").eq("id", params.id).single()

  if (error || !objet) return <p className="text-red-500">Objet introuvable.</p>

  const { titre, artiste, annee, dimensions, materiau, etat, prix, lieu, photo_url } = objet

  const annonce = `Titre : ${titre} – ${artiste}, ${annee}

Description :
${titre}, œuvre de ${artiste}, réalisée en ${annee}.
Technique : ${materiau}, Dimensions : ${dimensions}.
État : ${etat}.
Visible à ${lieu}.

Prix : ${prix} €`

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/objets" className="text-blue-600 underline">← Retour à la liste</Link>

      <h1 className="text-2xl font-bold mt-4 mb-2">{titre}</h1>
      <p className="text-gray-600 mb-4">{artiste} – {annee}</p>

      {photo_url && (
        <img src={photo_url} alt={titre} className="w-full h-64 object-cover rounded-md mb-4" />
      )}

      <p><strong>Dimensions :</strong> {dimensions}</p>
      <p><strong>Matériau :</strong> {materiau}</p>
      <p><strong>État :</strong> {etat}</p>
      <p><strong>Lieu :</strong> {lieu}</p>
      <p><strong>Prix :</strong> {prix} €</p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Annonce générée :</h2>
      <textarea
        readOnly
        value={annonce}
        className="w-full border rounded p-3 bg-gray-50 text-sm font-mono"
        rows={7}
      />
    </div>
  )
}
