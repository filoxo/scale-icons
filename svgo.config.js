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
    {
      name: 'add-filename-as-id',
      /**
       * Automatically add svg id using original filename (without extension)
       */
      fn: (_ast, _params, info) => {
        return {
          element: {
            enter: (node, parentNode) => {
              if (node.name === 'svg' && parentNode.type === 'root') {
                const filename = info.path.split('/').pop().split('.').shift();
                // filename passed through as-is.
                // further transforms can be applied, if needed. ie. node.attributes.id = kebabCase(filename) but that is better handled as validation.
                node.attributes.id = filename
              }
            },
          },
        };
      },
    },
    'removeXMLNS', // not needed by individual icons
  ],
};