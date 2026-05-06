/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '*.replit.dev',
    '*.worf.replit.dev',
    '*.repl.co',
  ],
  // Disable typed route generation — without this, Next.js 16 rewrites
  // .next/dev/types/routes.d.ts on every route compile, which next-env.d.ts
  // imports, causing webpack to rebuild on every write to that file.
  typedRoutes: false,
  webpack: (config, { dev }) => {
    // Prevent webpack from trying to resolve url() references in CSS as modules.
    // Tailwind v4 generates mask-image: url(...) utilities; without this flag
    // webpack throws "Module not found: Can't resolve '...'" for that literal.
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
                use.options = { ...use.options, url: false };
              }
            });
          }
        });
      }
    });

    if (dev) {
      // Stop the infinite Fast Refresh rebuild loop.
      // Root cause: Replit writes to .local/state/replit/agent/.latest.json
      // continuously; webpack's default watcher picks that up and rebuilds.
      // We also ignore .next/ (build output) and node_modules as a safety net.
      config.watchOptions = {
        ...(config.watchOptions || {}),
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/next-env.d.ts',
          '**/.local/**',
          '**/.git/**',
          '**/attached_assets/**',
        ],
        aggregateTimeout: 500,
        poll: false,
      };
    }

    return config;
  },
}

export default nextConfig
