'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Clock, Heart, ChevronDown, Check } from 'lucide-react';
import { mockShops, serviceCategories } from '@/config/branding';

/* ── Generate next 7 days ── */
function getNextDays() {
  const days = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'];
  const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    result.push({
      key: d.toISOString().slice(0, 10),
      dayName: i === 0 ? 'Azi' : i === 1 ? 'Mâine' : days[d.getDay()],
      dayNum: d.getDate(),
      month: months[d.getMonth()],
    });
  }
  return result;
}

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
const shopTabs = ['Despre', 'Servicii', 'Recenzii', 'Galerie'] as const;

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const shop = mockShops.find((s) => s.id === id) || mockShops[0];
  const days = getNextDays();

  /* ── State for booking sidebar ── */
  const [selectedService, setSelectedService] = useState('');
  const [selectedDay, setSelectedDay] = useState(days[0].key);
  const [selectedTime, setSelectedTime] = useState('');
  const [activeTab, setActiveTab] = useState<(typeof shopTabs)[number]>('Despre');

  /* ── Multi-step booking form fields ── */
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingDesc, setBookingDesc] = useState('');
  const [showForm, setShowForm] = useState(false);

  const canContinue = selectedService && selectedDay && selectedTime;

  return (
    <div className="bg-[#FCF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back link */}
        <Link href="/service-uri" className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#FF5A20] transition-colors mb-6">
          <ArrowLeft size={16} /> Înapoi la rezultate
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ═══════════ LEFT: Service Info ═══════════ */}
          <div className="flex-1 min-w-0">
            {/* Hero image placeholder */}
            <div className="w-full h-56 md:h-72 bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl flex items-center justify-center text-6xl text-gray-300 relative">
              🔧
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:shadow-md transition" aria-label="Favorite">
                <Heart size={18} className={shop.isFavorite ? 'fill-[#FF5A20] text-[#FF5A20]' : 'text-gray-400'} />
              </button>
            </div>

            {/* Name + details */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E1E1E] mt-6" style={{ fontFamily: 'var(--font-montserrat)' }}>
              {shop.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#666]">
              <span className="flex items-center gap-1">
                <Star size={14} className="text-[#FFB800] fill-[#FFB800]" />
                <strong className="text-[#1E1E1E]">{shop.rating}</strong> ({shop.reviewCount} evaluări)
              </span>
              <span className="flex items-center gap-1"><MapPin size={14} /> {shop.city} · {shop.distance}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {shop.hours}</span>
            </div>

            {/* Service tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {shop.services.map((s) => (
                <span key={s} className="px-3 py-1 text-xs font-medium bg-white text-[#1E1E1E] rounded-full border border-[#E5E5E5]">
                  {s}
                </span>
              ))}
            </div>

            {/* ── Tabs ── */}
            <div className="mt-8 border-b border-[#E5E5E5]">
              <div className="flex gap-6">
                {shopTabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-semibold transition-colors relative ${activeTab === tab ? 'text-[#FF5A20]' : 'text-[#999] hover:text-[#1E1E1E]'}`}
                  >
                    {tab}{tab === 'Recenzii' && ` (${shop.reviewCount})`}
                    {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5A20] rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Tab content ── */}
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                className="mt-6">
                {activeTab === 'Despre' && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-[#1E1E1E]">Descriere</h3>
                    <p className="text-sm text-[#666] leading-relaxed">
                      {shop.name} oferă servicii complete de întreținere și reparații auto, cu o echipă de mecanici specializați
                      și echipamente moderne. Peste 10 ani de experiență și mii de clienți mulțumiți.
                      Suntem dedicați calității și transparenței — fiecare intervenție este documentată, iar prețurile sunt comunicate în avans.
                    </p>
                    <div className="bg-white rounded-xl border border-[#E5E5E5] p-4">
                      <h4 className="font-bold text-sm text-[#1E1E1E] mb-2">Program de lucru</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-[#666]">
                        <span>Luni - Vineri</span><span className="font-semibold text-[#1E1E1E]">08:00 - 18:00</span>
                        <span>Sâmbătă</span><span className="font-semibold text-[#1E1E1E]">08:00 - 14:00</span>
                        <span>Duminică</span><span className="font-semibold text-[#1E1E1E]">Închis</span>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'Servicii' && (
                  <div className="space-y-3">
                    {shop.services.map((s) => (
                      <div key={s} className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm text-[#1E1E1E]">{s}</p>
                          <p className="text-xs text-[#999] mt-0.5">Disponibil · Preț de la 100 RON</p>
                        </div>
                        <button onClick={() => { setSelectedService(s); }}
                          className="text-xs font-semibold text-[#FF5A20] hover:underline">Selectează</button>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'Recenzii' && (
                  <div className="space-y-4">
                    {[
                      { name: 'Alexandru M.', rating: 5, text: 'Serviciu excelent! Au fost foarte profesioniști și rapizi.', date: '2 săptămâni în urmă' },
                      { name: 'Maria P.', rating: 4, text: 'Bun raport calitate-preț. Recomand cu încredere.', date: '1 lună în urmă' },
                      { name: 'Andrei T.', rating: 5, text: 'Cel mai bun service din Târgoviște. Mereu punctuali.', date: '2 luni în urmă' },
                    ].map((r, i) => (
                      <div key={i} className="bg-white rounded-xl border border-[#E5E5E5] p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-[#1E1E1E]">{r.name}</span>
                          <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={12} className="text-[#FFB800] fill-[#FFB800]" />)}</div>
                        </div>
                        <p className="text-sm text-[#666] mt-2">{r.text}</p>
                        <p className="text-xs text-[#999] mt-2">{r.date}</p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'Galerie' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-100 rounded-xl flex items-center justify-center text-2xl text-gray-300">📷</div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ═══════════ RIGHT: Booking Sidebar ═══════════ */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 lg:sticky lg:top-20 shadow-sm">
              <h2 className="text-lg font-bold text-[#1E1E1E] mb-5">Programează-te</h2>

              <AnimatePresence mode="wait">
                {!showForm ? (
                  <motion.div key="steps" initial={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
                    {/* Step 1: Service */}
                    <div className="mb-5">
                      <label className="text-xs font-bold text-[#999] uppercase tracking-wide">1. Selectează serviciul</label>
                      <div className="relative mt-2">
                        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full border border-[#E5E5E5] rounded-lg py-2.5 px-3 text-sm outline-none focus:border-[#FF5A20] focus:ring-1 focus:ring-[#FF5A20] bg-white appearance-none cursor-pointer">
                          <option value="">Alege serviciul...</option>
                          {shop.services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Step 2: Date */}
                    <div className="mb-5">
                      <label className="text-xs font-bold text-[#999] uppercase tracking-wide">2. Alege data</label>
                      <div className="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
                        {days.map((d) => (
                          <button key={d.key} onClick={() => setSelectedDay(d.key)}
                            className={`flex flex-col items-center py-2 px-3 rounded-xl text-xs font-semibold shrink-0 transition-all border
                              ${selectedDay === d.key
                                ? 'bg-[#FF5A20] text-white border-[#FF5A20]'
                                : 'bg-[#FCF8F5] text-[#1E1E1E] border-[#E5E5E5] hover:border-[#FF5A20]'}`}
                          >
                            <span className="text-[10px] opacity-70">{d.dayName}</span>
                            <span className="text-base font-bold">{d.dayNum}</span>
                            <span className="text-[10px] opacity-70">{d.month}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Time */}
                    <div className="mb-6">
                      <label className="text-xs font-bold text-[#999] uppercase tracking-wide">3. Alege ora</label>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {timeSlots.map((t) => (
                          <button key={t} onClick={() => setSelectedTime(t)}
                            className={`py-2 text-sm font-semibold rounded-lg transition-all border
                              ${selectedTime === t
                                ? 'bg-[#FF5A20] text-white border-[#FF5A20]'
                                : 'bg-[#FCF8F5] text-[#1E1E1E] border-[#E5E5E5] hover:border-[#FF5A20]'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button disabled={!canContinue} onClick={() => setShowForm(true)}
                      className={`w-full py-3 rounded-lg text-sm font-bold transition-colors ${canContinue ? 'bg-[#FF5A20] hover:bg-[#E04D18] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                      Continuă
                    </button>
                  </motion.div>
                ) : (
                  /* ── Booking Form (multi-step drawer) ── */
                  <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <p className="text-xs text-[#999] mb-4">
                      {selectedService} · {days.find((d) => d.key === selectedDay)?.dayName} {days.find((d) => d.key === selectedDay)?.dayNum} · {selectedTime}
                    </p>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-[#666]">Prenume</label>
                          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Ion"
                            className="w-full mt-1 border border-[#E5E5E5] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#FF5A20] focus:ring-1 focus:ring-[#FF5A20]" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#666]">Nume</label>
                          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Popescu"
                            className="w-full mt-1 border border-[#E5E5E5] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#FF5A20] focus:ring-1 focus:ring-[#FF5A20]" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#666]">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ion@email.com"
                          className="w-full mt-1 border border-[#E5E5E5] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#FF5A20] focus:ring-1 focus:ring-[#FF5A20]" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#666]">Telefon</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0722 123 456"
                          className="w-full mt-1 border border-[#E5E5E5] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#FF5A20] focus:ring-1 focus:ring-[#FF5A20]" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#666]">Descriere (opțional)</label>
                        <textarea value={bookingDesc} onChange={(e) => setBookingDesc(e.target.value)} placeholder="Detalii despre problemă..."
                          rows={3} className="w-full mt-1 border border-[#E5E5E5] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#FF5A20] focus:ring-1 focus:ring-[#FF5A20] resize-none" />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-5">
                      <button onClick={() => setShowForm(false)}
                        className="flex-1 py-2.5 rounded-lg border border-[#E5E5E5] text-sm font-semibold text-[#666] hover:bg-gray-50 transition">
                        Înapoi
                      </button>
                      <button className="flex-1 py-2.5 rounded-lg bg-[#FF5A20] hover:bg-[#E04D18] text-white text-sm font-bold transition-colors flex items-center justify-center gap-1.5">
                        <Check size={16} /> Confirmă
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
