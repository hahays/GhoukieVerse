/** @type {import('next').NextConfig} */
const nextConfig = {};

// // export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;
export function webpack(config) {
  config.cache = false;
  config.performance = { hints: false };
  return config;
}
