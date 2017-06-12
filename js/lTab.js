define(function(){
	var tab=function(obj1,obj2){
		var aBtn=obj1.children('.weui-navbar__item');
		var aCon=obj2.children('.weui-tab__panel');
		aBtn.each(function(index,domEle){
			$(domEle).click(function(){
				$(this).addClass('weui-bar__item_on').siblings().removeClass('weui-bar__item_on');
				aCon.eq(index).css('display','block').siblings().css('display','none');
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