// Uses the app's existing webpack/Babel loaders, no added dependency or production route.
const webpack=require('webpack'),fs=require('fs'),path=require('path');
const out=process.env.GALLERY_OUTPUT||'/tmp/trustify-theme-gallery';
webpack({mode:'development',entry:path.join(__dirname,'theme-gallery.js'),output:{path:out,filename:'gallery.js'},devtool:false,
  module:{rules:[{test:/\.js$/,exclude:/node_modules/,use:{loader:require.resolve('babel-loader'),options:{babelrc:false,configFile:false,presets:[[require.resolve('@babel/preset-react'),{runtime:'automatic'}]]}}},{test:/\.css$/,use:[require.resolve('style-loader'),require.resolve('css-loader')]},{test:/\.ttf$/,type:'asset/resource'}]},
  resolve:{extensions:['.js','.json']},plugins:[new webpack.DefinePlugin({'process.env.NODE_ENV':JSON.stringify('development')})],
},(err,stats)=>{if(err||stats.hasErrors()){console.error(err||stats.toString({all:false,errors:true}));process.exitCode=1;return}fs.writeFileSync(path.join(out,'index.html'),'<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Trustify · MUI theme review</title><div id="root"></div><script src="gallery.js"></script></html>');console.log('Built real-MUI gallery at '+out)});
