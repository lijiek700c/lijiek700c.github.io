require.config({
	'zepto':'Zepto',
	'timer':'timer',
	'pop':'pop',
	'index':'index'
});
require(['index'],function(showIndex){
	showIndex('.container');
	/*pop.showWaitLoad({
		type:3,
		txt:''
	})._show();*/

	//$('img','.t_mask').first().width(); 375
	/*$('.t_mask').addClass('bounceOutLeft');
	$('.t_mask').addClass('bounceInLeft').on('WebkitAnimationEnd animationend',function(){
		alert(111);
	});*/
	
	/*$('.t_mask').on('swipeLeft',function(){
		
	});*/

});