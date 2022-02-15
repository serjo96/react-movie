module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      '@babel/react',
      '@babel/preset-env',
      '@babel/preset-typescript'
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      ['@babel/plugin-proposal-decorators', {
        legacy: true
      }],
      'transform-class-properties',
      'transform-es2015-unicode-regex',
      ...(!api.env('production') && { plugins: ['react-refresh/babel'] })
    ]
  };
};
