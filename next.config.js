/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    protocol: 'https',
    domains: ["workable-marble-constrictor.glitch.me"],
  },
}

module.exports = nextConfig
