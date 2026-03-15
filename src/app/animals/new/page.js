import { db } from "@/utils/connect";
import { getUser } from "@/utils/getUser";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";

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
      <form action={handleAddAnimal} className="flex flex-col gap-4 max-w-md">
        <input
          name="animal_name"
          placeholder="Animal name if applicable"
          className="border p-2 rounded"
        />
        <input
          name="species"
          placeholder="Animal species (required)"
          required
          className="border p-2 rounded"
        />
        <textarea
          name="caption"
          placeholder="A penny for your thoughts"
          className="border p-2 rounded h-24"
        />
        <input
          name="image_url"
          placeholder="Animal image URL"
          className="border p-2 rounded"
        />
        <SubmitButton pendingText="Adding Animal">Add Animal</SubmitButton>
      </form>
    </div>
  );
}
