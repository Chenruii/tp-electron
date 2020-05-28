// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, 'file://${__dirname}/index.html'),
    minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
    },
    templateParameters(compilation, assets, options) {
        return {
            compilation: compilation,
            webpack: compilation.getStats().toJson(),
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
                files: assets,
                options: options
            },
            process,
        };
    },
    nodeModules: process.env.NODE_ENV !== 'production' ?
        path.resolve(__dirname, '../node_modules') :
        false
})
