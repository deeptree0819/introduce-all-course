/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "allrobotai-deeptree.s3.ap-northeast-2.amazonaws.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
        port: "",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        port: "",
      },
    ],
    minimumCacheTTL: 31536000,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      loader: "@svgr/webpack",
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: { cleanupIds: false, removeViewBox: false },
              },
            },
          ],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });
    return config;
  },
};

module.exports = nextConfig;
