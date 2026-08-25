"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Heart,
  Sparkles,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { PETS } from "@/data/pets";
import { Pet, PetSpecies, PetSize, EnergyLevel } from "@/types/pet";

// ── types ─────────────────────────────────────────────────────
type SortOption = "best-match" | "newest" | "youngest" | "oldest";
type ViewMode = "grid" | "list";

interface Filters {
  query: string;
  species: PetSpecies[];
  sizes: PetSize[];
  energy: EnergyLevel[];
  goodWithKids: boolean;
  goodWithPets: boolean;
  statusAvailableOnly: boolean;
}

const INITIAL_FILTERS: Filters = {
  query: "",
  species: [],
  sizes: [],
  energy: [],
  goodWithKids: false,
  goodWithPets: false,
  statusAvailableOnly: false,
};

// ── helpers ───────────────────────────────────────────────────
function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function filterPets(pets: Pet[], filters: Filters): Pet[] {
  return pets.filter((pet) => {
    if (
      filters.query &&
      !pet.name.toLowerCase().includes(filters.query.toLowerCase()) &&
      !pet.breed.toLowerCase().includes(filters.query.toLowerCase())
    )
      return false;

    if (filters.species.length && !filters.species.includes(pet.species)) return false;
    if (filters.sizes.length && !filters.sizes.includes(pet.size)) return false;
    if (filters.energy.length && !filters.energy.includes(pet.behavior.energyLevel)) return false;
    if (filters.goodWithKids && pet.behavior.friendlinessWithKids < 4) return false;
    if (filters.goodWithPets && pet.behavior.friendlinessWithPets < 4) return false;
    if (filters.statusAvailableOnly && pet.status !== "Available") return false;

    return true;
  });
}

function sortPets(pets: Pet[], sort: SortOption): Pet[] {
  return [...pets].sort((a, b) => {
    if (sort === "best-match") return (b.matchScore ?? 0) - (a.matchScore ?? 0);
    if (sort === "newest") return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
    if (sort === "youngest") return a.ageYears - b.ageYears;
    if (sort === "oldest") return b.ageYears - a.ageYears;
    return 0;
  });
}

// ── sub-components ────────────────────────────────────────────
const statusColors: Record<string, string> = {
  Available: "text-emerald-600",
  "In Review": "text-amber-500",
  Adopted: "text-gray-400",
};

