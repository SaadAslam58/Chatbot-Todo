import type { NextConfig } from "next";

// For GitHub Pages, we need to avoid features that don't work with static export
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.VERCEL_ENV === 'preview';

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
  basePath: isGitHubPages ? '/Chatbot-Todo' : '', // Adjust for GitHub Pages subdirectory
};

export default nextConfig;
