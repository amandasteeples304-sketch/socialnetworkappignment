"use client";
import { useAuth, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavBar() {
  const { isLoaded, userId } = useAuth();
  if (!isLoaded) return <nav className="p-4">Loading</nav>;
  return (
    <nav className="p-4 flex justify-between items-center bg-white shadow-sm">
      <div>
        {!userId ? (
          <div className="flex gap-4">
            <SignInButton mode="modal" />
            <SignUpButton mode="modal" />
          </div>
        ) : (
          <div className="flex gap-6 items-center">
            <Link href="/" className="font-bold">
              Home is where the animals are
            </Link>
            <Link href={`/new-post`} className="hover:underline">
              New Post
            </Link>
            <Link href={`/users/${userId}`} className="hover:underline">
              My Profile
            </Link>
            <UserButton />
          </div>
        )}
      </div>
    </nav>
  );
}
