define(function(){
	var loadData=function(json){
		if(!localStorage.getItem('firstOpen')){
			json.tabPanel.css('display','none');
			json.common.showMaskToast(json.mask,json.loadingToast);
		}else{
			json.tabPanel.css('display','block');
		}
		var aCon=json.tabPanel.children('.weui-tab__panel'),timer=null;
		for(var i=0,len=json.arr.length;i<len;i++){
			var getLocalData=[];
			var conBox=aCon.eq(i);
			var HtmlArr=json.arr[i];
			for(var j=0,len2=HtmlArr.length;j<len2;j++){
				var html='<a href="javascript:void(0);" class="weui-media-box '+
						'weui-media-box_appmsg">'+
	                    '<div class="weui-media-box__hd">'+
	                        '<img class="weui-media-box__thumb" data-src="'+HtmlArr[j].imgSrc+'" alt="">'+
	                    '</div>'+
	                    '<div class="weui-media-box__bd">'+
	                        '<h4 class="weui-media-box__title">'+HtmlArr[j].title+'</h4>'+
	                        '<p class="weui-media-box__desc">'+HtmlArr[j].conIntro+'</p>'+
	                    '</div>'+
                	'</a>'+
                	'<i class="weui-icon-cancel"></i>';	
            	getLocalData.push(html);
            	$('<div></div>').addClass('weui-panel__bd').html(html).appendTo(conBox);
			}
			localStorage.setItem('data'+i,getLocalData);
		}
		if(localStorage.getItem('firstOpen')){
			return;
		}
		clearTimeout(timer);
		timer=setTimeout(function(){
			json.common.hideMaskToast(json.mask,json.loadingToast);
			json.common.showToast(json.toast);
			json.tabPanel.css('display','block');
			localStorage.setItem('firstOpen',true);
		},3000);
	};
	return loadData;
});