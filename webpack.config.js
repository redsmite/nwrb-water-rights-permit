const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true,
    resolve: {
        alias: {
          "firebase/app": require.resolve("firebase/app"),
          "firebase/firestore": require.resolve("firebase/firestore"),
        },
    },
      
      
}