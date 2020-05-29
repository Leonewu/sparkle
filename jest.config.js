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
    'src/components/*/*.vue',
    'src/components/*/*.jsx',
    '!src/components/demo/**',
    '!**/node_modules/**'
  ],
  coverageReporters: [
    // 'html',
    'text-summary'
  ]
}
