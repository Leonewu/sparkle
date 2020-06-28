module.exports = {
  roots: ['src/'],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '.+\\.vue$': 'vue-jest',
    '^.+\\.(spec.js|jsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.vue',
    'src/**/*.jsx',
    '!src/*/demo/**',
    '!src/common/**',
    '!**/node_modules/**'
  ],
  coverageReporters: [
    // 'html',
    'text-summary'
  ]
}
