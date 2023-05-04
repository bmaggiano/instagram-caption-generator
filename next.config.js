/** @type {import('next').NextConfig} */
module.exports = {
    experimental: {
      esmExternals: false, // THIS IS THE FLAG THAT MATTERS
    },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/Nutlope/twitterbio",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com/templates/next.js/twitter-bio",
        permanent: false,
      },
    ];
  },
  serverRuntimeConfig: {
    // This sets the maximum size of HTTP headers to 64KB
    maxHttpHeaderSize: 64 * 1024,
  },
};
