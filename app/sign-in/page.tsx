"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async ( e: React.FormEvent)=>{
      e.preventDefault();
      setLoading(true);
      try{
        const {data, error} = await authClient.signIn.email({
          email,
          password,
        })
        if (error) {
          toast.error(error.message);
          return;
        }
        
        router.push("/dashboard");
        toast.success("Login successful!");
    
        
      }catch(err){
        console.error("sign up failed")
      } finally{
        setLoading(false)
      }
    }

  return (
    
    <div className="flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">Sign in</p>
        <h1 className="mt-3 text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-black/70">Access your dashboard and manage your content.</p>

        <form onSubmit={handleSubmit}  className="mt-6 space-y-4">
           {error && (
            <div className="rounded-md p-2 bg-red-300 text-sm text-red-500">
              {error}
            </div>
            )}
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-full border border-black/10 px-4 py-3 outline-none" placeholder="you@example.com" required/>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-full border border-black/10 px-4 py-3 outline-none" placeholder="••••••••" minLength={6} required/>
          </div>
          <button disabled={loading} className=" w-full rounded-full bg-black hover:opacity-85  px-4 py-3 text-sm font-medium text-white cursor-pointer ">
             {loading ? "Signing in...." : " Sign in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-black/70">
          New here? <Link href="/sign-up" className="font-medium text-black">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
