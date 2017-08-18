$(function () {
    //console.log(document);
//    var documentH = document.he
//    $(document).height();
//    window.onresize = function () {
//    window.parent.heightChange($(document).height())
//};
	
});
function heightChange(h) {
	/*if($('#iframeView').height()<h){
		return;
	}*/
    $('#iframeView').height(h);
}
function jump(path) {
    $('#iframeView').attr({
        src: path
    });
}

/*打开首页时调整iframe和footer*/
function setIframeSize(){
    var win=$(window),timer=null;
    var oFrame=$('#iframeView');
    var oHeader=$('.header');
    var oFooter=$('.footer');
    var winHeight=win.innerHeight();
    var headHeight=oHeader.height();
    var footHeight=oFooter.outerHeight();
    oFrame.css('height',winHeight-(headHeight+footHeight));
    $('.body').css('padding-bottom','80px');
    win.on('resize',function(){
    	clearTimeout(timer);
    	timer=setTimeout(function(){
    		var winHeight=win.innerHeight();
    		var headHeight=oHeader.height();
    		var footHeight=oFooter.outerHeight();
    		oFrame.css('height',winHeight-(headHeight+footHeight));
    	},200);
    });
}
/*加载---S*/
;(function(window,$){
	var dsLoading=function(opt){
		if(!$.isPlainObject(opt)){
			console.warn('对象...');
			return;
		};
		if(opt.txt&&typeof opt.txt!=='string'){
			console.warn('字符串...');
			return;
		}
		if(typeof opt.bool!=='boolean'){
			console.warn('布尔值...');
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