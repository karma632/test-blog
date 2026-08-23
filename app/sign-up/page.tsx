"use client"

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
    
    const handleSubmit = async ( e: React.FormEvent)=>{
      e.preventDefault();
      setLoading(true);
      try{
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
        router.push("/dashboard");
      }, 1500);

      }catch(err){
        console.error("sign up failed")
      } finally{
        setLoading(false)
      }
    }

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">Sign up</p>
        <h1 className="mt-3 text-3xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-black/70">Start publishing your ideas in a calm, modern space.</p>

        <form onSubmit={handleSubmit}  className="mt-6 space-y-4">
           {error && (
            <div className="rounded-md p-2 bg-red-300 text-sm text-red-500">
              {error}
            </div>
            )}
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input value={name} onChange={(e)=> setName(e.target.value)} className="w-full rounded-full border border-black/10 px-4 py-3 outline-none" placeholder="Your name" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full rounded-full border border-black/10 px-4 py-3 outline-none" placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input required minLength={6} type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="w-full rounded-full border border-black/10 px-4 py-3 outline-none" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="cursor-pointer w-full rounded-full bg-black hover:opacity-85 px-4 py-3 text-sm font-medium text-white">
              {loading ? "Creating account...." : " Create account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-black/70">
          Already have an account? <Link href="/sign-in" className="font-medium text-black">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
