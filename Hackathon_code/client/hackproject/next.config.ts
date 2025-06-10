/** @type {import('next').NextConfig} */
interface ExperimentalConfig {
  appDir: boolean;
  serverActions: boolean;
}

interface ImagesConfig {
  formats: string[];
}

interface CompilerConfig {
  removeConsole: boolean;
}

interface NextConfig {
  reactStrictMode: boolean;
  swcMinify: boolean;
  transpilePackages: string[];
  experimental: ExperimentalConfig;
  images: ImagesConfig;
  compiler: CompilerConfig;
  productionBrowserSourceMaps: boolean;
  webpack: (config: unknown) => unknown;
  redirects?: () => Promise<{ source: string; destination: string; permanent: boolean }[]>;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['react-leaflet', 'leaflet'],
  experimental: {
    appDir: true,
    serverActions: true
  },
  images: {
    formats: ['image/avif', 'image/webp']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/hero',
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig