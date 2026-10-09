'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { brandConfig } from '@/config/branding';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-slate-900">
          {brandConfig?.name || 'AutoBook'}
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center text-sm text-slate-600">
            <Phone className="w-4 h-4 mr-2" />
            <span>{brandConfig?.contact?.phone || '0700 000 000'}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{brandConfig?.workingHours?.weekdays || 'L-V: 08:00 - 18:00'}</span>
          </div>
          <Link 
            href="/programare"
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Programează-te
          </Link>
        </div>

        <button 
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 p-4 bg-white space-y-4">
          <div className="flex items-center text-sm text-slate-600">
            <Phone className="w-4 h-4 mr-2" />
            <span>{brandConfig?.contact?.phone || '0700 000 000'}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{brandConfig?.workingHours?.weekdays || 'L-V: 08:00 - 18:00'}</span>
          </div>
          <Link 
            href="/programare"
            className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Programează-te
          </Link>
        </div>
      )}
    </header>
  );
}
