import { db } from "@/utils/connect";
import { getUser } from "@/utils/getUser";
import { redirect } from "next/navigation";

export default async function NewAnimalPage() {
  const user = await getUser();
  async function handleAddAnimal(formData) {
    "use server";
    const { animal_name, species, caption, image_url } =
      Object.fromEntries(formData);
    const clerk_id = user[0].clerk_id;
    const result = await db.query(
      `INSERT INTO animals (clerk_id, animal_name, species, caption, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [clerk_id, animal_name, species, caption, image_url],
    );
    redirect(`/animals/${result.rows[0].id}`);
  }

  return (
    <div>
      <h1>Add a new animal!</h1>
      <form action={handleAddAnimal}>
        <input name="animal_name" placeholder="Animal name if applicable" />
        <input name="species" placeholder="Animal species" required />
        <textarea name="caption" placeholder="A penny for your thoughts" />
        <input name="image_url" placeholder="Animal image URL" required />
        <button type="submit">Add Animal</button>
      </form>
    </div>
  );
}
