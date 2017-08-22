/*子页面中根据子页面的文档高度设置iframe的高度*/
function setParentHeight(){
	var timer=null;
	clearInterval(timer);
	timer=setInterval(function(){
			window.parent.heightChange($(document).height());
		},20);
	window.onload = function () {
	    window.parent.heightChange($(document).height());
	};
}
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
	var timer=null;
	opt.showBool=opt.showBool||null;
	if(opt.showBool){
		$(opt.str).css('display','block');
		return;
	}
	window.parent.dsLoading({
		txt:opt.txt,
		bool:true
	});
	clearTimeout(timer);
	timer=setTimeout(function(){
		window.parent.dsLoading({
			bool:false,
			fn:function(){
				$(opt.str).show();
				setFirstOpen();
			}
		});
	},1800);
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
