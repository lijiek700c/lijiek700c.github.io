/*设置iframe的高度*/
function setIframeSize(){
	var oHead=$('.ds-header'),
	oFoot=$('.ds-footer'),
	oArea=$('.ds-operateArea'),
	win=$(window);
	var timer=null;
	oArea.height(win.innerHeight()-oHead.height()-oFoot.height());
	win.on('resize',function(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			oArea.height(win.innerHeight()-oHead.height()-oFoot.height());
		},200);
	});
}
/*设置iframe的src链接*/
function setIframeSrc(){
	var tabBtn=$('span','.btnBox');
	var oIframe=$('.ds-iframe');
	var timer=null;
	oIframe.attr('src',srcArr[1]);
	tabBtn.on('click',function(){
		var _this=$(this);
		if(_this.hasClass('return')){
			index--;
			if(index<=0){
				index=0;
			}
		}else if(_this.hasClass('next')){
			index++;
			if(index>=srcArr.length){
				index=srcArr.length-1;
			}
		}else{
			return false;
		}
		clearTimeout(timer);
		timer=setTimeout(function(){
			oIframe.attr('src',srcArr[index]);
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


