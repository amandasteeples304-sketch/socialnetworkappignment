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
      <input
        name="query"
        placeholder="Search animals or users"
        className="flex-1 border p-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Search
      </button>
    </form>
  );
}
