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
	/*等待操作时*/
	var dsWaitLoading = function ($) {
		function waitLoading() {
			this.txt = '正在加载';
			this.html = '<div class="ds-loadingBox js_ds-loadingBox" style="background:rgba(0,0,0,0.2);">' + '<div class="item-loader-container wait">' + '<div class="la-fire la-2x">' + '<div></div>' + '<div></div>' + '<div></div>' + '</div><br>' + '<p>' + this.txt + '</p>' + '</div>' + '</div>';
		}
		waitLoading.prototype = {
			constructor: waitLoading,
			_show: function _show(txt, type) {
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
				switch (type) {
					default:
						$(this.html).find('p').text(this.txt).end().appendTo('body');
						break;
				}
				return this;
			},
			_hide: function _hide(fn) {
				if (fn && $.type(fn) !== 'function') {
					console.warn('function');
					return;
				}
				var plTimer = setTimeout($.proxy(function () {
					clearTimeout(plTimer);
					this.destroy();
					fn && fn();
				}, this), 200);
				return this;
			},
			destroy: function destroy() {
				$('.js_ds-loadingBox').fadeOut(200, function () {
					$(this).remove();
				});
				dsLoadingObj = null;
			}
		};
		return waitLoading;
	}(jQuery);
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
	var dsOpenLoading = new dsOpenLoading();
	var dsWaitLoading = new dsWaitLoading();
	var _dialog = new dsDialog();
	window.pg = {
		dsOpenLoading: dsOpenLoading,
		dsWaitLoading: dsWaitLoading,
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
	placeholder: '请输入您的姓名',
	type: 'name'
}, {
	title: '公司电话',
	beizhu: '(手机)',
	red: '*',
	placeholder: '请输入您的电话号码',
	type: 'tel'
}, {
	title: '企业全称',
	beizhu: '',
	red: '*',
	placeholder: '请输入文本信息',
	type: ''
}, {
	title: '企业微博昵称',
	beizhu: '',
	red: '*',
	placeholder: '请输入文本信息',
	type: ''
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
			inputData: [],
			selectedData: {
				'1': {},
				'2': {},
				'3': {},
				'4': {}
			},
			telReg: /^((1[3|5|7|8][0-9])\d{8})|((0[1-9][0-9])\d{8})|((0[1-9][0-9])\d{7})|((0[1-9][0-9][0-9])\d{8})|((0[1-9][0-9][0-9])\d{7})$/,
			nameReg: /^[\u4e00-\u9fa5]{1}/
		},
		mounted: function mounted() {
			this.selectData = selectData;
			this.inputData = inputData;
			pg.dsOpenLoading.imgLoadedHide();
		},
		methods: {
			selectAnswer: function selectAnswer(ev) {
				var listItem = $(ev.currentTarget),
				    listItemParent = listItem.parent(),
				    itemCheckBox = listItem.find('input:checkBox'),
				    itemIcon = listItem.find('img');
				var multipleBool = listItemParent.attr('data-multiple'); //是否可多选
				var order = parseInt(listItemParent.attr('data-order')); //问题序号
				var aOrder = parseInt(listItem.attr('data-aOrder')); //答案序号
				var checkedBool = itemCheckBox.prop('checked'); //选中不选中切换
				var answer = listItem.find('span').map(function (i, e) {
					return $(e).text();
				}).get().join(''); //选中的答案信息
				checkedBool ? itemCheckBox.prop('checked', '').siblings('img').attr('src', 'images/notSelect.png') : itemCheckBox.prop('checked', 'true').siblings('img').attr('src', 'images/selected.png');
				if (multipleBool === '') {
					listItem.siblings().find('input:checkBox').prop('checked', '').end().find('img').attr('src', 'images/notSelect.png');
				}
				/*存选中的数据*/
				this.selectedDataOpe({
					multipleBool: multipleBool,
					bool: checkedBool,
					order: order,
					aOrder: aOrder,
					answer: answer
				});
			},
			selectedDataOpe: function selectedDataOpe(opt) {
				if (opt.multipleBool !== '') {
					opt.bool ? this.selectedData[opt.order][opt.aOrder] = '' : this.selectedData[opt.order][opt.aOrder] = opt.answer;
				} else {
					opt.bool ? this.selectedData[opt.order][1] = '' : this.selectedData[opt.order][1] = opt.answer;
				}
			},
			inputFocus: function inputFocus(ev) {
				var oInput = $(ev.currentTarget);
				oInput.parent().css('border-color', '#6c85bc');
			},
			inputBlur: function inputBlur(ev) {
				var oInput = $(ev.currentTarget);
				oInput.parent().css('border-color', '#f6f6f6');
			},
			infosIsNotEmpty: function infosIsNotEmpty(eles) {
				//输入信息全部不为空
				var eleArr = $.makeArray(eles);
				return eleArr.every(function (item) {
					return item.value !== '';
				});
			},
			selectedAnswerIsNotEmpty: function selectedAnswerIsNotEmpty() {
				if (this.AnswerIsEmpty()) {
					//只要有一个为空
					return false;
				};
				var answerArr = $.map(this.selectedData, function (item, k) {
					return item;
				});
				var emptyCount = 0;
				$.each(answerArr, function (i, item) {
					$.each(item, function (k, v) {
						if (v !== '') {
							emptyCount++;
							return false;
						}
					});
				});
				return emptyCount === answerArr.length ? true : false;
			},
			AnswerIsEmpty: function AnswerIsEmpty() {
				var answersList = $.map(this.selectedData, function (item, k) {
					return item;
				});
				return answersList.some(function (item) {
					return $.isEmptyObject(item);
				});
			},
			submitData: function submitData(ev) {
				if (localStorage.getItem('submited')) {
					pg.dialog({
						content: '信息已提交！非常感谢！'
					});
					return false;
				}
				var _self = this;
				var sBtn = $(ev.currentTarget);
				var aInput = sBtn.siblings('ul').find('input');
				var sBool = this.infosIsNotEmpty(aInput);
				var needRegLen = aInput.filter(function (i, e) {
					return $(e).attr('data-regtype') !== '';
				}).length;
				var isBreak,
				    lenCount = 0,
				    regCount = 0;
				if (sBool) {
					//验证信息
					aInput.each($.proxy(function (i, e) {
						var $e = $(e);
						var val = $e.val();
						var len = val.length;
						var type = $.trim($e.attr('data-regtype'));
						switch (type) {
							case 'name':
								var nameBool = this.nameReg.test(val);
								if (nameBool) {
									regCount++;
								} else {
									pg.dialog({
										content: '请输入正确的姓名！'
									});
									isBreak = true;
								}
								break;
							case 'tel':
								var telRegBool = this.telReg.test(val);
								if (telRegBool) {
									if (val.charAt(0) === '1') {
										if (val.length > 11) {
											pg.dialog({
												content: '请输入正确的手机号码！'
											});
											isBreak = true;
										} else {
											regCount++;
										}
									} else if (val.charAt(0) === '0') {
										var subNumArr = [10, 11, 12];
										$.each(subNumArr, function (i, v) {
											if (len === v) {
												lenCount++;
											}
										});
										if (lenCount === 0) {
											pg.dialog({
												content: '请输入正确的座机号码！'
											});
											isBreak = true;
										} else {
											regCount++;
										}
									}
								} else {
									pg.dialog({
										content: '请输入正确的电话号码！'
									});
									isBreak = true;
								}
								break;
						}
						if (isBreak) {
							return false;
						}
					}, this));
				} else {
					aInput.each(function (i, e) {
						var $e = $(e);
						var title = $e.parent().siblings('p').children('span:eq(0)').text();
						if ($e.val() === '') {
							pg.dialog({
								content: '请输入"' + title + '"信息'
							});
							return false;
						}
					});
				}
				var answerStr = '';
				$.each(this.selectedData, function (i, item) {
					$.each(item, function (k, v) {
						answerStr += i + '-' + k + ':' + v + ',';
					});
					answerStr += ';';
					answerStr = answerStr.replace(/\,\;$/, ';');
				});
				var answerBool = this.selectedAnswerIsNotEmpty(); //答案一个都不能为空，必选
				if (!answerBool) {
					pg.dialog({
						content: '每个问卷答案都要选择哦！'
					});
					return false;
				}
				/*提交*/
				if (regCount === needRegLen && answerBool) {
					pg.dsWaitLoading._show('正在提交');
					var inputInfo = aInput.map(function (i, e) {
						//表单信息
						return $(e).val();
					}).get();
					$.ajax({
						url: 'http://172.16.1.39:8080/blog_question/submitQuestionResult',
						type: 'POST',
						data: {
							corp_blog_name: inputInfo[3],
							corp_name: inputInfo[2],
							corp_tel: inputInfo[1],
							username: inputInfo[0],
							question_ansower: answerStr
						},
						dataType: 'json'
					}).done(function (data) {
						var sTimer = setTimeout(function () {
							clearTimeout(sTimer);
							localStorage.setItem('submited', 'submited');
							pg.dsWaitLoading._hide();
							pg.dialog({
								content: '提交成功！'
							});
						}, 3000);
					}).fail(function (err) {
						pg.dsWaitLoading._hide();
						pg.dialog({
							content: '提交失败！'
						});
					});
				}
			}
		}
	});
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);