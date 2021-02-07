const config = require("../config");

/**
 * Style Loader is used for watch mode, he injects CSS changes without reload
 */
let styleLoader = "style-loader";

/**
 * When not in watch mode, use MiniCssExtractPlugin.loader
 * Additionally make URL's relative to CSS file instead to WordPress root
 */
if ( ! config.enabled.watcher )
{
    const path = require("path");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    styleLoader = {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: (resourcePath, context) => {
                // Convert CSS background images to relative URI
                return path.relative(path.dirname(resourcePath), context) + '/';
            },
        },
    }
}

module.exports = {
    rules: [
        {
            enforce: "pre",
            test: /\.js$/,
            include: config.paths.src,
            use: "eslint-loader",
        },
        {
            enforce: "pre",
            test: /\.(js|s?[ca]ss)$/,
            include: config.paths.src,
            loader: "import-glob",
        },
        {
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [
                { loader: "cache-loader" },
                { loader: "babel-loader" }
            ],
        },
        {
            test: /\.s[ac]ss$/i,
            include: config.paths.src,
            use: [
                styleLoader,
                {
                    loader: "css-loader",
                    options: { importLoaders: 3 },
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            config: true,
                        },
                    },
                },
                { loader: "sass-loader" },
            ],
        },
        {
            test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
            include: config.paths.src,
            loader: "url-loader",
            options: {
                limit: 4096,
                name: `[path]${config.fileName}.[ext]`,
            },
        },
        {
            test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
            include: /node_modules/,
            loader: "url-loader",
            options: {
                limit: 4096,
                outputPath: "vendor/",
                name: `${config.fileName}.[ext]`,
            },
        },
    ],
};