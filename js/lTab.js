define(function(){
	var tab=function(opt){
		localStorage.setItem('index',0);
		var aBtn=opt.navBar.children('.weui-navbar__item');
		var aCon=opt.tabPanel.children('.weui-tab__panel');
		var timer=null,bool=false;
		var re=/weui-bar__item_on/g;
		aBtn.each(function(index,domEle){
			$(domEle).click(function(){
				if($(this).attr('class').search(re)!=-1)return;
				if(bool)return;
				bool=true;
				$(this).addClass('weui-bar__item_on').siblings().removeClass('weui-bar__item_on');
				aCon.eq(index).css('display','block').addClass('bounceInLeft').siblings('.weui-tab__panel').css('display','none').removeClass('bounceInLeft');
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
		});
	};
	return tab;
});