require.config({
	paths:{
		'jquery':['jquery-2.2.3.min'],
		'commonFn':['commonFn'],
		'lTab':['lTab'],
		'loadData':['loadData'],
		'refreshData':['refreshData'],
		'testIE':['testIE']
	}
});
var arr=[
		[{href:'CDRegistrationForm/html/homePage.html',imgSrc:'images/test.png',title:'外籍人员管理首页',conIntro:''},
		{href:'bootstrap/test.html',imgSrc:'images/test.png',title:'学习bootstrap',conIntro:''},
		{href:'testGetCamera.html',imgSrc:'images/test.png',title:'h5调用手机摄像头',conIntro:''},
		{href:'selfAlarm/threeChoices.html',imgSrc:'images/test.png',title:'自助终端首页',conIntro:''},
		{href:'bootstrap/test2.html',imgSrc:'images/test.png',title:'bootstrap表单',conIntro:''},
		{href:'try/test.html',imgSrc:'images/test.png',title:'试试',conIntro:''},
		{href:'testSign/signSuccess.html',imgSrc:'images/test.png',title:'签到成功',conIntro:''},
		{href:'',imgSrc:'images/test.png',title:'',conIntro:''},
		{href:'',imgSrc:'images/test.png',title:'标题1a1',conIntro:''},
		{href:'',imgSrc:'images/test.png',title:'标题1a1',conIntro:''}
		],
		[{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'},{imgSrc:'images/test.png',title:'标题2b2',conIntro:'唱情歌落俗，说爱又太苦'}],
		[{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'},{imgSrc:'images/test.png',title:'标题3b3',conIntro:'话不多，一句就忐忑'}]
	];
require(['jquery','testIE','commonFn','lTab','loadData','refreshData'],function($,testIE,common,tab,loadData,refreshData){
	$(document).ready(function(){
		var body=$('body');
		var navBar=$('.weui-navbar'),tabPanel=$('.content'),closeDialog=$('.weui-dialog');
		var searchBox=$('#searchBar');
		var mask=$('#weuiMask'),
			loadingToast=$('#loadingToast'),
			toast=$('#toast'),
			toastError=$('#toastError'),
			userActions=$('.userActions');
		var lazyLoadImgArr=[];
		testIE({
			mask:mask,
			closeDialog:closeDialog
		});
		loadData({
			tabPanel:tabPanel,
			arr:arr,
			common:common,
			mask:mask,
			loadingToast:loadingToast,
			toast:toast
		});
		common.loadClientImg(lazyLoadImgArr);
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
			userActions:userActions,
			lazyLoadImgArr:lazyLoadImgArr,
			refreshData:refreshData
		});
		common.returnTop({
			userActions:userActions,
			mask:mask,
			body:body,
			searchBox:searchBox
		});
		common.searchArticle({
			tabPanel:tabPanel,
			searchBox:searchBox,
			mask:mask,
			loadingToast:loadingToast,
			toast:toast,	
		});
	});
});