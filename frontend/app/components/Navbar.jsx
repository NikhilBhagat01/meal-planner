"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-white font-bold text-xl">
            <Link href="/">🍽️ MealPlanner</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-white font-medium">
            {/* <Link href="/">Home</Link>
            <Link href="/plans">Plans</Link>
            <Link href="/recipes">Recipes</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link> */}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-pink-500 text-white space-y-2">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {/* <Link href="/plans" onClick={() => setMenuOpen(false)}>
            Plans
          </Link>
          <Link href="/recipes" onClick={() => setMenuOpen(false)}>
            Recipes
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link> */}
        </div>
      )}
    </nav>
  );
}
