import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js packages
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
  // Turbopack config (Next.js 16 default bundler)
  turbopack: {},
};

export default nextConfig;
