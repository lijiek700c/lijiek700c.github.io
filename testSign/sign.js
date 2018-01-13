define(['jquery'],function($){
	/*logoText*/
	var logoText=function(){
		this.logoText=null;
		this.gText='';
		this.xText='';
		this.cText='';
		this.fText='';
	};
	/*logoBorder*/
	var logoBorder=function(){
		this.logoBorder=null;
		this.tBorder=$('');
		this.tBorder=$('');
		this.tBorder=$('');
		this.tBorder=$('');
	};
	/*staff*/
	var staff=function(){
		this.staff=null;
		this.AllStaff=null;
		this.winW=$(window).outerWidth();
		this.winH=$(window).outerHeight();
		this.posArr=[
				{
					xs:0,
					xe:100,
					ys:100,
					ye:this.winH-100
				},
				{
					xs:100,
					xe:this.winW-100,
					ys:0,
					ye:100
				},
				{
					xs:this.winW-100,
					xe:this.winW,
					ys:100,
					ye:this.winH-100
				},
				{
					xs:100,
					xe:this.winW-100,
					ys:this.winH-100,
					ye:this.winH
				}
			];
		this.initPosArr=[
				{
					xs:-300,
					xe:-200,
					ys:0,
					ye:this.winH
				},
				{
					xs:0,
					xe:this.winW,
					ys:-300,
					ye:-200
				},
				{
					xs:this.winW+300,
					xe:this.winW+200,
					ys:0,
					ye:this.winH
				},
				{
					xs:0,
					xe:this.winW,
					ys:this.winH+300,
					ye:this.winH+200
				}
		];
	};
	staff.prototype={
		constructor:staff,
		createStaff:function(target){
			var offsetmin=10,
				offsetmax=40;
			var itemHtml='<div class="staff-item">'+
            				'<div>'+
            				'<img src="selfLOGO.png" alt="" />'+
            				'</div>'+
            				'<div></div>'+
        				'</div>';
			/*下标*/
			var index=getRandom(0,4);
			var initPosArea=this.initPosArr[index];
			var posArea=this.posArr[index];
			var initX=getRandom(initPosArea.xs,initPosArea.xe);
			var posX=getRandom(posArea.xs,posArea.xe);
			if(posX<=offsetmin){
				posX=offsetmin;
			}else if(posX>=this.winW-offsetmax){
				posX=this.winW-offsetmax;
			}
			var initY=getRandom(initPosArea.ys,initPosArea.ye);
			var posY=getRandom(posArea.ys,posArea.ye);
			if(posY<=offsetmin){
				posY=offsetmin;
			}else if(posY>=this.winH-offsetmax){
				posY=this.winH-offsetmax;
			}
			this.staff=$(itemHtml);
			this.staff.css({
				'left':initX+'px','top':initY+'px'
			}).appendTo('body').animate({
				'left':posX+'px','top':posY+'px'
			}).delay(800).animate({
				'left':target.x+'px','top':target.y+'px'
			},200).promise().done(function(){
				$(this).find('div:first').css('animation-name','unknown').end().find('div:last').remove();
			});
			/*this.staff=null;*/
		}
	};
	/*common*/
	function getRandom(m,n){
		return Math.floor(m+Math.random()*(n-m));
	}
	return {
		LogoText:logoText,
		LogoBorder:logoBorder,
		Staff:staff
	};
});