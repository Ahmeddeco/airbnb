import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint:{
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'otuebdaiujiwlrcgepnk.supabase.co' },
    ]
  }
}

export default nextConfig
