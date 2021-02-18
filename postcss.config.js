const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer(),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
};
