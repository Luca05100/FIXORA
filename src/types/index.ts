// TypeScript type definitions for AutoBook

export interface AppointmentWithService {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string | null;
  carBrand: string;
  carModel: string;
  serviceId: string;
  service: {
    id: string;
    name: string;
    description: string | null;
    duration: number | null;
    price: number | null;
  };
  preferredDate: string;
  preferredTime: string;
  confirmedDate: string | null;
  confirmedTime: string | null;
  notes: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  reminderSent: boolean;
  reviewSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceType {
  id: string;
  name: string;
  description: string | null;
  duration: number | null;
  price: number | null;
  isActive: boolean;
  sortOrder: number;
}

export interface SettingsType {
  id: string;
  businessName: string;
  businessPhone: string;
  businessEmail: string;
  businessAddress: string;
  googleReviewUrl: string;
  workingHours: string;
  primaryColor: string;
  logoUrl: string;
}

export interface StatsData {
  totalPending: number;
  totalConfirmed: number;
  totalCompleted: number;
  totalCancelled: number;
  total: number;
  dailyStats: {
    date: string;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  }[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}
