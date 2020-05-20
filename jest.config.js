module.exports = {
  roots: ['src/'],
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '.+\\.(vue)$': 'vue-jest',
    '^.+\\.spec.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/*/*.vue',
    '!src/components/demo/**',
    '!**/node_modules/**'
  ],
  coverageReporters: [
    'html',
    'text-summary'
  ]
}
