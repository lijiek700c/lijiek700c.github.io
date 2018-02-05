(function($,gp){
	function PrizeOpe(){
		this.modal = $('#modal');   //显示中奖信息的弹窗
		this.container=$('.modal-content','#modal');  //显示中奖内容
		this.awardIndex=0;      //对应的抽奖信息
		this.startBool=false;   //抽奖开始
		this.stopBool=true;     //抽奖停止
		this.nextBool=true;     //下一轮抽奖
		this.prizeData=null;   /*获奖的名单?*/
		this.mask=$('.drawMask');
		this.qqImg=$('.qqImg');   /*期权*/
		this.qqAnimArr=['twisterInUp','puffOut','rubberBand'];
		this.boomCount=0;
		this.hideAnimArr=['swoopOutTop','swoopOutRight','swoopOutBottom','swoopOutLeft'];
		/**/
		this.doc=$(document);
		this.randomBool=false;   //随机抽奖的时候，禁止其它的抽奖动作
		this.prizeNum=0;    //随机抽奖输入的中奖人数
		/*除随机抽奖之外的抽奖状态*/
		this.thirdPrizeEnd=false;
		this.secondPrizeEnd=false;
		this.firstPrizeEnd=false;
		this.bitPrizeCount=0;   //比特币抽奖只能抽2次
		this.qqPrizeCount=0;    //期权中奖的总人数只能5名
		this.mobilesStr=null;   //回传给后台的中奖人电话号码
		/*3个方法*/
		this.openRotate=null;
		this.stopRotate=null;
		this.animate=null;
	}
	var testData=[
		{
			name:'某某某',
			avatar:'http://p.qlogo.cn/bizmail/WZiaprzwTLiaibia9Liccqj1f4wPM38EUHg9D9CrzAL5y9xkRSLibh4Dj4MA/0'
		},
		{
			name:'某某',
			avatar:'http://p.qlogo.cn/bizmail/AV0h9uic8yx2U5KlPLfJiafU2NuMKnX1MqRl43DWQ7tsT4eib9p8KPp2A/0'
		},
		{
			name:'某某某',
			avatar:'http://p.qlogo.cn/bizmail/vbkQfHAXatw8cQrcrrgFwIN1B3YXxSPibrlU8gzfEIFoibahSxrJNdZQ/0'
		}
	];
	PrizeOpe.prototype={
		constructor:PrizeOpe,
		init:function(openRotate,animate,stopRotate){
			this.doc.on('click mousedown mousemove contextmenu','*',function(){
				return false;
			});
			/*接收3个THREE方法*/
			this.openRotate=openRotate;
			this.animate=animate;
			this.stopRotate=stopRotate;
			/**/
			this.awardOperate();
		},
		//处理回传给后台的号码
		handleMobiles:function(){
			var tmpArr=[];
			$.each(this.prizeData,function(i,item){
				tmpArr.push(item.mobile);
			});
			return tmpArr.join(',');
		},
		//抽奖的操作
		awardOperate:function(){
			this.doc.on('keyup',$.proxy(function(ev){
				ev.preventDefault();
				switch(ev.which){
					case 83: //停止抽奖  S
						this.stopAward();
						break;
					case 68:  //下一轮抽奖  D
						this.toNextAward();
						break;
					case 81:  //索尼音箱---一次性抽10名  Q
						if(this.getLocalInfo('thirdPrizeEnd')){
							return false;
						}
						if(this.randomBool){
							return false;
						}
						if(this.thirdPrizeEnd){
							/*pg.dialog({
								content:'三等奖已经抽完啦！'
							});*/
							return false;
						}
						if(this.isOrder()){   
							this.notRegularAward(0,10);
						}
						break;
					case 87:  //扫地机器人---一次性抽10名  W
						if(this.getLocalInfo('secondPrizeEnd')){
							return false;
						}
						if(this.randomBool){
							return false;
						}
						if(this.secondPrizeEnd){
							/*pg.dialog({
								content:'二等奖已经抽完啦！'
							});*/
							return false;
						}
						if(this.isOrder()){   //没有按正常流程进行抽奖的时候
							this.notRegularAward(1,10);
						}
						break;
					case 66:  //比特币---分2次，每次9位
						var bitPrizeCount=parseInt(this.getLocalInfo('bitPrizeCount'));
						if(bitPrizeCount===2){
							return false;
						}
						if(this.bitPrizeCount===2){
							/*pg.dialog({
								content:'比特币已经抽完啦！'
							});*/
							return false;
						}
						if(this.randomBool){
							return false;
						}
						if(this.isOrder()){   //没有按正常流程进行抽奖的时候
							this.notRegularAward(3,9);
						}
						break;
					case 69:  //期权---一次性抽完5名的时候  E
						if(this.getLocalInfo('firstPrizeEnd')){
							return false;
						}
						if(this.randomBool){
							return false;
						}
						if(this.firstPrizeEnd){
							/*pg.dialog({
								content:'一等奖已经抽完啦！'
							});*/
							return false;
						}
						if(this.isOrder()){   //没有按正常流程进行抽奖的时候
							this.notRegularAward(2,5);
						}
						break;
					case 82:  //期权--随机中奖人数的时候  R
						var qqPrizeCount=parseInt(this.getLocalInfo('qqPrizeCount'));
						if(qqPrizeCount===5){
							return false;
						}
						if(this.qqPrizeCount>=5){
							/*pg.dialog({
								content:'期权奖励已经抽完啦！'
							});*/
							return false;
						}
						if(this.randomBool){
							return false;
						}
						if(this.isOrder()){   //没有按正常流程进行抽奖的时候
							this.randomBool=true;
							this.breakRegularAward();
							pg.dialog({
								type:4,
								title:'本轮期权大奖的中奖人数！'
							});
						}
						break;
					case 80:  //随机抽奖  P
						if(this.randomBool){
							return false;
						}
						if(this.isOrder()){   //没有按正常流程进行抽奖的时候
							this.randomBool=true;
							this.breakRegularAward();
							pg.dialog({
								type:3,
								title:'本轮抽奖的中奖人数！'
							});
						}
						break;
					case 13:  //随机抽奖 enter
						var weuiDialog=$('.weui-dialog');
						if(weuiDialog.length>0&&pg.dialogBody.type===3){
							this.insertPrizerOpe(8,weuiDialog);  //抽随机
						}else if(weuiDialog.length>0&&pg.dialogBody.type===4){
							this.insertPrizerOpe(7,weuiDialog);  //抽期权
						}
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
							this.openRegularAward(); 
						},this),200);  
						break;
					case 32:  //空格键   返回抽奖首页
						var weuiDialog=$('.weui-dialog');
						if(weuiDialog.length>0){
							return false;
						}
						window.location.href='luckIndex.html';
						break;
				}
			},this));
		},
		//随机抽奖操作
		insertPrizerOpe:function(order,pop){
			var numInput=pop.find('input.prize');
			var numVal=$.trim(numInput.val()).replace(/\s+/g,'');
			if(numVal.length>2){   //只能输入bu超过2位
				numInput.val(numVal.slice(0,2));
				return false;
			}
			var prizeNum=parseInt(numVal);
			if(!isNaN(prizeNum)){
				var numStr=prizeNum+'';
				if(numStr.length<numVal.length){
					numInput.val('');
					return false;
				}
				if(order===7){
					prizeNum=prizeNum+this.qqPrizeCount>=5?5-this.qqPrizeCount:prizeNum;
					numInput.val(''+prizeNum);
				}
				this.prizeNum=prizeNum; //随机抽奖的中奖人数
			}else{
				numInput.val('');
				return false;
			}
			pop.addClass('bounceOut');
			this.delayChange($.proxy(function(){
				pg.dialogBody._hide();
				this.notRegularAward(order,this.prizeNum);
			},this),200);
			this.openRegularAward();  //this.startBool=false;
		},
		//开始抽奖
		startAward:function(count){
			//count   中奖人数
			console.log(count);
			var _self=this;
			if(this.startBool){
				return false;
			}
			/*THREE转动加速*/
			this.animate(0.031,0.038);
			/*获取中奖人信息*/
			/*$.ajax({
				url:'http://app10.csgxcf.com:8877/GxcfNewYear/getWinner',
				type:'GET',
				data:{
					number:count
				}
			}).done(function(data){*/
				/*console.log(data);*/
				_self.prizeData=testData;
				//_self.mobilesStr=_self.handleMobiles(); //传回后台的电话号码
				_self.delayChange(function(){
					_self.stopBool=false;
				},1800);
			/*}).fail(function(){
				pg.dialog({
					content:'获取中奖人信息失败！'
				}).done(function(){
					window.location.reload();
				});
			});*/
			this.startAwardOpe();
		},
		startAwardOpe:function(){
			this.startBool=true;
		},
		//停止抽奖
		stopAward:function(){
			if(this.stopBool){
				return false;
			}
			this.stopAwardOpe();
		},
		stopAwardOpe:function(){
			var _self=this;
			//显示中奖信息和中奖人员名单
			/* this.prizeData */
			gp.createPrizeInfo(this.container,this.prizeData,this.awardIndex);
			/*停止THREE*/
			this.stopRotate();
			var timer = setTimeout($.proxy(function(){
				clearTimeout(timer);
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
			if(this.awardIndex===8){
				this.toNextAwardOpe();
				return false;
			}
			this.toNextAwardOpe();
		},
		toNextAwardOpe:function(){
			this.qqImg.hide();
			/*隐藏中奖的信息*/
			this.hideModalItems();
			this.stopBool=true;
			this.nextBool=true;
		},
		//抽哪一种的时候禁止其它的
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
		notRegularAward:function(index,count){
			this.startAward(count);
			this.breakRegularAward();
			this.awardIndex=index;
		},
		//显示弹窗
		showMoadl:function(){
			this.modal.css('display','block');
		},
		//隐藏弹窗
		hideMoadl:function(){
			this.modal.css('display','none');
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
				},i*500);
			}).last().on('webkitTransitionend transitionend',function(){
				/*回传中奖人信息回后台*/
				/*$.ajax({
					url:'http://app10.csgxcf.com:8877/GxcfNewYear/saveWinner',
					type:'GET',
					data:{
						mobiles:_self.mobilesStr,
						type:_self.awardIndex
					}
				}).done(function(data){*/
					/*开启下一轮*/
					_self.openNextDraw();
					_self.prizeData=null;
				/*}).fail(function(){
					pg.dialog({
						content:'回传中奖人信息至后台失败！'
					}).done(function(){
						window.location.reload();
					});
					_self.openNextDraw();
					_self.prizeData=null;
				});*/
			});;
		},
		/*开启下一轮抽奖*/
		openNextDraw:function(){
			/*显示随机抽奖名单*/
			if(this.awardIndex===8){
				this.delayChange($.proxy(function(){
					this.nextBool=false;
				},this),800);
				return false;
			}
			/*显示期权*/
			if(this.awardIndex===2||this.awardIndex===7){
				this.delayShowQqOrGp();
				return false;
			}
			/*其它几种中奖类型*/
			this.delayChange($.proxy(function(){
				this.nextBool=false;
			},this),800);	
		},
		/*奖品信息弹窗显示完后*/
		delayShowQqOrGp:function(){
			var timer=null;
			timer=setTimeout($.proxy(function(){
				clearTimeout(timer);
				switch(this.awardIndex){
					case 2:
						this.mask.show();
						this.qqImg.fadeIn();
						this.showQqImg();
						break;
					case 7:
						this.mask.show();
						this.qqImg.fadeIn();
						this.showQqImg();
						break;
				}
			},this),700);
		},
		/*显示期权*/
		showQqImg:function(){
			var _self=this;
			$.each(this.qqAnimArr,function(i,v){
				var timer=setTimeout(function(){
					clearTimeout(timer);
					_self.qqImg.addClass(v);
					if(i===_self.qqAnimArr.length-1){
						_self.gpAndQqHide(_self.qqImg,'images/qiquan.png',3000);
					}
				},i*1000);
			});

		},
		/*消失*/
		gpAndQqHide:function(obj,src,time){
			var countTimer=null;
			clearInterval(countTimer);
			countTimer=setInterval($.proxy(function(){
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
				if(this.boomCount===5){
					this.boomCount=0;
					clearInterval(countTimer);
					$.each(this.qqAnimArr,function(i,v){
						obj.removeClass(v);
					});
					this.delayChange($.proxy(function(){
						this.nextBool=false;
					},this),800);
					this.mask.hide();
				}
				this.boomCount++;
			},this),time);
		},
		delayChange:function(fn,time){
			var timer=setTimeout(function(){
				clearTimeout(timer);
				fn&&fn();
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
						_self.delayChange(function(){
							_self.startBool=false;
							/*启动THREE*/
							_self.openRotate();
							_self.animate(0.011,0.008);
						},800);
						/*除随机抽奖外的其它抽奖状态*/
						/*this.thirdPrizeEnd=false;
						this.secondPrizeEnd=false;
						this.firstPrizeEnd=false;*/
						switch(_self.awardIndex){
							case 0:
								_self.thirdPrizeEnd=true;  //索尼音箱
								_self.setLocalInfo('thirdPrizeEnd','end');  //页面刷新之后依然不能开奖
								break;
							case 1:
								_self.secondPrizeEnd=true; //扫地机器人
								_self.setLocalInfo('secondPrizeEnd','end');
								break;
							case 3:
								_self.bitPrizeCount++; //比特币
								_self.setLocalInfo('bitPrizeCount',_self.bitPrizeCount);
								break;
							case 2:
								_self.firstPrizeEnd=true;  //期权一次性抽
								_self.qqPrizeCount=5;
								_self.setLocalInfo('firstPrizeEnd','end');
								_self.setLocalInfo('qqPrizeCount',_self.qqPrizeCount);
								break;
							case 7:
								_self.firstPrizeEnd=true;  //随机抽期权的时候，禁掉一次性抽取
								_self.setLocalInfo('firstPrizeEnd','end');
								_self.randomBool=false;
								_self.qqPrizeCount+=_self.prizeNum;  //期权随机抽
								_self.setLocalInfo('qqPrizeCount',_self.qqPrizeCount);
								break;
							case 8:
								_self.randomBool=false;
								break;
						}
						_self.prizeNum=0;  //清零
					});
				}
			});
		},
		/*设置本地存储*/
		setLocalInfo:function(name,value){
			localStorage.setItem(name,value);
		},
		/*获取本地存储*/
		getLocalInfo:function(name){
			return localStorage.getItem(name);
		}
	};
	if(!('prizeOpe' in window)){
		window.prizeOpe=new PrizeOpe();
	} 
})(jQuery,window.gp);
