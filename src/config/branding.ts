/**
 * FIXORA — Central branding & mock data configuration.
 * Colors: Orange #FF5A20, Off-White #FCF8F5, Dark Gray #1E1E1E
 */

export const branding = {
  name: "FIXORA",
  tagline: "Service auto, mai simplu ca oricând.",
  description: "Programează-te online la service-ul preferat, fără telefoane și fără așteptare.",
  colors: {
    primary: "#FF5A20",
    primaryHover: "#E04D18",
    primaryLight: "#FFF0E6",
    offWhite: "#FCF8F5",
    dark: "#1E1E1E",
    text: "#1E1E1E",
    textMuted: "#666666",
    border: "#E5E5E5",
    star: "#FFB800",
    success: "#22C55E",
    info: "#3B82F6",
  },
  nav: [
    { label: "Acasă", href: "/" },
    { label: "Servicii", href: "/servicii" },
    { label: "Service-uri", href: "/service-uri" },
    { label: "Despre noi", href: "/despre" },
  ],
  meta: {
    title: "FIXORA — Service auto, mai simplu ca oricând",
    description: "Programează-te online la service-ul auto preferat.",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} FIXORA. Toate drepturile rezervate.`,
  },
  contact: { phone: "0722 123 456", email: "contact@fixora.ro", address: "Târgoviște, România" },
  workingHours: { weekdays: "08:00 - 18:00", saturday: "08:00 - 14:00", sunday: "Închis" },
} as const;

export const brandConfig = branding;

/* ===================== MOCK DATA ===================== */

export interface ServiceShop {
  id: string; name: string; rating: number; reviewCount: number;
  city: string; distance: string; hours: string; services: string[];
  image: string; nextAvailable: string; isFavorite: boolean;
}

export interface AppointmentItem {
  id: string; serviceName: string; shopName: string; date: string;
  time: string; city: string; distance: string;
  status: "confirmed" | "completed" | "cancelled" | "in_service";
  image: string;
}

export interface UserCar {
  id: string; brand: string; model: string; plate: string; year: string;
}

export const mockShops: ServiceShop[] = [
  { id: "1", name: "Auto Expert Service", rating: 4.9, reviewCount: 320, city: "Târgoviște", distance: "2.4 km", hours: "Deschis · 08:00 - 18:00", services: ["Revizie", "Diagnoză", "Schimb ulei", "Frâne", "Climă auto"], image: "/placeholder-car.jpg", nextAvailable: "Azi 16:30", isFavorite: true },
  { id: "2", name: "ProCar Service", rating: 4.8, reviewCount: 190, city: "Târgoviște", distance: "3.1 km", hours: "Deschis · 08:00 - 17:00", services: ["Revizie", "Anvelope", "ITP", "Geometrie"], image: "/placeholder-car.jpg", nextAvailable: "Mâine 09:00", isFavorite: false },
  { id: "3", name: "DriveFix Auto", rating: 4.7, reviewCount: 112, city: "Târgoviște", distance: "4.5 km", hours: "Deschis · 08:00 - 18:00", services: ["Diagnoză", "Frâne", "Climă auto"], image: "/placeholder-car.jpg", nextAvailable: "Azi 14:00", isFavorite: false },
  { id: "4", name: "Top Garage", rating: 4.8, reviewCount: 210, city: "Târgoviște", distance: "3.8 km", hours: "Deschis · 09:00 - 18:00", services: ["Revizie", "Schimb ulei", "Anvelope", "ITP"], image: "/placeholder-car.jpg", nextAvailable: "Mâine 10:00", isFavorite: false },
];

export const mockAppointments: AppointmentItem[] = [
  { id: "a1", serviceName: "Revizie completă", shopName: "Pro Expert/Service", date: "11 Oct 2026", time: "10:00", city: "Târgoviște", distance: "2.4 km", status: "confirmed", image: "/placeholder-car.jpg" },
  { id: "a2", serviceName: "Diagnoză", shopName: "Driver's Auto", date: "08 Oct 2026", time: "14:00", city: "Târgoviște", distance: "4.5 km", status: "in_service", image: "/placeholder-car.jpg" },
  { id: "a3", serviceName: "Schimb ulei", shopName: "ProCar Service", date: "01 Oct 2026", time: "11:00", city: "Târgoviște", distance: "3.1 km", status: "completed", image: "/placeholder-car.jpg" },
];

export const mockCars: UserCar[] = [
  { id: "c1", brand: "Audi", model: "SW9", plate: "B-123-ABC · XY02", year: "2021" },
];

export const serviceCategories = [
  "Revizie", "Schimb ulei", "Frâne", "Anvelope", "Diagnoză", "ITP", "Geometrie", "Climă auto"
];

export const popularServices = [
  { id: "revizie", name: "Revizie", emoji: "🔧" },
  { id: "schimb-ulei", name: "Schimb ulei", emoji: "🛢️" },
  { id: "anvelope", name: "Anvelope (montaj)", emoji: "🔩" },
  { id: "frane", name: "Frâne", emoji: "🛑" },
  { id: "diagnoza", name: "Diagnoză", emoji: "💻" },
  { id: "geometrie", name: "Geometrie (roți)", emoji: "📐" },
  { id: "clima-auto", name: "Climă auto", emoji: "❄️" },
  { id: "itp", name: "ITP", emoji: "📋" },
];
