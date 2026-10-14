import { ShoppingCart, Plane, HeartPulse, Dumbbell, Film, GraduationCap, Utensils, Landmark, BookOpen } from "lucide-react";
import { IMG } from "./home";

// Only Ecommerce has real text and an image from your site.
// The other texts are drafts - replace them with your own wording.
export const industries = [
  { name: "Ecommerce", icon: ShoppingCart, image: `${IMG}/Ecommerce.webp`, text: "We build high-performing eCommerce websites that drive sales and enhance customer experience. From Shopify and WooCommerce to fully customized online stores, we focus on secure payments, mobile optimization, speed, and conversion-focused design to maximize revenue." },
  { name: "Travel", icon: Plane, text: "Booking-ready travel and tourism websites that showcase destinations, packages and enquiries in a way that turns visitors into travelers." },
  { name: "Healthcare", icon: HeartPulse, text: "Trustworthy, clear and easy-to-contact websites for clinics, doctors and hospitals, with appointment-friendly design." },
  { name: "Fitness", icon: Dumbbell, text: "Energetic websites for gyms, studios and trainers, with class schedules, memberships and easy sign-ups." },
  { name: "Entertainment", icon: Film, text: "Engaging, media-rich websites and platforms built to hold attention and grow your audience." },
  { name: "Education", icon: GraduationCap, text: "Institute websites, course platforms and learning portals that make admissions and learning simple." },
  { name: "Restaurant", icon: Utensils, text: "Appetizing websites with menus, online ordering and reservations that bring more people through the door." },
  { name: "Finance", icon: Landmark, text: "Secure, credible and compliant-minded websites for financial services, advisors and fintech products." },
  { name: "Blogging", icon: BookOpen, text: "Fast, SEO-friendly blogs with clean reading layouts and easy publishing tools." },
];