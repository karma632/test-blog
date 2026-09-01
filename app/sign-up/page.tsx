"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Account created successfully!");

      setTimeout(() => {
        router.push("/bookmark");
      }, 1500);
    } catch (err) {
      console.error("Sign up failed:", err);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-black/10 bg-white
          p-8
          shadow-sm
          dark:border-white/10
          dark:bg-neutral-950
        "
      >
        {/* Header */}
        <p
          className="
            text-xs font-semibold uppercase tracking-[0.35em]
            text-black/50
            dark:text-white/50
          "
        >
          Sign up
        </p>

        <h1
          className="
            mt-3 text-3xl font-semibold
            text-black
            dark:text-white
          "
        >
          Create your account
        </h1>

        <p
          className="
            mt-2 text-sm
            text-black/60
            dark:text-white/60
          "
        >
          Start publishing your ideas in a calm, modern space.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Error */}
          {error && (
            <div
              className="
                rounded-xl
                border border-red-500/20
                bg-red-500/10
                p-3
                text-sm
                text-red-600
                dark:text-red-400
              "
            >
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label
              className="
                mb-2 block text-sm font-medium
                text-black
                dark:text-white
              "
            >
              Name
            </label>

            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full rounded-full
                border border-black/10
                bg-white
                px-4 py-3
                text-black
                placeholder:text-black/40
                outline-none
                transition
                focus:border-black/30

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-white
                dark:placeholder:text-white/30
                dark:focus:border-white/30
              "
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="
                mb-2 block text-sm font-medium
                text-black
                dark:text-white
              "
            >
              Email
            </label>

            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full rounded-full
                border border-black/10
                bg-white
                px-4 py-3
                text-black
                placeholder:text-black/40
                outline-none
                transition
                focus:border-black/30

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-white
                dark:placeholder:text-white/30
                dark:focus:border-white/30
              "
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="
                mb-2 block text-sm font-medium
                text-black
                dark:text-white
              "
            >
              Password
            </label>

            <input
              required
              minLength={6}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full rounded-full
                border border-black/10
                bg-white
                px-4 py-3
                text-black
                placeholder:text-black/40
                outline-none
                transition
                focus:border-black/30

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-white
                dark:placeholder:text-white/30
                dark:focus:border-white/30
              "
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-full
              bg-black
              px-4 py-3
              text-sm font-medium
              text-white
              transition
              hover:opacity-85
              disabled:cursor-not-allowed
              disabled:opacity-50

              dark:bg-white
              dark:text-black
            "
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Sign in */}
        <p
          className="
            mt-4 text-sm
            text-black/60
            dark:text-white/60
          "
        >
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="
              font-medium
              text-black
              hover:underline

              dark:text-white
            "
          >
            Sign in
          </Link>
        </p>

        {/* Socails login */}
        <div className="mt-6">
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-black/10 dark:border-white/10" />

            <span className="px-4 text-xs text-black/40 dark:text-white/40">
              OR CONTINUE WITH
            </span>

            <div className="flex-1 border-t border-black/10 dark:border-white/10" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              className="
                flex items-center justify-center gap-2
                rounded-full
                border border-black/10
                bg-white
                px-4 py-3
                text-sm font-medium
                text-black
                transition
                hover:bg-black/[0.03]

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-white
                dark:hover:bg-white/[0.06]
              "
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-5 w-5"
              />

              Google
            </button>

            {/* GitHub */}
            <button
              type="button"
              className="
                flex items-center justify-center gap-2
                rounded-full
                border border-black/10
                bg-white
                px-4 py-3
                text-sm font-medium
                text-black
                transition
                hover:bg-black/[0.03]

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-white
                dark:hover:bg-white/[0.06]
              "
            >
              <img
                src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                alt="GitHub"
                className="h-5 w-5 dark:invert"
              />

              GitHub
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}