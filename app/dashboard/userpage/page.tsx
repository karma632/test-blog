"use client";

import RoleGuard from "@/components/roleguard";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export default function UsersPage() {
  const queryClient = useQueryClient();

  // =========================
  // GET ALL USERS
  // =========================
  const allUsers = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const response = await fetch(
        "/api/user/all-users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    },
  });

  // =========================
  // UPDATE USER ROLE
  // =========================
  const updateRole = useMutation({
    mutationFn: async ({
      id,
      role,
    }: {
      id: string;
      role: string;
    }) => {
      const response = await fetch(
        `/api/user/${id}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            role,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      return response.json();
    },

    onSuccess: (data) => {
      console.log("ROLE UPDATED:", data);

      toast.success("User role changed successfully");

      queryClient.invalidateQueries({
        queryKey: ["all-users"],
      });
    },

    onError: (error) => {
      console.error("ROLE UPDATE FAILED:", error);

      toast.error("Failed to update user role");
    },
  });

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <main className="w-full space-y-6 py-4 sm:space-y-8 sm:py-6">

        {/* ================= HEADER ================= */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/50 dark:text-white/50 sm:text-xs sm:tracking-[0.35em]">
            Administration
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-black dark:text-white sm:text-3xl">
            Users
          </h1>

          <p className="mt-2 max-w-md text-sm text-black/50 dark:text-white/50">
            Manage users and their permissions.
          </p>
        </div>

        {/* ================= SEARCH / FILTER ================= */}
        <div className="flex w-full flex-col gap-3 sm:flex-row">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search users..."
            className="
              min-w-0
              flex-1
              rounded-full
              border
              border-black/10
              bg-white
              px-5
              py-3
              text-sm
              text-black
              outline-none
              transition

              placeholder:text-black/30
              focus:border-black

              dark:border-white/10
              dark:bg-neutral-900
              dark:text-white
              dark:placeholder:text-white/30
              dark:focus:border-white
            "
          />

          {/* FILTER */}
          <select
            className="
              rounded-full
              border
              border-black/10
              bg-white
              px-5
              py-3
              text-sm
              text-black
              outline-none

              dark:border-white/10
              dark:bg-neutral-900
              dark:text-white
            "
          >
            <option>All users</option>
            <option>Admins</option>
            <option>Editors</option>
            <option>Users</option>
          </select>

          {/* ADD EDITOR */}
          <div>
            <button
              className="
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
              + Add Editor
            </button>
          </div>
        </div>

        {/* ================= USERS CONTAINER ================= */}
        <div
          className="
            w-full
            overflow-hidden
            rounded-[1.5rem]
            border
            border-black/10
            bg-white
            shadow-sm

            dark:border-white/10
            dark:bg-neutral-900

            sm:rounded-[2rem]
          "
        >

          {/* ================= DESKTOP HEADER ================= */}
          <div
            className="
              hidden
              grid-cols-[2fr_2fr_1fr_1fr]
              gap-4
              border-b
              border-black/10
              px-6
              py-4
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-black/40

              dark:border-white/10
              dark:text-white/40

              md:grid
            "
          >
            <span>User</span>
            <span>Email</span>
            <span>Role</span>
            <span>Joined</span>
          </div>

          {/* ================= USER ROWS ================= */}
          <div className="divide-y divide-black/10 dark:divide-white/10">

            {allUsers.isPending && (
              <div className="flex min-h-[200px] items-center justify-center">
                <p className="text-sm text-black/50 dark:text-white/50">
                  Loading users...
                </p>
              </div>
            )}

            {allUsers.isError && (
              <div className="flex min-h-[200px] items-center justify-center">
                <p className="text-sm text-red-500">
                  Failed to load users.
                </p>
              </div>
            )}

            {allUsers.data?.map((user: any) => (
              <div
                key={user.id}
                className="
                  grid
                  gap-4
                  px-4
                  py-5

                  sm:px-6

                  md:grid-cols-[2fr_2fr_1fr_1fr]
                  md:items-center
                "
              >

                {/* ================= USER ================= */}
                <div className="flex min-w-0 items-center gap-3">

                  {/* AVATAR */}
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-black/5
                      text-sm
                      font-medium
                      text-black

                      dark:bg-white/10
                      dark:text-white
                    "
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">

                    <p className="truncate font-medium text-black dark:text-white">
                      {user.name}
                    </p>

                    {/* EMAIL MOBILE */}
                    <p className="mt-0.5 truncate text-xs text-black/40 dark:text-white/40 md:hidden">
                      {user.email}
                    </p>

                  </div>
                </div>

                {/* ================= EMAIL DESKTOP ================= */}
                <p
                  className="
                    hidden
                    min-w-0
                    truncate
                    text-sm
                    text-black/50

                    dark:text-white/50

                    md:block
                  "
                >
                  {user.email}
                </p>

                {/* ================= MOBILE META ================= */}
                <div className="flex items-center justify-between gap-4 md:contents">

                  {/* ROLE */}
                  <div className="flex items-center gap-2">

                    <span className="text-xs text-black/40 dark:text-white/40 md:hidden">
                      Role
                    </span>

                    <select
                      value={user.role}
                      disabled={updateRole.isPending}
                      onChange={(e) => {
                        updateRole.mutate({
                          id: user.id,
                          role: e.target.value,
                        });
                      }}
                      className="
                        rounded-full
                        border
                        border-black/10
                        bg-white
                        px-3
                        py-2
                        text-xs
                        font-medium
                        text-black
                        outline-none
                        transition

                        focus:border-black

                        disabled:cursor-not-allowed
                        disabled:opacity-50

                        dark:border-white/10
                        dark:bg-neutral-950
                        dark:text-white
                        dark:focus:border-white
                      "
                    >
                      <option value="USER">User</option>
                      <option value="EDITOR">Editor</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>

                  {/* JOINED MOBILE */}
                  <p className="text-xs text-black/40 dark:text-white/40 md:hidden">
                    {user.createdAt?.slice(0, 10)}
                  </p>
                </div>

                {/* ================= JOINED DESKTOP ================= */}
                <p
                  className="
                    hidden
                    text-sm
                    text-black/40

                    dark:text-white/40

                    md:block
                  "
                >
                  {user.createdAt?.slice(0, 10)}
                </p>

              </div>
            ))}

          </div>
        </div>
      </main>
    </RoleGuard>
  );
}