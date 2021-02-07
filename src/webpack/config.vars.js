// No need to edit this file unless something is wrong
// This will generate correct variables for webpack
const path = require("path");
const desire = require("./util/desire");

const { argv } = require("yargs");
const { merge } = require("webpack-merge");

console.log( path );

// Check for local config over
const userConfig = desire( `${__dirname}/../config-local`, `${__dirname}/../config` );

const isProduction = ("production" === argv.mode);
const rootPath = process.cwd();

return;

/**
 * Base config
 */
const config = merge(
    {
        mode: isProduction ? 'production' : 'development',
        copy: "+(icons|audio)/**/*",
        fileName: isProduction ? "[name]-[hash:8]" : "[name]",
        paths: {
            root: rootPath,
            src: path.join(rootPath, "src"),
            path: path.join(rootPath, "dist"),
            publicPath: `/${userConfig.publicPath}/dist/`,
        },
        enabled: {
            watcher: argv.watch,
            production: isProduction,
        },
    },
    userConfig
);

// Export config
module.exports = config;
