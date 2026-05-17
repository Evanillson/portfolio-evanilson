import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/portfolio-evanilson" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  turbopack: {},
};

export default nextConfig;
