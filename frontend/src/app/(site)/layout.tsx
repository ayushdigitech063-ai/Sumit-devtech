import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import WhatsAppButton from "../component/WhatsUpButton";
import Preloader from "../component/Preloader";
import ClientOverlays from "../component/ClientOverlays";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <ClientOverlays />
    </>
  );
}
