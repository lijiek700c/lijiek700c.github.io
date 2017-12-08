define(['zepto','timer','pop'],function($,timer,pop){
	var showTest=function(container){
		if($.type(container)!=='string'){
			return;
		}
		var container=$(container),
			t_mask=container.children('.t_mask'),
			t_content=container.children('.t_content'),
			t_imgBox=t_mask.children('.t_imgBox'),
			aMaskImg=t_imgBox.children('img');
		//----
		var loadImg=(function(imgArr){
			var n=0;
			return function(){
				imgArr.eq(n).on('load',function(){
					alert(n);
					n++;
					if(n>=3){
						alert('done');
						pop.hideWaitLoad();
						return false;
					}
					loadImg();
				});
				imgArr.eq(n).on('error',function(){
					window.location.reload();
				});
			};
		})(aMaskImg);
		//----
		var imgBoxWidth=aMaskImg.map(function(i,e){
			return $(e).width()
		}).get().reduce(function(pre,cur){
			return pre+cur;
		});
		//-----
		loadImg();

	};
	return showTest;
});