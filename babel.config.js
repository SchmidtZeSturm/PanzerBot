module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }],
    ["@babel/preset-typescript"]
  ];

  const plugins = [
    "@babel/plugin-transform-modules-commonjs",
    [
      'module-resolver',
      {
        root: ["./src"],
        alias: {
          "~PanzerBot/": "./"
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ]
      },
    ],
  ];

  const babelConfig = {
    ignore: [
      "./**/*.spec.*"
    ],
    presets,
    plugins
  };

  console.log(babelConfig);

  return babelConfig;
}


