"use client";
import * as Toggle from "@radix-ui/react-toggle";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { handleLike } from "@/app/actions";

export default function LikeButton({ postId }) {
  return (
    <Toggle.Root
      aria-label="Like animal"
      className=" p-2 hover:bg-red-50 rounded-full transition-colors group"
      onPressedChange={() => handleLike(postId)}
    >
      <HeartIcon className="w-6 h-6 group-data-[state=on]:hidden text-gray-500" />
      <HeartFilledIcon className="w-6 h-6 hidden group-data-[state=on]:block text-red-500" />
    </Toggle.Root>
  );
}
