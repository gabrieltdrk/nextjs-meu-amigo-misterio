import type { NextConfig } from "next";

const isDev = `${process.env.DEV_MODE}`

const nextConfig: NextConfig = {
  basePath: '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  assetPrefix: isDev ? undefined : 'https://nextjs-secret-santa.vercel.app'
};

export default nextConfig;
