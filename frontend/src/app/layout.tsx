import "./globals.css";
import type { Metadata } from "next";
import { nunito } from "@/config/font";

export const metadata: Metadata = {
  title: "Website Development Company 4u | Web Design & Digital Growth",
  description: "Bespoke website design, custom web development, and performance digital marketing tailored for business growth.",
  icons: {
    icon: [
      { url: "/images/favicon.png", sizes: "any" },
      { url: "/images/favicon.png", type: "image/png" },
    ],
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
