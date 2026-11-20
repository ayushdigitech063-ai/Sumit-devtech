import Hero from "../sections/Hero";
import About from "../sections/home/About";
import ServicesTabs from "../sections/home/ServicesTabs";
import HomeProcessSection from "../sections/home/SDLCProcessSection";
import WhyLead from "../sections/home/WhyLead";
import RealBusinesses from "../sections/home/RealBusinesses";
import Projects from "../sections/home/Projects";
import ClientsMarquee from "../sections/home/ClientsMarquee";
import Industries from "../sections/home/Industries";
import Testimonials from "../sections/home/Testimonials";
import Technology from "../sections/home/technology";
import Team from "../sections/home/Team";
import GlobalClient from "../sections/home/GlobalClient";
import Faq from "../sections/home/Faq";

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
