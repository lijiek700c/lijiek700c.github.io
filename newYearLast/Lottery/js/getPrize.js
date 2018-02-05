(function($){
	/*中奖人的名字和电话号码*/
	/*var getPrizeManInfo='<li>'+
							'<span class="prizeName"></span>&nbsp;'+
							'<span class="tel"></span>'+
						'</li>';*/
	var getPrizeManInfo='<li>'+
							'<img src="" alt="" />'+
							'<div class="prizeInfo">'+
								'<span class="prizeName"></span>'+
								'<span class="tel"></span>'+
							'</div>'+
						'</li>';
	/*索尼音响*/
	var thirdPrizeHtml='<div class="prizeBox">'+
					'<img class="first" src="images/sony.png" alt="">'+
					'<img class="second" src="images/sony-txt.png" alt="">'+
					'<img src="images/getPrizer2.png" alt="">'+
					'<ul class="getAwardList">'+
					'</ul>'+
				'</div>';
	/*小米扫地机器人*/
	var secondPrizeHtml='<div class="prizeBox">'+
					'<img class="first" src="images/xiaomi.png" alt="">'+
					'<img class="second" src="images/xiaomi-txt.png" alt="">'+
					'<img src="images/getPrizer2.png" alt="">'+
					'<ul class="getAwardList">'+
					'</ul>'+
				'</div>';
	/*比特币*/
	var bitCoinsPrizeHtml='<div class="prizeBox">'+
					'<img class="first" src="images/bitCoins.png" alt="">'+
					'<img class="second" src="images/bitCoins-txt.png" alt="">'+
					'<img src="images/getPrizer2.png" alt="">'+
					'<ul class="getAwardList">'+
					'</ul>'+
				'</div>';
	/*期权*/
	var firstPrizeHtml='<div class="prizeBox">'+
					'<img class="first" src="images/kLine.png" alt="">'+
					'<img class="second" src="images/xgdqq-txt.png" alt="">'+
					'<img src="images/getPrizer2.png" alt="">'+
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
		/*getPrizeManInfo='<li>'+
							'<span class="prizeName">'+dataItem.name+'</span>'+
							'<span class="tel">'+dataItem.mobile+'</span>'+
						'</li>';*/ 
		getPrizeManInfo='<li>'+
							'<img src="'+dataItem.avatar+'" alt="" />'+
							/*'<div class="prizeInfo">'+*/
								'<span class="prizeName">'+dataItem.name+'</span>'+
								/*'<span class="tel">'+dataItem.mobile+'</span>'+*/
							/*'</div>'+*/
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
			case 0: //索尼音响
				$(thirdPrizeHtml).find('ul.getAwardList').html(htmlStr).end().prependTo(container);
				break;
			case 1: //扫地机器人
				$(secondPrizeHtml).find('ul.getAwardList').html(htmlStr).end().prependTo(container);
				break;
			case 2: //期权
				$(firstPrizeHtml).find('ul.getAwardList').html(htmlStr).end().prependTo(container);
				break;
			case 3: //比特币
				$(bitCoinsPrizeHtml).find('ul.getAwardList').html(htmlStr).end().prependTo(container);
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
			case 7:  //随机抽期权中奖
				$(firstPrizeHtml).find('ul.getAwardList').html(htmlStr).end().prependTo(container);
				break;
			case 8: //随机抽奖
				container.css({
					'margin-top':'0',
					'height':'768px'
				});
				$(randomPrizeHtml).css({
					'padding-top':'120px'
				}).find('ul.getAwardList').css('margin-top','97px').html(htmlStr).end().prependTo(container);
				break;
		}
	}
	if(!('getPrize' in window)){
		/*createPrizeInfo*/
		window.gp={
			createPrizeInfo:createPrizeInfo
		};
	}
})(jQuery);
	
	/**/

