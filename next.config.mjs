/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        apiUrl: 'https://soul-connection.fr',
        devUrl: 'http://localhost:3000',
        prodUrl: 'http://localhost:3000', // 'https://soul-connection.vercel.app',
    },
};

export default nextConfig;
