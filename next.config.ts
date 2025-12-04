import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  devIndicators: false,
  /* config options here */
  experimental: {
    authInterrupts: true,
    typedEnv: true,
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/profile",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
