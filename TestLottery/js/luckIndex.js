require.config({
	paths:{
		'jquery':'jquery-3.2.1.min',
		'pageLoad':'pageLoad'
	}
});
require(['jquery','pageLoad'],function($,pg){
	var animArr=['swoopInTop','driveInBottom','rollInLeft','swoopInRight'];
	pg.dsOpenLoading._show('正在打开').imgLoadedHide(function(){
		$('img.luckIndexImg,img.luckDecoraImg,.luckFooterBox > img,p.luckFooterBox_txt').css('display','none').each(function(i,e){
			setTimeout($.proxy(function(){
				var $this=$(this);
				$this.css('display','block').addClass(animArr[i]);
				if(i===animArr.length-1){
					$this.on('webkitAnimationend animationend',function(){
						$this.parent().siblings('img.luckIndexImg').removeClass(animArr[0]);
					});
					$(document).one('click',function(){
					});
				}
			},this),i*2000);
		});

	});
});