(function($){
	var slideArr=['slideInUp','slideInRight','slideInDown','slideInLeft'];
	function ranSlide(m,n){
		return Math.floor(m+Math.random()*(n-m));
	}
	var dsLoadingObj=null;
	/*页面打开的时候*/
	var dsOpenLoading=(function($){
		function openLoading(){
			this.txt='正在加载';
			this.html='<div class="ds-loadingBox js_ds-loadingBox animated">'+
				'<div class="item-loader-container">'+
			        '<div class="la-ball-scale-multiple la-2x">'+
			            '<div></div>'+
			            '<div></div>'+
			            '<div></div>'+
			        '</div>'+
			        '<p>'+this.txt+'</p>'+
			    '</div>'+
			'</div>';
		}
		openLoading.prototype={
			constructor:openLoading,
			_show:function(txt){
				if(txt&&$.type(txt)!=='string'){
					console.warn('字符串');
					return;
				}
				if(dsLoadingObj){
					this.destroy();
				}
				dsLoadingObj=this;
				if($.type(txt)!=='undefined'){
					this.txt=txt;
				}
				$(this.html).find('p').text(this.txt).end().appendTo('body');
				return this;
			},
			_hide:function(fn){
				if(fn&&$.type(fn)!=='function'){
					console.warn('function');
					return;
				}
				var index=ranSlide(0,4);
				var plTimer=setTimeout($.proxy(function(){
					clearTimeout(plTimer);
					$('.js_l-container').css('display','block').addClass(slideArr[index]);
					this.destroy();
					fn&&fn();
				},this),500);
				return this;
			},
			signedHide:function(fn){
				var bgImg=$('.js_signBg'),
					bgImgSrc=bgImg.attr('data-src');
				bgImg.attr('src',bgImgSrc);
				$('body').css('background','rgb(25,25,112)');
				if($('.js_l-container').css('display')==='none'){
					$('.js_l-container').css('display','block');
					$('#container').css('display','block');
				}
				fn&&fn();
				return this;
			},
			imgLoadedHide:function(fn){  /*背景图片加载完*/
				var bgImg=$('.js_signBg');
				if(bgImg.length>0){
					var bgImgSrc=bgImg.attr('data-src');
					/*背景图片加载成功或失败*/
					bgImg.attr('src',bgImgSrc).on('load',$.proxy(function(){
						this._hide(fn);
					},this)).on('error',$.proxy(function(){
						$('body').css('background','rgb(25,25,112)');
						this._hide(fn);
					},this));
				}else{
					this._hide(fn);
				}
				return this;
			},
			destroy:function(){
				$('.js_ds-loadingBox').addClass('slideOutDown').fadeOut(1000,function(){
					$(this).remove();
				});
				dsLoadingObj=null;
			}
		};
		return openLoading;
	})($);
	/*提示的弹窗*/
	var dsDialog=(function($){
		var oldDsDialog;
		function Dialog(){
			this.timer=null;
			this.dialogBody=null;
		}
		Dialog.prototype={
			constructor:Dialog,
			init:function(config){
				config=config||{};
				this.type=config.type||1;
				this.title=config.title||'提示';
				this.content=config.content||'这是弹窗内容';
				this.html='<div class="js_dialog">'+
		            '<div class="weui-mask"></div>'+
		            '<div class="weui-dialog animated">'+
		                '<div class="weui-dialog__bd">'+this.content+'</div>'+
		                '<div class="weui-dialog__ft">'+
		                    '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>'+
		                '</div>'+
		            '</div>'+
		        '</div>';
				this.html2='<div class="js_dialog">'+
		            '<div class="weui-mask"></div>'+
		            '<div class="weui-dialog animated">'+
		                /*'<div class="weui-dialog__hd"><strong class="weui-dialog__title">'+this.title+'</strong></div>'+*/
		                '<div class="weui-dialog__bd">'+this.content+'</div>'+
		                '<div class="weui-dialog__ft">'+
		                    '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">取消</a>'+
		                    '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>'+
		                '</div>'+
		            '</div>'+
		        '</div>';
				var dfd=$.Deferred();
				return $.when(this.show(dfd));
			},
			show:function(dfd){
				if(oldDsDialog){
					this.destroy();
				}
				oldDsDialog=this;
				switch(this.type){
					case 2:
						$('body').append(this.html2);
						$('.weui-dialog','.js_dialog').addClass('bounceIn');
						$('a.weui-dialog__btn_primary').on('click',$.proxy(function(ev){
							var $this=$(ev.currentTarget);
							$this.closest('.weui-dialog').addClass('bounceOut');
							this.timer=setTimeout($.proxy(function(){
								clearTimeout(this.timer);
								dfd.resolve();
								this._hide();
							},this),200);
						},this));
						$('a.weui-dialog__btn_default').on('click touchstart',$.proxy(function(ev){
							var $this=$(ev.currentTarget);
							$this.closest('.weui-dialog').addClass('bounceOut');
							this.timer=setTimeout($.proxy(function(){
								clearTimeout(this.timer);
								dfd.reject();
								this._hide();
							},this),200);
						},this));
						break;
					default:
						$('body').append(this.html);
						$('.weui-dialog','.js_dialog').addClass('bounceIn');
						$('a.weui-dialog__btn_primary').on('click touchstart',$.proxy(function(ev){
							var $this=$(ev.currentTarget);
							$this.closest('.weui-dialog').addClass('bounceOut');
							this.timer=setTimeout($.proxy(function(){
								clearTimeout(this.timer);
								dfd.resolve();
								this._hide();
							},this),200);
						},this));
						break;
				}
				return dfd.promise();
			},
			_hide:function(){
				this.destroy();
			},
			destroy:function(){
				$('a.weui-dialog__btn_default').off('click');
				$('a.weui-dialog__btn_primary').off('click');
				$('.js_dialog').remove();
				oldDsDialog=null;
			}
		};
		return Dialog;
	})($);
	var dialog=new dsDialog();
	var dsOpenLoading=new dsOpenLoading();
	var dialog=new dsDialog();
	window.pg={
		dsOpenLoading:dsOpenLoading,
		dialog:function(config){
			return dialog.init(config);
		}
	};
})(jQuery);
