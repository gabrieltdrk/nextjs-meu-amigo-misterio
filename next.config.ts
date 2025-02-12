import type { NextConfig } from "next";

const isDev = `${process.env.DEV_MODE}`

const nextConfig: NextConfig = {
  basePath: '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  assetPrefix: isDev ? undefined : `${process.env.VERCEL_ASSETPREFIX}`
};

export default nextConfig;
