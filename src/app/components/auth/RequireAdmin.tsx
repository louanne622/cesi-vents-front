// components/auth/RequireAdmin.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect, ReactNode } from "react";
import { getProfile } from "@/redux/features/authSlice";

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile: currentUser, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const check = async () => {
      if (!currentUser && !isLoading) 
          await dispatch(getProfile());
    }
}, [currentUser, dispatch, isLoading]);

useEffect(() => {
  if (currentUser && currentUser.role !== "admin") {
    router.push("/unauthorized");
  }
}, [currentUser, router]);

  return <>{children}</>;
}
