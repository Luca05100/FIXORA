'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentSchema, TIME_SLOTS } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function ProgramarePage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto p-6 py-16 text-center text-slate-500">Se încarcă formularul...</div>}>
      <ProgramareForm />
    </Suspense>
  );
}

function ProgramareForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultServiceId = searchParams.get('service') || '';

  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      carBrand: '',
      carModel: '',
      serviceId: defaultServiceId,
      preferredDate: '',
      preferredTime: '',
      notes: '',
      gdprConsent: false as unknown as true,
    }
  });

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data.services || []))
      .catch(() => setError('Eroare la încărcarea serviciilor.'));
  }, []);

  const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'A apărut o eroare la salvarea programării.');
      }

      router.push('/confirmare');
    } catch (err: any) {
      setError(err.message || 'A apărut o eroare necunoscută.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Programează-te</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nume și Prenume *</label>
            <Input {...register('clientName')} className={`w-full ${errors.clientName ? 'border-red-500' : ''}`} />
            {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Telefon *</label>
            <Input type="tel" {...register('clientPhone')} className={`w-full ${errors.clientPhone ? 'border-red-500' : ''}`} placeholder="07XX XXX XXX" />
            {errors.clientPhone && <p className="text-red-500 text-xs mt-1">{errors.clientPhone.message as string}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <Input type="email" {...register('clientEmail')} className={`w-full ${errors.clientEmail ? 'border-red-500' : ''}`} />
          {errors.clientEmail && <p className="text-red-500 text-xs mt-1">{errors.clientEmail.message as string}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Marcă Auto *</label>
            <Input {...register('carBrand')} className={`w-full ${errors.carBrand ? 'border-red-500' : ''}`} />
            {errors.carBrand && <p className="text-red-500 text-xs mt-1">{errors.carBrand.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Model Auto *</label>
            <Input {...register('carModel')} className={`w-full ${errors.carModel ? 'border-red-500' : ''}`} />
            {errors.carModel && <p className="text-red-500 text-xs mt-1">{errors.carModel.message as string}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Serviciu *</label>
          <select 
            {...register('serviceId')} 
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.serviceId ? 'border-red-500' : ''}`}
          >
            <option value="">Alege un serviciu...</option>
            {services.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          {errors.serviceId && <p className="text-red-500 text-xs mt-1">{errors.serviceId.message as string}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Data preferată *</label>
            <Input type="date" min={getTomorrowString()} {...register('preferredDate')} className={`w-full ${errors.preferredDate ? 'border-red-500' : ''}`} />
            {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ora preferată *</label>
            <select 
              {...register('preferredTime')} 
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.preferredTime ? 'border-red-500' : ''}`}
            >
              <option value="">Alege ora...</option>
              {TIME_SLOTS ? TIME_SLOTS.map((time: string) => (
                <option key={time} value={time}>{time}</option>
              )) : (
                <>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                </>
              )}
            </select>
            {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime.message as string}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Detalii / Note suplimentare</label>
          <Textarea {...register('notes')} maxLength={500} rows={4} className="w-full" placeholder="Ex: Zgomot la frânare, verificare plăcuțe..." />
          {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes.message as string}</p>}
        </div>

        <div className="flex items-start bg-slate-50 p-4 rounded-lg">
          <input 
            type="checkbox" 
            id="gdprConsent" 
            {...register('gdprConsent')} 
            className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="gdprConsent" className="text-sm text-slate-700">
            Sunt de acord cu prelucrarea datelor personale conform GDPR *
          </label>
        </div>
        {errors.gdprConsent && <p className="text-red-500 text-xs mt-1">{errors.gdprConsent.message as string}</p>}

        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors h-12 text-lg">
          {loading ? 'Se trimite...' : 'Finalizează programarea'}
        </Button>
      </form>
    </div>
  );
}
