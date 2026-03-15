import { db } from "@/utils/connect";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import AnimalCard from "@/components/AnimalCard";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home({ searchParams }) {
  const { userId } = await auth();
  if (userId) {
    const userCheck = await db.query(
      `SELECT clerk_id FROM users WHERE clerk_id = $1`,
      [userId],
    );
    if (userCheck.rowCount === 0) {
      redirect("/users/onboarding");
    }
  }

  const { search } = await searchParams;
  let queryBase = `SELECT animals.*, users.username, users.image, 
  COUNT(animal_likes.id) AS like_count
  FROM animals
  JOIN users ON animals.clerk_id = users.clerk_id
  LEFT JOIN animal_likes ON animals.id = animal_likes.post_id`;

  let animalValues = [];
  let whereClause = "";

  if (search) {
    whereClause = ` WHERE animal_name ILIKE $1 OR species ILIKE $1`;
    animalValues.push(`%${search}%`);
  }

  const finalQuery = `
  ${queryBase}
  ${whereClause}
  GROUP BY animals.id, users.username, users.image`;

  const animals = (await db.query(finalQuery, animalValues)).rows;

  let userResults = [];
  if (search) {
    const userQuery = `SELECT clerk_id, username, image, bio FROM users WHERE username ILIKE $1 OR bio ILIKE $1`;
    userResults = (await db.query(userQuery, [`%${search}%`])).rows;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6"> Welcome to Animal Travels</h1>
      <SearchBox />
      <section className="space-y-8 mt-10">
        <h2 className="text-xl font-bold">Animals</h2>
        {animals.length === 0 ? (
          <p>No animals found matching that search.</p>
        ) : (
          <div className="grid gap-8">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </section>
      {search && (
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">Users</h2>
          {userResults.length === 0 ? (
            <p>No users found matching that search.</p>
          ) : (
            <div>
              {userResults.map((user) => (
                <div
                  key={user.clerk_id}
                  className="border rounded-xl p-4 bg-white shadow-sm flex items-center gap-4 mb-4"
                >
                  <UserAvatar src={user.image} fallbackText={user.username} />
                  <div className="flex-1">
                    <Link
                      href={`/users/${user.clerk_id}`}
                      className="font-bold hover:underline block text-lg"
                    >
                      @{user.username}
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {user.bio || "A mysterious person"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
