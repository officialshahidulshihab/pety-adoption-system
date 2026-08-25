import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  Sparkles,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { getPetById } from "@/data/pets";
import Navbar from "@/components/Navbar";

interface PageProps {
  params: Promise<{ petId: string }>;
}

// ── helpers ──────────────────────────────────────────────────
function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-400 font-medium">{value}/5</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

function MedicalBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {ok ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-gray-300 shrink-0" />
      )}
      <span className={`text-sm ${ok ? "text-gray-700" : "text-gray-400"}`}>{label}</span>
    </div>
  );
}

const statusColors: Record<string, string> = {
  Available: "text-emerald-600 bg-emerald-50 border-emerald-100",
  "In Review": "text-amber-600 bg-amber-50 border-amber-100",
  Adopted: "text-gray-500 bg-gray-50 border-gray-100",
};

// ── page ─────────────────────────────────────────────────────
export default async function PetProfilePage({ params }: PageProps) {
  const { petId } = await params;
  const pet = getPetById(petId);

  if (!pet) notFound();

  const lastCheckup = new Date(pet.medical.lastCheckup).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Back */}
        <Link
          href="/browse"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>

        {/* ── TOP SECTION ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Pet image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
            <Image
              src={pet.imageUrl}
              alt={pet.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {pet.matchScore && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-full shadow-sm">
                Match Score: {pet.matchScore}%
              </div>
            )}
          </div>

          {/* Quick info */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Name + status */}
              <div className="flex items-start justify-between mb-1">
                <h1 className="text-3xl font-bold">{pet.name}</h1>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[pet.status]}`}
                >
                  {pet.status}
                </span>
              </div>

              {/* Breed */}
              <p className="text-gray-500 mb-4">
                {pet.breed} · {pet.ageYears} yr · {pet.size}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {pet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* AI Bio */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    AI Bio
                  </span>
                </div>
                <p className="text-sm text-blue-900 italic leading-relaxed">{pet.aiBio}</p>
              </div>
            </div>

            {/* Adopt CTA */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" />
                Start Adoption
              </button>
              <button className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center hover:border-gray-400 transition-colors">
                <Heart className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* ── STORY ── */}
        <section className="mb-8 pb-8 border-b border-gray-100">
          <h2 className="text-xl font-bold mb-3">Story</h2>
          <p className="text-gray-600 leading-relaxed">{pet.story}</p>
        </section>

        {/* ── BEHAVIOR METRICS ── */}
        <section className="mb-8 pb-8 border-b border-gray-100">
          <h2 className="text-xl font-bold mb-5">Behaviour</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            <MetricBar label="Friendly with Kids" value={pet.behavior.friendlinessWithKids} />
            <MetricBar label="Friendly with Pets" value={pet.behavior.friendlinessWithPets} />
            <MetricBar label="Trainability" value={pet.behavior.trainability} />
            <MetricBar label="Independence" value={pet.behavior.independence} />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Energy level: </span>
            <span className="text-sm font-medium text-gray-900">{pet.behavior.energyLevel}</span>
          </div>
        </section>

        {/* ── MEDICAL HISTORY ── */}
        <section className="mb-8 pb-8 border-b border-gray-100">
          <h2 className="text-xl font-bold mb-5">Medical History</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <MedicalBadge ok={pet.medical.vaccinated} label="Vaccinated" />
            <MedicalBadge ok={pet.medical.neutered} label="Neutered" />
            <MedicalBadge ok={pet.medical.microchipped} label="Microchipped" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="text-sm text-gray-700">Vet checked</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Last checkup: {lastCheckup}</p>

          {pet.medical.conditions.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-2">Known conditions:</p>
              <div className="flex flex-wrap gap-2">
                {pet.medical.conditions.map((c) => (
                  <span
                    key={c}
                    className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {pet.medical.conditions.length === 0 && (
            <p className="text-sm text-emerald-600 mt-2">No known medical conditions ✓</p>
          )}
        </section>

        {/* ── SHELTER INFO ── */}
        <section>
          <h2 className="text-xl font-bold mb-5">Shelter</h2>
          <div className="bg-gray-50 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{pet.shelter.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  {pet.shelter.verified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  )}
                  <span className="text-xs text-blue-600">Verified partner shelter</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
                {pet.shelter.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 shrink-0 text-gray-400" />
                {pet.shelter.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                {pet.shelter.email}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}