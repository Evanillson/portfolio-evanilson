const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/portfolio-evanilson" : "";

export default function imageLoader({ src }: { src: string }) {
  return `${basePath}${src}`;
}
