"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>So embarrassing, something's not quite right here...</h2>
      <button onClick={() => reset()}>Try again?</button>
      <Link href="/">There's no place like home</Link>
    </div>
  );
}
