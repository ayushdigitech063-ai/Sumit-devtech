import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
    remotePatterns: [{ protocol: "https", hostname: "sumitdevtech.com" }],
  },
  async rewrites() {
    const backend = process.env.BACKEND_URL;
    if (!backend) return [];
    return [{ source: "/api/:path*", destination: `${backend}/api/:path*` }];
  },
};

export default nextConfig;
