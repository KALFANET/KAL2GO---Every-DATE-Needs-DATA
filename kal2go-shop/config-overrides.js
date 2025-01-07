const webpack = require('webpack');

module.exports = function override(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        path: require.resolve("path-browserify"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
        buffer: require.resolve("buffer"),
        util: require.resolve("util"),
        url: require.resolve("url/"),
    };

    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ];

    return config;
};