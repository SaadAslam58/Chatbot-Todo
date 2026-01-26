import type { NextConfig } from "next";

// For GitHub Pages, we need to avoid features that don't work with static export
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.VERCEL_ENV === 'preview';

const nextConfig: NextConfig = {
  // Temporarily disable static export to see if build passes
  // output: 'export', // Required for GitHub Pages
  images: {
    unoptimized: true, // Required for GitHub Pages when using output: 'export'
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
  trailingSlash: true, // Good practice for GitHub Pages
  basePath: isGitHubPages ? '/Chatbot-Todo' : '', // Adjust for GitHub Pages subdirectory

  // Skip middleware for static export (this is the main issue)
  experimental: {
    // Conditionally disable features that don't work with static export
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
