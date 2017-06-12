require.config({
	paths:{
		'jquery':['jquery-2.2.3.min'],
		'lTab':['lTab'],
		'loadData':['loadData']
	}
});
var arr=[
		[{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'}],
		[{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'}],
		[{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'}]
	];
require(['jquery','lTab','loadData'],function($,tab,loadData){
	
	$(document).ready(function(){
		var navBar=$('.weui-navbar'),tabPanel=$('.content');
		loadData(tabPanel,arr);
		tab(navBar,tabPanel);		
	});
});