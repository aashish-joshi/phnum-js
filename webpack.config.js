const path = require('path');

module.exports = {
    context: __dirname,
    target: "web",
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'sonetel-phnum.min.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
     }
}