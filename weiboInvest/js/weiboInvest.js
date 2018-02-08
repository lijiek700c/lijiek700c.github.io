/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

/*设置rem*/
var setRem = function () {
	var docEle = window.document.documentElement;
	var tid = null;
	function refreshRem() {
		var width = docEle.getBoundingClientRect().width;
		var rem = width / 10;
		if (rem >= 76.8) {
			rem = 76.8;
		}
		docEle.style.fontSize = rem + 'px';
	}
	return function () {
		window.addEventListener('resize', function () {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}, false);
		document.addEventListener('DOMContentLoaded', function () {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}, false);
		refreshRem();
	};
}();
/*静态数据*/
var selectData = [{
	title: '2017年你做了哪些传统媒体的推广？',
	mul: '(可多选)',
	red: '*',
	selList: [{
		info: '电视广告',
		beizhu: ''
	}, {
		info: '报纸广告',
		beizhu: ''
	}, {
		info: '电台广告',
		beizhu: ''
	}, {
		info: '户外广告',
		beizhu: '(公交站牌、电梯、户外大牌、公交车身等)'
	}]
}, {
	title: '2017年你做了哪些新媒体推广？',
	mul: '(可多选)',
	red: '*',
	selList: [{
		info: '微信推广',
		beizhu: ''
	}, {
		info: '微博推广',
		beizhu: ''
	}, {
		info: '百度推广',
		beizhu: ''
	}, {
		info: '视频网站推广',
		beizhu: '(爱奇艺、优酷、腾讯视频、搜狐视频等)'
	}]
}, {
	title: '2017年你认为最成功的广告投放在哪里？',
	mul: '',
	red: '',
	selList: [{
		info: '新媒体平台',
		beizhu: '(微博、微信、百度、视频网站)'
	}, {
		info: '传统媒体平台',
		beizhu: '(电视、电台、报纸、户外)'
	}, {
		info: '事件营销',
		beizhu: ''
	}, {
		info: '视频网站推广',
		beizhu: '(热点流量跟踪营销)'
	}]
}, {
	title: '你认为目前企业营销最难做的是什么？',
	mul: '',
	red: '',
	selList: [{
		info: '广告创意',
		beizhu: ''
	}, {
		info: '平台选择',
		beizhu: ''
	}, {
		info: '方案撰写',
		beizhu: ''
	}, {
		info: '品德契合',
		beizhu: ''
	}]
}];
/*输入框静态数据*/
var inputData = [{
	title: '姓名',
	beizhu: '',
	red: '*',
	placeholder: '请输入您的姓名'
}, {
	title: '公司电话',
	beizhu: '(手机)',
	red: '*',
	placeholder: '请输入您的电话号码'
}, {
	title: '企业名称',
	beizhu: '',
	red: '*',
	placeholder: '请输入文本信息'
}, {
	title: '企业微博名',
	beizhu: '',
	red: '*',
	placeholder: '请输入文本信息'
}];
$(function () {
	/*设置rem*/
	setRem();
	/**/
	new Vue({
		el: '.userSelectArea',
		data: {
			selectData: [],
			inputData: []
		},
		mounted: function mounted() {
			this.selectData = selectData;
			this.inputData = inputData;
		},
		methods: {}
	});
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);