module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        { lazyImports: true },
      ]
    ],
    plugins: [
      ['babel-plugin-react-compiler', { target: '18' }],
      [
        'module-resolver',
        {
          alias: {
            '@app': './app',
            '@lib': './lib',
          },
        }
      ]
    ]
  };
};
