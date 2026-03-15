import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/utils/connect";
import SubmitButton from "@/components/SubmitButton";

export default function OnboardingPage() {
  async function handleSubmitNewUser(formData) {
    "use server";
    const { full_name, username, bio, image } = Object.fromEntries(formData);
    const { userId } = await auth();
    const finalImage = image === "" ? null : image;
    await db.query(
      `INSERT INTO users (full_name, username, bio, image, clerk_id) values ($1, $2, $3, $4, $5)`,
      [full_name, username, bio, finalImage, userId],
    );
    redirect(`/users/${userId}`);
  }
  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-2xl shadow-xl bg-white">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Welcome to Animal Travels!
      </h2>
      <p className="text-gray-600 text-center mb-6">
        A place where you can share your images of animals, and appreciate other
        peoples!
      </p>
      <form action={handleSubmitNewUser} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Full Name</label>
          <input
            name="full_name"
            className="border p-2 rounded-lg"
            placeholder="Full Name"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Username</label>
          <input
            name="username"
            className="border p-2 rounded-lg"
            placeholder="Username"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Bio</label>
          <textarea
            className="border p-2 rounded-lg"
            name="bio"
            placeholder="A fun fact about you"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Profile Picture</label>
          <input
            className="border p-2 rounded-lg"
            name="image"
            placeholder="https://"
          />
        </div>
        <SubmitButton pendingText="Creating Profile">Save Profile</SubmitButton>
      </form>
    </div>
  );
}
