/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);

const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEED_UPDATE: process.env.NEED_UPDATE,
    VERSION: process.env.VERSION,
    ACCESS_EMAIL: process.env.ACCESS_EMAIL,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
