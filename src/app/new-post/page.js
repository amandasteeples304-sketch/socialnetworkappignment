import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/utils/connect";
import { getUser } from "@/utils/getUser";
import SubmitButton from "@/components/SubmitButton";

export default async function NewPostPage() {
  async function handleSubmit(formData) {
    "use server";
    const user = await getUser();
    const clerk_id = user.clerk_id;
    const { animal_name, species, caption, image_url } =
      Object.fromEntries(formData);
    await db.query(
      "INSERT INTO animals (clerk_id,  animal_name, species, caption, image_url) VALUES ($1, $2, $3, $4, $5)",
      [clerk_id, animal_name, species, caption, image_url],
    );
    revalidatePath("/");
    redirect("/");
  }
  return (
    <>
      <h2> Create New Post</h2>
      <form action={handleSubmit}>
        <label htmlFor="animal">Animal Name:</label>
        <input id="animal" name="animal_name" placeholder="Animal name" />
        <label htmlFor="species">Species:</label>
        <input id="species" name="species" placeholder="Species" />
        <label htmlFor="caption">Your caption:</label>
        <textarea id="caption" name="caption" placeholder="Your Caption" />
        <label htmlFor="image">Image URL:</label>
        <input
          id="image_url"
          name="image_url"
          placeholder="Image Url"
          required
        />
        <SubmitButton />
      </form>
    </>
  );
}
