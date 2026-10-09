'use client'

import React, { useState } from 'react';
import { mockAppointments, AppointmentItem } from '@/lib/mock-data';

export default function ProgramarileMelePage() {
  const [activeTab, setActiveTab] = useState<'active' | 'istoric' | 'anulate'>('active');

  const getFilteredAppointments = () => {
    return mockAppointments.filter(app => {
      if (activeTab === 'active') return app.status === 'confirmed' || app.status === 'pending';
      if (activeTab === 'istoric') return app.status === 'completed';
      if (activeTab === 'anulate') return app.status === 'cancelled';
      return false;
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-3 py-1 text-xs font-medium bg-[#FFF0E6] text-[#F26522] border border-[#F26522] rounded-full">Confirmată</span>;
      case 'completed':
        return <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-600 border border-green-500 rounded-full">Finalizată</span>;
      case 'cancelled':
        return <span className="px-3 py-1 text-xs font-medium bg-red-50 text-red-600 border border-red-500 rounded-full">Anulată</span>;
      case 'pending':
        return <span className="px-3 py-1 text-xs font-medium bg-yellow-50 text-yellow-600 border border-yellow-500 rounded-full">În așteptare</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">Programările mele</h1>
      
      <div className="flex border-b border-[#E5E5E5] mb-6 gap-2">
        <button
          onClick={() => setActiveTab('active')}
          className={`pb-4 px-4 font-medium text-sm transition-colors relative ${activeTab === 'active' ? 'text-[#F26522]' : 'text-[#666] hover:text-[#111]'}`}
        >
          Active
          {activeTab === 'active' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F26522]" />}
        </button>
        <button
          onClick={() => setActiveTab('istoric')}
          className={`pb-4 px-4 font-medium text-sm transition-colors relative ${activeTab === 'istoric' ? 'text-[#F26522]' : 'text-[#666] hover:text-[#111]'}`}
        >
          Istoric
          {activeTab === 'istoric' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F26522]" />}
        </button>
        <button
          onClick={() => setActiveTab('anulate')}
          className={`pb-4 px-4 font-medium text-sm transition-colors relative ${activeTab === 'anulate' ? 'text-[#F26522]' : 'text-[#666] hover:text-[#111]'}`}
        >
          Anulate
          {activeTab === 'anulate' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F26522]" />}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {getFilteredAppointments().map((appointment: AppointmentItem) => (
          <div key={appointment.id} className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-[#F7F7F7] rounded-lg overflow-hidden flex-shrink-0">
                <img src={appointment.shopImage || "https://placehold.co/80x80"} alt={appointment.shopName} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[#1A1A1A] text-lg">{appointment.serviceName}</h3>
                <p className="text-sm text-[#666]">{appointment.shopName}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-[#666]">
                  <span>{appointment.date}</span>
                  <span>•</span>
                  <span>{appointment.time}</span>
                </div>
                <p className="text-sm text-[#666] mt-1">{appointment.location} ({appointment.distance})</p>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-3 mt-4 sm:mt-0">
              {getStatusBadge(appointment.status)}
              <button className="px-4 py-2 border border-[#E5E5E5] bg-white rounded-lg text-sm font-medium hover:bg-[#F7F7F7] transition-colors text-[#1A1A1A]">
                Vezi detalii
              </button>
            </div>
          </div>
        ))}
        {getFilteredAppointments().length === 0 && (
          <div className="text-center py-12 text-[#666] bg-[#F7F7F7] rounded-xl border border-[#E5E5E5]">
            Nu ai nicio programare în această categorie.
          </div>
        )}
      </div>
    </div>
  );
}
