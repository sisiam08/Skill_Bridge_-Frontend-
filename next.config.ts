import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vercel.com",
        pathname: "/uploads/**",
      },
      // Vercel Blob storage
      {
        protocol: "https",
        hostname: "*.vercel-storage.com",
      },
      // Backend uploaded images
      {
        protocol: "https",
        hostname: "skillbridgeserver-one.vercel.app",
        pathname: "/uploads/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.AUTH_URL}/:path*`,
      },
    ];
  },
};

export default config;
