module.exports = {
  'preset': 'ts-jest',
  'reporters': [
    'default',
    // 'jest-audio-reporter',
    '<rootDir>/dist/index.js'
  ],
  'roots': [
    '<rootDir>/src'
  ],
  'testEnvironment': 'node',
  'watchPlugins': [
    [
      'jest-watch-suspend'
    ],
    [
      'jest-watch-toggle-config',
      {
        'setting': 'verbose'
      }
    ],
    [
      'jest-watch-toggle-config',
      {
        'setting': 'collectCoverage'
      }
    ]
  ]
}
