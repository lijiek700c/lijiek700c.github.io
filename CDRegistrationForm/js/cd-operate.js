/*添加导航链接地址*/
;(function($){
	var hrefArr=['homePage.html','registrationForm.html','','tel:07367958023','LeaveMessage02.html','laws.html','DailyLife.html','Events.html','AboutUs.html'];
	var lat,lng;
	function getMyLocation(lat,lng){
		console.log(lat,lng);
		return "http://map.qq.com/m/index/nav/type=bus&cond=3&sword=我的位置&spointx="+lng+"&spointy="+lat+"&eword=常德市公安局&epointx=111.677810&epointy=29.054040";
	}
	$(function () {
		var geolocation = new qq.maps.Geolocation("FZRBZ-6SJC5-AAXIC-QVWQO-ILADT-LXBVL", "myapp");
	        geolocation.getLocation(function(position){
	        localStorage.setItem("lat", position.lat);
	        localStorage.setItem("lng",position.lng);
	                    });
	    var linksBox=$('.linksBox');
		var aLi=linksBox.children('li');
		aLi.each(function(index,ele){
			var _this=$(ele);
			var oA=_this.children('a');
			oA.attr('href','');
			if(index===2){
				oA.attr('id','map');
				return true;
			}
			oA.attr('href',hrefArr[index]);
		});
		$('#map').click(function(ev){
			ev.preventDefault();
			location.href = getMyLocation(localStorage.getItem("lat"),localStorage.getItem("lng"));
		})
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
			if(scrollTop+clientHeight>=scrollHeight-30){
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
;(function(){
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
/*加载动画*/
;(function($){
	var openLoading=function(){
		var tid=null,aImg=$('.swiper-wrapper img'),
			loadBox=$('.loadMask');
		loadBox.removeClass('hinge').show();
		if(localStorage.getItem('loadBool')){
			loadBox.hide();
		}
		$.each(aImg,function(index,docEle){
			var _this=$(this);
			var src=_this.attr('data-src');
			docEle.setAttribute('src',src);
			if(index===2){
				docEle.onload=function(){
					clearTimeout(tid);
					tid=setTimeout(function(){
						localStorage.setItem('loadBool',true);
						loadBox.addClass('hinge');
						loadBox.delay(500).fadeOut(function(){
							$(this).hide();
						});
					},1500);
				};
			}
		});
	};
	if(!('loadObj' in window)){
		window.loadObj={
			openLoading:openLoading
		};
	}	
})($);