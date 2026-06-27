import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "die-libertaeren.de",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;