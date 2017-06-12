define(function(){
	var tab=function(obj1,obj2,fn){
		localStorage.setItem('index',0);
		var aBtn=obj1.children('.weui-navbar__item');
		var aCon=obj2.children('.weui-tab__panel');
		var timer=null,bool=false;
		aBtn.each(function(index,domEle){
			$(domEle).click(function(){
				if(bool)return;
				bool=true;
				$(this).addClass('weui-bar__item_on').siblings().removeClass('weui-bar__item_on');
				aCon.eq(index).css('display','block').addClass('swing').siblings('.weui-tab__panel').css('display','none').removeClass('swing');
				localStorage.setItem('index',index);
				clearTimeout(timer);
				setTimeout(function(){
					bool=false;
				},1000);
			});	
		});
		obj2.on('click','.weui-icon-cancel',function(){
			var closeParent=$(this).parent();
			closeParent.slideUp(300,function(){
				$(this).css('display','none');
			});
		});
	};
	return tab;
});