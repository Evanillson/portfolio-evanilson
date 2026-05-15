import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio-evanilson",
  images: { unoptimized: true },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  turbopack: {},
};

export default nextConfig;
