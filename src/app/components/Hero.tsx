"use client";

import { useRouter } from "next/navigation";
import Button from "./ui/Button";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="bg-white p-6 ">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Bienvenue sur <span className="text-[#fbe216]">CESI Vents</span>
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          Découvrez et participez aux événements du campus CESI
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            text="Voir les événements"
            onClick={() => router.push('/events')}
            color="primary"
            size="sm"
          />
          <Button
            text="Découvrir les clubs"
            onClick={() => router.push('/clubs')}
            variant="outline"
            color="secondary"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;