require.config({
	paths:{
		'jquery':'jquery-3.2.1.min',
		'sign':'sign',
		'pageLoad':'pageLoad'
	}
});
require(['jquery','sign','pageLoad'],function($,sign,pg){
	pg.dsOpenLoading._show('正在加载').imgLoadedHide();
	var staff=new sign.Staff();
	/**/
	console.log(staff.getPosSum());
	var timer=setInterval(function(){
		/*if(staff.tPosIsEmpty()){
			clearInterval(timer);
			return;
		}
		var targetPos=staff.getTargetPos();*/
		if(staff.tPosIsEmpty()){
			clearInterval(timer);
			staff.createSpecialStaff();
			return;
		}
		var targetPos=staff.getTargetOrderPos();
		staff.createStaff(targetPos);
	},500);
});