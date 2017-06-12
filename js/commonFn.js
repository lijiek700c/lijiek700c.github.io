define(function(){
	function showToast(ele){
			var timer=null,obj=ele;
			showMaskToast(obj);
			clearTimeout(timer);
			timer=setTimeout(function(){
				hideMaskToast(obj);	
			},800);	
	}
	function showMaskToast(){
		allEleToggle(arguments,'block');		
	}
	function hideMaskToast(){
		allEleToggle(arguments,'none');		
	}
	function allEleToggle(arr,str){
		for(var i=0,len=arr.length;i<len;i++){
			arr[i].css('display',str);
		}
	}
	var pullDownRefresh=function(opt,index){
		var startRefreshDis=0.3;
		var moveCount=200;
		var percentage=0;
		var joinRefreshFlag=null;
		var refreshFlag=null;
		var dragStart=null;
		var changeOneTimeDom=0;
		var wrapper=opt.tabPanel;
		var pullArrow=wrapper.find('#pullArrow'),
			pullText=wrapper.find('#pullText');
		wrapper.on('touchstart',function(event){
			if(refreshFlag){
				ev.preventDefault();
				return;
			}
			dragStart=event.originalEvent.targetTouches[0].pageY;
			wrapper.css('webkit-transition','none');
			pullArrow.show();
			pullArrow.removeClass('up');
			pullArrow.removeClass('down');
		});
		wrapper.on('touchmove',function(event){
			if(dragStart===0){
				return;
			}
			if(refreshFlag){
				event.preventDefault();
				return;
			}

			var target=event.originalEvent.targetTouches[0].pageY;

			percentage=(dragStart-target)/window.screen.height;

			if(document.body.scrollTop===0){
				if(percentage<0){
					event.preventDefault();
					if(!changeOneTimeDom){
						changeOneTimeDom=1;
					}

					var translateY=-percentage*moveCount;

					joinRefreshFlag=true;

					wrapper.css('webkit-transform','translate3d(0,'+translateY+'px,0)');

					if(Math.abs(percentage)>startRefreshDis){
						pullArrow.removeClass('down');
						pullArrow.addClass('up');
						pullText.text('释放刷新');
					}else{
						pullArrow.removeClass('up');
						pullArrow.addClass('down');
						pullText.text('下拉刷新');
					}
				}
			}else{
				if(joinRefreshFlag==null){
					joinRefreshFlag=false;
				}
			}
		});
		wrapper.on('touchend',function(event){
				if(percentage===0){
					return;
				}
				if(refreshFlag){
					event.preventDefault();
					return;
				}
				var index;
				if(Math.abs(percentage)>startRefreshDis&&joinRefreshFlag){
					if(localStorage.getItem('firstOpen')){
						index=0;
					}
					var index=localStorage.getItem('index');
					pullArrow.hide();
					pullText.text('正在刷新...');

					wrapper.css('webkit-transition','330ms');

					wrapper.css('webkit-transform','translate3d(0,'+50+'px,0)');

					showMaskToast(opt.mask,opt.loadingToast);

					refreshFlag=1;

					var timer=null

					clearTimeout(timer);
					timer=setTimeout(function(){
						wrapper.css('webkit-transform','translate3d(0,'+0+'px,0)');

						pullText.text('下拉刷新');

						hideMaskToast(opt.mask,opt.loadingToast);

						pulladdData(wrapper.children('.weui-tab__panel').eq(index),opt.refreshData[index]);
						showToast(opt.toast);

						refreshFlag=0;	

					},3000);
				}else{
					if(joinRefreshFlag){
						wrapper.css('webkit-transition','330ms');

						wrapper.css('webkit-transform','translate3d(0,'+0+'px,0)');

						joinRefreshFlag=null;

						refreshFlag=0;
					}
				}
				dragStart=null;

				percentage=0;

				changeOneTimeDom=0;

				
			});
	};
	function pulladdData(obj,arr){
		for(var i=0,len=arr.length;i<len;i++){
			var html='<a href="javascript:void(0);" class="weui-media-box '+
						'weui-media-box_appmsg">'+
	                    '<div class="weui-media-box__hd">'+
	                        '<img class="weui-media-box__thumb" src="'+arr[i].imgSrc+'" alt="">'+
	                    '</div>'+
	                    '<div class="weui-media-box__bd">'+
	                        '<h4 class="weui-media-box__title">'+arr[i].title+'</h4>'+
	                        '<p class="weui-media-box__desc">'+arr[i].conIntro+'</p>'+
	                    '</div>'+
                	'</a>'+
                	'<i class="weui-icon-cancel"></i>';
            $('<div></div>').addClass('weui-panel__bd').html(html).prependTo(obj);    	
		}
	}
	return {
		showToast:showToast,
		showMaskToast:showMaskToast,
		hideMaskToast:hideMaskToast,
		pullDownRefresh:pullDownRefresh
	};
});