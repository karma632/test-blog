"use client"

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import Link from "next/link"

export default function DashboardPage() {

  const INITIAL_FORM_DATA ={
    title: "",
    author: "",
    description: "",
    content: "",
  }
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [posts, setPosts] = useState<any[]>([]);
 

  const [editing , setEditing] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
 
  
  //function to get all post
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

  //function to create post
  const createPost = useMutation({
    mutationFn: async (formData: typeof INITIAL_FORM_DATA) => {
    
      const response = await fetch("http://localhost:3002/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
        
      })

      if (!response.ok) {
        throw new Error("Failed to create post")
      }

      return response.json()
    },

    onSuccess: () => {
    toast.success("Post published successfully")

    setFormData({
      title: "",
      author: "",
      description: "",
      content: "",
    })

    queryClient.invalidateQueries({
      queryKey: ["posts"],
    })
  },

  onError: () => {
    toast.error("Failed to publish post")
  },

  });

  //function to delete post
  const queryClient = useQueryClient()
  const deletePost = useMutation({

    mutationFn: async (id: string) => {
      const response = await fetch(
        `http://localhost:3002/posts/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to delete post")
      }

      return response.json()
    },

    onSuccess: () => {
      setDeleteId(null)

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })

      toast.success("Post deleted successfully")
    },

    onError: () => {
      toast.error("Failed to delete post")
    },
  })

  //function to edit the post details
  const updatePost = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: typeof formData
    }) => {
      const response = await fetch(
        `http://localhost:3002/posts/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to update post")
      }

      return response.json()
    },

    onSuccess: () => {
      toast.success("Post updated successfully")

      setEditing(null)

      setFormData({
        title: "",
        author: "",
        description: "",
        content: "",
      })

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    },

    onError: () => {
      toast.error("Failed to update post")
    },
  })

  return (
    <div className="space-y-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold">Welcome and manage your posts
          </h1>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-2">

        <form onSubmit={(e) => { e.preventDefault(); if (editing) { updatePost.mutate({ id: editing, data: formData, })
          } else {
            createPost.mutate(formData)
          }
        }}
        className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold"></h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Title</label>
              <input id="title" value={formData.title} onChange={(e)=> setFormData({...formData, title: e.target.value})} required className=" w-full rounded-full border border-black/10 px-4 py-3 outline-none" placeholder="Post title" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Author</label>
              <input id="author"  value={formData.author} onChange={(e)=> setFormData({...formData, author: e.target.value})} required className="w-full rounded-full border border-black/10 px-4 py-3 outline-none" placeholder="Author name" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Description</label>
              <input id="description"  value={formData.description} onChange={(e)=> setFormData({...formData, description: e.target.value})} required className="w-full rounded-full border border-black/10 px-4 py-3 outline-none" placeholder="Short summary" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Content</label>
              <textarea id="content"  value={formData.content} onChange={(e)=> setFormData({...formData, content: e.target.value})} required rows={5} className="w-full rounded-[1.25rem] border border-black/10 px-4 py-3 outline-none" placeholder="Write your article content here" />
            </div>

            <div className= "flex gap-2">
              <button
                type="submit"
                disabled={createPost.isPending || updatePost.isPending}
                className="flex-1 rounded-full hover:bg-black px-4 py-3 text-sm font-medium text-black border bg-white hover:text-white"
              >
                {editing? updatePost.isPending ? "Updating...": "Update Post": createPost.isPending? "Publishing...": "Publish"}

              </button>
              
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null)
                    setFormData(INITIAL_FORM_DATA)
                  }}
                  className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium hover:bg-red-500 hover:text-white"
                >
                  Cancel
                </button>
              )}
            </div>

          </div>
        </form>

        {/* postbar management */}
        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Posts</h2>
            <Link href="/posts" className="text-sm text-black/60"> all posts</Link>
          </div>
          <div className="mt-4 space-y-3">
            {data?.length === 0 ?(
              <div className="text-center p-5">
                <h2>There are no posts yet</h2>
              </div>
            ) : (
              data?.map((post: any) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between rounded-2xl border border-black/10 p-4"
                >
                  <article>
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-black/60">{post.description}</p>
                      <p className="mt-4 text-sm text-black/50">By {post.author}</p>
                    </div>
                  </article>
                  <div className="flex gap-2">
                    
                    <button onClick={()=> {
                      setEditing(post.id)

                      setFormData({
                        title: post.title,
                        author: post.author,
                        description: post.description,
                        content: post.content,
                      })
                    }} 
                    className="rounded-full border border-black/10 px-3 py-2 text-sm hover:bg-blue-500 hover:text-white">Edit</button>

                    {/* //delete button */}
                    <button
                      onClick={() => setDeleteId(post.id)}
                      className="rounded-full px-3 py-2 text-sm hover:bg-red-500 hover:text-white bg-white text-red-500 border"
                    >
                      Delete
                    </button>

                    {/* //delete modal */}
                    {deleteId && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                          <div className="rounded-2xl bg-white p-6">
                            <h2 className="text-lg font-semibold">Are you sure you want to DELETE this post?</h2>

                            <div className="mt-5 flex gap-2">
                              <button
                                onClick={() => setDeleteId(null)}
                                className="rounded-full border px-4 py-2 hover:bg-blue-500 hover:text-white"
                              >
                                Cancel
                              </button>

                              <button
                                onClick={() => deletePost.mutate(deleteId)}
                                disabled={deletePost.isPending}
                                className="rounded-full px-3 py-2 text-sm hover:bg-red-500 hover:text-white bg-white text-red-500 border">
                                {deletePost.isPending ? "Deleting..." : "Delete"}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
