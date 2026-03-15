"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  pendingText = "Submitting",
  children = "Submit",
  className = "mt-2 px-4 bg-black text-white rounded disabled:opacity-50",
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingText : children}
    </button>
  );
}
