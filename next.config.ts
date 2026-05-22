import type { NextConfig } from "next";

/** STATIC_EXPORT=1 → folder out/ (hosting statis). DOCKER_BUILD=1 → standalone (Docker). */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const isDockerBuild = process.env.DOCKER_BUILD === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  ...(isStaticExport
    ? { output: "export" as const }
    : isDockerBuild
      ? { output: "standalone" as const }
      : {}),

  images: {
    ...(isStaticExport ? { unoptimized: true } : {}),
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    optimizePackageImports: [
      "@react-three/drei",
      "@react-three/fiber",
      "three",
    ],
  },

  async headers() {
    return [
      {
        source: "/panorama/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
