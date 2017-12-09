define(['Zepto','timer','pop'],function($,timer,pop){
	var showTest=function(container){
		if($.type(container)!=='string'){
			return;
		}
		pop.showWaitLoad({
			type:3,
			txt:''
		})._show();
		var container=$(container),
			t_mask=container.children('.t_mask'),
			t_content=container.children('.t_content'),
			aMaskImg=t_mask.children('img');
		//----
		var dis=$(window).width();
		var loadImg=(function(imgArr){
			var n=0;
			return function(){
				imgArr.eq(n).attr('src',imgArr.eq(n).attr('data-src')).width(dis+'px');
				imgArr.eq(n).on('load',function(){
					n++;
					if(n>=imgArr.length){
						timer.setTimeout(function(){
							pop.hideWaitLoad();
							//t_mask.css('display','block');
						},3000);
						return false;
					}
					loadImg();
				});
				imgArr.eq(n).on('error',function(){
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
		
		var n=0;
		t_mask.on('swipeLeft',function(){
			if(n==aMaskImg.length){
				n=0;
				return false;
			}
			$(this).css('transform','translateX('+(-n*dis)+'px)');
			n++;
		});

		t_mask.on('swipeRight',function(){
			$(this).css('transform','translateX('+(0)+'px)');
		});
	};
	return showTest;
});