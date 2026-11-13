import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import WhatsAppButton from "../component/WhatsUpButton";
import ExitIntentModal from "./modal/page";
import Chatbot from "../component/Chatbot";
import Preloader from "../component/Preloader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <Header />
      {children}
      <Footer />
      <ExitIntentModal />
      <WhatsAppButton />
      <Chatbot />
    </>
  );
}
