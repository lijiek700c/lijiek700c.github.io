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
	pg.dsOpenLoading._show('正在打开').imgLoadedHide();
	/**/
	var clickedBool=false;
	var items=$('.yearTabBox > li').not(':last-child');
	var changedSrcArr=items.children('img').map(function(i,e){
		return $(e).attr('src').replace(/\./g,'2.');
	}).get();
	items.each(function(i,e){
		var $e=$(e);
		$e.on('click touchstart',function(){
			/*if(clickedBool){
				return false;
			}
			clickedBool=true;*/
			$e.css({
				'border-color':'#FFFF68',
				'color':'#FFFF68'
			}).children('img').attr('src',changedSrcArr[i]);
		});
	});
});