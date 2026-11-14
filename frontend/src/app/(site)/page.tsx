import Hero from "../sections/Hero";
import About from "../sections/home/About";
import ClientsMarquee from "../sections/home/ClientsMarquee";
import Faq from "../sections/home/Faq";
import GlobalClient from "../sections/home/GlobalClient";
import Industries from "../sections/home/Industries";
import Projects from "../sections/home/Projects";
import RealBusinesses from "../sections/home/RealBusinesses";
import HomeProcessSection from "../sections/home/SDLCProcessSection";
import ServicesTabs from "../sections/home/ServicesTabs";
import Team from "../sections/home/Team";
import Technology from "../sections/home/technology";
import Testimonials from "../sections/home/Testimonials";
import WhyLead from "../sections/home/WhyLead";

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
