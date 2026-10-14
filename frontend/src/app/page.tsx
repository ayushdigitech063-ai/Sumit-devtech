import Hero from "./sections/Hero";
import About from "./sections/home/About";
import Articles from "./sections/home/Articles";
import ClientsMarquee from "./sections/home/ClientsMarquee";
import Faq from "./sections/home/Faq";
import GlobalClient from "./sections/home/GlobalClient";
import Industries from "./sections/home/Industries";
import Process from "./sections/home/Process";
import Projects from "./sections/home/Projects";
import ServicesTabs from "./sections/home/ServicesTabs";
import Team from "./sections/home/Team";
import Technology from "./sections/home/technology";
import Testimonials from "./sections/home/Testimonials";
import WhyChoose from "./sections/home/WhyChoose";
import WhyLead from "./sections/home/WhyLead";

export default function Home() {
  return (
   <>
   <Hero />
   <About />
   <ServicesTabs />
   <WhyLead />
   <WhyChoose />
   <Projects />
   <ClientsMarquee />
   <Industries />
   <Process />
   <Testimonials />
   <Technology />
   <Team />
   <GlobalClient />
   <Articles />
   <Faq />
   </>
  );
}
