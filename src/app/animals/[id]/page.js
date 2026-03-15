import { db } from "@/utils/connect";
import { getUser } from "@/utils/getUser";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import LikeButton from "@/components/LikeButton";
import UserAvatar from "@/components/UserAvatar";
import CommentSection from "@/components/CommentSection";

export default async function animalCommentPage({ params }) {
  const { id } = await params;

  const animalData = await db.query(
    `SELECT 
      animals.*, 
      users.username, 
      users.image, 
        (SELECT COUNT(*) FROM animal_likes WHERE post_id = animals.id) AS like_count
      FROM animals
      JOIN users ON animals.clerk_id = users.clerk_id
      WHERE animals.id = $1`,
    [id],
  );

  const animal = animalData.rows[0];

  if (!animal) {
    notFound();
  }

  const comments = (
    await db.query(
      `
        SELECT animal_comments.*, users.username, users.image
        FROM animal_comments
        JOIN users 
        ON animal_comments.clerk_id = users.clerk_id
        WHERE post_id = $1
        ORDER BY created_at DESC`,
      [id],
    )
  ).rows;

  async function handleSubmitAnimalComment(formData) {
    "use server";
    const { content } = Object.fromEntries(formData);
    const user = await getUser();

    if (!user) {
      console.log("No user found - are you logged in?");
      return;
    }

    const activeUser = Array.isArray(user) ? user[0] : user;
    const clerkId = activeUser?.clerk_id;

    if (!clerkId) {
      console.error("Could not find clerk_id for this user");
      return;
    }

    await db.query(
      `insert into animal_comments (clerk_id, post_id, comment_text) VALUES ($1, $2, $3)`,
      [clerkId, id, content],
    );

    revalidatePath(`/animals/${id}`);
    redirect(`/animals/${id}`);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex gap-8 mb-10">
        {animal.image_url && (
          <img
            src={animal.image_url}
            alt={animal.species}
            className="w-48 aspect-[2/3] object-cover rounded shrink-0"
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {animal.animal_name || "Name unknown"}
          </h1>
          <p className="opacity-60 mt-1">Species: {animal.species}</p>
          <p className="mt-4 italic"> "{animal.caption}"</p>
          <div className="flex items-center gap-2 mt-4">
            <LikeButton postId={animal.id} />
            <span className="font-semibold text-lg">{animal.like_count}</span>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <UserAvatar src={animal.image} fallbackText={animal.username} />
            <p className="text-sm opacity-50">
              Posted by:{""}
              <Link
                href={`/users/${animal.clerk_id}`}
                className="hover:underline"
              >
                @{animal.username}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <CommentSection
        animal={animal}
        comments={comments}
        handleAction={handleSubmitAnimalComment}
      />
    </div>
  );
}
