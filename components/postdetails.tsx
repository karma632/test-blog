"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function PostDetails({ id }: { id: string }) {
  const { data: post, isPending, isError } = useQuery({
    queryKey: ["post", id],

    queryFn: async () => {
      const response = await fetch(
        `/api/posts/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      return response.json();
    },
  });

  // LOADING
  if (isPending) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-sm text-black/50 dark:text-white/50">
          Loading post...
        </p>
      </div>
    );
  }

  // ERROR
  if (isError) {
    return (
      <p className="mt-10 text-black dark:text-white">
        Failed to load post.
      </p>
    );
  }

  return (
    <div className="mt-10">

      <article
        className="
          rounded-[2rem]
          border border-black/10
          bg-white
          p-6
          text-black
          shadow-sm

          dark:border-white/10
          dark:bg-neutral-900
          dark:text-white

          sm:p-8
        "
      >

        {/* BACK */}
        <div>
          <Link
            href="/posts"
            className="
              text-sm
              text-black/50
              transition
              hover:text-black

              dark:text-white/50
              dark:hover:text-white
            "
          >
            ← Back to posts
          </Link>
        </div>

        {/* HEADER */}
        <div className="mx-auto mt-10 max-w-3xl text-center">

          <span
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.3em]
              text-black/40

              dark:text-white/40
            "
          >
            Technology
          </span>

          <h1
            className="
              mt-5
              text-3xl
              font-semibold
              leading-tight
              tracking-tight
              text-black

              dark:text-white

              sm:text-4xl
            "
          >
            {post.title}
          </h1>

          <p
            className="
              mt-4
              text-sm
              text-black/50

              dark:text-white/50
            "
          >
            By {post.author} ·{post.createdAt.slice(0, 10)}
          </p>

        </div>

        {/* IMAGE */}
        <div
          className="
            relative
            mx-auto
            mt-10
            aspect-[16/8]
            max-w-4xl
            overflow-hidden
            rounded-2xl
            bg-neutral-100

            dark:bg-neutral-800
          "
        >
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="
                h-full
                w-full
                object-cover
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span
                className="
                  text-xl
                  font-semibold
                  tracking-widest
                  text-black/10

                  dark:text-white/10
                "
              >
                APPNOVIA
              </span>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="mx-auto mt-10 max-w-2xl">

          <p
            className="
              whitespace-pre-line
              text-base
              leading-8
              text-black/70

              dark:text-white/70

              sm:text-lg
            "
          >
            {post.content}
          </p>

        </div>

      </article>

    </div>
  );
}