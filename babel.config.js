module.exports = function(api) {
  // https://babeljs.io/docs/en/config-files
  api.cache(false)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: process.env.BUILD_ENV === 'commonjs' ? 'commonjs' : false
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      'transform-vue-jsx',
      '@babel/plugin-transform-runtime'
    ],
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current'
              }
            }
          ]
        ]
      }
    }
  }
}
