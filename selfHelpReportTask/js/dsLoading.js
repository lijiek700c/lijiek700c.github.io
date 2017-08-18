/*加载---S*/
;(function(window,$){
	var dsLoading=function(opt){
		if(!$.isPlainObject(opt)){
			console.warn('对象...');
			return;
		};
		if(opt.txt&&typeof opt.txt!=='string'){
			console.warn('字符串');
			return;
		}
		opt.box=opt.box||'.ds-loadingBox';
		opt.txt=opt.txt||'正在加载';
		var loadingBox=$(opt.box);
		if(opt.bool){
			var spanTxt=loadingBox.find('span');
			spanTxt.text(opt.txt);
			loadingBox.fadeIn(200,function(){
				opt.fn&&opt.fn();
			});
		}else{
			loadingBox.fadeOut(200,function(){
				opt.fn&&opt.fn();
			});
		}
	};
	if(!('dsLoading' in window)){
		window.dsLoading=dsLoading;
	}
})(window,$);
/*加载---E*/