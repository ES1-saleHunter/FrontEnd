export default {
  buildModules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    jit: true,
    config: {
      purge: {
        enabled: process.env.NODE_ENV === "production",
        content: [
          "components/**/*.vue",
          "layouts/**/*.vue",
          "pages/**/*.vue",
          "plugins/**/*.js",
          "nuxt.config.js",
        ],
      },
    },
  },
  css: ["element-ui/lib/theme-chalk/index.css"],
  plugins: ["@/plugins/element-ui"],
};
