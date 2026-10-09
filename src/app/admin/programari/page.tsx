'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

type Status = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  carBrand: string;
  carModel: string;
  service: { name: string };
  preferredDate: string;
  preferredTime: string;
  status: Status;
}

const statusLabels: Record<Status, string> = {
  PENDING: 'În așteptare',
  CONFIRMED: 'Confirmată',
  CANCELLED: 'Anulată',
  COMPLETED: 'Finalizată',
};

const statusColors: Record<Status, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-green-100 text-green-800',
};

export default function ProgramariPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<Status | 'ALL'>('ALL');
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [confirmDate, setConfirmDate] = useState('');
  const [confirmTime, setConfirmTime] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const url = filter === 'ALL' ? '/api/appointments' : `/api/appointments?status=${filter}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setAppointments(json.data.appointments || []);
        } else {
          setAppointments([]);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const handleAction = async (id: string, action: string, data?: any) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...data }),
      });
      if (res.ok) {
        fetchAppointments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openConfirmModal = (id: string) => {
    setSelectedAppointment(id);
    setConfirmModalOpen(true);
  };

  const submitConfirm = () => {
    if (selectedAppointment && confirmDate && confirmTime) {
      handleAction(selectedAppointment, 'confirm', { date: confirmDate, time: confirmTime });
      setConfirmModalOpen(false);
      setConfirmDate('');
      setConfirmTime('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {s === 'ALL' ? 'Toate' : statusLabels[s as Status]}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={fetchAppointments} disabled={loading}>
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Se încarcă programările...</div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 text-gray-500">
          Nu există programări cu acest status.
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments.map((apt) => (
            <Card key={apt.id} className="p-4 md:p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{apt.clientName}</h3>
                  <Badge className={`${statusColors[apt.status]} border-0`}>
                    {statusLabels[apt.status]}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <p>📞 {apt.clientPhone}</p>
                  <p>🚗 {apt.carBrand} {apt.carModel}</p>
                  <p>🔧 {apt.service?.name}</p>
                  <p>📅 Preferat: {new Date(apt.preferredDate).toLocaleDateString('ro-RO')} {apt.preferredTime}</p>
                </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                {apt.status === 'PENDING' && (
                  <>
                    <Button onClick={() => openConfirmModal(apt.id)} className="bg-blue-600 hover:bg-blue-700 flex-1 md:flex-none">
                      <CheckCircle size={16} className="mr-2" /> Confirmă
                    </Button>
                    <Button variant="danger" onClick={() => handleAction(apt.id, 'cancel')} className="flex-1 md:flex-none">
                      <XCircle size={16} className="mr-2" /> Anulează
                    </Button>
                  </>
                )}
                {apt.status === 'CONFIRMED' && (
                  <>
                    <Button onClick={() => handleAction(apt.id, 'complete')} className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none">
                      <CheckCircle size={16} className="mr-2" /> Finalizează
                    </Button>
                    <Button variant="danger" onClick={() => handleAction(apt.id, 'cancel')} className="flex-1 md:flex-none">
                      <XCircle size={16} className="mr-2" /> Anulează
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Confirm Modal */}
      {confirmModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirmă Programarea</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Data finală</label>
                <input
                  type="date"
                  value={confirmDate}
                  onChange={(e) => setConfirmDate(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ora finală</label>
                <input
                  type="time"
                  value={confirmTime}
                  onChange={(e) => setConfirmTime(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>Înapoi</Button>
              <Button onClick={submitConfirm} className="bg-blue-600">Salvează</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
