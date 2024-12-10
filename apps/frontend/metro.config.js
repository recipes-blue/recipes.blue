// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: true,
    nonInlinedRequires: [
      // We can remove this option and rely on the default after
      // https://github.com/facebook/metro/pull/1390 is released.
      'React',
      'react',
      'react-compiler-runtime',
      'react/jsx-dev-runtime',
      'react/jsx-runtime',
      'react-native',
    ],
  },
});

module.exports = config;
