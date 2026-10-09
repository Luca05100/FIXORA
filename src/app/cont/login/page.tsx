'use client'

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Te rugăm să completezi toate câmpurile.');
      return;
    }
    if (!email.includes('@')) {
      setError('Te rugăm să introduci o adresă de email validă.');
      return;
    }
    setError('');
    // Handle login logic here
    console.log('Login with', { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight inline-block">
            <span className="text-[#F26522]">FIX</span>
            <span className="text-[#1A1A1A]">ORA</span>
          </Link>
        </div>
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-[#E5E5E5]">
          <h2 className="text-center text-2xl font-bold tracking-tight text-[#1A1A1A] mb-8">
            Intră în cont
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-500">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#111]">
                Adresă de email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-[#E5E5E5] px-3 py-2 text-[#111] placeholder-[#666] focus:border-[#F26522] focus:outline-none focus:ring-1 focus:ring-[#F26522] sm:text-sm"
                  placeholder="nume@exemplu.ro"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#111]">
                  Parolă
                </label>
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#F26522] hover:text-[#D9551A]">
                    Ai uitat parola?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-[#E5E5E5] px-3 py-2 text-[#111] placeholder-[#666] focus:border-[#F26522] focus:outline-none focus:ring-1 focus:ring-[#F26522] sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg border border-transparent bg-[#F26522] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#D9551A] focus:outline-none focus:ring-2 focus:ring-[#F26522] focus:ring-offset-2 transition-colors"
              >
                Intră în cont
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E5E5]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-[#666]">sau</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="flex w-full justify-center rounded-lg border border-[#E2E5E5] bg-white py-2 px-4 text-sm font-medium text-[#1A1A1A] shadow-sm hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#F26522] focus:ring-offset-2 transition-colors"
              >
                Creează cont
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
