module.exports = {
    entry: {
      dev: "./src/index.tsx",
    },
    output: {
      filename: "./build/index.js",
    },
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      loaders: [
        // Typescript
        { test: /\.tsx?$/, loader: "ts-loader" },
      ],
      rules: [
        {
          // babel loader
        },
        {
          test: /\.(png|jpg|gif|svg)$/, // 확장자가 png, jpg, gif, svg인것에 대해서만 등록
          loader: 'file-loader',
        },  
      ],
    },
  };