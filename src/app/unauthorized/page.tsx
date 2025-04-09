"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
      <h1 className="text-3xl font-bold text-[#fbe216] mb-4">Accès non autorisé</h1>
      <p className="text-lg text-gray-700 mb-2">Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
      <p className="text-gray-500">Vous serez redirigé vers la page d'accueil dans {seconds} seconde{seconds !== 1 && "s"}...</p>
    </div>
  );
}
