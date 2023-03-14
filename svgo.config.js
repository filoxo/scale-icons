export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false, // validation requires viewBox
        },
      },
    },
    'removeXMLNS', // not needed by individual icons
  ],
};