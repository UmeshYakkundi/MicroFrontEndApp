import { Configuration, container } from 'webpack';
const dep = require("./package.json");

export const webpackConfig: Configuration = {
  output: {
    publicPath: 'http://localhost:4200/',
    uniqueName: 'details',
  },
  experiments: {
    topLevelAwait: true,
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    
    new container.ModuleFederationPlugin({
      name: 'details',
      filename: 'remoteEntry.js',
      exposes: {
        './DetailsComponent': 'src/app/details/details.component.ts'
      },
      shared: {
        '@angular/core': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies['@angular/core']
        },
        '@angular/common': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies["@angular/common"]
        },
        '@angular/router': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies["@angular/router"],
        },
      }
    })
  ],
};
export default webpackConfig;