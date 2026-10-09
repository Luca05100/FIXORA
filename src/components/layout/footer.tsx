import Link from 'next/link';

/** FIXORA Footer — light gray background, 4 columns, copyright bar. */
export function Footer() {
  return (
    <footer className="bg-[#F7F7F7] border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {/* Brand */}
        <div>
          <Link href="/" className="text-xl font-extrabold">
            <span className="text-[#FF5A20]">FIX</span><span className="text-[#1E1E1E]">ORA</span>
          </Link>
          <p className="mt-3 text-[#666] leading-relaxed">
            Platforma ta de programări la service-uri auto verificate. Rapid, transparent, fără telefoane.
          </p>
        </div>

        {/* Servicii populare */}
        <div>
          <h4 className="font-bold text-[#1E1E1E] mb-3">Servicii populare</h4>
          <ul className="space-y-2 text-[#666]">
            {['Revizie', 'Schimb ulei', 'Frâne', 'Anvelope', 'Diagnoză', 'ITP'].map((s) => (
              <li key={s}><Link href="/service-uri" className="hover:text-[#FF5A20] transition-colors">{s}</Link></li>
            ))}
          </ul>
        </div>

        {/* Informații utile */}
        <div>
          <h4 className="font-bold text-[#1E1E1E] mb-3">Informații utile</h4>
          <ul className="space-y-2 text-[#666]">
            <li><Link href="/despre" className="hover:text-[#FF5A20]">Despre FIXORA</Link></li>
            <li><Link href="#" className="hover:text-[#FF5A20]">Cum funcționează</Link></li>
            <li><Link href="#" className="hover:text-[#FF5A20]">Termeni și condiții</Link></li>
            <li><Link href="#" className="hover:text-[#FF5A20]">Politica de confidențialitate</Link></li>
            <li><Link href="#" className="hover:text-[#FF5A20]">Blog</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-[#1E1E1E] mb-3">Contact</h4>
          <ul className="space-y-2 text-[#666]">
            <li>📞 0722 123 456</li>
            <li>✉️ contact@fixora.ro</li>
            <li>📍 Târgoviște, România</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-[#999]">
          <span>© {new Date().getFullYear()} FIXORA. Toate drepturile rezervate.</span>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Link href="#" className="hover:text-[#FF5A20]">Termeni</Link>
            <Link href="#" className="hover:text-[#FF5A20]">Confidențialitate</Link>
            <Link href="#" className="hover:text-[#FF5A20]">Cookie-uri</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
