// next.config.js


const nextConfig = {
  /**
   * Configure image optimization and caching.
   */
  images: {
    /**
     * Define remote patterns for image optimization.
     */
    remotePatterns: [
      {
        /**
         * Protocol for the remote image URL.
         */
        protocol: 'https',
        /**
         * Hostname pattern for the remote image URL.
         * The '**' is a wildcard character that matches any subdomain.
         */
        hostname: 'm.media-amazon.com',
        /**
         * Port number for the remote image URL (optional).
         */
        port: '',
        /**
         * Search query parameters for the remote image URL (optional).
         */
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'resizing.flixster.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;