"use server";
import { db } from "@/utils/connect";
import { getUser } from "@/utils/getUser";
import { revalidatePath } from "next/cache";

export async function handleLike(postId) {
  const user = await getUser();
  const activeUser = Array.isArray(user) ? user[0] : user;
  const clerkId = activeUser?.clerk_id;

  if (!clerkId) return;

  await db.query(
    `INSERT INTO animal_likes (post_id, clerk_id)
        VALUES ($1, $2)
        ON CONFLICT (post_id, clerk_id) DO NOTHING`,
    [postId, clerkId],
  );
  revalidatePath(`/animals/${postId}`);
  revalidatePath("/");
}
