'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Eye } from 'lucide-react';
import { mockAppointments, type AppointmentItem } from '@/config/branding';

/* ── Status config ── */
const statusConfig: Record<AppointmentItem['status'], { label: string; bg: string; text: string; border: string }> = {
  confirmed: { label: 'Confirmată', bg: 'bg-orange-50', text: 'text-[#FF5A20]', border: 'border-[#FF5A20]' },
  in_service: { label: 'În service', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-400' },
  completed: { label: 'Finalizată', bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300' },
  cancelled: { label: 'Anulată', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-300' },
};

type TabKey = 'active' | 'history' | 'cancelled';

export default function ProgramarileMelePage() {
  const [tab, setTab] = useState<TabKey>('active');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'active', label: 'Active' },
    { key: 'history', label: 'Istoric' },
    { key: 'cancelled', label: 'Anulate' },
  ];

  /* ── Filter appointments by tab ── */
  const filtered = useMemo(() => {
    switch (tab) {
      case 'active': return mockAppointments.filter((a) => a.status === 'confirmed' || a.status === 'in_service');
      case 'history': return mockAppointments.filter((a) => a.status === 'completed');
      case 'cancelled': return mockAppointments.filter((a) => a.status === 'cancelled');
    }
  }, [tab]);

  return (
    <div className="bg-[#FCF8F5] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E1E1E] mb-6" style={{ fontFamily: 'var(--font-montserrat)' }}>
          Programările mele
        </h1>

        {/* ── Tab bar ── */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 border border-[#E5E5E5] w-fit">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all
                ${tab === t.key ? 'bg-[#1E1E1E] text-white' : 'text-[#666] hover:text-[#1E1E1E]'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Appointment cards ── */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="space-y-4">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-[#999]">
                <p className="text-lg mb-1">Nicio programare</p>
                <p className="text-sm">Nu ai programări în această categorie.</p>
              </div>
            ) : (
              filtered.map((apt, i) => {
                const sc = statusConfig[apt.status];
                return (
                  <motion.div key={apt.id}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow"
                  >
                    {/* Image placeholder */}
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg shrink-0 flex items-center justify-center text-2xl text-gray-300">
                      🔧
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-[#1E1E1E]">{apt.serviceName}</h3>
                      <p className="text-xs text-[#999] mt-0.5">{apt.shopName}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#666]">
                        <span className="flex items-center gap-1"><Clock size={12} /> {apt.date} · {apt.time}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {apt.city} · {apt.distance}</span>
                      </div>
                    </div>

                    {/* Status + action */}
                    <div className="flex flex-col items-end justify-between shrink-0 gap-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                        {sc.label}
                      </span>
                      <button className="flex items-center gap-1 text-xs font-semibold text-[#FF5A20] hover:underline">
                        <Eye size={14} /> Vezi detalii
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
