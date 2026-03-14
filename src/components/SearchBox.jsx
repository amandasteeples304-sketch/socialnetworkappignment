"use client";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query");

    if (query) {
      router.push(`/?search=${encodeURIComponent(query)}`);
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <input name="query" placeholder="Search animals or users" />
      <button type="submit">Search</button>
    </form>
  );
}
