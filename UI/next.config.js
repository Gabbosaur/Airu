/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for React debugging
  output: 'standalone', // Enables Next.js standalone mode (optimized for Docker)
  // trailingSlash: false, // Ensures no extra slashes in routes unless needed
  // outputFileTracingRoot: './',
  //assetPrefix: './', // Ensures assets are served from the correct path
};

module.exports = nextConfig;
