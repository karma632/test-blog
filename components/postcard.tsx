"use client";

import { authClient } from "@/lib/auth-client";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function PostCards() {
  
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();

  const [showLoginModal, setShowLoginModal] = useState(false);

  // GET ALL POSTS
  const { isPending, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/all-post`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      return response.json();
    },
  });

  // SAVE BOOKMARK
  const saveBookmark = useMutation({
    mutationFn: async (articleId: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookmarks/${articleId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save bookmark");
      }

      return response.json();
    },

    onSuccess: () => {
      toast.success("Post saved to bookmarks");

      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },

    onError: () => {
      toast.error("Failed to save bookmark");
    },
  });

  // GET BOOKMARKS
  const { data: bookmarks } = useQuery({
    queryKey: ["bookmarks"],
    enabled: !!session?.user,
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookmarks`,
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

  const isPostSaved = (postId: string) => {
    return bookmarks?.some(
      (bookmark: any) => bookmark.articleId === postId
    );
  };

  return (
    <section id="posts">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Latest stories
        </h3>

        <Link
          href="/posts"
          className="
            text-sm font-medium
            text-black/60
            transition
            hover:text-black

            dark:text-white/60
            dark:hover:text-white
          "
        >
          View all posts
        </Link>
      </div>

      <div>

        {/* LOGIN MODAL */}
        {showLoginModal && (
          <div
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/40
              px-4
              overflow-hidden
              backdrop-blur-sm
            "
          >
            <div
              className="
                w-full max-w-md
                rounded-[1.5rem]
                border border-black/10
                bg-white
                p-6
                text-black
                shadow-xl

                dark:border-white/10
                dark:bg-neutral-900
                dark:text-white
              "
            >

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
                Login required
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                You are not logged in
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/50 dark:text-white/50">
                You have to be logged in to bookmark a post.
              </p>

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                <button
                  onClick={() => setShowLoginModal(false)}
                  className="
                    cursor-pointer
                    rounded-full
                    border border-black/10
                    px-5 py-2.5
                    text-sm font-medium
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
                  Cancel
                </button>

                <Link
                  href="/sign-in"
                  className="
                    rounded-full
                    bg-black
                    px-5 py-2.5
                    text-sm font-medium
                    text-white
                    transition
                    hover:bg-black/80

                    dark:bg-white
                    dark:text-black
                    dark:hover:bg-white/80
                  "
                >
                  Sign in
                </Link>

              </div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {isPending ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm text-black/50 dark:text-white/50">
              Loading posts...
            </p>
          </div>

        ) : data?.length === 0 ? (

          /* EMPTY */
          <div className="flex min-h-[200px] items-center justify-center">
            <h2 className="text-sm text-black/50 dark:text-white/50">
              There are no posts yet
            </h2>
          </div>

        ) : (

          /* POSTS GRID */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {data?.map((post: any) => {
              const isSaved = isPostSaved(post.id);

              return (
                <article
                  key={post.id}
                  className="
                    group
                    overflow-hidden
                    rounded-3xl
                    border border-black/10
                    bg-white
                    text-black
                    transition
                    duration-300
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
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
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

                  {/* POST CONTENT */}
                  <div className="p-5">

                    {/* SAVE */}
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        text-xs
                        text-black

                        dark:text-white
                      "
                    >
                      <button
                        onClick={() => {
                          if (!session?.user) {
                            setShowLoginModal(true);
                            return;
                          }

                          saveBookmark.mutate(post.id);

                          console.log(
                            "Logged in user:",
                            session.user
                          );

                          console.log(
                            "Post to bookmark:",
                            post.id
                          );
                        }}
                        disabled={saveBookmark.isPending}
                        className="
                          flex
                          items-center
                          gap-1
                          transition
                          hover:text-red-500
                        "
                      >
                        <span
                          className={`
                            text-xl
                            ${
                              isSaved
                                ? "text-red-500"
                                : "text-black dark:text-white"
                            }
                          `}
                        >
                          {isSaved ? "♥" : "♡"}
                        </span>

                        {isSaved ? "Saved" : "Save"}
                      </button>
                    </div>

                    {/* TITLE */}
                    <h4
                      className="
                        mt-3
                        line-clamp-2
                        text-xl
                        font-semibold
                        leading-tight
                        tracking-tight
                        text-black

                        dark:text-white
                      "
                    >
                      {post.title}
                    </h4>

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
                      {post.description}
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
                        By {post.author}
                      </p>

                      <Link
                        href={`/posts/${post.id}`}
                        className="
                          text-sm
                          font-medium
                          transition
                          group-hover:translate-x-1

                          text-black
                          dark:text-white
                        "
                      >
                        Read more →
                      </Link>

                    </div>

                  </div>
                </article>
              );
            })}

          </div>
        )}
      </div>
    </section>
  );
}