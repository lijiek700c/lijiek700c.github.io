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
		this.order=0;
		this.testSrcArr=['images/iconCT.png','images/iconDF.png','images/iconDT.png','images/iconEvents.png','images/iconGW.png','images/iconLaws.png','images/iconLM.png','images/iconOthers.png'];
		this.staff=null;
		this.AllStaff=null;
		this.winW=$(window).outerWidth();
		this.winH=$(window).outerHeight();
		//起点坐标
		this.posArr=[
				{
					xs:0,
					xe:60,
					ys:60,
					ye:this.winH-60
				},
				{
					xs:60,
					xe:this.winW-60,
					ys:0,
					ye:60
				},
				{
					xs:this.winW-60,
					xe:this.winW,
					ys:60,
					ye:this.winH-60
				},
				{
					xs:60,
					xe:this.winW-60,
					ys:this.winH-60,
					ye:this.winH
				}
			];
		//初始坐标
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
		//目标位置
		this.tPosArr=[
		//公
			[
				{x:465,y:130},
				{x:488,y:130},
				{x:511,y:130},
				{x:548,y:130},/*
				{x:571,y:130},
				{x:594,y:130},
				{x:455,y:154},
				{x:604,y:154},
				{x:445,y:178},
				{x:614,y:178},*/
				/*{x:435,y:202},
				{x:624,y:202},
				{x:425,y:226},
				{x:634,y:226},
				{x:415,y:250},
				{x:644,y:250},
				{x:475,y:214},
				{x:465,y:238},
				{x:455,y:260},
				{x:445,y:283},
				{x:435,y:307},
				{x:425,y:329},
				{x:415,y:352},
				{x:438,y:352},
				{x:461,y:352},
				{x:484,y:352},
				{x:507,y:352},
				{x:530,y:352},
				{x:553,y:352},
				{x:576,y:352},
				{x:599,y:352},
				{x:622,y:352},
				{x:645,y:352},
				{x:635,y:329},
				{x:625,y:306}*/
			],
		//信
			/*[
				{x:694,y:130},
				{x:716,y:130},
				{x:705,y:154},
				{x:705,y:176},
				{x:705,y:199},
				{x:705,y:220},
				{x:705,y:242},
				{x:705,y:265},
				{x:705,y:286},
				{x:705,y:308},
				{x:705,y:331},
				{x:705,y:352},
				{x:841,y:106},
				{x:749,y:130},
				{x:772,y:130},
				{x:795,y:130},
				{x:818,y:130},
				{x:841,y:130},
				{x:864,y:130},
				{x:887,y:130},
				{x:910,y:130},
				{x:933,y:130},
				{x:749,y:168},
				{x:772,y:168},
				{x:795,y:168},
				{x:818,y:168},
				{x:841,y:168},
				{x:864,y:168},
				{x:887,y:168},
				{x:910,y:168},
				{x:933,y:168},
				{x:749,y:206},
				{x:772,y:206},
				{x:795,y:206},
				{x:818,y:206},
				{x:841,y:206},
				{x:864,y:206},
				{x:887,y:206},
				{x:910,y:206},
				{x:933,y:206},
				{x:749,y:242},
				{x:772,y:242},
				{x:795,y:242},
				{x:818,y:242},
				{x:841,y:242},
				{x:864,y:242},
				{x:887,y:242},
				{x:910,y:242},
				{x:933,y:242},
				{x:933,y:265},
				{x:933,y:286},
				{x:933,y:308},
				{x:933,y:331},
				{x:933,y:352},
				{x:910,y:352},
				{x:887,y:352},
				{x:864,y:352},
				{x:841,y:352},
				{x:818,y:352},
				{x:795,y:352},
				{x:772,y:352},
				{x:749,y:352},
				{x:749,y:331},
				{x:749,y:308},
				{x:749,y:286},
				{x:749,y:265}
			],*/
		//诚
			/*[
				{x:415,y:410},
				{x:438,y:410},
				{x:461,y:410},
				{x:484,y:410},
				{x:415,y:446},
				{x:438,y:446},
				{x:461,y:446},
				{x:484,y:446},
				{x:415,y:482},
				{x:438,y:482},
				{x:461,y:482},
				{x:484,y:482},
				{x:415,y:518},
				{x:438,y:518},
				{x:461,y:518},
				{x:484,y:518},
				{x:415,y:554},
				{x:438,y:554},
				{x:461,y:554},
				{x:484,y:554},
				{x:484,y:577},
				{x:484,y:598},
				{x:484,y:620},
				{x:461,y:620},
				{x:438,y:620},
				{x:415,y:620},
				{x:415,y:598},
				{x:415,y:577},
				{x:606,y:396},
				{x:520,y:420},
				{x:547,y:420},
				{x:571,y:420},
				{x:595,y:420},
				{x:619,y:420},
				{x:645,y:420},
				{x:520,y:442},
				{x:520,y:464},
				{x:520,y:486},
				{x:520,y:508},
				{x:520,y:530},
				{x:520,y:552},
				{x:520,y:574},
				{x:520,y:596},
				{x:520,y:618},
				{x:544,y:488},
				{x:568,y:488},
				{x:568,y:510},
				{x:568,y:532},
				{x:568,y:554},
				{x:568,y:576},
				{x:568,y:598},
				{x:568,y:620},
				{x:608,y:444},
				{x:608,y:466},
				{x:608,y:488},
				{x:608,y:510},
				{x:608,y:532},
				{x:608,y:554},
				{x:608,y:576},
				{x:608,y:598},
				{x:608,y:620},
				{x:631,y:620},
				{x:645,y:476},
				{x:645,y:498},
				{x:645,y:520}
			],*/
		//丰
			/*[
				{x:699,y:422},
				{x:722,y:422},
				{x:745,y:422},
				{x:768,y:422},
				{x:791,y:422},
				{x:837,y:422},
				{x:860,y:422},
				{x:883,y:422},
				{x:906,y:422},
				{x:929,y:422},
				{x:699,y:490},
				{x:722,y:490},
				{x:745,y:490},
				{x:768,y:490},
				{x:791,y:490},
				{x:837,y:490},
				{x:860,y:490},
				{x:883,y:490},
				{x:906,y:490},
				{x:929,y:490},
				{x:699,y:559},
				{x:722,y:559},
				{x:745,y:559},
				{x:768,y:559},
				{x:791,y:559},
				{x:837,y:559},
				{x:860,y:559},
				{x:883,y:559},
				{x:906,y:559},
				{x:929,y:559},
				{x:814,y:400},
				{x:814,y:422},
				{x:814,y:444},
				{x:814,y:466},
				{x:814,y:488},
				{x:814,y:510},
				{x:814,y:532},
				{x:814,y:554},
				{x:814,y:576},
				{x:814,y:598},
				{x:814,y:620}
			],*/
		//边框
			/*[
            	{x:366,y:82},
            	{x:388,y:82},
            	{x:410,y:82},
            	{x:432,y:82},
            	{x:454,y:82},
            	{x:476,y:82},
            	{x:498,y:82},
            	{x:520,y:82},
            	{x:542,y:82},
            	{x:564,y:82},
            	{x:586,y:82},
            	{x:608,y:82},
            	{x:630,y:82},
            	{x:652,y:82},
            	{x:674,y:82},
            	{x:696,y:82},
            	{x:718,y:82},
            	{x:740,y:82},
            	{x:762,y:82},
            	{x:784,y:82},
            	{x:806,y:82},
            	{x:842,y:82},
            	{x:867,y:82},
            	{x:890,y:82},
            	{x:913,y:82},
            	{x:936,y:82},
            	{x:959,y:82},
            	{x:982,y:82},
            	{x:982,y:111},
            	{x:982,y:133},
            	{x:982,y:155},
            	{x:982,y:177},
            	{x:982,y:199},
            	{x:982,y:221},
            	{x:982,y:243},
            	{x:982,y:265},
            	{x:982,y:287},
            	{x:982,y:309},
            	{x:982,y:331},
            	{x:982,y:353},
            	{x:982,y:375},
            	{x:982,y:397},
            	{x:982,y:419},
            	{x:982,y:441},
            	{x:982,y:463},
            	{x:982,y:485},
            	{x:982,y:507},
            	{x:982,y:529},
            	{x:982,y:551},
            	{x:982,y:573},
            	{x:982,y:595},
            	{x:982,y:617},
            	{x:982,y:639},
            	{x:982,y:668},
            	{x:960,y:668},
            	{x:938,y:668},
            	{x:916,y:668},
            	{x:894,y:668},
            	{x:872,y:668},
            	{x:850,y:668},
            	{x:828,y:668},
            	{x:806,y:668},
            	{x:784,y:668},
            	{x:762,y:668},
            	{x:740,y:668},
            	{x:718,y:668},
            	{x:696,y:668},
            	{x:674,y:668},
            	{x:652,y:668},
            	{x:630,y:668},
            	{x:608,y:668},
            	{x:586,y:668},
            	{x:564,y:668},
            	{x:542,y:668},
            	{x:520,y:668},
            	{x:498,y:668},
            	{x:476,y:668},
            	{x:454,y:668},
            	{x:432,y:668},
            	{x:410,y:668},
            	{x:388,y:668},
            	{x:366,y:668},
            	{x:366,y:646},
            	{x:366,y:624},
            	{x:366,y:602},
            	{x:366,y:580},
            	{x:366,y:558},
            	{x:366,y:536},
            	{x:366,y:514},
            	{x:366,y:492},
            	{x:366,y:470},
            	{x:366,y:448},
            	{x:366,y:426},
            	{x:366,y:404},
            	{x:366,y:382},
            	{x:366,y:324},
            	{x:366,y:302},
            	{x:366,y:280},
            	{x:366,y:258},
            	{x:366,y:236},
            	{x:366,y:214},
            	{x:366,y:192},
            	{x:366,y:170},
            	{x:366,y:148},
            	{x:366,y:126},
            	{x:366,y:104}
			]*/
		];
	};
	staff.prototype={
		constructor:staff,
		/*取坐标新建*/
		createStaff:function(target,src){
			var offsetmin=12,
				offsetmax=34;
			/*testSrc*/
			var testSrc=this.testSrcArr[getRandom(0,8)];
			var itemHtml='<div class="staff-item">'+
            				'<img src="'+testSrc+'" alt="" class="front" />'+
            				'<img src="'+testSrc+'" alt="" class="back" />'+
            				'<img src="'+testSrc+'" alt="" class="left" />'+
            				'<img src="'+testSrc+'" alt="" class="right" />'+
            				'<img src="'+testSrc+'" alt="" class="top" />'+
            				'<img src="'+testSrc+'" alt="" class="bottom" />'+
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
			/*translate3d('+getRandom(-300,0)+'px,'+getRandom(-300,0)+'px,'+getRandom(-800,100)+'px)*/
			this.staff.css({
				/*'left':initX+'px','top':initY+'px'*/
				'transform-origin':'50% 50% '+getRandom(-100,100)+'px'
				/*'transform':'translateX('+getRandom(-200,200)+'px) translateZ('+getRandom(-1000,200)+'px)'*/
			}).appendTo('.staff-box')/*.animate({
				'left':posX+'px','top':posY+'px'
			})*//*.delay(2000).animate({
				'left':target.x+'px','top':target.y+'px'
			},200).promise().done(function(){
				$(this).css({
					'animation-name':'unknown'
				}).find('img:not(:first)').remove();
			})*/;
			this.staff=null;
		},
		/*最后一个*/
		createSpecialStaff:function(){
			var offsetmin=12,
				offsetmax=34;
			/*testSrc*/
			var testSrc=this.testSrcArr[getRandom(0,8)];
			var itemHtml='<div class="staff-item staff_special">'+
            				'<div>'+/*
            				'<img src="'+testSrc+'" alt="" />'+*/
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
			}).appendTo('.staff-box').animate({
				'left':posX+'px','top':posY+'px'
			}).delay(800).animate({
				'left':362+'px','top':350+'px'
			},200).promise().done(function(){
				$(this).find('div:first').css({
					'animation-name':'unknown',
					'top':'0'
				}).end().find('div:last').remove().end().find('div:first').css({
					'animation-name':'zoomIn',
					'animation-duration':'1.8s',
					'animation-iteration-count':'infinite',
					'border-radius':'50%'
				});
				//$('.staff-box').addClass('staff-box_rotate');
			});
			this.staff=null;
		},
		/*随机获取*/
		getTargetPos:function(){
			var selectedArr,tPosLen,fIndex;
			tPosLen=this.tPosArr.length;
			fIndex=getRandom(0,tPosLen);
			if(this.tPosArr[fIndex].length!==0){
				selectedArr=this.tPosArr[fIndex];
			}else{
				/*筛选出不为空的子数组*/
				var filterArr=this.tPosArr.filter(function(item,index){
					return item.length>0;
				});
				tPosLen=filterArr.length;
				fIndex=getRandom(0,tPosLen);
				selectedArr=filterArr[fIndex];
			}
			var sLen=selectedArr.length;
			var sIndex=getRandom(0,sLen);
			/*获取单个坐标*/
			var oTarget=selectedArr.splice(sIndex,1);
			return oTarget[0];
		},
		/*按文字边框顺序获取*/
		getTargetOrderPos:function(){
			var selectedArr;
			if(this.tPosArr[this.order].length!==0){
				selectedArr=this.tPosArr[this.order];
			}else{
				this.order++;
				selectedArr=this.tPosArr[this.order];
			}
			var sLen=selectedArr.length;
			var sIndex=getRandom(0,sLen);
			/*获取单个坐标*/
			var oTarget=selectedArr.splice(sIndex,1);
			return oTarget[0];
		},
		/*判断坐标数组是否全部为空*/
		tPosIsEmpty:function(){
			var bool=this.tPosArr.every(function(item){
				return item.length===0;
			});
			return bool?true:false; 
		},
		/*坐标总数*/
		getPosSum:function(){
			var countArr=this.tPosArr.map(function(item){
				return item.length;
			});
			var sum=0;
			$.each(countArr,function(i,v){
				sum+=v;
			});
			return sum;
		}
	};
	/*common*/
	function getRandom(m,n){
		return Math.floor(m+Math.random()*(n-m));
	}
	return {
		Staff:staff
	};
});