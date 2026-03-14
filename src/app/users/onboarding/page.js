import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/utils/connect";

export default function OnboardingPage() {
  async function handleSubmitNewUser(formData) {
    "use server";
    const { full_name, username, bio, image } = Object.fromEntries(formData);
    const { userId } = await auth();
    await db.query(
      `INSERT INTO users (full_name, username, bio, image, clerk_id) values ($1, $2, $3, $4, $5)`,
      [full_name, username, bio, image, userId],
    );
    redirect(`/users/${userId}`);
  }
  return (
    <div>
      <h2> Sign up to our website: please make a profile</h2>
      <form action={handleSubmitNewUser}>
        <input name="full_name" placeholder="Full Name" required />
        <input name="username" placeholder="Username" required />
        <input name="bio" placeholder="Bio" />
        <input name="image" placeholder="Profile Picture" required />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}
