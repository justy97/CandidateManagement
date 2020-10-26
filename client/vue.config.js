const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname,'../server/public'),
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:5000'
            }
        }
    },
    // configureWebpack:{
    //     optimization: {
    //       splitChunks: {
    //         minSize: 10000,
    //         maxSize: 250000,
    //       }
    //     }
    // }
}