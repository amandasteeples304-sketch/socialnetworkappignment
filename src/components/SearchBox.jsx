"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";

export default function SearchBox() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const [recentSearches, setRecentSearches] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    if (query) {
      setRecentSearches((prev) =>
        [query, ...prev.filter((i) => i !== query)].slice(0, 5),
      );
      setOpen(false);
      router.push(`/?search=${encodeURIComponent(query)}`);
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSearch} className="flex gap-2 relative">
        <Popover.Anchor asChild>
          <input
            name="query"
            autoComplete="off"
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            placeholder="Search animals or users"
            className="flex-1 border p-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />
        </Popover.Anchor>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Search
        </button>
        <Popover.Portal>
          <Popover.Content
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="z-50 w-(--radix-popover-trigger-width) bg-white border rounded-lg shadow-xl p-4 mt-2"
          >
            {query.length === 0 && recentSearches.length > 0 && (
              <>
                <p className="text-xs text-gray-500 mb-2">Recent Searches</p>
                <div className="flex flex-col gap-2">
                  {recentSearches.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setQuery(item);
                        setOpen(false);
                        router.push(`/?search=${item}`);
                      }}
                      className="text-left hover:bg-gray-100 p-1 rounded"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </>
            )}
            {query.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-500 mb-2">Searching for...</p>
                <button type="button" className="text-left font-medium">
                  "{query}"
                </button>
              </div>
            )}
            {query.length === 0 && recentSearches.length === 0 && (
              <p className="text-sm text-gray-400">Try Searching for "Dog"</p>
            )}
          </Popover.Content>
        </Popover.Portal>
      </form>
    </Popover.Root>
  );
}
