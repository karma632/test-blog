"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import RoleGuard from "@/components/roleguard";
import { success } from "better-auth";

export default function DashboardPage() {
  const INITIAL_FORM_DATA = {
    title: "",
    author: "",
    description: "",
    content: "",
    image:"",
  };
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [editing, setEditing] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: session} = authClient.useSession();


  const user = session?.user;

  const role = (user as { role?: string })?.role;

  console.log("DASHBOARD USER:", user);
  console.log("DASHBOARD ROLE:", role);

  const queryClient = useQueryClient();

  //function to get all post
  const { isPending, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/all-post`);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      console.log("ALL POST FETCHED", data)

      return response.json();
    },
  });

  //function to upload image to cloudinary
  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();

      return data.secure_url;
  };

  //function to create post
  const createPost = useMutation({
    mutationFn: async (formData: typeof INITIAL_FORM_DATA) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      return response.json();
    },

    onSuccess: () => {
      toast.success("Post published successfully");

      setFormData({
        title: "",
        author: "",
        description: "",
        content: "",
        image:"",
      });

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },

    onError: () => {
      toast.error("Failed to publish post");
    },
  });

  //function to delete post
  
  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      return response.json();
    },

    onSuccess: () => {
      setDeleteId(null);

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      toast.success("Post deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  //function to get all users
  const allUsers = useQuery({
    queryKey: ["all-users"],
    queryFn: async()=>{
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/user/all-users`);
       if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    }
  })

  //function to edit the post details
  const updatePost = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const response = await fetch(`${process.env.API_URL}/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }


      return response.json();
    },

    onSuccess: (data) => {
      toast.success("Post updated successfully");
      console.log("updated post done", data)

      setEditing(null);

      setFormData({
        title: "",
        author: "",
        description: "",
        content: "",
        image:"",
      });

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },

    onError: () => {
      toast.error("Failed to update post");
      console.error("updated post failed", data)

    },
  });

  return (
    <RoleGuard allowedRoles={["ADMIN", "EDITOR"]}>
     <div className="space-y-8 py-6">
        {/* HEADER */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50 dark:text-white/50">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black dark:text-white">
            Welcome and manage your posts
          </h1>

          <p className="mt-2 text-sm text-black/50 dark:text-white/50">
            Create, edit and manage your published content.
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-3">

          <div className="rounded-[1.5rem] border border-black/10 bg-white p-6 text-black shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:text-white">
            <p className="text-sm text-black/50 dark:text-white/50">
              Total Posts
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {data?.length ?? 0}
            </p>
          </div>

          {role === "ADMIN" && (
            <>
              <div className="rounded-[1.5rem] border border-black/10 bg-white p-6 text-black shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:text-white">
                <p className="text-sm text-black/50 dark:text-white/50">
                  Total Users
                </p>

                <p className="mt-2 text-3xl font-semibold">
                  {allUsers.data?.length ?? 0}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-black/10 bg-white p-6 text-black shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:text-white">
                <p className="text-sm text-black/50 dark:text-white/50">
                  Editors
                </p>

                <p className="mt-2 text-3xl font-semibold">
                  {allUsers.data?.filter(
                    (user: any) => user.role === "EDITOR"
                  ).length ?? 0}
                </p>
              </div>
            </>
          )}
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid items-start gap-6 lg:grid-cols-2">

          {/* CREATE / EDIT POST */}
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (editing) {
                updatePost.mutate({
                  id: editing,
                  data: formData,
                });
              } else {
                createPost.mutate(formData);
              }
            }}
            className="
              rounded-[1.5rem]
              border border-black/10
              bg-white
              p-6
              text-black
              shadow-sm
              dark:border-white/10
              dark:bg-neutral-900
              dark:text-white
            "
          >

            {/* FORM HEADER */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
                Content
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {editing ? "Edit post" : "Create post"}
              </h2>

              <p className="mt-1 text-sm text-black/50 dark:text-white/50">
                {editing
                  ? "Update the information for this article."
                  : "Create and publish a new article."}
              </p>
            </div>

            {/* IMAGE */}
            <div>
             
             {formData.image ? (
                <div className="relative flex min-h-[170px] items-center justify-center rounded-2xl border-2 border-dashed border-black/10 bg-black/[0.015] p-4 dark:border-white/10 dark:bg-white/[0.02]">
                  <img
                    src={formData.image}
                    alt="Cover image"
                    className="max-h-[200px] max-w-full rounded-xl object-contain"
                  />
                </div>
              ) : (
                <>
                  <label
                    htmlFor="image"
                    className="
                      group flex min-h-[170px]
                      cursor-pointer flex-col
                      items-center justify-center
                      rounded-2xl
                      border-2 border-dashed
                      border-black/10
                      bg-black/[0.015]
                      px-6 text-center
                      transition

                      hover:border-black/25
                      hover:bg-black/[0.03]

                      dark:border-white/10
                      dark:bg-white/[0.02]
                      dark:hover:border-white/25
                      dark:hover:bg-white/[0.04]
                    "
                  >
                    <div
                      className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-full
                        bg-black/5
                        text-xl
                        transition

                        group-hover:bg-black
                        group-hover:text-white

                        dark:bg-white/10
                        dark:text-white
                        dark:group-hover:bg-white
                        dark:group-hover:text-black
                      "
                    >
                      +
                    </div>

                    <p className="mt-3 text-sm font-medium">
                      Select an image
                    </p>

                    <p className="mt-1 text-xs text-black/40 dark:text-white/40">
                      PNG, JPG or WEBP
                    </p>
                  </label>
                </>
              )}

              <input id="image" type="file" accept="image/png,image/jpeg,image/webp" className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  try {
                    const imageUrl = await uploadImage(file);

                    setFormData((prev) => ({
                      ...prev,
                      image: imageUrl,
                    }));

                    toast.success("Image uploaded");
                  } catch {
                    toast.error("Failed to upload image");
                  }
                }}
              />
              
            </div>

            {/* TITLE */}
            <div className="mt-5">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium"
              >
                Title
              </label>

              <input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                required
                className="
                  w-full rounded-xl
                  border border-black/10
                  bg-white
                  px-4 py-3
                  text-sm text-black
                  outline-none
                  transition
                  placeholder:text-black/30
                  focus:border-black

                  dark:border-white/10
                  dark:bg-neutral-950
                  dark:text-white
                  dark:placeholder:text-white/30
                  dark:focus:border-white
                "
                placeholder="Post title"
              />
            </div>

            {/* AUTHOR */}
            <div className="mt-5">
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-medium"
              >
                Author
              </label>

              <input
                id="author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    author: e.target.value,
                  })
                }
                required
                className="
                  w-full rounded-xl
                  border border-black/10
                  bg-white
                  px-4 py-3
                  text-sm text-black
                  outline-none
                  transition
                  placeholder:text-black/30
                  focus:border-black

                  dark:border-white/10
                  dark:bg-neutral-950
                  dark:text-white
                  dark:placeholder:text-white/30
                  dark:focus:border-white
                "
                placeholder="Author name"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-5">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                required
                className="
                  w-full rounded-xl
                  border border-black/10
                  bg-white
                  px-4 py-3
                  text-sm text-black
                  outline-none
                  transition
                  placeholder:text-black/30
                  focus:border-black

                  dark:border-white/10
                  dark:bg-neutral-950
                  dark:text-white
                  dark:placeholder:text-white/30
                  dark:focus:border-white
                "
                placeholder="Short summary"
              />
            </div>

            {/* CONTENT */}
            <div className="mt-5">
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium"
              >
                Content
              </label>

              <textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: e.target.value,
                  })
                }
                required
                rows={6}
                className="
                  w-full resize-none
                  rounded-xl
                  border border-black/10
                  bg-white
                  px-4 py-3
                  text-sm text-black
                  outline-none
                  transition
                  placeholder:text-black/30
                  focus:border-black

                  dark:border-white/10
                  dark:bg-neutral-950
                  dark:text-white
                  dark:placeholder:text-white/30
                  dark:focus:border-white
                "
                placeholder="Write your article content here..."
              />
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setFormData(INITIAL_FORM_DATA);
                  }}
                  className="
                    rounded-full
                    border border-black/10
                    px-5 py-2.5
                    text-sm font-medium
                    transition
                    hover:bg-black/5

                    dark:border-white/10
                    dark:hover:bg-white/10
                  "
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={
                  createPost.isPending ||
                  updatePost.isPending
                }
                className="
                  rounded-full
                  bg-black
                  px-6 py-2.5
                  text-sm font-medium
                  text-white
                  transition
                  hover:bg-black/80
                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  dark:bg-white
                  dark:text-black
                  dark:hover:bg-white/80
                "
              >
                {editing
                  ? updatePost.isPending
                    ? "Updating..."
                    : "Update Post"
                  : createPost.isPending
                    ? "Publishing..."
                    : "Publish Post"}
              </button>

            </div>
          </form>


          {/* POSTS MANAGEMENT */}
          <div
            className="
              rounded-[1.5rem]
              border border-black/10
              bg-white
              p-6
              text-black
              shadow-sm

              dark:border-white/10
              dark:bg-neutral-900
              dark:text-white
            "
          >

            {/* POSTS HEADER */}
            <div className="flex items-start justify-between gap-4">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
                  Content library
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Posts
                </h2>
              </div>

              <Link
                href="/posts"
                className="
                  shrink-0
                  text-sm font-medium
                  text-black/50
                  transition
                  hover:text-black

                  dark:text-white/50
                  dark:hover:text-white
                "
              >
                View all →
              </Link>

            </div>


            {/* POSTS */}
            <div className="mt-6 divide-y divide-black/10 dark:divide-white/10">

              {isPending ? (

                <div className="flex min-h-[200px] items-center justify-center">
                  <p className="text-sm text-black/50 dark:text-white/50">
                    Loading posts...
                  </p>
                </div>

              ) : data?.length === 0 ? (

                <div className="py-16 text-center">
                  <p className="text-sm text-black/40 dark:text-white/40">
                    There are no posts yet.
                  </p>
                </div>

              ) : (

                data?.map((post: any) => (

                  <article
                    key={post.id}
                    className="py-5"
                  >

                    {/* POST INFO */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                      <div className="min-w-0">

                        <p className="text-xs font-medium uppercase tracking-wider text-black/40 dark:text-white/40">
                          Article
                        </p>

                        <h3 className="mt-1 text-base font-medium">
                          {post.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm leading-5 text-black/50 dark:text-white/50">
                          {post.description}
                        </p>

                        <p className="mt-3 text-xs text-black/40 dark:text-white/40">
                          By {post.author}
                        </p>

                      </div>


                      {/* ACTIONS */}
                      <div className="flex shrink-0 gap-2">

                        <button
                          onClick={() => {
                            setEditing(post.id);

                            setFormData({
                              title: post.title,
                              author: post.author,
                              description: post.description,
                              content: post.content,
                              image: post.image ?? "",
                            });
                          }}
                          className="
                            rounded-full
                            border border-black/10
                            px-4 py-2
                            text-xs font-medium
                            transition
                            hover:bg-black
                            hover:text-white

                            dark:border-white/10
                            dark:hover:bg-white
                            dark:hover:text-black
                          "
                        >
                          Edit
                        </button>

                        {role === "ADMIN" && (
                          <button
                            onClick={() => setDeleteId(post.id)}
                            className="
                              rounded-full
                              border border-red-500/20
                              px-4 py-2
                              text-xs font-medium
                              text-red-500
                              transition
                              hover:bg-red-500
                              hover:text-white
                            "
                          >
                            Delete
                          </button>
                        )}

                      </div>

                    </div>


                    {/* DELETE MODAL */}
                    {deleteId === post.id && (

                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

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
                            Delete post
                          </p>

                          <h2 className="mt-2 text-xl font-semibold">
                            Delete this article?
                          </h2>

                          <p className="mt-2 text-sm leading-6 text-black/50 dark:text-white/50">
                            This action cannot be undone. The post will be permanently removed.
                          </p>

                          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                            <button
                              onClick={() => setDeleteId(null)}
                              className="
                                rounded-full
                                border border-black/10
                                px-5 py-2.5
                                text-sm font-medium
                                transition
                                hover:bg-black/5

                                dark:border-white/10
                                dark:hover:bg-white/10
                              "
                            >
                              Cancel
                            </button>

                            <button
                              onClick={() =>
                                deleteId &&
                                deletePost.mutate(deleteId)
                              }
                              disabled={deletePost.isPending}
                              className="
                                rounded-full
                                bg-red-500
                                px-5 py-2.5
                                text-sm font-medium
                                text-white
                                transition
                                hover:bg-red-600
                                disabled:opacity-50
                              "
                            >
                              {deletePost.isPending
                                ? "Deleting..."
                                : "Delete post"}
                            </button>

                          </div>

                        </div>

                      </div>
                    )}

                  </article>

                ))

              )}

            </div>

          </div>

        </div>
      </div>
    </RoleGuard>
  );
}
