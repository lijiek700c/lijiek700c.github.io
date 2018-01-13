define(['jquery'],function($){
	var dsLoadingObj=null;
	/*页面打开的时候*/
	var dsOpenLoading=function(){
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
	};
	dsOpenLoading.prototype={
		constructor:dsOpenLoading,
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
			var plTimer=setTimeout($.proxy(function(){
				clearTimeout(plTimer);
				if($('.js_l-container').css('display')==='none'){
					$('.js_l-container').css('display','block').addClass('slideInRight');
				}
				this.destroy();
				fn&&fn();
			},this),500);
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
					$('body').css('background','rgba(0,0,0,0.5)');
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
	var dsOpenLoading=new dsOpenLoading();
	return {
		dsOpenLoading:dsOpenLoading
	};
});