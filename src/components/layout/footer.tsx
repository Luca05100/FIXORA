import { brandConfig } from '@/config/branding';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">{brandConfig?.name || 'AutoBook'}</h3>
          <p className="text-slate-400 mb-4">{brandConfig?.description || 'Service auto profesionist.'}</p>
          <div className="space-y-2 text-sm text-slate-400">
            <p>{brandConfig?.contact?.address || 'Str. Exemplu 1, București'}</p>
            <p>Tel: {brandConfig?.contact?.phone || '0700 000 000'}</p>
            <p>Email: {brandConfig?.contact?.email || 'contact@autobook.ro'}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Program de lucru</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span>Luni - Vineri:</span>
              <span>{brandConfig?.workingHours?.weekdays || '09:00 - 18:00'}</span>
            </li>
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span>Sâmbătă:</span>
              <span>{brandConfig?.workingHours?.saturday || '09:00 - 14:00'}</span>
            </li>
            <li className="flex justify-between pb-2">
              <span>Duminică:</span>
              <span>{brandConfig?.workingHours?.sunday || 'Închis'}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Linkuri utile</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <a href="/programare" className="hover:text-white transition-colors">Programare online</a>
            </li>
            <li>
              <a href="/termeni" className="hover:text-white transition-colors">Termeni și condiții</a>
            </li>
            <li>
              <a href="/politica-confidentialitate" className="hover:text-white transition-colors">Politica de confidențialitate</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} {brandConfig?.name || 'AutoBook'}. Toate drepturile rezervate.</p>
        <p className="mt-2 md:mt-0 font-medium">Powered by AutoBook</p>
      </div>
    </footer>
  );
}
