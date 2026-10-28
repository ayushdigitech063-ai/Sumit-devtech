import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import WhatsAppButton from "../component/WhatsUpButton";
import ExitIntentModal from "./modal/page";


export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ExitIntentModal />
      <WhatsAppButton/>
      
    </>
  );
}