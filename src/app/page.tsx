import Link from 'next/link';
import { Phone, CheckCircle, Clock, Wrench, Shield } from 'lucide-react';
import { brandConfig } from '@/config/branding';
import { ServicesList } from '@/components/ServicesList';

export default function Home() {
  const fallbackFeatures = [
    { title: 'Rapiditate', description: 'Programare în doar câteva minute.' },
    { title: 'Profesionalism', description: 'Echipă dedicată și servicii de top.' },
    { title: 'Transparență', description: 'Prețuri clare și comunicare deschisă.' },
    { title: 'Calitate', description: 'Garanția calității pentru orice intervenție.' }
  ];

  const features = brandConfig?.features || fallbackFeatures;
  const phone = brandConfig?.contact?.phone || '0700 000 000';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-200 py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Programează-te online, rapid și simplu
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {brandConfig?.description || 'Lasă-ți mașina pe mâinile profesioniștilor noștri și economisește timp cu programarea online. Simplu, sigur și eficient.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/programare" 
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 w-full sm:w-auto"
            >
              Programează-te acum
            </Link>
            <a 
              href={`tel:${cleanPhone}`}
              className="px-8 py-4 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold text-lg hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Sună-ne
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">De ce să ne alegi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature: any, index: number) => (
              <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  {index === 0 ? <Clock className="w-7 h-7" /> : 
                   index === 1 ? <Wrench className="w-7 h-7" /> : 
                   index === 2 ? <Shield className="w-7 h-7" /> : 
                   <CheckCircle className="w-7 h-7" />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-slate-50 py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Serviciile noastre</h2>
          <ServicesList />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Contact</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Informații contact</h3>
                <div className="space-y-4 text-slate-600">
                  <p className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">Adresă:</span> 
                    {brandConfig?.contact?.address || 'Str. Exemplu, Nr. 1, București'}
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">Telefon:</span> 
                    {phone}
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">Email:</span> 
                    {brandConfig?.contact?.email || 'contact@autobook.ro'}
                  </p>
                </div>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Program de lucru</h3>
                <table className="w-full text-slate-600">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3">Luni - Vineri</td>
                      <td className="text-right font-semibold text-slate-900">{brandConfig?.workingHours?.weekdays || '09:00 - 18:00'}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3">Sâmbătă</td>
                      <td className="text-right font-semibold text-slate-900">{brandConfig?.workingHours?.saturday || '09:00 - 14:00'}</td>
                    </tr>
                    <tr>
                      <td className="py-3">Duminică</td>
                      <td className="text-right font-semibold text-slate-900">{brandConfig?.workingHours?.sunday || 'Închis'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-slate-200 rounded-2xl min-h-[400px] flex items-center justify-center p-8 text-center text-slate-500 border border-slate-300">
              <div className="bg-white/80 p-6 rounded-xl backdrop-blur-sm">
                <p className="mb-2 text-lg font-medium text-slate-800">Hartă Google (Placeholder)</p>
                <p className="text-slate-600">{brandConfig?.contact?.address || 'Locația Service-ului'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
