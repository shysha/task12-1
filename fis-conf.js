// fis.config.set('settings.postpackager.simple.autoCombine', true);
//加MD5
fis.match('*.{js,css,png}',{
	useHash:true
});
//压缩
// fis.match('*.js',{
// 	optimizer:fis.plugin('uglify-js')
// });
fis.match('*.css',{
	optimizer:fis.plugin('clean-css')
});
fis.match('*.png',{
	optimizer:fis.plugin('png-compressor')
});
fis.match('*.html', {
  optimizer: fis.plugin('html-minifier')
});



 //打包，合并
fis.match('::packager', {
  postpackager: fis.plugin('loader', {
    allInOne: true
  })
});
// 启用 fis-spriter-csssprites 插件
fis.match('::package',{
	spriter:fis.plugin('csssprites')
});
//对css图片合并
fis.match('*.css',{
	useSprite:true
});
//静态文件
fis.match('*.{png,jpg,jpeg,js,css}', {
  release: '/static/$0'
});