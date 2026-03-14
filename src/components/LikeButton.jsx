"use client";
import * as Toggle from "@radix-ui/react-toggle";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { handleLike } from "@/app/actions";

export default function LikeButton({ postId }) {
  return (
    <Toggle.Root
      aria-label="Like animal"
      className="group"
      onPressedChange={() => handleLike(postId)}
    >
      <div className="flex items-center gap-2 mt-4 cursor-pointer hover:opacity-80">
        <HeartIcon className="w-6 h-6 group-data-[state=on]:hidden text-gray-500" />
        <HeartFilledIcon className="w-6 h-6 hidden group-data-[state=on]:block text-red-500" />
        <span className="text-sm font-medium group-data-[state=on]:text-red-500">
          Like
        </span>
      </div>
    </Toggle.Root>
  );
}
