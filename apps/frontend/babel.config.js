module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        { lazyImports: true, jsxImportSource: 'nativewind' },
      ],
      "nativewind/babel",
    ],
    plugins: [
      ['babel-plugin-react-compiler', { target: '18' }],
      [
        'module-resolver',
        {
          alias: {
            '@app': './app',
            '@components': './components',
            '@lib': './lib',
          },
        }
      ]
    ]
  };
};
