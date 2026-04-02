/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Migrated from 'ppr' to 'cacheComponents' per Next 16 Canary requirements
    cacheComponents: true,
    inlineCss: true,
    useCache: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  // Note: Ensure your 'app/render.py' does not require extra Linux 
  // dependencies not present in the Vercel build environment.
};

export default nextConfig;