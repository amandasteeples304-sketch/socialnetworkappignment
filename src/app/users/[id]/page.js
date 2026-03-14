import { db } from "@/utils/connect";
import { notFound } from "next/navigation";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import LikeButton from "@/components/LikeButton";

export default async function PublicProfilePage({ params }) {
  const { id } = await params;
  const userResult = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
    id,
  ]);

  const profile = userResult.rows[0];

  if (!profile) {
    notFound();
  }

  const animals = (
    await db.query(
      `SELECT  
        animals.*,
        COUNT(animal_likes.id) AS like_count
      FROM animals
      LEFT JOIN animal_likes ON animals.id = animal_likes.post_id
      WHERE animals.clerk_id = $1 
      GROUP BY animals.id
      ORDER BY created_at DESC`,
      [id],
    )
  ).rows;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-6 mb-10">
        <UserAvatar
          src={profile.image}
          fallbackText={profile.username}
          size="lg"
        />
        <div>
          <h1 className="text-3xl font-bold">@{profile.username}'s Profile</h1>
          <p className="mt-2 text-gray-600">
            Bio: {profile.bio || "A mysterious person"}
          </p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Animals posted</h2>
      {animals.length === 0 ? (
        <p className="opacity-50">This user hasn't posted any animals yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="border rounded-xl overflow-hidden bg-white shadow-sm"
            >
              {animal.image_url && (
                <Link href={`/animals/${animal.id}`}>
                  <img
                    src={animal.image_url}
                    alt={animal.animal_name}
                    className="w-full h-48 object-cover hover:opacity-90 transition"
                  />
                </Link>
              )}
              <div className="p-4">
                <Link
                  href={`/animals/${animal.id}`}
                  className="font-bold text-lg hover:underline"
                >
                  {animal.animal_name}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <LikeButton />
                  <span className="text-sm font-semibold">
                    {animal.like_count}
                  </span>
                </div>
                <p className="text-sm opacity-60">{animal.species}</p>
                <p className="mt-2 text-sm italic">"{animal.caption}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
