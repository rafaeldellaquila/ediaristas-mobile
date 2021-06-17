module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    Plugins: [
      [
        'module-resolver',
        {
          alias: {
            data: './src/data',
            ui: './src/ui',
            pages: './src/pages',
            '@assets': './assets',
            '@styles': './src/ui/styles',
          },
        },
      ],
      'react-native-paper/babel',
    ],
  };
};
