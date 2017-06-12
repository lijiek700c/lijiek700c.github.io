define(function(){
	var loadData=function(obj,arr){
		var aCon=obj.children('.weui-tab__panel');
		for(var i=0,len=arr.length;i<len;i++){
			var conBox=aCon.eq(i);
			var HtmlArr=arr[i];
			for(var j=0,len2=HtmlArr.length;j<len2;j++){
				var html='<a href="javascript:void(0);" class="weui-media-box '+
						'weui-media-box_appmsg">'+
	                    '<div class="weui-media-box__hd">'+
	                        '<img class="weui-media-box__thumb" src="'+HtmlArr[j].imgSrc+'" alt="">'+
	                    '</div>'+
	                    '<div class="weui-media-box__bd">'+
	                        '<h4 class="weui-media-box__title">'+HtmlArr[j].title+'</h4>'+
	                        '<p class="weui-media-box__desc">'+HtmlArr[j].conIntro+'</p>'+
	                    '</div>'+
                	'</a>'+
                	'<i class="weui-icon-cancel"></i>';	
            	$('<div></div>').addClass('weui-panel__bd').html(html).appendTo(conBox);
			}
		}
	};
	return loadData;
});