import { db } from "@/utils/connect";
import { getUser } from "@/utils/getUser";
import Link from "next/link";

export default async function AnimalsPage() {
  const user = await getUser();
  const animals = (
    await db.query(`SELECT * FROM animals ORDER BY created_at DESC `)
  ).rows;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">All Animals</h1>
        <Link
          href="/animals/new"
          className="hover:opacity-60 transition-opacity"
        >
          +Add a new animal
        </Link>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {animals.map((animal) => (
          <li key={animal.id}>
            <Link href={`/animals/${animal.id}`} className="group">
              {animal.imgage_url ? (
                <img
                  src={animal.image_url}
                  alt={animal.species}
                  className="w-full aspect-[2/3] object-cover rounded group-hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="2-full aspect-[2/3] bg-gray-200 rounded flex items-center justify-center text-gray-500 group-hover:opacity-80 transition-opacity">
                  No image
                </div>
              )}
              <h2 className="m2 text-sm font-medium">
                {animal.animal_name || "Wild animal"}
              </h2>
              <p className="text-sm opacity-60">{animal.species}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
