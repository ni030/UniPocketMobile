const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

//firebase
config.resolver.sourceExts.push('cjs', 'jsx', 'js', 'ts', 'tsx');

module.exports = withNativeWind(config, { input: './global.css' });
