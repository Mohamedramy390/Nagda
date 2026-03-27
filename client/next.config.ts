import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/login",
        },
      ],
    };
  },

  async redirects() {
  return [
    {
      source: "/",
      destination: "/login",
      permanent: true, // 308 for true, 307 for false
    },
  ];
}
};

export default nextConfig;