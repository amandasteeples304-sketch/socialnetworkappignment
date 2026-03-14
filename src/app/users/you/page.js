import { getUser } from "@/utils/getUser";
import { db } from "@/utils/connect";
import Link from "next/link";

export default async function UserPage() {
  const currentUser = await getUser();

  const animals = (
    await db.query(
      `
        SELECT * FROM animals
        WHERE clerk_id = $1
        ORDER BY created_at DESC`,
      [currentUser.clerk_id],
    )
  ).rows;

  return (
    <div>
      <h1>Hello there, {currentUser.username}!</h1>
      <p> bio: {currentUser.bio || "No bio yet!"}</p>
      <div>
        <h2>Your posts:</h2>
        {animals.length === 0 ? (
          <p>You haven&apos;t posted any animals</p>
        ) : (
          <ul>
            {animals.map((animal) => (
              <li key={animal.id}>
                <Link href={`/animals/${animal.id}`}>
                  {animal.animal_name} ({animal.species})
                </Link>
                <p>{animal.caption}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
