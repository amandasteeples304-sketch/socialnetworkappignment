import Link from "next/link";
export default function NotFound() {
  return (
    <div>
      <h2>Not found</h2>
      <p>Could not find that animal</p>
      <div>
        <Link href="/">Return to the homepage</Link>
      </div>
      <div>
        <Link href="/animals">Back to the animals</Link>
      </div>
      <div>
        <Link href="/users/you">Back to your profile</Link>
      </div>
    </div>
  );
}
