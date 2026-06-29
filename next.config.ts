import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "die-libertaeren.de",
        pathname: "/wp-content/uploads/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/images/**",
      },
      {
        pathname: "/api/media/file/**",
      },
    ],
    qualities: [75, 85],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };

    return webpackConfig;
  },
  turbopack: {
    root: path.resolve(dirname),
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });