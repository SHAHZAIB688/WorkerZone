import electricianImg from "../assets/electrician.png";
import plumberImg from "../assets/plumber.jpg";
import painterImg from "../assets/painter.jpg";
import carpenterImg from "../assets/carpainter.jpg";
import masonImg from "../assets/mason.jpg";
import welderImg from "../assets/welder.jpg";
import rooferImg from "../assets/roofer.jpg";
import housekeeperImg from "../assets/housekeeper.jpg";
import cookImg from "../assets/cook.jpg";
import computerTechImg from "../assets/ComputerTechnician.jpg";
import securityInstallerImg from "../assets/SecuritySystemInstaller.jpg";
import loaderImg from "../assets/loader.jpg";
import gardenerImg from "../assets/gardner.jpg";
import guardImg from "../assets/guard.jpg";

function slugify(v) {
  return String(v)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const CATEGORIES = [
  { id: "electrician", name: "Electrician", image: electricianImg },
  { id: "plumber", name: "Plumber", image: plumberImg },
  { id: "painter", name: "Painter", image: painterImg },
  { id: "carpenter", name: "Carpenter", image: carpenterImg },
  { id: "mason", name: "Mason", image: masonImg },
  { id: "welder", name: "Welder", image: welderImg },
  { id: "roofer", name: "Roofer", image: rooferImg },
  { id: "housekeeper", name: "Housekeeper", image: housekeeperImg },
  { id: "cook", name: "Cook", image: cookImg },
  { id: "computer-tech", name: "Computer Technician", image: computerTechImg },
  { id: "security-installer", name: "Security System Installer", image: securityInstallerImg },
  { id: "loader", name: "Loader", image: loaderImg },
  { id: "gardener", name: "Gardener", image: gardenerImg },
  { id: "security-guard", name: "Security Guard", image: guardImg },
];

const demo = [
  {
    name: "Ali Electric Works",
    categoryId: "electrician",
    location: "Lahore • Bata Pur",
    rate: 1500,
    experienceYears: 6,
    phone: "+92 300 1112222",
    about:
      "Certified electrician for home wiring, switches, fans, and fault troubleshooting. Fast response and clean finishing.",
    services: ["Wiring & rewiring", "Fault diagnosis", "Fans & lights", "Switchboard repair"],
    images: [electricianImg],
    listedAt: "2 hours ago",
  },
  {
    name: "Umar Plumbing",
    categoryId: "plumber",
    location: "Lahore • DHA",
    rate: 2000,
    experienceYears: 8,
    phone: "+92 300 2223333",
    about: "Leak fixes, bathroom fittings, pipelines, and water motor installation. Same-day service available.",
    services: ["Leak fixing", "Bathroom fittings", "Pipeline repair", "Motor installation"],
    images: [plumberImg],
    listedAt: "5 hours ago",
  },
  {
    name: "Hassan Paint & Polish",
    categoryId: "painter",
    location: "Lahore • Johar Town",
    rate: 2500,
    experienceYears: 7,
    phone: "+92 300 3334444",
    about: "Interior/exterior paint, texture, and polish work. Color guidance and fast completion.",
    services: ["Interior paint", "Exterior paint", "Texture", "Wood polish"],
    images: [painterImg, carpenterImg],
    listedAt: "1 day ago",
  },
  {
    name: "Bilal Welding Shop",
    categoryId: "welder",
    location: "Lahore • Shahdara",
    rate: 2200,
    experienceYears: 10,
    phone: "+92 300 4445555",
    about: "Gate grills, railings, fabrication, and repair. Durable joints and proper finishing.",
    services: ["Gate & grills", "Railing", "Fabrication", "Repair work"],
    images: [welderImg],
    listedAt: "3 days ago",
  },
  {
    name: "Sajjad Carpenter",
    categoryId: "carpenter",
    location: "Lahore • Model Town",
    rate: 2800,
    experienceYears: 9,
    phone: "+92 300 5556666",
    about: "Custom furniture, door fitting, cabinets, and repairs. Clean measurements and premium finishing.",
    services: ["Furniture", "Cabinets", "Door fitting", "Repairs"],
    images: [carpenterImg],
    listedAt: "4 days ago",
  },
  {
    name: "Adeel Gardener",
    categoryId: "gardener",
    location: "Lahore • Wapda Town",
    rate: 1800,
    experienceYears: 5,
    phone: "+92 300 6667777",
    about: "Lawn care, trimming, seasonal planting, and maintenance. Weekly and monthly plans available.",
    services: ["Lawn mowing", "Trimming", "Planting", "Maintenance plans"],
    images: [gardenerImg],
    listedAt: "1 week ago",
  },
];

export const WORKERS = demo.map((w) => {
  const id = `${w.categoryId}-${slugify(w.name)}`;
  return { id, ...w };
});

export function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id) || null;
}

export function getWorkerById(id) {
  return WORKERS.find((w) => w.id === id) || null;
}

export function searchWorkers({ q = "", category = "" } = {}) {
  const query = String(q || "").trim().toLowerCase();
  const cat = String(category || "").trim().toLowerCase();

  return WORKERS.filter((w) => {
    if (cat && w.categoryId !== cat) return false;
    if (!query) return true;
    const hay = `${w.name} ${w.location} ${w.categoryId} ${w.services?.join(" ")}`.toLowerCase();
    return hay.includes(query);
  });
}

