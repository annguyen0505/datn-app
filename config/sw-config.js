module.exports = {
  cache: {
    cacheId: "datn-app",
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: "\/$"
    }],
    staticFileGlobs: ['dist/**/*']
  },
  manifest: {
    background: "#FFFFFF",
    title: "datn-app",
    short_name: "PWA",
    theme_color: "#FFFFFF"
  }
};
