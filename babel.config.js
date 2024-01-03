module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.jsx', '.js', '.json'],
        alias: {
          '@components': './src/components',
          '@extra': './src/extra',
          '@router': './src/router',
          '@screens': './src/screens',
          '@stores': './src/stores',
          '@assets': './src/assets',
          '@api': './src/api',
        },
      },
    ],
  ],
};
