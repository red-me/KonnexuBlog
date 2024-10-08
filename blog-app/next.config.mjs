import NextFederationPlugin from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Allow images from Unsplash
        port: '', // Leave empty for default
        pathname: '/**', // Match any path
      },
    ],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'blog-app',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {},
          exposes: {
            './blog': './pages/blog/index.jsx',
          },
          shared: {
            // ...deps,
            'tailwindcss': {
              singleton: true, // Ensure there's only one instance of Tailwind CSS loaded
              requiredVersion: false,
            },
          },
        })
      );
    }
    return config;
  },
};

process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

export default nextConfig;
