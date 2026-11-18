import dynamic from "next/dynamic";
import Hero from "../sections/Hero";
import About from "../sections/home/About";

// Below-the-fold sections dynamically imported to maximize Mobile & Web performance
const ServicesTabs = dynamic(() => import("../sections/home/ServicesTabs"));
const HomeProcessSection = dynamic(() => import("../sections/home/SDLCProcessSection"));
const WhyLead = dynamic(() => import("../sections/home/WhyLead"));
const RealBusinesses = dynamic(() => import("../sections/home/RealBusinesses"));
const Projects = dynamic(() => import("../sections/home/Projects"));
const ClientsMarquee = dynamic(() => import("../sections/home/ClientsMarquee"));
const Industries = dynamic(() => import("../sections/home/Industries"));
const Testimonials = dynamic(() => import("../sections/home/Testimonials"));
const Technology = dynamic(() => import("../sections/home/technology"));
const Team = dynamic(() => import("../sections/home/Team"));
const GlobalClient = dynamic(() => import("../sections/home/GlobalClient"));
const Faq = dynamic(() => import("../sections/home/Faq"));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesTabs />
      <HomeProcessSection />
      <WhyLead />
      <RealBusinesses />
      <Projects />
      <ClientsMarquee />
      <Industries />
      <Testimonials />
      <Technology />
      <Team />
      <GlobalClient />
      <Faq />
    </>
  );
}
