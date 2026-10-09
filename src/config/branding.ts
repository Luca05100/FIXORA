/**
 * FIXORA — Central branding & configuration
 * All client-specific values in one place for easy white-labeling.
 */

export const branding = {
  name: "FIXORA",
  tagline: "Service auto, mai simplu ca oricând.",
  description:
    "Programează-te online la service-ul preferat, fără telefoane și fără așteptare.",

  colors: {
    primary: "#F26522",       // FIXORA orange
    primaryHover: "#D9551A",  // darker orange on hover
    primaryLight: "#FFF0E6",  // very light orange bg
    dark: "#1A1A1A",          // near-black for header
    text: "#111111",
    textMuted: "#666666",
    textLight: "#999999",
    border: "#E5E5E5",
    bgLight: "#F7F7F7",
    bgWhite: "#FFFFFF",
    star: "#FFB800",
    success: "#22C55E",
    danger: "#EF4444",
    info: "#3B82F6",
  },

  nav: [
    { label: "Acasă", href: "/" },
    { label: "Servicii", href: "/servicii" },
    { label: "Service-uri", href: "/service-uri" },
    { label: "Despre noi", href: "/despre" },
    { label: "Pentru service-uri", href: "/admin/login" },
  ],

  services: [
    { id: "revizie", name: "Revizie", icon: "🔧" },
    { id: "schimb-ulei", name: "Schimb ulei", icon: "🛢️" },
    { id: "anvelope", name: "Anvelope", icon: "🔩" },
    { id: "frane", name: "Frâne", icon: "🛑" },
    { id: "diagnoza", name: "Diagnoză", icon: "💻" },
    { id: "itp", name: "ITP", icon: "📋" },
    { id: "geometrie", name: "Geometrie", icon: "📐" },
    { id: "clima-auto", name: "Climă auto", icon: "❄️" },
  ],

  benefits: [
    {
      title: "Programare în mai puțin de 1 minut",
      description: "Rapid și ușor, direct de pe telefon.",
      icon: "Zap",
    },
    {
      title: "Prețuri transparente și oferte reale",
      description: "Știi exact cât plătești, fără surprize.",
      icon: "BadgeEuro",
    },
    {
      title: "Service-uri verificate și evaluate",
      description: "Doar service-uri de încredere, cu recenzii reale.",
      icon: "ShieldCheck",
    },
    {
      title: "Notificări și confirmări automate",
      description: "Primești reminder și confirmare pe email.",
      icon: "BellRing",
    },
  ],

  contact: {
    phone: "0722 123 456",
    email: "contact@fixora.ro",
    address: "Târgoviște, România",
  },

  workingHours: {
    weekdays: "08:00 - 18:00",
    saturday: "08:00 - 14:00",
    sunday: "Închis",
    luniVineri: "08:00 - 18:00",
    sambata: "08:00 - 14:00",
    duminica: "Închis",
  },

  meta: {
    title: "FIXORA — Service auto, mai simplu ca oricând",
    description:
      "Programează-te online la service-ul auto preferat. Rapid, simplu, fără apeluri telefonice.",
    keywords:
      "service auto, programare online, vulcanizare, detailing, revizie auto, ITP",
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} FIXORA. Toate drepturile rezervate.`,
    poweredBy: "FIXORA",
  },
} as const;

export type Branding = typeof branding;
export const brandConfig = branding;
