module.exports = {
    minimize: true,
    noEmitOnErrors: true,
    mangleWasmImports: true,
    splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
    },
};
