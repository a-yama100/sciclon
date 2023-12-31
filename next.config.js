// E:\programming\Project\sciclon\next.config.js

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
          config.resolve.fallback = {
              fs: false,
              net: false,
              tls: false,
              dns: false,
          };
      }

      return config;
  },
};
