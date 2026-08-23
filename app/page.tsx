"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link";

export default function Home() {

  const { isPending, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:3002/posts/all-post",
        {

          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch posts")
      }

      return response.json()
    },
  })

  

  return (
    <div className="space-y-12 py-8">
      <section>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-black/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-black/70">
              Top Topics • Spring 2026
            </span>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              New feel to how blogs are presented
            </h1>
            <p className="max-w-xl text-lg leading-8 text-black/70">
              Discover thoughtful essays, design notes, and clean thinking curated for readers who prefer clarity over noise.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/posts"
                className="rounded-full bg-black px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Start reading
              </Link>
            </div>
          </div>

        </div>
      </section>

      <section id="posts">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Latest stories</h3>
          <Link href="/posts" className="text-sm font-medium text-black/60 transition hover:text-black">
            View all posts
          </Link>
        </div>
       
        <div>
          {data?.posts?.length === 0 &&(
             <div className="text-center pt-10">
              <h2>There are no posts yet</h2>
            </div>
          )}
           
          <div className="grid gap-4 md:grid-cols-3">
            {isPending ? (
              <p className="text-center">Loading posts</p>
            ):(
              data?.map((post: any)=>
              <article key={post.id} className="rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                <h4 className="mt-3 text-lg font-semibold">{post.title}</h4>
                <p className="mt-2 text-sm leading-7 text-black/70">{post.description}</p>
                <p className="mt-4 text-sm text-black/50">By {post.author}</p>
                <Link href={`/posts/${post.id}`} className="mt-4 inline-flex text-sm font-medium text-black transition hover:text-black/70">
                  Read more →
                </Link>
              </article>
              )
            )}
          </div>
        
        </div>
      </section>
    </div>
  );
}


 