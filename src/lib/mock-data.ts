/**
 * FIXORA — Mock data for the marketplace UI.
 * Replace with real API calls when backend is ready.
 */

export interface ServiceShop {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  city: string;
  distance: string;
  address: string;
  hours: string;
  services: string[];
  image: string;
  nextAvailable: string;
  isFavorite: boolean;
}

export interface AppointmentItem {
  id: string;
  serviceName: string;
  shopName: string;
  date: string;
  time: string;
  city: string;
  distance: string;
  status: "confirmed" | "completed" | "cancelled" | "pending";
  image: string;
}

export interface UserCar {
  id: string;
  brand: string;
  model: string;
  plate: string;
  year: string;
}

/* ---- Mock Service Shops ---- */
export const mockShops: ServiceShop[] = [
  {
    id: "1",
    name: "Auto Expert Service",
    rating: 4.9,
    reviewCount: 320,
    city: "Târgoviște",
    distance: "2.4 km",
    address: "Str. Justiției nr. 15, Târgoviște",
    hours: "Deschis · 08:00 - 18:00",
    services: ["Revizie", "Diagnoză", "Schimb ulei", "Frâne", "Climă auto"],
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=250&fit=crop",
    nextAvailable: "Azi 16:30",
    isFavorite: true,
  },
  {
    id: "2",
    name: "ProCar Service",
    rating: 4.8,
    reviewCount: 190,
    city: "Târgoviște",
    distance: "3.1 km",
    address: "Bd. Independenței nr. 42, Târgoviște",
    hours: "Deschis · 08:00 - 17:00",
    services: ["Revizie", "Anvelope", "ITP", "Geometrie"],
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=250&fit=crop",
    nextAvailable: "Mâine 09:00",
    isFavorite: false,
  },
  {
    id: "3",
    name: "DriveFix Auto",
    rating: 4.7,
    reviewCount: 112,
    city: "Târgoviște",
    distance: "4.5 km",
    address: "Str. Aleea Trandafirilor nr. 8, Târgoviște",
    hours: "Deschis · 08:00 - 18:00",
    services: ["Diagnoză", "Frâne", "Climă auto"],
    image: "https://images.unsplash.com/photo-1632823471406-36e1c0e185e7?w=400&h=250&fit=crop",
    nextAvailable: "Azi 14:00",
    isFavorite: false,
  },
  {
    id: "4",
    name: "Top Garage",
    rating: 4.8,
    reviewCount: 210,
    city: "Târgoviște",
    distance: "3.8 km",
    address: "Str. Laminorului nr. 5, Târgoviște",
    hours: "Deschis · 09:00 - 18:00",
    services: ["Revizie", "Schimb ulei", "Anvelope", "ITP"],
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop",
    nextAvailable: "Mâine 10:00",
    isFavorite: false,
  },
];

/* ---- Mock Appointments ---- */
export const mockAppointments: AppointmentItem[] = [
  {
    id: "a1",
    serviceName: "Revizie completă",
    shopName: "Auto Expert Service",
    date: "11 Oct 2026",
    time: "10:00",
    city: "Târgoviște",
    distance: "2.4 km",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=100&h=100&fit=crop",
  },
  {
    id: "a2",
    serviceName: "Diagnoză",
    shopName: "DriveFix Auto",
    date: "08 Oct 2026",
    time: "14:00",
    city: "Târgoviște",
    distance: "4.5 km",
    status: "pending",
    image: "https://images.unsplash.com/photo-1632823471406-36e1c0e185e7?w=100&h=100&fit=crop",
  },
  {
    id: "a3",
    serviceName: "Schimb ulei",
    shopName: "ProCar Service",
    date: "02 Oct 2026",
    time: "11:00",
    city: "Târgoviște",
    distance: "3.1 km",
    status: "completed",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=100&h=100&fit=crop",
  },
];

/* ---- Mock User Cars ---- */
export const mockCars: UserCar[] = [
  { id: "c1", brand: "BMW", model: "320d", plate: "B-123-ABC", year: "2020" },
  { id: "c2", brand: "Audi", model: "A4", plate: "B-456-XYZ", year: "2019" },
];

/* ---- Popular Services with placeholder images ---- */
export const popularServices = [
  {
    id: "revizie",
    name: "Revizie",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=200&h=200&fit=crop",
  },
  {
    id: "schimb-ulei",
    name: "Schimb ulei",
    image: "https://images.unsplash.com/photo-1635773054018-11377d3e2fa2?w=200&h=200&fit=crop",
  },
  {
    id: "anvelope",
    name: "Anvelope (montaj)",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop",
  },
  {
    id: "frane",
    name: "Frâne",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop",
  },
  {
    id: "diagnoza",
    name: "Diagnoză",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&h=200&fit=crop",
  },
  {
    id: "geometrie",
    name: "Geometrie (roți)",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=200&fit=crop",
  },
  {
    id: "clima-auto",
    name: "Climă auto",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=200&fit=crop",
  },
  {
    id: "itp",
    name: "ITP",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop",
  },
];
