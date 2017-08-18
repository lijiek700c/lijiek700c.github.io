require.config({
	paths:{
		'jquery':['jquery-2.2.3.min'],
		'commonFn':['commonFn'],
		'lTab':['lTab'],
		'loadData':['loadData'],
		'refreshData':['refreshData'],
		'testIE':['testIE']
	}
	//罗俊杰   17317190739
});
var arr=[
		[{href:'CDRegistrationForm/html/homePage.html',imgSrc:'images/test.png',title:'外籍人员管理首页',conIntro:'至少证明我们还活着'},{href:'cd-test/laws.html',imgSrc:'images/test.png',title:'法律法规',conIntro:'至少证明我们还活着'},{href:'cd-test/hotelRegister.html',imgSrc:'images/test.png',title:'注册',conIntro:'至少证明我们还活着'},{href:'test.html',imgSrc:'images/test.png',title:'测试不缩放行不行',conIntro:'至少证明我们还活着'},{href:'testGetCamera.html',imgSrc:'images/test.png',title:'h5调用手机摄像头',conIntro:'至少证明我们还活着'},{href:'selfHelpReportTask/homePage.html',imgSrc:'images/test.png',title:'自助终端首页',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'},{imgSrc:'images/test.png',title:'标题1a1',conIntro:'至少证明我们还活着'}],
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