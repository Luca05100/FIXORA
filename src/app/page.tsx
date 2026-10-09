'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Zap, ShieldCheck, BellRing, DollarSign, ArrowRight, ChevronRight } from 'lucide-react';
import { serviceCategories, popularServices } from '@/config/branding';

/* ─── Animation Variants ─── */
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* ════════════ HERO SECTION ════════════ */}
      <section className="relative bg-[#1E1E1E] overflow-hidden">
        {/* Background gradient pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E1E] via-[#2a2a2a] to-[#1E1E1E]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32">
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
          >
            Service auto,<br />
            mai simplu <span className="italic">oricând</span>.
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-gray-400 text-base md:text-lg max-w-lg"
          >
            Programează-te online la <strong className="text-white">service</strong>-ul preferat,<br />
            fără telefoane și fără așteptare.
          </motion.p>

          {/* ── Hero search bar ── */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 bg-white rounded-full shadow-xl flex items-center p-1.5 max-w-2xl"
          >
            <div className="flex items-center flex-1 gap-2 px-4">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Caută un service sau o lucrare..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 text-sm text-[#1E1E1E] placeholder-gray-400 outline-none bg-transparent"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 border-l border-gray-200">
              <MapPin size={16} className="text-gray-400" />
              <select className="text-sm text-[#1E1E1E] outline-none bg-transparent cursor-pointer pr-1">
                <option>Târgoviște</option>
                <option>București</option>
                <option>Ploiești</option>
              </select>
            </div>
            <Link href="/service-uri"
              className="bg-[#FF5A20] hover:bg-[#E04D18] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors flex items-center gap-1.5 shrink-0">
              <Search size={16} /> Caută
            </Link>
          </motion.div>

          {/* ── Category tags ── */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {serviceCategories.map((cat) => (
              <Link key={cat} href={`/service-uri?s=${encodeURIComponent(cat)}`}
                className="px-4 py-1.5 text-xs font-medium rounded-full bg-white/10 text-gray-300 border border-white/10 hover:bg-[#FF5A20] hover:text-white hover:border-[#FF5A20] transition-all cursor-pointer">
                {cat}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════ BENEFITS STRIP ════════════ */}
      <section className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Zap size={22} />, title: 'Programare în mai puțin de 1 minut', desc: 'Rapid și ușor, direct de pe telefon.' },
            { icon: <DollarSign size={22} />, title: 'Prețuri transparente și oferte reale', desc: 'Știi exact cât plătești.' },
            { icon: <ShieldCheck size={22} />, title: 'Service-uri verificate și evaluate', desc: 'Doar service-uri de încredere.' },
            { icon: <BellRing size={22} />, title: 'Notificări și confirmări automate', desc: 'Reminder pe email și SMS.' },
          ].map((b, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-[#FFF0E6] text-[#FF5A20] flex items-center justify-center shrink-0">
                {b.icon}
              </div>
              <div>
                <p className="font-bold text-sm text-[#1E1E1E]">{b.title}</p>
                <p className="text-xs text-[#666] mt-0.5">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════ POPULAR SERVICES ════════════ */}
      <section className="bg-[#FCF8F5]">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1E1E1E]" style={{ fontFamily: 'var(--font-montserrat)' }}>
              Cele mai căutate servicii
            </h2>
            <Link href="/service-uri" className="text-[#FF5A20] text-sm font-semibold hover:underline flex items-center gap-1">
              Vezi toate <ArrowRight size={14} />
            </Link>
          </div>

          {/* Horizontal scrollable cards */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {popularServices.map((svc, i) => (
              <motion.div key={svc.id}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.04 }}
                className="snap-start"
              >
                <Link href={`/service-uri?s=${svc.name}`}
                  className="block w-36 h-36 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-[#2a2a2a] to-[#1E1E1E] relative overflow-hidden group cursor-pointer shrink-0"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-4xl opacity-40 group-hover:opacity-60 transition-opacity">
                    {svc.emoji}
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2.5">
                    <span className="text-white text-xs font-semibold">{svc.name}</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FEATURED CARDS (CTA) ════════════ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Găsește service-ul potrivit', desc: 'Compară oferte, citește recenzii reale și alege cel mai bun service din zona ta.', cta: 'Explorează service-uri' },
            { title: 'Programare instant', desc: 'Alege serviciul, data și ora — confirmare pe loc, fără apeluri telefonice.', cta: 'Programează-te acum' },
            { title: 'Urmărește-ți mașina', desc: 'Vezi istoricul intervențiilor, primești notificări și nu ratezi niciodată o revizie.', cta: 'Creează cont gratuit' },
          ].map((card, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-[#FCF8F5] rounded-2xl p-6 border border-[#E5E5E5] hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-32 bg-[#1E1E1E] rounded-xl mb-4" />
              <h3 className="font-bold text-lg text-[#1E1E1E]">{card.title}</h3>
              <p className="text-sm text-[#666] mt-2">{card.desc}</p>
              <Link href="/service-uri"
                className="inline-flex items-center gap-1 mt-4 text-[#FF5A20] text-sm font-semibold hover:underline">
                {card.cta} <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
