import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Required for GitHub Pages
  images: {
    unoptimized: true, // Required for GitHub Pages
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
  trailingSlash: true, // Required for GitHub Pages
  basePath: process.env.GITHUB_PAGES ? '/Chatbot-Todo' : '', // Adjust for GitHub Pages subdirectory
};

export default nextConfig;
