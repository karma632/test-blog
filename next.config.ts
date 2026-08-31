import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites(){
    return [
      // Better Auth routes
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/:path*`,
      },

      // NestJS API routes
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  }
};

export default nextConfig;
