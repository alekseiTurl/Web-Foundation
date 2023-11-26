module.exports = {
    presets: [
        [
            '@babel/preset-typescript',
            {
                targets: 'defaults and supports es6-module',
                useBuiltIns: 'usage',
                corejs: '3.6.5',
            },
        ],
    ],
    // env: {
    //     modern: {
    //         presets: [
    //             [
    //                 '@babel/preset-env',
    //                 {
    //                     modules: 'false',
    //                 },
    //             ],
    //         ],
    //     },
    //     legacy: {
    //         presets: [
    //             [
    //                 '@babel/preset-env',
    //                 {
    //                     targets: 'es2015',
    //                     useBuiltIns: 'usage',
    //                     corejs: '3.6.5',
    //                 },
    //             ],
    //         ],
    //     },
    // },
    parserOpts: {
        plugins: ['transform-object-rest-spread', 'transform-es2015-spread', 'transform-es2015-destructuring'],
    },
}
