/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.googleusercontent.com',  
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',  
            },
            {
                protocol: 'https',
                hostname: 'thumbs.onlyfans.com',  
            },
            {
                protocol: 'https',
                hostname: 'public.onlyfans.com',  
            },
        ],
    },
};

export default nextConfig;
