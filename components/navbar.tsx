"use client";

import { useState } from "react";
import Link from "next/link";
import SignOut from "./sign-out-btn";
import { authClient } from "@/lib/auth-client";
import ThemeBar from "./theme-button";

export default function NavBar() {
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = session?.user;
  const role = (user as { role?: string })?.role;
  const initial = user?.name?.charAt(0).toUpperCase() ?? "?";
  console.log("NAV SESSION:", session);

  return (
    <div>
      <header
        className="
          relative flex items-center justify-between
          border-b border-black/10
          pb-4
          dark:border-white/10
        "
      >
        {/* LOGO */}
        <Link
          href="/"
          className="
            text-sm font-semibold uppercase tracking-[0.35em]
            text-black
            dark:text-white
          "
        >
          AppNovia
        </Link>
        {/* DESKTOP */}
        <nav className="hidden items-center gap-8 sm:flex">
          {/* HOME */}
          <Link
            href="/"
            className="
              block rounded-lg px-3 py-2 text-sm
              text-black
              transition
              hover:bg-black/5
              dark:text-white
              dark:hover:bg-white/10
            "
          >
            Home
          </Link>
          {/* THEME */}
          <ThemeBar />
          {/* LOGGED IN */}
          {!isPending && user && (
            <>
              {/* DASHBOARD */}
              {["ADMIN", "EDITOR"].includes(role ?? "") && (
                <Link
                  href="/dashboard"
                  className="
                    block rounded-lg px-3 py-2 text-sm
                    text-black
                    transition
                    hover:bg-black/5
                    dark:text-white
                    dark:hover:bg-white/10
                  "
                >
                  Dashboard
                </Link>
              )}
              {/* USERS */}
              {role === "ADMIN" && (
                <Link
                  href="/dashboard/userpage"
                  onClick={() => setDropdownOpen(false)}
                  className="
                    block rounded-lg px-3 py-2 text-sm
                    text-black
                    transition
                    hover:bg-black/5
                    dark:text-white
                    dark:hover:bg-white/10
                  "
                >
                  Users
                </Link>
              )}
              {/* POSTS */}
              <Link
                href="/posts"
                onClick={() => setMenuOpen(false)}
                className="
                  block rounded-lg px-3 py-2 text-sm
                  text-black
                  transition
                  hover:bg-black/5
                  dark:text-white
                  dark:hover:bg-white/10
                "
              >
                Posts
              </Link>
              {/* BOOKMARKS */}
              <Link
                href="/bookmark"
                onClick={() => setDropdownOpen(false)}
                className="
                  block rounded-lg px-3 py-2 text-sm
                  text-black
                  transition
                  hover:bg-black/5
                  dark:text-white
                  dark:hover:bg-white/10
                "
              >
                Bookmarks
              </Link>
              {/* PROFILE */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="
                        flex h-8 w-8 items-center justify-center
                        rounded-full
                        bg-red-100
                        text-sm text-red-500
                        dark:bg-red-500/10
                      "
                    >
                      {initial}
                    </div>
                  )}
                  <span className="text-sm text-black dark:text-white">
                    {user.name}
                  </span>
                </button>
                {/* PROFILE DROPDOWN */}
                {dropdownOpen && (
                  <div
                    className="
                      absolute right-0 top-10 z-50 w-48
                      rounded-xl
                      border border-black/10
                      bg-white
                      p-2
                      text-black
                      shadow-lg
                      dark:border-white/10
                      dark:bg-neutral-900
                      dark:text-white
                    "
                  >
                    <p className="px-3 py-2 text-sm font-medium text-red-500">
                      {role}
                    </p>
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="
                        block rounded-lg px-3 py-2 text-sm
                        transition
                        hover:bg-black/5
                        dark:hover:bg-white/10
                      "
                    >
                      Profile
                    </Link>
                    <div className="my-1 border-t border-black/10 dark:border-white/10" />
                    <SignOut />
                  </div>
                )}
              </div>
            </>
          )}
          {/* NOT LOGGED IN */}
          {!isPending && !user && (
            <Link
              href="/sign-in"
              className="
                rounded-full
                border border-black/10
                px-4 py-2
                text-sm
                text-black
                transition
                hover:bg-black
                hover:text-white
                dark:border-white/10
                dark:text-white
                dark:hover:bg-white
                dark:hover:text-black
              "
            >
              Sign In
            </Link>
          )}
        </nav>
        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-8 w-8 flex-col justify-center gap-1.5 sm:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`
              h-0.5 w-6
              bg-black
              transition
              dark:bg-white
              ${menuOpen ? "translate-y-2 rotate-45" : ""}
            `}
          />
          <span
            className={`
              h-0.5 w-6
              bg-black
              transition
              dark:bg-white
              ${menuOpen ? "opacity-0" : ""}
            `}
          />
          <span
            className={`
              h-0.5 w-6
              bg-black
              transition
              dark:bg-white
              ${menuOpen ? "-translate-y-2 -rotate-45" : ""}
            `}
          />
        </button>
        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            className="
              absolute right-0 top-full z-50 mt-2 w-56
              rounded-xl
              border border-black/10
              bg-white
              p-2
              text-black
              shadow-lg
              dark:border-white/10
              dark:bg-neutral-900
              dark:text-white
              sm:hidden
            "
          >
            {/* HOME */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="
                block rounded-lg px-3 py-2 text-sm
                transition
                hover:bg-black/5
                dark:hover:bg-white/10
              "
            >
              Home
            </Link>
            {/* THEME */}
            <div
              className="
                flex items-center justify-between
                rounded-lg px-3 py-2
              "
            >
              <span className="text-sm">
                Theme
              </span>
              <ThemeBar />
            </div>
            <div className="my-1 border-t border-black/10 dark:border-white/10" />
            {/* NOT LOGGED IN */}
            {!isPending && !user ? (
              <Link
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="
                  block rounded-lg
                  px-3 py-2
                  text-sm
                  transition
                  hover:bg-black
                  hover:text-white
                  dark:hover:bg-white
                  dark:hover:text-black
                "
              >
                Sign In
              </Link>
            ) : (
              <>
                {/* POSTS */}
                <Link
                  href="/posts"
                  onClick={() => setMenuOpen(false)}
                  className="
                    block rounded-lg px-3 py-2 text-sm
                    transition
                    hover:bg-black/5
                    dark:hover:bg-white/10
                  "
                >
                  Posts
                </Link>
                {/* DASHBOARD */}
                {(role === "ADMIN" || role === "EDITOR") && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="
                      block rounded-lg px-3 py-2 text-sm
                      transition
                      hover:bg-black/5
                      dark:hover:bg-white/10
                    "
                  >
                    Dashboard
                  </Link>
                )}
                {/* USERS */}
                {role === "ADMIN" && (
                  <Link
                    href="/dashboard/userpage"
                    onClick={() => setMenuOpen(false)}
                    className="
                      block rounded-lg px-3 py-2 text-sm
                      transition
                      hover:bg-black/5
                      dark:hover:bg-white/10
                    "
                  >
                    Users
                  </Link>
                )}
                {/* BOOKMARKS */}
                <Link
                  href="/bookmark"
                  onClick={() => setMenuOpen(false)}
                  className="
                    block rounded-lg px-3 py-2 text-sm
                    transition
                    hover:bg-black/5
                    dark:hover:bg-white/10
                  "
                >
                  Bookmarks
                </Link>
                {/* PROFILE */}
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="
                    block rounded-lg px-3 py-2 text-sm
                    transition
                    hover:bg-black/5
                    dark:hover:bg-white/10
                  "
                >
                  Profile
                </Link>
                <div className="my-1 border-t border-black/10 dark:border-white/10" />
                {/* SIGN OUT */}
                <SignOut />
              </>
            )}
          </div>
        )}
      </header>
    </div>
  );
}