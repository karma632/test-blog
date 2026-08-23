"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function SignOutbtn() {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setLoading(true)
    try{
        await authClient.signOut()
        router.push("/")
        toast.success("Sigined Out Successful")
    }catch{
        console.error("Failed to sign-out")
    }finally{
        setLoading(false)
    }
  }

  return (
    <>
      {/* Sign Out Button */}
      <button
        onClick={() => setShowModal(true)}
        className="cursor-pointer rounded-full border border-black/10 px-4 py-2 text-sm text-black transition hover:bg-black hover:text-white"
      >
        Sign Out
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold">
              Already leaving?
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to sign out of your account?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="cursor-pointer rounded-lg border px-4 py-2 text-sm hover:bg-red-500 hover:text-white text-red-500 border-red-500 bg-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSignOut}
                className=" rounded-lg hover:bg-black px-4 py-2 text-sm hover:text-white border cursor-pointer"
                disabled={loading}
              >
               {loading ? "Signing Out...." : " Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}