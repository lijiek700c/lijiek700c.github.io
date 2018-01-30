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
	/*一等奖期权*/
	var firstPrizeHtml='<div class="prizeBox">'+
					'<img class="first" src="images/kLine.png" alt="">'+
					'<img class="second" src="images/xgdqq-txt.png" alt="">'+
					'<img src="images/firstPrize.png" alt="">'+
					'<ul class="getAwardList">'+
					'</ul>'+
				'</div>';
	/*特等奖股票*/
	var specialPrizeHtml='<div class="prizeBox">'+
					'<img class="first" src="images/kLine.png" alt="">'+
					'<img class="second" src="images/xgbgp-txt.png" alt="">'+
					'<img src="images/specialPrize.png" alt="">'+
					'<ul class="getAwardList">'+
					'</ul>'+
				'</div>';
	/*旅游大奖*/
	var lyPrizeHtml='<div class="prizeBox ly">'+
						'<img class="first heartBeat" src="images/heart.png" alt="">'+
						'<div class="noticeBox">'+
							'<img class="second magictime" src="images/heart-txt.png" alt="">'+
							'<p class="magictime">备注:需在单身趴互动游戏中胜出且</p>'+
							'<p class="magictime">在旅游前在职并发展为情侣的才可获得此奖励</p>'+
						'</div>'+
					'</div>';
	/*随机抽奖*/
	var randomPrizeHtml='<div class="prizeBox">'+
					'<img src="images/getPrizer.png" alt="">'+
					'<ul class="getAwardList">'+
					'</ul>'+
					'<div class="luckFooterBox">'+
						'<img class="vivify rollInLeft" src="images/logo2.png" alt="" style="display: block;">'+
						'<p class="vivify luckFooterBox_txt swoopInRight" style="display: block;">长沙公信诚丰信息技术服务有限公司</p>'+
					'</div>'+
				'</div>';
	/*插入中奖人信息*/
	function insertManInfo(dataItem){
		if(dataItem.name.length===2){
			var nameArr=dataItem.name.split('');
			dataItem.name=nameArr[0]+'<b>某</b>'+nameArr[1];
		}
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
		container.removeAttr('style').empty();
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
			case 6: //旅游
				$(lyPrizeHtml).prependTo(container).parent().css({
					'margin-top':'125px',
					'width':'auto',
					'height':'600px',
					'max-width':'1366px',
					'overflow':'visible'
				});
				break;
			case 8: //随机抽奖
				container.css({
					'margin-top':'0',
					'height':'768px'
				});
				$(randomPrizeHtml).css({
					'padding-top':'200px'
				}).find('ul.getAwardList').css('margin-top','97px').html(htmlStr).end().prependTo(container);
				break;
		}
	}
	/**/
	return {
		createPrizeInfo:createPrizeInfo
	};
});