import type { NextConfig } from "next";


// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
}
 
module.exports = {
  async rewrites() {
    return [
/*       {
        source: '/api/test', // Explicitly match /api/test
        destination: 'http://localhost:8080/api/test', // Forward to this URL
        basePath: false,
      }, */
      {
        source: '/api/:path*', // Match all other paths starting with /api
        destination: 'http://localhost:8080/api/:path*',
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
