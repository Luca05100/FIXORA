'use client'

import React, { useState } from 'react';
import { User, Truck, Calendar, CreditCard, Heart, Bell, Plus, Edit2 } from 'lucide-react';
import { mockCars, UserCar } from '@/lib/mock-data';
import ProgramarileMelePage from '../programarile-mele/page';

export default function ContulMeuPage() {
  const [activeTab, setActiveTab] = useState('Mașinile mele');

  const menuItems = [
    { name: 'Profilul meu', icon: User },
    { name: 'Mașinile mele', icon: Truck },
    { name: 'Programările mele', icon: Calendar },
    { name: 'Plăți și facturi', icon: CreditCard },
    { name: 'Favorite', icon: Heart },
    { name: 'Notificări', icon: Bell },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#1A1A1A] font-bold text-xl">
                IP
              </div>
              <div>
                <h2 className="font-bold text-lg text-[#1A1A1A]">Iustin Păun</h2>
                <p className="text-[#666] text-sm">iustin.paun@example.com</p>
              </div>
            </div>
            <button className="w-full py-2 px-4 border border-[#F26522] text-[#F26522] font-medium rounded-lg hover:bg-[#FFF0E6] transition-colors">
              Editează profilul
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 py-3 px-6 border-b border-[#E5E5E5] last:border-b-0 transition-colors ${
                    isActive 
                      ? 'text-[#F26522] border-l-4 border-l-[#F26522] bg-[#F7F7F7]' 
                      : 'text-[#1A1A1A] hover:bg-[#F7F7F7]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-3/4">
          {activeTab === 'Mașinile mele' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                <h1 className="text-2xl font-bold text-[#1A1A1A]">Mașinile mele</h1>
                <button className="flex items-center gap-2 bg-[#F26522] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#D9551A] transition-colors">
                  <Plus className="w-5 h-5" />
                  Adaugă mașină
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {mockCars.map((car: UserCar) => (
                  <div key={car.id} className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F7F7F7] rounded-full flex items-center justify-center text-2xl">
                        🚗
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1A1A1A]">{car.brand} {car.model}</h3>
                        <div className="flex items-center gap-2 text-sm text-[#666] mt-1">
                          <span className="bg-[#F7F7F7] px-2 py-0.5 rounded uppercase font-medium border border-[#E5E5E5]">{car.plate}</span>
                          <span>•</span>
                          <span>An: {car.year}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-[#666] hover:text-[#F26522] transition-colors rounded-full hover:bg-[#F7F7F7]">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Programările mele' && (
            <div className="bg-white rounded-xl border border-[#E5E5E5] pb-8 pt-0 px-0 sm:px-4">
              <ProgramarileMelePage />
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== 'Mașinile mele' && activeTab !== 'Programările mele' && (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-[#E5E5E5]">
              <p className="text-[#666]">Secțiunea {activeTab} este în curs de dezvoltare.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
