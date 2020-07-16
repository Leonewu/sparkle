module.exports = {
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
