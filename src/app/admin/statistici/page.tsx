'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, CheckCircle, CheckSquare, XCircle } from 'lucide-react';

export default function StatisticiPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6 h-32 animate-pulse bg-gray-200" />
          ))}
        </div>
        <Card className="h-96 animate-pulse bg-gray-200" />
      </div>
    );
  }

  if (!stats) return <div>Eroare la încărcarea statisticilor.</div>;

  const { overview, dailyData } = stats;
  const conversionRate = overview.total > 0 
    ? Math.round(((overview.confirmed + overview.completed) / overview.total) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total cereri</p>
            <h3 className="text-2xl font-bold">{overview.total}</h3>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Confirmate</p>
            <h3 className="text-2xl font-bold">{overview.confirmed}</h3>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <CheckSquare size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Finalizate</p>
            <h3 className="text-2xl font-bold">{overview.completed}</h3>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <XCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Anulate</p>
            <h3 className="text-2xl font-bold">{overview.cancelled}</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6">Programări pe zile (Ultimele 30 zile)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="pending" name="În așteptare" stackId="a" fill="#eab308" />
                <Bar dataKey="confirmed" name="Confirmate" stackId="a" fill="#3b82f6" />
                <Bar dataKey="completed" name="Finalizate" stackId="a" fill="#22c55e" />
                <Bar dataKey="cancelled" name="Anulate" stackId="a" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-center items-center text-center">
          <h3 className="text-lg font-semibold mb-2">Rata de conversie</h3>
          <p className="text-sm text-gray-500 mb-6">Programări confirmate sau finalizate din totalul cererilor</p>
          
          <div className="relative w-48 h-48 flex items-center justify-center rounded-full border-8 border-gray-100">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                className="text-blue-500"
                strokeDasharray={`${(conversionRate / 100) * (2 * Math.PI * 88)} ${(2 * Math.PI * 88)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-4xl font-bold text-gray-800">{conversionRate}%</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
