import "./globals.css";
import type { Metadata } from "next";
import { nunito } from "@/config/font";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Website Development Company 4u | Web Design, Next.js & Digital Growth",
    template: "%s | Website Development Company 4u",
  },
  description:
    "Leading website development company specializing in custom Next.js, WordPress, Shopify, bespoke UI/UX web design, and ROI-driven digital growth.",
  keywords: [
    "Website Development Company",
    "Web Design Company",
    "Next.js Web Development",
    "WordPress Development Company",
    "Shopify Store Development",
    "Custom Web Application",
    "Jaipur Website Development",
    "Website Development Company 4u",
  ],
  authors: [{ name: "Website Development Company 4u", url: site.url }],
  creator: "Website Development Company 4u",
  publisher: "Website Development Company 4u",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Website Development Company 4u | Bespoke Web Design & High-Performance Development",
    description:
      "Transform your business with high-speed, modern websites built on Next.js, WordPress, and Shopify. 500+ successful projects delivered worldwide.",
    url: site.url,
    siteName: "Website Development Company 4u",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Website Development Company 4u - Web Design & Development Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Company 4u | Web Design & Custom Web Apps",
    description:
      "High-converting web design, custom Next.js web applications, and scalable digital solutions.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: site.brandName,
      url: site.url,
      logo: `${site.url}/icon.png`,
      sameAs: [
        site.social.facebook,
        site.social.linkedin,
        site.social.instagram,
        site.social.pinterest,
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phones[0],
        contactType: "customer service",
        areaServed: ["IN", "US", "AE", "GB", "CA", "AU"],
        availableLanguage: ["en", "hi"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#localbusiness`,
      name: site.name,
      image: `${site.url}/og-image.png`,
      telephone: site.phones[0],
      email: site.email,
      url: site.url,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "F-1, 60/189, Heera Path, Ward 27, Mansarovar Sector 6",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302020",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 26.8525,
        longitude: 75.7683,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
