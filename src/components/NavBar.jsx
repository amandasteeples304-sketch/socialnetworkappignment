"use client";
import { useAuth, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavBar() {
  const { isLoaded, userId } = useAuth();
  if (!isLoaded) return <nav>Loading</nav>;
  return (
    <nav>
      <div>
        {!userId ? (
          <>
            <SignInButton mode="modal" />
            <SignUpButton mode="modal" />
          </>
        ) : (
          <>
            <Link href="/">Home is where the animals are</Link>
            <Link href="/users/you">My Profile</Link>
            <UserButton />
          </>
        )}
      </div>
    </nav>
  );
}
