/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.externals.push({
      knex: "commonjs knex",
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
