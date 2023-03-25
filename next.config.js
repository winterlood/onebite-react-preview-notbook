/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    NOTION_AUTH_TOKEN: process.env.NOTION_AUTH_TOKEN,
    NOTION_DATABSE_ID: process.env.NOTION_DATABSE_ID,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
