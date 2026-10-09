'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, User } from 'lucide-react';

/**
 * FIXORA Header — Dark sticky nav bar.
 * Logo: "FIX" in orange #FF5A20, "ORA" in white.
 * Right side: search, login link, orange "Creează cont" CTA.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Acasă', href: '/' },
    { label: 'Servicii', href: '/servicii' },
    { label: 'Service-uri', href: '/service-uri' },
    { label: 'Despre noi', href: '/despre' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1E1E1E] text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold tracking-tight select-none">
          <span className="text-[#FF5A20]">FIX</span>
          <span className="text-white">ORA</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-300 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-4">
          <button aria-label="Caută" className="p-2 hover:bg-white/10 rounded-full transition">
            <Search size={18} />
          </button>
          <Link href="/cont/login" className="text-sm text-gray-300 hover:text-white flex items-center gap-1">
            <User size={16} /> Intră în cont
          </Link>
          <Link href="/cont/login" className="bg-[#FF5A20] hover:bg-[#E04D18] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">
            Creează cont
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Meniu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile slide-in menu */}
      {open && (
        <div className="md:hidden bg-[#1E1E1E] border-t border-white/10 px-4 pb-4 space-y-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-2 text-gray-300 hover:text-white text-sm">
              {l.label}
            </Link>
          ))}
          <hr className="border-white/10" />
          <Link href="/cont/login" onClick={() => setOpen(false)}
            className="block py-2 text-sm text-gray-300">Intră în cont</Link>
          <Link href="/cont/login" onClick={() => setOpen(false)}
            className="block text-center bg-[#FF5A20] text-white text-sm font-semibold py-2.5 rounded-full">
            Creează cont
          </Link>
        </div>
      )}
    </header>
  );
}
