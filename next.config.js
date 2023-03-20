/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    NOTION_AUTH_TOKEN: process.env.NOTION_AUTH_TOKEN,
    NOTION_DATABSE_ID: process.env.NOTION_DATABSE_ID,
  },
};

module.exports = nextConfig;
