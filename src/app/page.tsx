import { supabase } from "@/lib/supabase"

export default async function Home() {
  const { data, error } = await supabase.from("objets").select("*")

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Objets en stock</h1>
      {error && <p className="text-red-500">Erreur : {error.message}</p>}
      <ul>
        {data?.map((objet) => (
          <li key={objet.id}>
            {objet.titre} – {objet.artiste}
          </li>
        ))}
      </ul>
    </main>
  )
}
''