require.config({
	paths:{
		'jquery':'jquery-3.2.1.min',
		'sign':'sign'
	}
});
require(['jquery','sign'],function($,sign){
	var staff=new sign.Staff();
	var targetPos={
		x:(staff.winW/2-16),
		y:(staff.winH/2-16)
	};
	staff.createStaff(targetPos);
	setInterval(function(){
		staff.createStaff(targetPos);
	},2000);
});