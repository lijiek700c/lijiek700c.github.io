require.config({
	paths:{
		'jquery':'jquery-3.2.1.min',
		'pageLoad':'pageLoad2'
	}
});
require(['jquery','pageLoad'],function($,pg){
	var animArr=['swoopInTop','driveInBottom','rollInLeft','swoopInRight'];
	if(!localStorage.getItem('luckIndexFP')){
		pg.dsOpenLoading._show('正在打开').imgLoadedHide(function(){
			$('img.luckIndexImg,img.luckDecoraImg,.luckFooterBox > img,p.luckFooterBox_txt').css('display','none').each(function(i,e){
				setTimeout($.proxy(function(){
					var $this=$(this);
					$this.css('display','block').addClass(animArr[i]);
					if(i===animArr.length-1){
						$this.on('webkitAnimationend animationend',function(){
							$this.parent().siblings('img.luckIndexImg').removeClass(animArr[0]);
						});
					}
				},this),i*2000);
			});
		});
	}else{
		pg.dsOpenLoading.imgLoadedHide(function(){
			$('img.luckIndexImg,img.luckDecoraImg,.luckFooterBox > img,p.luckFooterBox_txt').css('display','none').each(function(i,e){
				setTimeout($.proxy(function(){
					var $this=$(this);
					$this.css('display','block').addClass(animArr[i]);
					if(i===animArr.length-1){
						$this.on('webkitAnimationend animationend',function(){
							$this.parent().siblings('img.luckIndexImg').removeClass(animArr[0]);
						});
					}
				},this),i*2000);
			});
		});
	}
	localStorage.setItem('luckIndexFP','start');
	$(document).on('keyup',function(ev){
		ev.preventDefault();
		if(ev.which===32){
			window.location.href='luckDraw20180203.html';
		}
	});
});