"use client";
import * as Avatar from "@radix-ui/react-avatar";

export default function UserAvatar({ src, fallbackText }) {
  return (
    <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-10 h-10 rounded-full bg-gray-200">
      <Avatar.Image
        className="w-full h-full object-cover rounded-[inherit]"
        src={src}
        alt={fallbackText}
      />
      <Avatar.Fallback
        className="w-full h-full flex items-center justify-center bg-white text-sm font-medium"
        delayMs={600}
      >
        {fallbackText?.substring(0, 2).toUpperCase()}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
