require.config({
	paths:{
		'jquery':['jquery-2.2.3.min'],
		'commonFn':['commonFn'],
		'lTab':['lTab'],
		'loadData':['loadData'],
		'refreshData':['refreshData']
	}
	//罗俊杰   17317190739
});
var arr=[
		[{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'}],
		[{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'}],
		[{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'}]
	];
require(['jquery','commonFn','lTab','loadData','refreshData'],function($,common,tab,loadData,refreshData){
	$(document).ready(function(){
		var navBar=$('.weui-navbar'),tabPanel=$('.content'),closeDialog=$('.weui-dialog');
		var mask=$('#weuiMask'),
			loadingToast=$('#loadingToast'),
			toast=$('#toast'),
			toastError=$('#toastError');
		loadData({
			tabPanel:tabPanel,
			arr:arr,
			common:common,
			mask:mask,
			loadingToast:loadingToast,
			toast:toast
		});
		tab({
			navBar:navBar,
			tabPanel:tabPanel,
			closeDialog:closeDialog,
			mask:mask,
			toast:toast,
			loadingToast:loadingToast,
			common:common
		});
		common.pullDownRefresh({
			tabPanel:tabPanel,
			mask:mask,
			loadingToast:loadingToast,
			toast:toast,
			refreshData:refreshData
		});
		common.scrollLoad({
			tabPanel:tabPanel,
			mask:mask,
			loadingToast:loadingToast,
			toast:toast,
			refreshData:refreshData
		});

	});
});