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

/*页面打开的时候*/
(function ($) {
	var slideArr = ['slideInUp', 'slideInRight', 'slideInLeft'];
	var dsLoadingObj = null;
	/*页面打开的时候*/
	var dsOpenLoading = function ($) {
		function openLoading() {
			this.txt = '正在加载';
			this.html = '<div class="ds-loadingBox js_ds-loadingBox animated" style="background:#284DA0;">' + '<div class="item-loader-container">' + '<div class="la-ball-scale-multiple la-2x">' + '<div></div>' + '<div></div>' + '<div></div>' + '</div>' + '<p>' + this.txt + '</p>' + '</div>' + '</div>';
		}
		openLoading.prototype = {
			constructor: openLoading,
			_show: function _show(txt) {
				if (txt && $.type(txt) !== 'string') {
					console.warn('字符串');
					return;
				}
				if (dsLoadingObj) {
					this.destroy();
				}
				dsLoadingObj = this;
				if ($.type(txt) !== 'undefined') {
					this.txt = txt;
				}
				$(this.html).find('p').text(this.txt).end().appendTo('body');
				return this;
			},
			_hide: function _hide(fn) {
				if (fn && $.type(fn) !== 'function') {
					console.warn('function');
					return;
				}
				var index = random(0, 3);
				var plTimer = setTimeout($.proxy(function () {
					clearTimeout(plTimer);
					$('.js_l-container').css('display', 'block').addClass(slideArr[index]);
					this.destroy();
					fn && fn();
				}, this), 500);
				return this;
			},
			signedHide: function signedHide(fn) {
				var bgImg = $('.js_signBg'),
				    bgImgSrc = bgImg.attr('data-src');
				bgImg.attr('src', bgImgSrc);
				$('body').css('background', 'rgb(25,25,112)');
				if ($('.js_l-container').css('display') === 'none') {
					$('.js_l-container').css('display', 'block');
				}
				fn && fn();
				return this;
			},
			imgLoadedHide: function imgLoadedHide(fn) {
				/*背景图片加载完*/
				var bgImg = $('.js_signBg');
				if (bgImg.length > 0) {
					var bgImgSrc = bgImg.attr('data-src');
					/*背景图片加载成功或失败*/
					bgImg.last().attr('src', bgImgSrc).on('load', $.proxy(function () {
						this._hide(fn);
					}, this)).on('error', $.proxy(function () {
						$('body').css('background', 'rgb(25,25,112)');
						this._hide(fn);
					}, this));
				} else {
					this._hide(fn);
				}
				return this;
			},
			videosLoaded: function videosLoaded() {
				var videos = $('video');
				videos.on('stalled', $.proxy(function () {
					pg.dialog({
						content: '网速太慢了！'
					});
				}, this)).on('error', $.proxy(function () {
					pg.dialog({
						content: '视频数据加载失败！'
					});
				}, this));
				return this;
			},
			destroy: function destroy() {
				$('.js_ds-loadingBox').addClass('slideOutDown').fadeOut(1000, function () {
					$(this).remove();
				});
				dsLoadingObj = null;
			}
		};
		var random = function random(m, n) {
			return Math.floor(m + Math.random() * (n - m));
		};
		return openLoading;
	}($);
	/*提示的弹窗*/
	var dsDialog = function ($) {
		var oldDsDialog;
		function Dialog() {
			this.timer = null;
			this.dialogBody = null;
		}
		Dialog.prototype = {
			constructor: Dialog,
			init: function init(config) {
				config = config || {};
				this.type = config.type || 1;
				this.title = config.title || '提示';
				this.content = config.content || '这是弹窗内容';
				this.html = '<div class="js_dialog">' + '<div class="weui-mask"></div>' + '<div class="weui-dialog animated">' + '<div class="weui-dialog__bd">' + this.content + '</div>' + '<div class="weui-dialog__ft">' + '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>' + '</div>' + '</div>' + '</div>';
				this.html2 = '<div class="js_dialog">' + '<div class="weui-mask"></div>' + '<div class="weui-dialog animated">' +
				/*'<div class="weui-dialog__hd"><strong class="weui-dialog__title">'+this.title+'</strong></div>'+*/
				'<div class="weui-dialog__bd">' + this.content + '</div>' + '<div class="weui-dialog__ft">' + '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">取消</a>' + '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>' + '</div>' + '</div>' + '</div>';
				var dfd = $.Deferred();
				return $.when(this.show(dfd));
			},
			show: function show(dfd) {
				if (oldDsDialog) {
					this.destroy();
				}
				oldDsDialog = this;
				switch (this.type) {
					case 2:
						$('body').append(this.html2);
						$('.weui-dialog', '.js_dialog').addClass('bounceIn');
						$('a.weui-dialog__btn_primary').on('click', $.proxy(function (ev) {
							var $this = $(ev.currentTarget);
							$this.closest('.weui-dialog').addClass('bounceOut');
							this.timer = setTimeout($.proxy(function () {
								clearTimeout(this.timer);
								dfd.resolve();
								this._hide();
							}, this), 200);
						}, this));
						$('a.weui-dialog__btn_default').on('click touchstart', $.proxy(function (ev) {
							var $this = $(ev.currentTarget);
							$this.closest('.weui-dialog').addClass('bounceOut');
							this.timer = setTimeout($.proxy(function () {
								clearTimeout(this.timer);
								dfd.reject();
								this._hide();
							}, this), 200);
						}, this));
						break;
					default:
						$('body').append(this.html);
						$('.weui-dialog', '.js_dialog').addClass('bounceIn');
						$('a.weui-dialog__btn_primary').on('click touchstart', $.proxy(function (ev) {
							var $this = $(ev.currentTarget);
							$this.closest('.weui-dialog').addClass('bounceOut');
							this.timer = setTimeout($.proxy(function () {
								clearTimeout(this.timer);
								dfd.resolve();
								this._hide();
							}, this), 200);
						}, this));
						break;
				}
				return dfd.promise();
			},
			_hide: function _hide() {
				this.destroy();
			},
			destroy: function destroy() {
				$('a.weui-dialog__btn_default').off('click');
				$('a.weui-dialog__btn_primary').off('click');
				$('.js_dialog').remove();
				oldDsDialog = null;
			}
		};
		return Dialog;
	}($);
	var _dialog = new dsDialog();
	var dsOpenLoading = new dsOpenLoading();
	var _dialog = new dsDialog();
	window.pg = {
		dsOpenLoading: dsOpenLoading,
		dialog: function dialog(config) {
			return _dialog.init(config);
		}
	};
})(jQuery);

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
	pg.dsOpenLoading._show();
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
			pg.dsOpenLoading.imgLoadedHide();
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