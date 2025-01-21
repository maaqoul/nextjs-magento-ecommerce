/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "main-bvxea61-cpvklyexosup2.fr-4.platformsh.site",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["picsum.photos"],
  },
};

module.exports = nextConfig;
