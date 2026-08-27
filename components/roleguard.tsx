"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type Role = "USER" | "EDITOR" | "ADMIN";

export default function RoleGuard({
  allowedRoles,
  children,
}: {
  allowedRoles: Role[];
  children: ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/");
      return;
    }

    const role = (session.user as { role?: Role }).role;

    if (!role || !allowedRoles.includes(role)) {
      router.replace("/");
    }
  }, [session, isPending, allowedRoles, router]);

  if (isPending || !session?.user) {
    return null;
  }

  const role = (session.user as { role?: Role }).role;

  if (!role || !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
}