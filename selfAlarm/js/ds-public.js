/**/
$(document).on('contextmenu',function(ev){
	ev.preventDefault();
	return false;
});
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

/*点击后延迟页面跳转*/
function delayGo(str){
    var timer=null;
    clearTimeout(timer);
	timer=setTimeout(function(){
		window.parent.jump(str);
	},200);
}
function setFirstOpen(){
	var strArr=location.href.split('/');
	var str=strArr[strArr.length-1].split('.')[0];
	localStorage.setItem(str,true);
}
function getFirstOpen(){
	var strArr=location.href.split('/');
	var str=strArr[strArr.length-1].split('.')[0];
	return localStorage.getItem(str,true);
}
/*页面打开时的加载动画*/
function openLoad(opt){
	opt.showBool=opt.showBool||null;
	if(opt.showBool){
		$(opt.str).css('display','block');
		return;
	}
	dsLoading({
		txt:opt.txt,
		bool:true
	});
}
/*页面第一次打开时执行加载动画*/
function firstOpen(txt,str){
	if(!getFirstOpen()){
    	openLoad({
    		txt:txt,
    		str:str,
    	});
    }else{
    	openLoad({
    		txt:txt,
    		str:str,
    		showBool:true,
    	});
    }
}
/*隐藏加载动画*/
function hideLoading(opt){
	var timer=null;
	clearTimeout(timer);
	timer=setTimeout(function(){
		dsLoading({
			bool:false,
			fn:function(){
				$(opt.str).show();
				setFirstOpen();
			}
		});
	},2000);
}
/*threeChoices页面的背景图加载完成后关闭加载动画*/
function closeLoading(opt){
    var src=$('.ds-testBodyBg').attr('data-src');
    $('.ds-testBodyBg').attr('src',src);
    $('.ds-testBodyBg').get(0).onload=function(){
    	hideLoading({
    		txt:opt.txt,
    		str:opt.str
    	});
    };
}


