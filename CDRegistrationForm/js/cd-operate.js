/*添加导航链接地址*/
;(function($){
	var hrefArr=['homePage.html','registrationForm.html','','tel:07367958023','LeaveMessage02.html','laws.html','DailyLife.html','Events.html','AboutUs.html'];
	var linksBox=$('.linksBox');
	var aLi=linksBox.children('li');
	aLi.each(function(index,ele){
		var _this=$(ele);
		var oA=_this.children('a');
		oA.attr('href','');
		if(index===2){
			return true;
		}
		oA.attr('href',hrefArr[index]);
	});
})($);
/*返回顶部*/
;(function(){	
	$(document).ready(function(){
		var docEle=$(document),goTopBtn=$('span.goTop');
		var scrollHeight=$('body').innerHeight();
		var clientHeight=window.screen.height;
		docEle.on('scroll',function(){
			var scrollTop=$('body').scrollTop();
			if(scrollTop+clientHeight>=scrollHeight){
				goTopBtn.show();
			}else{
				goTopBtn.hide();
			}	
		});
		goTopBtn.on('click',function(){
			$('body').animate({scrollTop:'0'},100);
		});
	});
})();
/*在线留言页面的弹窗基本操作*/
(function(){
	var popSuc=$('#mesSuccess');
	var popFail=$('#mesFail');
	var btnSuc=$('span.lm-submit');
	var btnCancel=btnSuc.next();
	btnSuc.on('click',function(){
		popSuc.fadeIn(200);
	});
	btnCancel.on('click',function(){
		popFail.fadeIn(200);
	});
	$(document).on('click','.weui-dialog__btn',function(){
		$(this).parents('.js_dialog').fadeOut(200);
	});
})();