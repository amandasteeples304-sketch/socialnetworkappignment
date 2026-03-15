import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import LikeButton from "@/components/LikeButton";

export default function AnimalCard({ animal }) {
  return (
    <div className="border rounded-xl bg-white shadow-sm overflow-hidden mb-6">
      <div className="p-4 flex items-center gap-3">
        <UserAvatar src={animal.image} fallbackText={animal.username} />
        Posted by:{""}
        <Link href={`/users/${animal.clerk_id}`} className="font-bold">
          @{animal.username}
        </Link>
      </div>
      {animal.image_url && (
        <Link href={`/animals/${animal.id}`}>
          <img
            src={animal.image_url}
            alt={animal.animal_name}
            className="w-full h-auto"
          />
        </Link>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <LikeButton postId={animal.id} />
          <span className="text-sm font-semibold">{animal.like_count}</span>
        </div>
        <p className="mt-2">
          <span className="font-bold mr-2">{animal.animal_name}</span>
          {animal.caption}
        </p>
        <Link
          href={`/animals/${animal.id}`}
          className="text-sm opacity-50 block mt-2"
        >
          View full post and comments
        </Link>
      </div>
    </div>
  );
}
