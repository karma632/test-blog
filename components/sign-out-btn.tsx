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

    try {
      await authClient.signOut()
      router.push("/")
      toast.success("Signed Out Successfully")
    } catch {
      console.error("Failed to sign-out")
      toast.error("Failed to sign out")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Sign Out Button */}
      <button
        onClick={() => setShowModal(true)}
        className="
          cursor-pointer
          rounded-full
          border border-black/10
          px-4 py-2
          text-sm
          text-black
          transition
          hover:bg-black
          hover:text-white

          dark:border-white/10
          dark:text-white
          dark:hover:bg-white
          dark:hover:text-black
        "
      >
        Sign Out
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50
            px-4
            backdrop-blur-sm
          "
        >
          <div
            className="
              w-full max-w-md
              rounded-xl
              border border-black/10
              bg-white
              p-6
              text-black
              shadow-lg

              dark:border-white/10
              dark:bg-neutral-900
              dark:text-white
            "
          >
            <h2 className="text-xl font-semibold">
              Already leaving?
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-gray-600
                dark:text-white/60
              "
            >
              Are you sure you want to sign out of your account?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              {/* CANCEL */}
              <button
                onClick={() => setShowModal(false)}
                className="
                  cursor-pointer
                  rounded-lg
                  border
                  border-red-500
                  bg-white
                  px-4 py-2
                  text-sm
                  text-red-500
                  transition
                  hover:bg-red-500
                  hover:text-white

                  dark:bg-transparent
                  dark:border-red-500
                  dark:text-red-400
                  dark:hover:bg-red-500
                  dark:hover:text-white
                "
              >
                Cancel
              </button>

              {/* SIGN OUT */}
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="
                  cursor-pointer
                  rounded-lg
                  border border-black/10
                  bg-white
                  px-4 py-2
                  text-sm
                  text-black
                  transition
                  hover:bg-black
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  dark:border-white/10
                  dark:bg-white
                  dark:text-black
                  dark:hover:bg-white/80
                "
              >
                {loading ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}