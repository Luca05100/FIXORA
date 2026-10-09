'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Car, Calendar, CreditCard, Heart, Bell, Settings, Plus, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockCars } from '@/config/branding';

const navItems = [
  { id: 'profile', label: 'Profilul meu', icon: User },
  { id: 'cars', label: 'Mașinile mele', icon: Car },
  { id: 'appointments', label: 'Programările mele', icon: Calendar },
  { id: 'billing', label: 'Plăți și facturi', icon: CreditCard },
  { id: 'favorites', label: 'Favorite', icon: Heart },
  { id: 'notifications', label: 'Notificări', icon: Bell },
  { id: 'settings', label: 'Setări', icon: Settings },
];

export default function ContulMeuPage() {
  const [activeTab, setActiveTab] = useState('cars'); // Default as per design
  const [showAddCar, setShowAddCar] = useState(false);
  const [cars, setCars] = useState(mockCars);
  
  /* Mock Add Car state */
  const [newBrand, setNewBrand] = useState('');
  const [newModel, setNewModel] = useState('');

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand || !newModel) return;
    setCars([...cars, { id: Date.now().toString(), brand: newBrand, model: newModel, plate: 'B-000-NEW', year: '2024' }]);
    setNewBrand(''); setNewModel('');
    setShowAddCar(false);
  };

  return (
    <div className="bg-[#FCF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E1E1E] mb-8" style={{ fontFamily: 'var(--font-montserrat)' }}>
          Contul meu
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ═══════════ LEFT SIDEBAR ═══════════ */}
          <aside className="md:w-64 shrink-0">
            {/* User quick profile */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#1E1E1E]">
                IP
              </div>
              <div>
                <p className="font-bold text-[#1E1E1E] text-sm">Iustin Păun</p>
                <p className="text-xs text-[#666]">iustin@email.com</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button key={item.id} onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all
                      ${isActive ? 'bg-[#FFF0E6] text-[#FF5A20]' : 'text-[#666] hover:bg-gray-100'}`}
                  >
                    <Icon size={18} className={isActive ? 'text-[#FF5A20]' : 'text-[#999]'} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            
            <button className="mt-8 w-full py-2.5 rounded-lg border-2 border-[#1E1E1E] text-[#1E1E1E] text-sm font-bold hover:bg-[#1E1E1E] hover:text-white transition-colors">
              Editează profilul
            </button>
          </aside>

          {/* ═══════════ RIGHT CONTENT ═══════════ */}
          <div className="flex-1 min-w-0">
            {activeTab === 'cars' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#1E1E1E]">Mașinile mele</h2>
                  <button onClick={() => setShowAddCar(true)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-[#FF5A20] bg-[#FFF0E6] px-4 py-2 rounded-lg hover:bg-[#FFE0CC] transition-colors">
                    <Plus size={16} /> Adaugă mașină
                  </button>
                </div>

                <div className="space-y-3">
                  {cars.map((car) => (
                    <div key={car.id} className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        {/* Car logo placeholder */}
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🚘</div>
                        <div>
                          <p className="font-bold text-[#1E1E1E]">{car.brand} {car.model}</p>
                          <p className="text-xs text-[#666] mt-0.5">{car.plate} · {car.year}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400 group-hover:text-[#FF5A20] transition-colors" />
                    </div>
                  ))}
                  {cars.length === 0 && (
                    <div className="text-center py-12 text-[#999] border-2 border-dashed border-[#E5E5E5] rounded-xl">
                      <p>Nu ai nicio mașină salvată.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Quick integration link for appointments */}
            {activeTab === 'appointments' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                 <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                 <h2 className="text-xl font-bold text-[#1E1E1E] mb-2">Programările mele</h2>
                 <p className="text-[#666] mb-6">Aici poți gestiona toate programările tale la service-uri.</p>
                 <Link href="/programarile-mele" className="inline-block bg-[#FF5A20] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#E04D18] transition-colors">
                   Deschide modulul complet
                 </Link>
              </motion.div>
            )}

            {/* Empty states for other tabs */}
            {!['cars', 'appointments'].includes(activeTab) && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16 text-[#999]">
                <p>Secțiune în lucru...</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ── Add Car Modal ── */}
      <AnimatePresence>
        {showAddCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50" onClick={() => setShowAddCar(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#1E1E1E]">Adaugă o mașină nouă</h3>
                <button onClick={() => setShowAddCar(false)} className="text-gray-400 hover:text-[#1E1E1E]"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddCar} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#666]">Marcă</label>
                  <input type="text" value={newBrand} onChange={e => setNewBrand(e.target.value)} placeholder="ex: Audi" required
                    className="w-full mt-1 border border-[#E5E5E5] rounded-lg py-2.5 px-3 text-sm outline-none focus:border-[#FF5A20] focus:ring-1 focus:ring-[#FF5A20]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#666]">Model</label>
                  <input type="text" value={newModel} onChange={e => setNewModel(e.target.value)} placeholder="ex: A4" required
                    className="w-full mt-1 border border-[#E5E5E5] rounded-lg py-2.5 px-3 text-sm outline-none focus:border-[#FF5A20] focus:ring-1 focus:ring-[#FF5A20]" />
                </div>
                <button type="submit" className="w-full mt-2 bg-[#1E1E1E] hover:bg-black text-white text-sm font-bold py-3 rounded-lg transition-colors">
                  Salvează mașina
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
