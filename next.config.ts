import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/16',
				permanent: true,
			},
		]
	},
};

export default nextConfig;
