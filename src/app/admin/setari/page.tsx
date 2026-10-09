'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SetariPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    email: '',
    address: '',
    primaryColor: '#1e3a8a',
    logoUrl: '',
    googleReviewsLink: '',
    workingHours: {
      luni: '09:00 - 18:00',
      marti: '09:00 - 18:00',
      miercuri: '09:00 - 18:00',
      joi: '09:00 - 18:00',
      vineri: '09:00 - 18:00',
      sambata: '09:00 - 14:00',
      duminica: 'Închis'
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setFormData(prev => ({
              ...prev,
              ...data,
              workingHours: typeof data.workingHours === 'string' ? JSON.parse(data.workingHours) : (data.workingHours || prev.workingHours)
            }));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('wh_')) {
      const day = name.replace('wh_', '');
      setFormData(prev => ({
        ...prev,
        workingHours: { ...prev.workingHours, [day]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          workingHours: JSON.stringify(formData.workingHours)
        }),
      });
      if (res.ok) {
        setMessage({ text: 'Setările au fost salvate cu succes!', type: 'success' });
      } else {
        setMessage({ text: 'Eroare la salvarea setărilor.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Eroare la salvarea setărilor.', type: 'error' });
    }
    setSaving(false);
  };

  if (loading) return <div className="py-12 text-center">Se încarcă...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      {message.text && (
        <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Informații Business</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nume Service</label>
            <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telefon</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Adresă</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border rounded-md p-2" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Program de lucru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData.workingHours).map(([day, hours]) => (
            <div key={day} className="flex items-center gap-4">
              <label className="w-24 text-sm font-medium capitalize">{day}</label>
              <input 
                type="text" 
                name={`wh_${day}`} 
                value={hours} 
                onChange={handleChange} 
                className="flex-1 border rounded-md p-2" 
                placeholder="Ex: 09:00 - 18:00 sau Închis"
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Configurare</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Culoare Principală</label>
            <div className="flex gap-2 items-center">
              <input type="color" name="primaryColor" value={formData.primaryColor} onChange={handleChange} className="h-10 w-10 border-0 p-0 rounded cursor-pointer" />
              <input type="text" name="primaryColor" value={formData.primaryColor} onChange={handleChange} className="border rounded-md p-2 w-32" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL Logo</label>
            <input type="text" name="logoUrl" value={formData.logoUrl} onChange={handleChange} className="w-full border rounded-md p-2" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Link Recenzii Google</label>
            <input type="text" name="googleReviewsLink" value={formData.googleReviewsLink} onChange={handleChange} className="w-full border rounded-md p-2" placeholder="https://g.page/r/..." />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 px-8">
          {saving ? 'Se salvează...' : 'Salvează Setările'}
        </Button>
      </div>
    </div>
  );
}
