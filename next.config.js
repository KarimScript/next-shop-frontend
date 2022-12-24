/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    protocol: 'https',
    domains: ["next-shop-backend-production.up.railway.app"],
  },
}

module.exports = nextConfig
