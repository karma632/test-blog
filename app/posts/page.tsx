"use client"

import Link from "next/link";
import { useQuery } from "@tanstack/react-query"



export default function Home() {
   const { isPending, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:3002/posts/all-post"
      )

      if (!response.ok) {
        throw new Error("Failed to fetch posts")
      }

      return response.json()
    },
   })

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">All posts</p>
          <h1 className="mt-2 text-3xl font-semibold">Every story in one place</h1>
        </div>
        <Link href="/" className="text-sm font-medium text-black/70 transition hover:text-black">
          Back home
        </Link>
      </div>

      {data?.posts?.length === 0 ? (
        <div className="text-center pt-10">
          <h2>There are no posts yet</h2>
        </div>
      ) : (
      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((post: any) => (
          <article key={post.id} className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-black/50">
              <span>{post.category}</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{post.title}</h2>
            <p className="mt-4 text-sm text-black/50">By {post.author}</p>
            <p className="mt-3 text-sm leading-7 text-black/70">{post.description}</p>
            <div className="text-sm text-zinc-500 pt-4">
              <Link href={`/posts/${post.id}`}>--- Read more ---</Link>
            </div>
          </article>
        ))}
      </div>
      )}
    </div>
  );
}
