// next.config.mjs
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve( 'src'),
        };
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                port: '',
                pathname: '/images/M/**',
            },
            {
                protocol: 'https',
                hostname: 'image.openmoviedb.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.mds.yandex.net',
            },
        ],
    },

};

export default nextConfig;