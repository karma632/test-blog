"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export default function PostDetails({ id }: { id: string }) {
  const { data: post, isPending, isError } = useQuery({
    queryKey: ["post", id],

    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3002/posts/${id}`
      )

      if (!response.ok) {
        throw new Error("Failed to fetch post")
      }

      return response.json()
    },
  })

  if (isPending) {
    return <p className="mt-10">Loading post...</p>
  }

  if (isError) {
    return <p className="mt-10">Failed to load post.</p>
  }

  return (
    <div className="mt-10">
      <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">

        <div>
          <Link href="/posts">
            Back to posts
          </Link>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center text-xs uppercase tracking-[0.3em] text-black/50">
            Post
          </div>

          <p className="mt-4 text-sm text-black/50">By {post.author}</p>


          <h2 className="mt-4 text-xl font-semibold">
            {post.title}
          </h2>
        </div>

        <p className="mt-3 text-sm leading-7 text-black/70">
          {post.content}
        </p>

      </article>
    </div>
  )
}