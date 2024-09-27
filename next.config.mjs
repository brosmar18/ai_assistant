/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['img.clerk.com'], // Allow images from Clerk's image domain
    },
    eslint: {
      ignoreDuringBuilds: true, // This disables ESLint during production builds
    },
  };
  
  export default nextConfig;
  