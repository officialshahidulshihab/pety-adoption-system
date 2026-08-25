import Link from "next/link";
import Image from "next/image";
import { PawPrint, Bot, Home, ArrowRight } from "lucide-react";
import { getFeaturedPets } from "@/data/pets";
import PetCard from "@/components/PetCard";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const featuredPets = getFeaturedPets();
  const heroMatch = featuredPets[0]; // Mochi — 94% match

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        {/* Headline */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            Every Pet Deserves a<br />
            <span className="text-blue-600">Perfect Match</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
            AI-powered adoption matching that connects the right pet with the right home — faster,
            smarter, and more compassionate.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Link
            href="/browse"
            className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
          >
            Find My Match
          </Link>
          <Link
            href="/staff/pets"
            className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:border-gray-400 transition-colors"
          >
            List a Pet
          </Link>
        </div>

        {/* Hero pet card with match score */}
        {heroMatch && (
          <div className="max-w-sm mx-auto">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src={heroMatch.imageUrl}
                alt={heroMatch.name}
                fill
                className="object-cover"
                priority
              />
              {/* Match score badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-full shadow-sm">
                Match Score: {heroMatch.matchScore}%
              </div>
            </div>
            <div className="mt-3 px-1">
              <h2 className="text-2xl font-bold">{heroMatch.name}</h2>
              <p className="text-gray-500 text-sm mt-0.5">
                {heroMatch.breed} · {heroMatch.ageYears} yr
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ─── STATS ─── */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-gray-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
          <div>
            <span className="text-xl font-bold text-gray-900">2,400+</span>
            <span className="text-gray-500 text-sm ml-1">successful adoptions</span>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">180</span>
            <span className="text-blue-600 text-sm ml-1">partner shelters</span>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">98%</span>
            <span className="text-blue-600 text-sm ml-1">satisfaction</span>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>

        <div className="space-y-8 max-w-lg mx-auto">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                1
              </span>
              <PawPrint className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Tell Us Your Lifestyle</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Fill a quick quiz about your space, energy, allergies and daily schedule. It takes
                about two minutes.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                2
              </span>
              <Bot className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">AI Finds Your Match</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our compatibility engine analyses 40+ lifestyle signals against every pet in our
                partner shelters.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                3
              </span>
              <Home className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Meet, Apply, Adopt</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                A streamlined application with real-time tracking, so you always know exactly where
                you stand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PETS ─── */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Ready for Their Forever Home</h2>
          <Link
            href="/browse"
            className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            Browse all pets <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-100 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
                  <PawPrint className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Pety</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Smart adoption management for shelters and the families who love them.
              </p>
            </div>

            {/* Adopt */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Adopt</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/browse" className="hover:text-gray-900 transition-colors">Browse Pets</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</Link></li>
                <li><Link href="/quiz" className="hover:text-gray-900 transition-colors">Match Quiz</Link></li>
              </ul>
            </div>

            {/* Shelters */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Shelters</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/staff" className="hover:text-gray-900 transition-colors">Staff Portal</Link></li>
                <li><Link href="/staff/pets" className="hover:text-gray-900 transition-colors">Pet Intake</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/about" className="hover:text-gray-900 transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
            © 2026 Pety · 180 partner shelters across Bangladesh
          </div>
        </div>
      </footer>
    </div>
  );
}