require.config({
	paths:{
		'jquery':'jquery-3.2.1.min',
		'setRem':'setRem',
		'pageLoad':'pageLoad'
	}
});
require(['jquery','setRem','pageLoad'],function($,setRem,pg){
	/*设置html的font-size*/
	setRem();
	/**/
	if(!localStorage.getItem('seatsInfoFP')){
		pg.dsOpenLoading._show('正在打开').imgLoadedHide();
	}else{
		pg.dsOpenLoading.imgLoadedHide();
	}
	/**/
	var clickedBool=false;
	var items=$('.yearTabBox > li').not(':last-child');
	var initSrcArr=items.children('img').map(function(i,e){
		return $(e).attr('src');
	}).get();
	var changedSrcArr=items.children('img').map(function(i,e){
		return $(e).attr('src').replace(/\./g,'2.');
	}).get();
	items.each(function(i,e){
		var $e=$(e);
		$e.on('click touchstart',function(){
			$e.css({
				'border-color':'#FFFF68',
				'color':'#FFFF68'
			}).children('img').attr('src',changedSrcArr[i]);
			switch(i){
				case 0:
					window.location.href='signSuccess.html';
					break;
				case 1:
					pg.dialog({
						content:'请关注大屏幕抽奖信息！谢谢！'
					}).done(function(){
						$e.removeAttr('style').children('img').attr('src',initSrcArr[1]);
					});
					break;
				case 2:
					window.location.href='../parts/gril.html';
					break;
				case 3:
					window.location.href='seatsInfo.html';
					break;
				case 4:
					window.location.href='../parts/process.html';
					break;
				case 5:
					window.location.href='../parts/program.html';
					break;
			}
		});
	});
	/**/
	localStorage.setItem('seatsInfoFP','start');
});