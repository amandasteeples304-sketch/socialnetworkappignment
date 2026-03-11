import { getUser } from "@/utils/getUser";

export default async function UserPage() {
  const user = await getUser();
  console.log(user[0]);

  return (
    <div>
      <p> This is the user page </p>
      <p>{user[0].username}</p>
      <p>bio:</p>
      <p>{user[0].bio}</p>
    </div>
  );
}
