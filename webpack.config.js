// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./gulp/config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const OptimizePlugin = require('optimize-plugin');

function createConfig(env) {
    let isProduction, webpackConfig;

    if (env === undefined) {
        env = process.env.NODE_ENV;
    }

    isProduction = env === 'production';

    const pluginsArray = isProduction
        ? [
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                analyzerPort: 4000,
                openAnalyzer: false
            }),
            new OptimizePlugin({
                downlevel: true,
                minify: isProduction,
                sourceMap: !isProduction,
                verbose: true,
                modernize: false
            })
        ]
        : [
            new webpack.ProgressPlugin(),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                analyzerPort: 4000,
                openAnalyzer: false
            })
        ];

    webpackConfig = {
        mode: isProduction ? 'production' : 'development',
        context: path.join(__dirname, config.src.js),
        target: [ 'web', 'es2017' ],
        entry: {
            // vendor: ['jquery'],
            app: './app.ts',
            ['helper-menu']: './helper-menu.ts'
        },
        output: {
            path: path.join(__dirname, config.dest.js),
            filename: '[name].js',
            publicPath: 'js/'
        },
        devtool: isProduction ? false : 'eval-cheap-module-source-map',
        plugins: pluginsArray,
        resolve: {
            extensions: [ '.ts', '.js' ],
            preferAbsolute: true,
            modules: [ config.src.root, 'node_modules' ]
        },
        optimization: {
            // minimize: isProduction,
            emitOnErrors: true,
            splitChunks: {
                chunks: 'async',
                minSize: 20000,
                minChunks: 1,
                maxAsyncRequests: 10,
                maxInitialRequests: 3,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
                // {
                //   enforce: 'pre',
                //   test: /\.js$/,
                //   exclude: [
                //     path.resolve(__dirname, 'node_modules'),
                //   ],
                //   loader: 'eslint-loader',
                //   options: {
                //     fix: true,
                //     cache: true,
                //     ignorePattern: __dirname + '/src/js/lib/'
                //   }
                // },
                // {
                //     test: /\.m?js$/,
                //     exclude: [ path.resolve(__dirname, 'node_modules') ],
                //     use: {
                //         loader: 'babel-loader',
                //         options: {
                //             presets: [ '@babel/preset-env' ],
                //         },
                //     },
                // },
                //{ test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
                //{ test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/ }
            ]
        }
    };

    if (isProduction) {
        webpackConfig.plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        );
    }

    return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
