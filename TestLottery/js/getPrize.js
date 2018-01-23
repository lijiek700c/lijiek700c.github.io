define(['jquery'],function($){
	/*中奖人的名字和电话号码*/
	var getPrizeManInfo='<li>'+
							'<span class="prizeName"></span>&nbsp;'+
							'<span class="tel"></span>'+
						'</li>';
	/*三等奖索尼音响*/
	var thirdPrizeHtml='<div class="prizeBox">'+
					'<img class="first" src="images/sony.png" alt="">'+
					'<img class="second" src="images/sony-txt.png" alt="">'+
					'<img src="images/thirdPrize.png" alt="">'+
					'<ul class="getAwardList">'+
					'</ul>'+
				'</div>';
	/*二等奖小米扫地机器人*/
	var secondPrizeHtml='<div class="prizeBox">'+
					'<img class="first" src="images/xiaomi.png" alt="">'+
					'<img class="second" src="images/xiaomi-txt.png" alt="">'+
					'<img src="images/secondPrize.png" alt="">'+
					'<ul class="getAwardList">'+
					'</ul>'+
				'</div>';
	/*一等奖*/
	var firstPrizeHtml='<div class="prizeBox">'+
					'<img class="first" src="images/kLine.png" alt="">'+
					'<img class="second" src="images/xgdqq-txt.png" alt="">'+
					'<img src="images/firstPrize.png" alt="">'+
					'<ul class="getAwardList">'+
					'</ul>'+
				'</div>';
	/*特等奖*/
	var specialPrizeHtml='<div class="prizeBox">'+
					'<img class="first" src="images/kLine.png" alt="">'+
					'<img class="second" src="images/xgbgp-txt.png" alt="">'+
					'<img src="images/specialPrize.png" alt="">'+
					'<ul class="getAwardList">'+
					'</ul>'+
				'</div>';
	/*插入中奖人信息*/
	function insertManInfo(dataItem){
		getPrizeManInfo='<li>'+
							'<span class="prizeName">'+dataItem.name+'</span>'+
							'<span class="tel">'+dataItem.tel+'</span>'+
						'</li>'; 
		return getPrizeManInfo;
	}
	/*生成中奖名单*/
	function createPrizeList(data){
		var prizeList='';
		if($.isArray(data)){
			$.each(data,function(i,item){
				prizeList+=insertManInfo(item);
			});	
		}
		return prizeList;
	}
	/*生成中奖信息字符串*/
	function createPrizeInfo(container,data,index){
		container.empty();
		var htmlStr=createPrizeList(data);
		switch(index){
			case 0: //三等奖
				$(thirdPrizeHtml).find('ul.getAwardList').html(htmlStr).end().prependTo(container);
				break;
			case 1: //二等奖
				$(secondPrizeHtml).find('ul.getAwardList').html(htmlStr).end().prependTo(container);
				break;
			case 2: //一等奖
				$(firstPrizeHtml).find('ul.getAwardList').html(htmlStr).end().prependTo(container);
				break;
			case 3: //特等奖
				$(specialPrizeHtml).find('ul.getAwardList').css({
					'justify-content':'center'
				}).html(htmlStr).find('li').css({
					'margin-right':'0'
				}).addClass('special').end().end().prependTo(container);
				break;
		}
	}
	/**/
	return {
		createPrizeInfo:createPrizeInfo
	};
});