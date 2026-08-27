"use client"

import Link from "next/link";
import { useQuery } from "@tanstack/react-query"
import PostCards from "@/components/postcard";



export default function Home() {
  //  const { isPending, data } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       "http://localhost:3002/posts/all-post"
  //     )

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch posts")
  //     }

  //     return response.json()
  //   },
  //  })

  return (
    // <div className="space-y-8 py-6">
    //   <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    //     <div>
    //       <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">All posts</p>
    //       <h1 className="mt-2 text-3xl font-semibold">Every story in one place</h1>
    //     </div>
    //     <Link href="/" className="text-sm font-medium text-black/70 transition hover:text-black">
    //       Back home
    //     </Link>
    //   </div>

    //   <div>
    //     {isPending ? (
    //         <div className="flex min-h-[200px] items-center justify-center">
    //         <p className="text-sm text-black/50">
    //             Loading posts...
    //         </p>
    //         </div>
    //     ) : data?.length === 0 ? (
    //         <div className="flex min-h-[200px] items-center justify-center">
    //         <h2 className="text-sm text-black/50">
    //             There are no posts yet
    //         </h2>
    //         </div>
    //     ) : (
    //         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    //         {data?.map((post: any) => (
    //           <article
    //             key={post.id}
    //             className="group overflow-hidden rounded-3xl border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    //             >
    //             {/* Image */}
    //             <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                
    //                 {post.image ? (
    //                 <img
    //                     src={post.image}
    //                     alt={post.title}
    //                     className="h-full w-full object-cover "
    //                 />
    //                 ) : (
    //                 <div className="flex h-full items-center justify-center">
    //                     <span className="text-sm font-medium uppercase tracking-[0.2em] text-black/20">
    //                     APPNOVIA
    //                     </span>
    //                 </div>
    //                 )}

    //             </div>

    //             {/* Content */}
    //             <div className="p-5">
    //                 <div className="flex items-center justify-between text-xs text-black/40">
    //                 <span>{post.date}</span>
    //                 <span>6 min read</span>
    //                 </div>

    //                 <h4 className="mt-3 line-clamp-2 text-xl font-semibold leading-tight tracking-tight">
    //                 {post.title}
    //                 </h4>

    //                 <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/60">
    //                 {post.description}
    //                 </p>

    //                 <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
    //                 <p className="text-xs text-black/50">
    //                     By {post.author}
    //                 </p>

    //                 <Link
    //                     href={`/posts/${post.id}`}
    //                     className="text-sm font-medium transition group-hover:translate-x-1"
    //                 >
    //                     Read more →
    //                 </Link>
    //                 </div>
    //             </div>
    //           </article>
    //         ))}
    //         </div>
    //         )}
    //   </div>

    // </div>

    <PostCards/>
  );
}
