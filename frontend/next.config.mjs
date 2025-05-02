/** @type {import('next').NextConfig} */

// const nextConfig = {};

// export default nextConfig;

// import withPWAImport from "next-pwa";

// const withPWA = withPWAImport.default ?? withPWAImport;

// const runtimeCaching = [
//   {
//     urlPattern: /^https:\/\/meal-planner-f0hh\.onrender\.com\/api\/plan\/week/,
//     handler: "NetworkFirst",
//     options: {
//       cacheName: "meal-api-cache",
//       expiration: {
//         maxEntries: 10,
//         maxAgeSeconds: 60 * 60 * 24,
//       },
//       networkTimeoutSeconds: 10,
//     },
//   },
// ];

// const nextConfig = {
//   reactStrictMode: true,
// };

// export default withPWA({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === "development",
//   runtimeCaching,
// })(nextConfig);

import withPWAImport from "next-pwa";

const withPWA = withPWAImport.default ?? withPWAImport;

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
