define(function(){
	function showToast(ele,fn){
			var timer=null,obj=ele;
			showMaskToast(obj);
			clearTimeout(timer);
			timer=setTimeout(function(){
				hideMaskToast(obj);
				fn&&fn();
			},500);	
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
						//opt.before&&opt.before();
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
					index=localStorage.getItem('index');
					pullArrow.hide();
					pullText.text('正在刷新...');

					wrapper.css('webkit-transition','330ms');

					wrapper.css('webkit-transform','translate3d(0,'+50+'px,0)');

					showMaskToast(opt.mask,opt.loadingToast);

					$('html').addClass('noScroll');

					refreshFlag=1;

					var timer=null

					clearTimeout(timer);
					timer=setTimeout(function(){
						wrapper.css('webkit-transform','translate3d(0,'+0+'px,0)');

						pullText.text('下拉刷新');

						hideMaskToast(opt.mask,opt.loadingToast);

						$('html').removeClass('noScroll');

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
	function pulladdData(obj,arr,bool){
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
            bool?$('<div></div>').addClass('weui-panel__bd').html(html).appendTo(obj):$('<div></div>').addClass('weui-panel__bd').html(html).prependTo(obj);    	
		}
	}
	function deleteListItem(opt){
		//dialog,mask,toast,loadingToast,listItem
		var confirmBtn=opt.closeDialog.find('.weui-dialog__btn_primary');
		var quitBtn=opt.closeDialog.find('.weui-dialog__btn_default');
		var body=$('body');
		var control=false,timer=null;
		if(control)return;
		control=true;
		opt.toast.find('.weui-toast__content').text('已删除');
		showMaskToast(opt.mask);
		$('html').addClass('noScroll');
		opt.closeDialog.css('display','block').addClass('fadeIn');
		confirmBtn.on('click',function(){
			opt.loadingToast.find('.weui-toast__content').text('正在删除...');
			var top=opt.listItem.offset().top;
			var clientHeight=$(window).height();
			var listItemHeight=opt.listItem.height();
			var scrollHeight=body.height();
			if(top>=clientHeight){
				body.scrollTop(scrollHeight-clientHeight-listItemHeight-10);	
			}else{
				body.scrollTop(0);
			}
			opt.closeDialog.css('display','none').removeClass('fadeIn');
			showMaskToast(opt.loadingToast);
			opt.listItem.slideUp(300,function(){
				$(this).css('display','none').remove();
				hideMaskToast(opt.mask,opt.loadingToast);
				$('html').removeClass('noScroll');
				opt.loadingToast.find('.weui-toast__content').text('数据加载中');
				clearTimeout(timer);
				timer=setTimeout(function(){
					showToast(opt.toast,function(){
						opt.toast.find('.weui-toast__content').text('已完成');
					});	
				},600);
				confirmBtn=null;
				quitBtn=null;
				control=false;
			});
		});
		quitBtn.on('click',function(){
			opt.closeDialog.css('display','none').removeClass('fadeIn');
			hideMaskToast(opt.mask);
			$('html').removeClass('noScroll');
			confirmBtn=null;
			quitBtn=null;	
		});
	}
	function scrollLoad(opt){
		var win=$(window),
			opt=opt||{},
			body=$('body'),
			aCon=opt.tabPanel.children('.weui-tab__panel'),count=0,
			preLoadDis=0.05,loadBool=false,upDown=true;timer1=timer=null;
		win.on('scroll',function(){
			//alert(body.scrollTop());
			if(body.scrollTop()==0)return;
			var offsetHeight=$(window).innerHeight();
			var scrollHeight=$(document).height();
			var scrollTop=$(window).scrollTop();
			if(parseInt(preLoadDis)!==preLoadDis){
				preLoadDis=scrollHeight*preLoadDis;
			}
			//加载新的列表项
			if((offsetHeight+scrollTop)>=scrollHeight){  
				if(loadBool)return;
				loadBool=true;
				showMaskToast(opt.mask,opt.loadingToast);
				$('html').addClass('noScroll');
				var index=0||localStorage.getItem('index');
				clearTimeout(timer);
				timer=setTimeout(function(){
					hideMaskToast(opt.mask,opt.loadingToast);
					$('html').removeClass('noScroll');
					pulladdData(aCon.eq(index),opt.refreshData[index],upDown);
					showToast(opt.toast);
					clearTimeout(timer1);
					timer1=setTimeout(function(){
						loadBool=false;	
					},500);
				},2000);
			}
			//返回顶部
			if(scrollTop>100){
				opt.userActions.show().addClass('swing');
			}else{
				opt.userActions.hide(200).removeClass('swing');	
			}
			//----
			var index=localStorage.getItem('index')||0;
			//console.log(opt.lazyLoadImgArr[0]);
			if(opt.lazyLoadImgArr[index].length===0){
				return;
			}
			//图片延迟加载
			var img=opt.lazyLoadImgArr[index][count];
			if((offsetHeight+scrollTop)>=img.offset().top){
					var src=img.attr('data-src');
					img.attr('src',src).removeAttr('data-src');
					opt.lazyLoadImgArr[index].splice(count,1);
			}
			
			
		});
	}
	function loadClientImg(lazyLoadImgArr){
		var aImg=$('img:first'),arr=[],clientHeight=$(window).height();
		var eleHeight=aImg.parents('.weui-panel__bd').height();
		var count=parseInt(clientHeight/eleHeight);
		var aImgParent=$('.weui-tab__panel');
		//0 1 2 3 4 5
		aImgParent.each(function(index,ele){
			var aImgInThis=$(ele).find('img');
			var itemArr=[];
			aImgInThis.each(function(index2,imgEle){
				var img=$(imgEle);
				index2<count?arr.push(img):itemArr.push(img);
			});	
			lazyLoadImgArr.push(itemArr); 				
		});
		for(var i=0,len=arr.length;i<len;i++){
			var src=arr[i].attr('data-src');
			arr[i].removeAttr('data-src').attr('src',src);
		}
	}
	function returnTop(opt){
		var returnTop=opt.userActions.children('.weui-icon-download');
		var showSearchBtn=opt.userActions.children('.weui-icon-search');
		returnTop.on('click',function(){
			opt.body.animate({scrollTop:0},200);
		});
		showSearchBtn.on('click',function(){
			opt.mask.show();
			opt.searchBox.show(200);
			//$('html').addClass('noScroll');
		});
	}
	function searchArticle(opt){
		var body=$('body');
		var userInput=opt.searchBox.find('.weui-search-bar__input');
		var clearInput=opt.searchBox.find('.weui-icon-clear');
		var startSearchBtn=opt.searchBox.find('.weui-btn_primary');
		var closeSearchBtn=opt.searchBox.find('.weui-btn_warn');
		
		userInput.on('focus',function(){
			clearInput.show();
		});
		clearInput.on('click',function(){
			if(userInput.val()==='')return;
			userInput.val('');
			$(this).hide();	
		});
		startSearchBtn.on('click',function(){
			//$('html').addClass('noScroll');
			if(userInput.val()==='')return;
			var index=localStorage.getItem('index');
			opt.tabPanel.children('.weui-tab__panel').eq(index).hide();
			console.log(userInput.val());
			opt.searchBox.fadeOut(200);
			showMaskToast(opt.loadingToast);
			
			
		});
		closeSearchBtn.on('click',function(){
			opt.mask.hide();
			opt.searchBox.fadeOut(200,function(){
				$(this).hide();	
			});
		});
	}
	//显示弹窗后，阻止window窗口滚动
	function smartScroll(){

	}
	return {
		showToast:showToast,
		showMaskToast:showMaskToast,
		hideMaskToast:hideMaskToast,
		pullDownRefresh:pullDownRefresh,
		scrollLoad:scrollLoad,
		deleteListItem:deleteListItem,
		loadClientImg:loadClientImg,
		returnTop:returnTop,
		searchArticle:searchArticle
	};
});