function CompatibilityBar({ score }: { score?: number }) {
  if (!score) return null;
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Compatibility</span>
        <span className="font-medium text-gray-800">{score}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-800 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function GridCard({ pet }: { pet: Pet }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={pet.imageUrl} alt={pet.name} fill className="object-cover" sizes="33vw" />
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-blue-500" />
          AI Bio
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-400 hover:text-rose-500 transition-colors" />
        </button>
      </div>

      <div className="p-4">
        <CompatibilityBar score={pet.matchScore} />

        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900">{pet.name}</h3>
          <span className={`text-xs font-medium ${statusColors[pet.status]}`}>{pet.status}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap mb-2">
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
            {pet.breed}
          </span>
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
            {pet.ageYears} yr
          </span>
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
            {pet.size}
          </span>
        </div>

        <p className="text-xs text-gray-400 italic line-clamp-2 mb-3">{pet.aiBio}</p>

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

function ListCard({ pet }: { pet: Pet }) {
  return (
    <Link
      href={`/pets/${pet.id}`}
      className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-3 hover:shadow-md transition-shadow"
    >
      <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
        <Image src={pet.imageUrl} alt={pet.name} fill className="object-cover" sizes="80px" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-semibold text-gray-900">{pet.name}</h3>
          <span className={`text-xs font-medium ${statusColors[pet.status]}`}>{pet.status}</span>
        </div>
        <p className="text-xs text-gray-500 mb-1">
          {pet.breed} · {pet.ageYears} yr · {pet.size}
        </p>
        <p className="text-xs text-gray-400 italic line-clamp-1">{pet.aiBio}</p>
      </div>

      <button
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        onClick={(e) => e.preventDefault()}
      >
        <Heart className="w-4 h-4 text-gray-300 hover:text-rose-500 transition-colors" />
      </button>
    </Link>
  );
}

// ── filter pill ───────────────────────────────────────────────
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-3.5 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-gray-900 text-white border-gray-900"
          : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
      }`}
    >
      {label}
    </button>
  );
}

// ── main page ─────────────────────────────────────────────────
export default function BrowsePage() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [sort, setSort] = useState<SortOption>("best-match");
  const [view, setView] = useState<ViewMode>("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const results = useMemo(() => sortPets(filterPets(PETS, filters), sort), [filters, sort]);

  const activeFilterCount =
    filters.species.length +
    filters.sizes.length +
    filters.energy.length +
    (filters.goodWithKids ? 1 : 0) +
    (filters.goodWithPets ? 1 : 0) +
    (filters.statusAvailableOnly ? 1 : 0);

  function resetFilters() {
    setFilters(INITIAL_FILTERS);
  }

  // ── sidebar content (shared between mobile drawer + desktop) ──
  const SidebarContent = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Search
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Name or breed"
            value={filters.query}
            onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
          />
        </div>
      </div>

      {/* Species */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Species
        </p>
        <div className="flex flex-wrap gap-2">
          {(["Dog", "Cat", "Rabbit", "Bird"] as PetSpecies[]).map((s) => (
            <FilterPill
              key={s}
              label={s}
              active={filters.species.includes(s)}
              onClick={() => setFilters((f) => ({ ...f, species: toggle(f.species, s) }))}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {(["XS", "S", "M", "L", "XL"] as PetSize[]).map((s) => (
            <FilterPill
              key={s}
              label={s}
              active={filters.sizes.includes(s)}
              onClick={() => setFilters((f) => ({ ...f, sizes: toggle(f.sizes, s) }))}
            />
          ))}
        </div>
      </div>

      {/* Energy */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Energy
        </p>
        <div className="flex flex-wrap gap-2">
          {(["Low", "Medium", "High"] as EnergyLevel[]).map((e) => (
            <FilterPill
              key={e}
              label={e}
              active={filters.energy.includes(e)}
              onClick={() => setFilters((f) => ({ ...f, energy: toggle(f.energy, e) }))}
            />
          ))}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-2.5">
        {[
          {
            label: "Good with kids",
            key: "goodWithKids" as keyof Filters,
            value: filters.goodWithKids,
          },
          {
            label: "Good with other pets",
            key: "goodWithPets" as keyof Filters,
            value: filters.goodWithPets,
          },
          {
            label: "Available only",
            key: "statusAvailableOnly" as keyof Filters,
            value: filters.statusAvailableOnly,
          },
        ].map(({ label, key, value }) => (
          <label key={key} className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={() => setFilters((f) => ({ ...f, [key]: !f[key] }))}
              className="w-4 h-4 rounded border-gray-300 accent-gray-900"
            />
            <span className="text-sm text-gray-600">{label}</span>
          </label>
        ))}
      </div>

      {/* Reset */}
      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Browse Pets</h1>
          <p className="text-gray-500 text-sm mt-1">
            {results.length} pet{results.length !== 1 ? "s" : ""} waiting for a home
          </p>
        </div>

        <div className="flex gap-8">
          {/* ── Desktop sidebar ── */}
          <aside className="hidden md:block w-56 shrink-0">{SidebarContent}</aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 gap-3">
              {/* Mobile filter button */}
              <button
                className="md:hidden flex items-center gap-2 text-sm border border-gray-200 px-3 py-2 rounded-xl"
                onClick={() => setSidebarOpen(true)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-gray-400 bg-white"
              >
                <option value="best-match">Best match</option>
                <option value="newest">Newest</option>
                <option value="youngest">Youngest</option>
                <option value="oldest">Oldest</option>
              </select>

              {/* View toggle */}
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden ml-auto">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 transition-colors ${
                    view === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 transition-colors ${
                    view === "list" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Results */}
            {results.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-2">No pets match your filters</p>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((pet) => (
                  <GridCard key={pet.id} pet={pet} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((pet) => (
                  <ListCard key={pet.id} pet={pet} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            {SidebarContent}
          </div>
        </div>
      )}
    </div>
  );
}