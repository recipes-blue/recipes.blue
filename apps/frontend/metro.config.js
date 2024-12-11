// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // HACK: manually resolve a few packages that use `exports` in `package.json`.
  // A proper solution is to enable `unstable_enablePackageExports` but this needs careful testing.
  if (moduleName === '@atcute/client') {
    return context.resolveRequest(context, '@atcute/client/dist', platform)
  }
  if (process.env.BSKY_PROFILE) {
    if (moduleName.endsWith('ReactNativeRenderer-prod')) {
      return context.resolveRequest(
        context,
        moduleName.replace('-prod', '-profiling'),
        platform,
      )
    }
  }
  return context.resolveRequest(context, moduleName, platform)
}

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
