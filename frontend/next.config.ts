import type { NextConfig } from "next";

const backendUrl =
  process.env.BACKEND_URL ||
  (process.env.NODE_ENV === "production"
    ? "http://127.0.0.1:5000"
    : "http://localhost:5000");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "sumitdevtech.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/website-design",
        destination: "/services/website-design",
        permanent: true,
      },
      {
        source: "/php-website-development",
        destination: "/services/php-website-development",
        permanent: true,
      },
      {
        source: "/reactjs-website-development",
        destination: "/services/reactjs-website-development",
        permanent: true,
      },
      {
        source: "/wordpress-website-development",
        destination: "/services/wordpress-website-development",
        permanent: true,
      },
      {
        source: "/shopify-website-development",
        destination: "/services/shopify-website-development",
        permanent: true,
      },
      {
        source: "/ecommerce-website-development",
        destination: "/services/ecommerce-website-development",
        permanent: true,
      },
      {
        source: "/dynamic-website-design",
        destination: "/services/dynamic-website-design",
        permanent: true,
      },
      {
        source: "/responsive-website-design",
        destination: "/services/responsive-website-design",
        permanent: true,
      },
      {
        source: "/digital-marketing-services",
        destination: "/services/digital-marketing-services",
        permanent: true,
      },
      {
        source: "/maintenance-hosting-support",
        destination: "/services/maintenance-hosting-support",
        permanent: true,
      },
      {
        source: "/website-maintenance",
        destination: "/services/website-maintenance",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
