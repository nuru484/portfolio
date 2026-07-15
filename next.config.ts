import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

// Applied to every route. A full Content-Security-Policy is deliberately
// omitted for now (TinyMCE's CDN + GA inline bootstrap would need careful
// allowlisting); frame-ancestors covers the clickjacking half of it.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  ...(isProduction
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  // Server-only packages that must not be bundled (jsdom, worker threads).
  serverExternalPackages: ['isomorphic-dompurify', 'jsdom', 'pino'],
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      // Placeholder images used by the local demo seed — dev only.
      ...(isProduction
        ? []
        : [
            {
              protocol: 'https' as const,
              hostname: 'picsum.photos',
              pathname: '/**',
            },
          ]),
    ],
  },
};

export default nextConfig;
