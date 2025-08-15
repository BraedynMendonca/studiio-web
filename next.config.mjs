/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if(!isServer){
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false,
          os: false,
          child_process: false,
        }
      }
    }
    return config;
  }
}

export default nextConfig
