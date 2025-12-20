import { withPayload } from "@payloadcms/next/withPayload";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import withPlaiceholder from "@plaiceholder/next";

/** @type {import("next").NextConfig} */
const config = {
	images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'portfolio-geso.vercel.app',
        port: '',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
 
	typescript: { ignoreBuildErrors: true },
};

export default withPlaiceholder(withPayload(config));
