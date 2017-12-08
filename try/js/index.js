define(['zepto','timer','pop'],function($,timer,pop){
	var showTest=function(container){
		if($.type(container)!=='string'){
			return;
		}
		var container=$(container),
			t_mask=container.children('.t_mask'),
			t_content=container.children('.t_content'),
			aMaskImg=t_mask.children('img');
		//----
		
		var loadImg=(function(imgArr){
			var n=0;
			return function(){
				imgArr.eq(n).attr('src',imgArr.eq(n).attr('data-src')).width($(window).width()+'px');
				imgArr.eq(n).on('load',function(){
					alert(n);
					n++;
					if(n>=imgArr.length){
						pop.hideWaitLoad();
						return false;
					}
					loadImg();
				});
				imgArr.eq(n).on('error',function(){
					alert('error');
					//window.location.reload();
				});
			};
		})(aMaskImg);
		//----
		var imgBoxWidth=aMaskImg.map(function(i,e){
			return $(e).width();
		}).get().reduce(function(pre,cur){
			return pre+cur;
		});
		t_mask.width(imgBoxWidth+'px');
		//-----
		loadImg();
		//---
		n=20;
		t_mask.on('swipeLeft',function(){
			$(this).css('transform','translateX('+(-n)+'px)');
			n+=20;
		});
	};
	return showTest;
});