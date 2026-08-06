/** @type {import('next').NextConfig} */
console.log("🔧 BUILD-TIME ENV - NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
