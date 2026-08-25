import Link from "next/link";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";
import { Pet } from "@/types/pet";

interface PetCardProps {
  pet: Pet;
}

const statusColors: Record<string, string> = {
  Available: "text-emerald-600 bg-emerald-50",
  "In Review": "text-amber-600 bg-amber-50",
  Adopted: "text-gray-500 bg-gray-100",
};

export default function PetCard({ pet }: PetCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pet.imageUrl}
          alt={pet.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        {/* AI Bio badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-blue-500" />
          AI Bio
        </div>
        {/* Wishlist */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-400 hover:text-rose-500 transition-colors" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-semibold text-gray-900">{pet.name}</h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[pet.status]}`}>
            {pet.status}
          </span>
        </div>

        {/* Breed */}
        <div className="mb-2">
          <span className="inline-block text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
            {pet.breed}
          </span>
        </div>

        {/* Age & size pills */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
            {pet.ageYears} yr
          </span>
          <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
            {pet.size}
          </span>
        </div>

        {/* AI bio snippet */}
        <p className="text-sm text-gray-400 italic mb-4 line-clamp-2">{pet.aiBio}</p>

        <Link
          href={`/pets/${pet.id}`}
          className="block w-full text-center text-sm font-medium text-gray-700 border border-gray-200 hover:border-gray-400 py-2 rounded-xl transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}