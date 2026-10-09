'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Service = {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
};

export function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center text-slate-500 py-12">
        Nu există servicii disponibile momentan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <div key={service.id} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
          <h3 className="text-xl font-bold text-slate-900 mb-3">{service.name}</h3>
          <p className="text-slate-600 mb-8 flex-grow">{service.description}</p>
          <div className="flex justify-between items-center text-sm mb-6 pb-6 border-b border-slate-100">
            <span className="text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{service.duration} min</span>
            <span className="font-bold text-lg text-slate-900">{service.price} RON</span>
          </div>
          <Link 
            href={`/programare?service=${service.id}`}
            className="w-full block text-center py-3 bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
          >
            Programează
          </Link>
        </div>
      ))}
    </div>
  );
}
