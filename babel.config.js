module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        modules: false,
        useBuiltIns: 'usage',
        targets: {
          browsers: ['defaults']
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: ['@babel/syntax-dynamic-import'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            corejs: 3,
            modules: 'commonjs',
            useBuiltIns: 'usage',
            targets: { node: 'current' }
          }
        ],
        '@babel/preset-react'
      ],
      plugins: ['dynamic-import-node']
    }
  }
}
