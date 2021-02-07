const cssnanoConfig = {
    preset: [
        'default',
        { discardComments: { removeAll: true } }
    ],
};

module.exports = ({ options }) => {
    return {
        plugins: {
            'postcss-preset-env': true,
            'cssnano': options.enabled.production
                ? cssnanoConfig
                : false,
        },
    };
};