import { db } from "./connect";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getUser() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const userDetails = (
    await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId])
  ).rows;
  if (userDetails.length === 0) redirect("/users/onboarding");
  return userDetails[0];
}
