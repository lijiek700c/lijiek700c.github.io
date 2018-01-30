define(['jquery','pageLoad','tagcanvas','getPrize'],function($,pg,TagCanvas,gp){
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
		{name:'某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'}/*,
		{name:'某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'},
		{name:'某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'},
		{name:'某某',tel:'15899889988'},
		{name:'某某某',tel:'15899889988'},
		{name:'某某',tel:'15899889988'}*/
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
		this.qqAnimArr=['twisterInUp','puffOut','rubberBand'];
		this.animIndex=0;
		this.boomCount=0;
		/*旅游大奖*/
		this.lyBixinBox=$('.body');
		this.hideAnimArr=['swoopOutTop','swoopOutRight','swoopOutBottom','swoopOutLeft'];
		/**/
		this.doc=$(document);
		this.randomBool=false;   //随机抽奖的时候，禁止其它的抽奖动作
		this.prizeNum=0;    //随机抽奖输入的中奖人数
		/*除随机抽奖之外的5中抽奖状态*/
		this.thirdPrizeEnd=false;
		this.secondPrizeEnd=false;
		this.firstPrizeEnd=false;
		this.specialPrizeEnd=false;
		this.lyPrizeEnd=false;
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
			this.awardOperate();
		},
		getUsers:function(userArr){
			for (let i in userArr) {
				var newTag = document.createElement("a");
				newTag.href = "#";
				newTag.innerText = userArr[i].tel;
				this.tags.append(newTag);
			}
		},
		//抽奖的操作
		awardOperate:function(){
			this.doc.on('keyup',$.proxy(function(ev){
				ev.preventDefault();
				switch(ev.which){
					case 83: //停止抽奖  S
						this.stopAward();
						break;
					case 68: //下一轮抽奖  D
						this.toNextAward();
						break;
					//没有按正常流程进行抽奖的时候
					case 81:  //直接抽三等奖  Q
						if(this.randomBool){
							return false;
						}
						if(this.thirdPrizeEnd){
							pg.dialog({
								content:'三等奖已经抽完啦！'
							});
							return false;
						}
						if(this.isOrder()){   
							this.notRegularAward(0);
						}
						break;
					case 87:  //直接抽二等奖  W
						if(this.randomBool){
							return false;
						}
						if(this.secondPrizeEnd){
							pg.dialog({
								content:'二等奖已经抽完啦！'
							});
							return false;
						}
						if(this.isOrder()){   //没有按正常流程进行抽奖的时候
							this.notRegularAward(1);
						}
						break;
					case 69:  //直接抽一等奖  E
						if(this.randomBool){
							return false;
						}
						if(this.firstPrizeEnd){
							pg.dialog({
								content:'一等奖已经抽完啦！'
							});
							return false;
						}
						if(this.isOrder()){   //没有按正常流程进行抽奖的时候
							this.notRegularAward(2);
						}
						break;
					case 82:  //直接抽特等奖  R
						if(this.randomBool){
							return false;
						}
						if(this.specialPrizeEnd){
							pg.dialog({
								content:'特等奖已经抽完啦！'
							});
							return false;
						}
						if(this.isOrder()){   //没有按正常流程进行抽奖的时候
							this.notRegularAward(3);
						}
						break;
					case 76:    //显示旅游奖品信息  L
						if(this.randomBool){
							return false;
						}
						if(this.lyPrizeEnd){
							pg.dialog({
								content:'旅游大奖的获得者已经产生啦！'
							});
							return false;
						}
						if(this.isOrder()){   //没有按正常流程进行抽奖的时候
							this.notRegularAward(6);
						}
						break;
					case 80:  //随机抽奖  P
						if(this.isOrder()){   //没有按正常流程进行抽奖的时候
							this.randomBool=true;
							this.breakRegularAward();
							pg.dialog({
								type:3,
								title:'请输入本次抽奖的中奖人数！'
							});
						}
						break;
					case 13:  //关闭输入抽奖人数的弹窗并获取中奖人员信息 enter
						var weuiDialog=$('.weui-dialog');
						if(pg.dialogBody.type===1){
							weuiDialog.addClass('bounceOut');
							this.delayChange($.proxy(function(){
								pg.dialogBody._hide();
							},this),200);
							return false;
						}
						if(weuiDialog.length===0||isNaN(window.num)){
							weuiDialog.find('input.prize').val('');
							return false;
						}
						this.prizeNum=window.num;   //随机抽奖的中奖人数
						weuiDialog.addClass('bounceOut');
						this.delayChange($.proxy(function(){
							pg.dialogBody._hide();
							this.notRegularAward(8);
						},this),200);
						this.openRegularAward();
						break;
					case 27:  //关闭输入中奖人数弹窗  esc
						var weuiDialog=$('.weui-dialog');
						if(weuiDialog.length===0){
							return false;
						}
						weuiDialog.addClass('bounceOut');
						this.delayChange($.proxy(function(){
							pg.dialogBody._hide();
							this.randomBool=false;
						},this),200);
						this.openRegularAward();
						break;
				}
			},this));
		},
		//开始抽奖
		startAward:function(){
			if(this.startBool){
				return false;
			}
			if(this.awardIndex===4){
				pg.dialog({
					content:'三等奖至特等奖已结束抽奖！'
				});
				return false;
			}
			this.startAwardOpe();
		},
		startAwardOpe:function(){
			this.startBool=true;
			this.TagCanvas.Start('myCanvas', 'tags',Object.assign({},options,{maxSpeed: 0.38}));
			this.stopBool=false;
		},
		//停止抽奖
		stopAward:function(){
			if(this.stopBool){
				return false;
			}
			this.stopAwardOpe();
		},
		stopAwardOpe:function(){
			if(this.awardIndex===6){
				this.showLyBixinBox();
				this.TagCanvas.Pause('myCanvas');
				this.hideCanvas();
				this.delayChange($.proxy(function(){
					this.nextBool=false;
				},this),2800);
				return false;
			}
			//获得中奖信息
			switch(this.awardIndex){
				case 2:
					testDataArr=testDataArr.slice(0,4);
					break;
				case 3:
					testDataArr=testDataArr.slice(0,1);
					break;
			}
			gp.createPrizeInfo(this.container,testDataArr,this.awardIndex);
			var timer = setTimeout($.proxy(function(){
				clearTimeout(timer);
				this.TagCanvas.Pause('myCanvas');
				this.hideCanvas();
				this.showMoadl();
				this.delayChange($.proxy(function(){
					this.showPrizerList();
				},this),500);
			},this),500);
			this.stopBool=true;
		},
		//下一轮
		toNextAward:function(){
			if(this.nextBool){
				return false;
			}
			if(this.awardIndex===6){
				this.hideLyBixinBox();
				this.TagCanvas.Start('myCanvas', 'tags', Object.assign({},this.options,{maxSpeed: 0.05}));
				this.showCanvas();
				this.delayChange($.proxy(function(){
					this.startBool=false;
					this.stopBool=true;
					this.nextBool=true;
				},this),800);
				return false;
			}
			if(this.awardIndex===8){
				this.toNextAwardOpe();
				return false;
			}
			this.toNextAwardOpe();
		},
		toNextAwardOpe:function(){
			this.qqImg.hide();
			this.gpImg.hide();
			/*隐藏中奖的信息*/
			this.hideModalItems();
			this.stopBool=true;
			this.nextBool=true;
		},
		//直接抽几等奖的时候
		breakRegularAward:function(){
			this.startBool=true;
			this.stopBool=true;
			this.nextBool=true;
		},
		//开启正常操作
		openRegularAward:function(){
			this.startBool=false;
			this.stopBool=true;
			this.nextBool=true;
		},
		//是否按正常抽奖顺序
		isOrder:function(){
			return this.startBool===false&&this.stopBool===true&&this.nextBool===true;
		},
		//非正常流程抽奖
		notRegularAward:function(index){
			this.startAward();
			this.breakRegularAward();
			this.awardIndex=index;
			this.delayChange($.proxy(function(){
				this.stopBool=false;
			},this),1800);
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
		/*显示中奖人名单*/
		showPrizerList:function(){
			var _self=this;
			var elements=this.container.find('.getAwardList').children();
			elements.each(function(i,e){
				var $e=$(e);
				var timer=setTimeout(function(){
					clearTimeout(timer);
					$e.css('opacity',1);
				},i*800);
			});
			elements.last().on('webkitTransitionend transitionend',function(){
				/*显示期权或股票*/
				_self.awardIndex<2?_self.nextBool=false:_self.delayShowQqOrGp();
				/*显示随机抽奖名单*/
				if(_self.awardIndex===8){
					_self.delayChange(function(){
						_self.nextBool=false;
					},800);
				}
			});
		},
		/*奖品信息弹窗显示完后*/
		delayShowQqOrGp:function(){
			var timer=null;
			timer=setTimeout($.proxy(function(){
				switch(this.awardIndex){
					case 2:
						this.mask.show();
						this.qqImg.show();
						this.showQqImg();
						break;
					case 3:
						this.mask.show();
						this.gpImg.show();
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
					this.gpAndQqHide(this.qqImg,'images/qiquan.png',3000);
					return;
				}
				this.showQqImg();
			},this));
		},
		/*显示股票*/
		showGpImg:function(){
			this.gpImg.addClass(this.qqAnimArr[this.animIndex]).on('webkitAnimationend animationend',$.proxy(function(){
				this.animIndex++;
				if(this.animIndex>=this.qqAnimArr.length){
					this.animIndex=0;
					this.gpAndQqHide(this.gpImg,'images/gupiao.png',3000);
					return;
				}
				this.showGpImg();
			},this));
		},
		/*消失*/
		gpAndQqHide:function(obj,src,time){
			var timer=null;
			clearInterval(timer);
			timer=setInterval($.proxy(function(){
				if(this.boomCount===5){
					this.boomCount=0;
					clearInterval(timer);
					obj.css('animation-name','unknow');
					this.delayChange($.proxy(function(){
						this.nextBool=false;
					},this),800);
					this.mask.hide();
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
	          		/*gravity:true*/  //true或false
	        	});
			},this),time);
		},
		delayChange:function(fn,time){
			var timer=setTimeout(function(){
				clearTimeout(timer);
				fn();
			},time);
		},
		/*中奖信息消失*/
		hideModalItems:function(){
			var _self=this;
			var elements=this.container.find('div.prizeBox').children();
			elements.each(function(i,e){
				var $e=$(e);
				$e.addClass('magictime').addClass(_self.hideAnimArr[i]);
				if(i===elements.length-1){
					$e.on('webkitAnimationend animationend',function(){
						_self.hideMoadl(); 
						_self.showCanvas();
						_self.TagCanvas.Start('myCanvas',"tags",Object.assign({},options,{maxSpeed: 0.05}));
						_self.delayChange(function(){
							_self.startBool=false;
						},800);
						/*除随机抽奖外的其它五种抽奖状态*/
						/*this.thirdPrizeEnd=false;
						this.secondPrizeEnd=false;
						this.firstPrizeEnd=false;
						this.specialPrizeEnd=false;*/
						switch(_self.awardIndex){
							case 0:
								_self.thirdPrizeEnd=true;
								break;
							case 1:
								_self.secondPrizeEnd=true;
								break;
							case 2:
								_self.firstPrizeEnd=true;
								break;
							case 3:
								_self.specialPrizeEnd=true;
								break;
							case 8:
								_self.randomBool=false;
								break;
						}
					});
				}
			});
		},
		/*旅游大奖*/
		getLyPrize:function(){
			var _self=this;
			setTimeout(function(){
			    $(".listimg17").find("img").addClass("activeTop");
		    	setTimeout(function(){
		        	$(".listImg12").find("img").addClass("activeTop")
			        setTimeout(function(){
			            $(".listImg13").find("img").addClass("activeTop")
			       
			        },200)
		    	},200)
	    		$(".listImg11").find("img").addClass("activeTop") 
	    		$(".listImg1").find("img").addClass("activeRight")
	    		$(".img2").find("img").addClass("activebottom")
			},1000);
			/*除随机抽奖外的其它五种抽奖状态*/
			this.lyPrizeEnd=true;
		},
		showLyBixinBox:function(){
			this.lyBixinBox.show();
			this.getLyPrize();
		},
		hideLyBixinBox:function(){
			this.lyBixinBox.fadeOut(200);
		}
	};
	return new PrizeOpe();
});