import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2> 404 - Page not found</h2>
      <p>This is so embarassing</p>
      <Link href="/">There's no place like home</Link>
    </div>
  );
}
