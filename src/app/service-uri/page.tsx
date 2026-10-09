'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal, Star, Heart, Clock, ChevronDown, X } from 'lucide-react';
import { mockShops, serviceCategories } from '@/config/branding';

/* ─── Status badge helpers ─── */
const allFilters = serviceCategories;

export default function ServiceUriPage() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [checkedServices, setCheckedServices] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(50);
  const [sortBy, setSortBy] = useState('recommended');

  /* ── Filter logic ── */
  const filtered = useMemo(() => {
    let list = [...mockShops];
    if (search) list = list.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.services.some((sv) => sv.toLowerCase().includes(search.toLowerCase())));
    if (checkedServices.length > 0) list = list.filter((s) => checkedServices.some((cs) => s.services.includes(cs)));
    if (minRating > 0) list = list.filter((s) => s.rating >= minRating);
    const dist = (s: typeof mockShops[0]) => parseFloat(s.distance);
    list = list.filter((s) => dist(s) <= maxDistance);
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'distance') list.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    return list;
  }, [search, checkedServices, minRating, maxDistance, sortBy]);

  const toggleService = (s: string) => setCheckedServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  /* ═══════════════ SIDEBAR CONTENT (reused in mobile drawer) ═══════════════ */
  const FilterPanel = () => (
    <div className="space-y-6 text-sm">
      {/* Servicii */}
      <div>
        <h4 className="font-bold text-[#1E1E1E] mb-3">Servicii</h4>
        <div className="space-y-2">
          {allFilters.map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer text-[#444] hover:text-[#1E1E1E]">
              <input type="checkbox" checked={checkedServices.includes(s)} onChange={() => toggleService(s)}
                className="w-4 h-4 rounded border-gray-300 text-[#FF5A20] focus:ring-[#FF5A20] accent-[#FF5A20]" />
              {s}
            </label>
          ))}
        </div>
      </div>

      {/* Distanță */}
      <div>
        <h4 className="font-bold text-[#1E1E1E] mb-3">Distanță</h4>
        <input type="range" min={1} max={50} value={maxDistance} onChange={(e) => setMaxDistance(+e.target.value)}
          className="w-full accent-[#FF5A20]" />
        <div className="flex justify-between text-xs text-[#999] mt-1">
          <span>0 km</span><span>{maxDistance} km</span>
        </div>
      </div>

      {/* Rating minim */}
      <div>
        <h4 className="font-bold text-[#1E1E1E] mb-3">Rating minim</h4>
        <div className="space-y-2">
          {[4, 4.5, 5].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer text-[#444]">
              <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)}
                className="accent-[#FF5A20]" />
              {r}+ <Star size={12} className="text-[#FFB800] fill-[#FFB800]" />
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer text-[#444]">
            <input type="radio" name="rating" checked={minRating === 0} onChange={() => setMinRating(0)}
              className="accent-[#FF5A20]" /> Toate
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FCF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ── Page header ── */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E1E1E] mb-6" style={{ fontFamily: 'var(--font-montserrat)' }}>
          Service-uri
        </h1>

        {/* ── Search & Filter bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1 flex items-center bg-white border border-[#E5E5E5] rounded-lg px-3">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input type="text" placeholder="Caută un service..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2.5 px-2 text-sm outline-none bg-transparent" />
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-lg px-3 py-2.5 text-sm text-[#1E1E1E]">
            <MapPin size={14} className="text-gray-400" />
            <select className="outline-none bg-transparent cursor-pointer">
              <option>Târgoviște</option><option>București</option><option>Ploiești</option>
            </select>
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 bg-[#FF5A20] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#E04D18] transition-colors">
            <SlidersHorizontal size={16} /> Filtre
          </button>
        </div>

        <div className="flex gap-8">
          {/* ═══ Desktop Sidebar ═══ */}
          <aside className="hidden lg:block w-56 shrink-0">
            <FilterPanel />
          </aside>

          {/* ═══ Mobile filter drawer ═══ */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
                <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'tween' }}
                  className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Filtre</h3>
                    <button onClick={() => setShowFilters(false)}><X size={20} /></button>
                  </div>
                  <FilterPanel />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══ Results area ═══ */}
          <div className="flex-1 min-w-0">
            {/* Count + sort */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[#666]">
                <strong className="text-[#1E1E1E]">{filtered.length}</strong> service-uri în Târgoviște
              </p>
              <div className="flex items-center gap-1 text-sm text-[#666]">
                <span className="hidden sm:inline">Sortare:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="outline-none bg-transparent font-semibold text-[#1E1E1E] cursor-pointer">
                  <option value="recommended">Recomandate</option>
                  <option value="rating">Rating</option>
                  <option value="distance">Distanță</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>

            {/* ── Service cards ── */}
            <div className="space-y-4">
              {filtered.map((shop, i) => (
                <motion.div key={shop.id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow group"
                >
                  {/* Image placeholder */}
                  <div className="w-full sm:w-40 h-28 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg shrink-0 flex items-center justify-center text-3xl text-gray-300 relative">
                    🚗
                    <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition"
                      aria-label="Favorite">
                      <Heart size={16} className={shop.isFavorite ? 'fill-[#FF5A20] text-[#FF5A20]' : 'text-gray-400'} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-base text-[#1E1E1E] group-hover:text-[#FF5A20] transition-colors">{shop.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <Star size={14} className="text-[#FFB800] fill-[#FFB800]" />
                      <span className="font-semibold text-[#1E1E1E]">{shop.rating}</span>
                      <span className="text-[#999]">({shop.reviewCount} evaluări)</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-[#666]">
                      <MapPin size={12} /> {shop.city} · {shop.distance}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-[#666]">
                      <Clock size={12} /> {shop.hours}
                    </div>
                    {/* Service tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {shop.services.map((s) => (
                        <span key={s} className="px-2 py-0.5 text-[10px] font-medium bg-[#F7F7F7] text-[#666] rounded-full border border-[#E5E5E5]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right CTA */}
                  <div className="flex flex-col items-end justify-between shrink-0 sm:w-40 sm:text-right">
                    <div>
                      <p className="text-[10px] text-[#999] uppercase tracking-wide">Prima oră disponibilă</p>
                      <p className="text-sm font-bold text-[#FF5A20]">{shop.nextAvailable}</p>
                    </div>
                    <Link href={`/service-uri/${shop.id}`}
                      className="mt-3 w-full sm:w-auto px-5 py-2 bg-[#FF5A20] hover:bg-[#E04D18] text-white text-sm font-semibold rounded-lg transition-colors text-center">
                      Programează-te
                    </Link>
                  </div>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16 text-[#999]">
                  <p className="text-lg mb-2">Niciun service găsit</p>
                  <p className="text-sm">Încearcă să modifici filtrele de căutare.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
