// components/auth/RequireAdmin.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect, ReactNode } from "react";
import { getProfile } from "@/redux/features/authSlice";

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.profile);

  useEffect(() => {
    const check = async () => {
      if (!currentUser) {
        try {
          await dispatch(getProfile()).unwrap();
        } catch {
          router.push("/");
        }
      } else if (currentUser.role !== "admin") {
        router.push("/unauthorized");
      }
    };

    check();
  }, [currentUser, dispatch, router]);

  if (!currentUser || currentUser.role !== "admin") return null;

  return <>{children}</>;
}
