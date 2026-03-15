import { db } from "@/utils/connect";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import EditProfile from "@/components/EditProfile";
import UserAvatar from "@/components/UserAvatar";
import AnimalCard from "@/components/AnimalCard";

export default async function UserProfilePage(props) {
  const params = await props.params;
  const id = params.id;
  const { userId } = await auth();
  if (!id) {
    notFound();
  }

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

  async function handleUpdateProfile(formData) {
    "use server";
    const { full_name, username, image, bio } = Object.fromEntries(formData);

    await db.query(
      `UPDATE users SET full_name = $1, username = $2, image = $3, bio = $4 WHERE clerk_id = $5`,
      [full_name, username, image, bio, id],
    );

    revalidatePath(`/users/${id}`);
  }
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-6 mb-10">
        <UserAvatar
          src={profile.image}
          fallbackText={profile.username}
          size="lg"
        />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">@{profile.username}</h1>
            {userId === id && (
              <EditProfile
                profile={profile}
                handleUpdateProfile={handleUpdateProfile}
              />
            )}
          </div>
          <p className="mt-2 text-gray-600 italic">
            {profile.bio || "A mysterious person"}
          </p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Animals posted:</h2>
      {animals.length === 0 ? (
        <p className="opacity-60 text-center py-10">No animals posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </div>
  );
}
