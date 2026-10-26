import type { Metadata } from "next";
import "./globals.css";
import { nunito } from "../config/font";
import Topbar from "./component/Topbar";
import Header from "./component/Header";
import Footer from "./component/Footer";
import WhatsAppButton from "./component/WhatsUpButton";
import ExitIntentModal from "./modal/page";

export const metadata: Metadata = {
  metadataBase: new URL("https://sumitdevtech.com"),
  title: {
    default: "Web Design And Development Company In Jaipur - Sumit DevTech",
    template: "%s | Sumit DevTech",
  },
  description:
    "Sumit DevTech is a leading web design and development company in Jaipur offering modern websites and digital solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body className="font-body antialiased">
        <Topbar />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ExitIntentModal />
      </body>
    </html>
  );
}