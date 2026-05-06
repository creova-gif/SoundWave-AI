/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (Array.isArray(oneOfRule.use)) {
            oneOfRule.use.forEach((use) => {
              if (
                use &&
                typeof use === 'object' &&
                use.loader &&
                use.loader.includes('css-loader') &&
                use.options
              ) {
                use.options.url = false;
              }
            });
          }
        });
      }
    });
    return config;
  },
}

export default nextConfig
