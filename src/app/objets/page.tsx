import { supabase } from "@/lib/supabase"

export default async function ListeObjets() {
  const { data: objets, error } = await supabase.from("objets").select("*").order("created_at", { ascending: false })

  if (error) return <p className="text-red-500">Erreur : {error.message}</p>

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Objets enregistrés</h1>

      {objets.length === 0 ? (
        <p>Aucun objet pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {objets.map((o) => (
            <div key={o.id} className="border rounded-lg shadow-sm p-4 bg-white">
              {o.photo_url && (
                <img
                  src={o.photo_url}
                  alt={o.titre}
                  className="w-full h-48 object-cover mb-3 rounded-md"
                />
              )}
              <h2 className="text-lg font-semibold">{o.titre}</h2>
              <p className="text-sm text-gray-600">{o.artiste} ({o.annee})</p>
              {o.prix && <p className="text-sm mt-2">💶 {o.prix} €</p>}
              {o.dimensions && <p className="text-sm">{o.dimensions}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
