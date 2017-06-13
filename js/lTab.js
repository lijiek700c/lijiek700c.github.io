define(function(){
	var tab=function(opt){
		localStorage.setItem('index',0);
		var aBtn=opt.navBar.children('.weui-navbar__item');
		var aCon=opt.tabPanel.children('.weui-tab__panel');
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
		//opt.common   opt.closeDialog   opt.mask
		opt.tabPanel.on('click','.weui-icon-cancel',function(){
			opt.common.deleteListItem(opt.closeDialog,opt.mask,$(this).parent());
			/*opt.closeDialog.css('display','block').addClass('flash');*/
			/*var closeParent=$(this).parent();
			closeParent.slideUp(300,function(){
				$(this).css('display','none');
			});*/
		});
	};
	return tab;
});