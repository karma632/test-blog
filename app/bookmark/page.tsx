"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

export default function BookmarksPage() {
  const queryClient = useQueryClient();

  // GET BOOKMARKS
  const { data, isPending } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.API_URL}/bookmarks`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
      }

      return response.json();
    },
  });

  // REMOVE BOOKMARK
  const removeBookmark = useMutation({
    mutationFn: (articleId: string) =>
      fetch(`${process.env.API_URL}/bookmarks/${articleId}`, {
        method: "DELETE",
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to remove bookmark");
        }

        return res.json();
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });

      toast.success("Post unsaved successfully");
    },

    onError: () => {
      toast.error("Failed to remove bookmark");
    },
  });

  // LOADING
  if (isPending) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-sm text-black/50 dark:text-white/50">
          Loading bookmarks...
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold text-black dark:text-white">
        Your Bookmarks
      </h1>

      {/* EMPTY STATE */}
      {data?.length === 0 ? (
        <div className="mt-10">
          <p className="text-sm text-black/50 dark:text-white/50">
            You haven't saved any posts yet.
          </p>

          <Link
            href="/posts"
            className="
              mt-4
              inline-block
              rounded-full
              bg-black
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-black/80

              dark:bg-white
              dark:text-black
              dark:hover:bg-white/80
            "
          >
            Browse posts
          </Link>
        </div>
      ) : (

        /* BOOKMARK GRID */
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {data?.map((bookmark: any) => (
            <article
              key={bookmark.id}
              className="
                overflow-hidden
                rounded-3xl
                border border-black/10
                bg-white
                text-black
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg

                dark:border-white/10
                dark:bg-neutral-900
                dark:text-white
              "
            >

              {/* IMAGE */}
              <div
                className="
                  relative
                  aspect-[16/10]
                  overflow-hidden
                  bg-neutral-100

                  dark:bg-neutral-800
                "
              >
                {bookmark.article.image ? (
                  <img
                    src={bookmark.article.image}
                    alt={bookmark.article.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-500
                      hover:scale-105
                    "
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span
                      className="
                        text-sm
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-black/20

                        dark:text-white/20
                      "
                    >
                      APPNOVIA
                    </span>
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5">

                {/* TOP */}
                <div className="flex items-center justify-between gap-3">

                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-wider
                      text-black/40

                      dark:text-white/40
                    "
                  >
                    Saved post
                  </p>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      removeBookmark.mutate(
                        bookmark.article.id
                      )
                    }
                    disabled={removeBookmark.isPending}
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-sm
                      font-medium
                      text-red-500
                      transition
                      hover:text-red-700
                      disabled:opacity-50
                    "
                  >
                    ♥ Saved
                  </button>

                </div>

                {/* TITLE */}
                <h2
                  className="
                    mt-3
                    line-clamp-2
                    text-xl
                    font-semibold
                    leading-tight
                    text-black

                    dark:text-white
                  "
                >
                  {bookmark.article.title}
                </h2>

                {/* DESCRIPTION */}
                <p
                  className="
                    mt-3
                    line-clamp-3
                    text-sm
                    leading-6
                    text-black/60

                    dark:text-white/60
                  "
                >
                  {bookmark.article.description}
                </p>

                {/* FOOTER */}
                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    border-t
                    border-black/10
                    pt-4

                    dark:border-white/10
                  "
                >

                  <p
                    className="
                      text-xs
                      text-black/50

                      dark:text-white/50
                    "
                  >
                    By {bookmark.article.author}
                  </p>

                  <Link
                    href={`/posts/${bookmark.article.id}`}
                    className="
                      text-sm
                      font-medium
                      text-black
                      transition
                      hover:translate-x-1

                      dark:text-white
                    "
                  >
                    Read more →
                  </Link>

                </div>

              </div>
            </article>
          ))}

        </div>
      )}
    </div>
  );
}