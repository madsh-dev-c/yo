"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthShowcase() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center gap-4">
      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()} className="btn">Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn()} className="btn">Sign in</button>
      )}
    </div>
  );
}
