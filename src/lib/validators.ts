import { z } from "zod";

/**
 * Shared validation schemas used by both frontend forms and backend API routes.
 * This ensures consistent validation across the entire stack.
 */

// Romanian phone number regex: +40XXXXXXXXX or 07XXXXXXXX or 02XXXXXXXX or 03XXXXXXXX
const phoneRegex = /^(\+40|0)(2|3|7)[0-9]{8}$/;

export const appointmentSchema = z.object({
  clientName: z
    .string()
    .min(3, "Numele trebuie să aibă cel puțin 3 caractere")
    .max(100, "Numele nu poate depăși 100 de caractere")
    .transform((val) => val.trim()),
  clientPhone: z
    .string()
    .regex(phoneRegex, "Număr de telefon invalid (format: 07XX XXX XXX sau +40...)")
    .transform((val) => val.replace(/\s+/g, "")), // strip spaces
  clientEmail: z
    .string()
    .email("Adresa de email nu este validă")
    .optional()
    .or(z.literal(""))
    .transform((val) => val?.trim() || undefined),
  carBrand: z
    .string()
    .min(1, "Marca mașinii este obligatorie")
    .max(50, "Marca nu poate depăși 50 de caractere")
    .transform((val) => val.trim()),
  carModel: z
    .string()
    .min(1, "Modelul mașinii este obligatoriu")
    .max(50, "Modelul nu poate depăși 50 de caractere")
    .transform((val) => val.trim()),
  serviceId: z.string().min(1, "Selectează un serviciu"),
  preferredDate: z.string().min(1, "Data este obligatorie"),
  preferredTime: z.string().min(1, "Intervalul orar este obligatoriu"),
  notes: z
    .string()
    .max(500, "Observațiile nu pot depăși 500 de caractere")
    .optional()
    .transform((val) => val?.trim() || undefined),
  gdprConsent: z.literal(true, {
    message: "Trebuie să accepți prelucrarea datelor personale",
  }),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

// Login validation
export const loginSchema = z.object({
  email: z.string().email("Adresa de email nu este validă"),
  password: z.string().min(6, "Parola trebuie să aibă cel puțin 6 caractere"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Confirm appointment validation
export const confirmAppointmentSchema = z.object({
  confirmedDate: z.string().min(1, "Data confirmată este obligatorie"),
  confirmedTime: z.string().min(1, "Ora confirmată este obligatorie"),
});

export type ConfirmAppointmentInput = z.infer<typeof confirmAppointmentSchema>;

// Service validation
export const serviceSchema = z.object({
  name: z.string().min(1, "Numele serviciului este obligatoriu").max(100),
  description: z.string().max(500).optional(),
  duration: z.number().int().positive().optional().nullable(),
  price: z.number().positive().optional().nullable(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

// Settings validation
export const settingsSchema = z.object({
  businessName: z.string().min(1).max(200),
  businessPhone: z.string().max(20),
  businessEmail: z.string().email().or(z.literal("")),
  businessAddress: z.string().max(300),
  googleReviewUrl: z.string().url().or(z.literal("")),
  workingHours: z.string(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Culoare HEX invalidă"),
  logoUrl: z.string().url().or(z.literal("")),
});

export type SettingsInput = z.infer<typeof settingsSchema>;

// Available time slots
export const TIME_SLOTS = [
  "08:00-10:00",
  "10:00-12:00",
  "12:00-14:00",
  "14:00-16:00",
  "16:00-18:00",
] as const;

// Appointment statuses
export const APPOINTMENT_STATUSES = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
} as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[keyof typeof APPOINTMENT_STATUSES];
