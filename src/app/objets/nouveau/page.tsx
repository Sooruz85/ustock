'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

// Déclaration propre de SpeechRecognition pour TypeScript
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export default function NouveauObjet() {
  const [form, setForm] = useState({
    titre: "",
    artiste: "",
    annee: "",
    dimensions: "",
    materiau: "",
    etat: "",
    prix: "",
    lieu: ""
  })

  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleDictation = (field: keyof typeof form) => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) return alert("Votre navigateur ne supporte pas la reconnaissance vocale.")
    const recognition = new Recognition()
    recognition.lang = "fr-FR"
    recognition.start()
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setForm((prev) => ({ ...prev, [field]: transcript }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let photo_url = null

    // Upload photo
    if (photoFile) {
      const fileName = `${Date.now()}-${photoFile.name}`
      const { data, error: uploadError } = await supabase.storage
        .from("photos")
        .upload(fileName, photoFile)

      if (uploadError) {
        alert("Erreur lors de l’upload de la photo")
        setLoading(false)
        return
      }

      photo_url = supabase.storage.from("photos").getPublicUrl(fileName).data.publicUrl
    }

    // Conversion des valeurs numériques
    const parsedAnnee = parseInt(form.annee)
    const parsedPrix = parseFloat(form.prix)

    const { error } = await supabase.from("objets").insert({
      ...form,
      annee: isNaN(parsedAnnee) ? null : parsedAnnee,
      prix: isNaN(parsedPrix) ? null : parsedPrix,
      photo_url
    })

    if (error) {
      alert("Erreur lors de l’ajout de l’objet")
      setLoading(false)
    } else {
      alert("Objet ajouté avec succès !")
      router.push("/objets")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Nouvel objet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["titre", "artiste"].map((field) => (
          <div key={field} className="flex gap-2 items-center">
            <input
              name={field}
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => handleDictation(field as keyof typeof form)}
              className="px-2 text-xl"
              title="Dicter"
            >
              🎤
            </button>
          </div>
        ))}
        <input name="annee" value={form.annee} onChange={handleChange} placeholder="Année" className="w-full border p-2 rounded" />
        <input name="dimensions" value={form.dimensions} onChange={handleChange} placeholder="Dimensions" className="w-full border p-2 rounded" />
        <input name="materiau" value={form.materiau} onChange={handleChange} placeholder="Matériau" className="w-full border p-2 rounded" />
        <input name="etat" value={form.etat} onChange={handleChange} placeholder="État" className="w-full border p-2 rounded" />
        <input name="prix" value={form.prix} onChange={handleChange} placeholder="Prix (€)" className="w-full border p-2 rounded" />
        <input name="lieu" value={form.lieu} onChange={handleChange} placeholder="Lieu" className="w-full border p-2 rounded" />
        <input type="file" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
        <button type="submit" disabled={loading} className="bg-black text-white px-4 py-2 rounded">
          {loading ? "Enregistrement..." : "Enregistrer l’objet"}
        </button>
      </form>
    </div>
  )
}
