"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
            <PawPrint className="w-5 h-5 text-white" strokeWidth={1.8} />
          </div>
          <span className="text-lg font-semibold text-gray-900 tracking-tight">Pety</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500">
          <Link href="/browse" className="hover:text-gray-900 transition-colors">Browse Pets</Link>
          <Link href="/#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</Link>
          <Link href="/staff" className="hover:text-gray-900 transition-colors">For Shelters</Link>
        </nav>

        {/* CTA */}
        <Link
          href="/browse"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          Start Adoption
        </Link>
      </div>
    </header>
  );
}