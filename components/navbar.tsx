"use client"

import Link from "next/link";
import SignOut from "./sign-out-btn";
import { authClient } from "@/lib/auth-client";

export default  function NavBar() {

  const { data: session, isPending } = authClient.useSession();


  return (
    <header className="flex items-center justify-between border-b border-black/10 pb-4">
      <Link href="/" className="text-sm font-semibold uppercase tracking-[0.35em]">
        AppNovia
      </Link>

      <div className="flex items-center gap-4 sm:gap-8">
        <Link href="/" className="text-sm text-black/70 transition hover:text-black">
          Home
        </Link>

        {isPending ? (

        <div className="h-8 w-20" />
          ) : session?.user ? (
          <>
            <h2 className="text-red-500">{session.user.name.charAt(0).toUpperCase()+session.user.name.slice(1)}</h2>
          <Link
            href="/dashboard"
            className="text-sm text-black/70 transition hover:text-black"
          >
            Dashboard
          </Link>

          <SignOut />
          </>
         ) : (

          <Link
            href="/sign-in"
            className="rounded-full border border-black/10 px-4 py-2 text-sm text-black transition hover:bg-black hover:text-white"
          >
            Sign In
          </Link>
        )}

      </div>
    </header>
  );
}