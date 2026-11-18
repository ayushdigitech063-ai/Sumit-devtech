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
      {
        source: "/services/:slug",
        destination: "/:slug",
      },
    ];
  },
};

export default nextConfig;
