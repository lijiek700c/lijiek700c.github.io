define(['jquery','tagcanvas','getPrize'],function($,TagCanvas,gp){
	/*canvas参数*/
	var options = {
		textColour: '#808080',
		outlineColour:'transparent',
		reverse: false,
		depth:0.8,
		onMouse:true,	
		dragControl: true,
		decel:0.95,
		initial: [-0.2,0],
		wheelZoom:false
	};
	//测试数据
	var testDataArr=[
		{name:'某某某',tel:'15899889988'}/*,
		{name:'某某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'}*/
	]; 
	function PrizeOpe(){
		this.startBtn=$('#start');  //开始按钮
		this.stopBtn = $('#stop');  //停止按钮
		this.next = $('#next');     //下一轮按钮
		this.modal = $('#modal');   //显示中奖信息的弹窗
		this.oCanvas=$('#myCanvas');  //canvas
		this.tags=$('#tags');         //初始转盘显示信息
		this.container=$('.modal-content','#modal');  //显示中奖内容
		this.TagCanvas=TagCanvas;     //转盘的实例
		this.options=$.extend({},options);  //转盘的参数
		this.awardIndex=0;      //抽奖的顺序
		this.startBool=false;
		this.stopBool=true;
		this.nextBool=true;
		this.prizeData=null;   /*获奖的名单?*/
		this.mask=$('.drawMask');
		this.qqImg=$('.qqImg');   /*期权*/
		this.gpImg=$('.gpImg');   /*股票*/
		this.qqAnimArr=['twisterInUp','puffOut','nope'];
		this.gpAnimArr=['twisterInDown','vanishOut','nope'];
		this.animIndex=0;
		this.boomCount=0;
	}
	PrizeOpe.prototype={
		constructor:PrizeOpe,
		init:function(userArr){
			this.getUsers(userArr);
			try {
				this.TagCanvas.Start('myCanvas', 'tags', Object.assign({},this.options,{maxSpeed: 0.05}));
			}catch (e) {
				// something went wrong, hide the canvas container
				document.getElementById('myCanvasContainer').style.display = 'none';
			}
			this.startAward();
			this.stopAward();
			this.toNextAward();
		},
		getUsers:function(userArr){
			for (let i in userArr) {
				var newTag = document.createElement("a");
				newTag.href = "#";
				newTag.innerText = userArr[i].tel;
				this.tags.append(newTag);
			}
		},
		//开始抽奖
		startAward:function(){
			this.startBtn.on('click',$.proxy(function(ev){
				ev.preventDefault();
				if(this.awardIndex>3){
					alert('结束了');
					return false;
				}
				if(this.startBool){
					return false;
				}
				this.startBool=true;
				this.TagCanvas.Start('myCanvas', 'tags',Object.assign({},options,{maxSpeed: 0.25}));
				this.stopBool=false;
			},this));
		},
		//停止抽奖
		stopAward:function(){
			var _self=this;
			this.stopBtn.on('click',function(ev){
				ev.preventDefault();
				if(_self.stopBool){
					return false;
				}
				if(_self.awardIndex>3){
					alert('结束了');
					return false;
				}
				//获得中奖信息
				gp.createPrizeInfo(_self.container,testDataArr,_self.awardIndex);
				var timer = setTimeout(function(){
					clearTimeout(timer);
					/*显示期权或股票*/
					_self.delayShowQqOrGp();
					_self.TagCanvas.Pause('myCanvas');
					_self.hideCanvas();
					_self.showMoadl();
					_self.nextBool=false;
				},500);
			});
		},
		//下一轮
		toNextAward:function(){
			this.next.on('click',$.proxy(function(ev){
				ev.preventDefault();
				if(this.nextBool){
					return false;
				}
				this.awardIndex++;
				this.qqImg.hide();
				this.gpImg.hide();
				this.hideMoadl(); 
				this.showCanvas();
				this.TagCanvas.Start('myCanvas',"tags",Object.assign({},options,{maxSpeed: 0.05}));
				this.startBool=false;
				this.stopBool=true;
				this.nextBool=true;
			},this));
		},
		//显示弹窗
		showMoadl:function(){
			this.modal.css('display','block');
		},
		//隐藏弹窗
		hideMoadl:function(){
			this.modal.css('display','none');
		},
		//隐藏转盘
		hideCanvas:function(){
			this.oCanvas.css('opacity',0);
		},
		//显示转盘
		showCanvas:function(){
			this.oCanvas.css('opacity',1);
		},
		/*奖品信息弹窗显示完后*/
		delayShowQqOrGp:function(){
			var timer=null;
			timer=setTimeout($.proxy(function(){
				switch(this.awardIndex){
					case 2:
						this.qqImg.show();
						this.mask.show();
						this.showQqImg();
						break;
					case 3:
						this.gpImg.show();
						this.mask.show();
						this.showGpImg();
						break;
				}
			},this),700);
		},
		/*显示期权*/
		showQqImg:function(){
			this.qqImg.addClass(this.qqAnimArr[this.animIndex]).on('webkitAnimationend animationend',$.proxy(function(){
				this.animIndex++;
				if(this.animIndex>=this.qqAnimArr.length){
					this.animIndex=0;
					this.gpAndQqHide(this.qqImg,'images/qiquan.png');
					return;
				}
				this.showQqImg();
			},this));
		},
		/*显示股票*/
		showGpImg:function(){
			this.gpImg.addClass(this.gpAnimArr[this.animIndex]).on('webkitAnimationend animationend',$.proxy(function(){
				this.animIndex++;
				if(this.animIndex>=this.gpAnimArr.length){
					this.animIndex=0;
					this.gpAndQqHide(this.gpImg,'images/gupiao.png');
					return;
				}
				this.showGpImg();
			},this));
		},
		/*消失*/
		gpAndQqHide:function(obj,src){
			var timer=setInterval($.proxy(function(){
				if(this.boomCount===20){
					this.boomCount=0;
					this.mask.hide();
					clearInterval(timer);
				}
				this.boomCount++;
				obj.sparkleHover({
	          		/*colors : ['rgb(220,20,60)', "rgb(0,255,127)",'rgb(255,215,0)'], */ //一种颜色或颜色数组 
	          		num_sprites: 18, //爆炸碎片的数量。
	          		lifespan: 1400,  //整数，单位毫秒
	          		radius: 1000,     //爆炸的半径，整数值。
	          		sprite_size: 30, //图片的尺寸，整数值
	          		shape: 'circle', //图片的形状，可选值有：'circle, 'triangle' 或 'square'
	          		image: src/*'images/gupiao.png'*/,  //爆炸的图片，可以是图片的url，或者是某种背景颜色值rgba(0,0,0,0)。
	          		/*gravity:true  //true或false。*/
	        	});
			},this),1800);
		}
	};
	return new PrizeOpe();
});