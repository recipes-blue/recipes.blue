import pkg from './package.json';

export default () => {
  const VERSION = pkg.version;

  return {
    /** @type {import('@expo/config-types').ExpoConfig} */
    expo: {
      name: 'Cookware',
      slug: 'cookware',
      scheme: 'cookware',
      version: VERSION,
      orientation: 'portrait',
      userInterfaceStyle: 'automatic',
      newArchEnabled: true,
      ios: {
        supportsTablet: true,
      },
      web: {
        bundler: 'metro',
      },
      plugins: ['expo-font'],
    },
  }
}
