define(['Zepto','timer'],function($,timer){

/*弹窗S*/
var dsDialog=(function($){
	var oldDsDialog;
	function Dialog(config){
		this.type=config.type||1;
		this.title=config.title||'提示';
		this.content=config.content||'这是弹窗内容';
		this.html='<div class="js_dialog">'+
	        '<div class="weui-mask"></div>'+
	        '<div class="weui-dialog">'+
	            '<div class="weui-dialog__hd"><span class="weui-dialog__title">'+this.title+'</span></div>'+
	            '<div class="weui-dialog__bd">'+this.content+'</div>'+
	            '<div class="weui-dialog__ft">'+
	                '<span class="weui-dialog__btn weui-dialog__btn_primary">确定</span>'+
	            '</div>'+
	        '</div>'+
	    '</div>';
	    this.html2='<div class="js_dialog">'+
	        '<div class="weui-mask"></div>'+
	        '<div class="weui-dialog">'+
	            '<div class="weui-dialog__hd"><span class="weui-dialog__title">'+this.title+'</span></div>'+
	            '<div class="weui-dialog__bd">'+this.content+'</div>'+
	            '<div class="weui-dialog__ft">'+
	                '<span class="weui-dialog__btn weui-dialog__btn_default">取消</span>'+
	                '<span class="weui-dialog__btn weui-dialog__btn_primary">确定</span>'+
	            '</div>'+
	        '</div>'+
	    '</div>';
	    this.html3='<div class="js_dialog">'+
	        '<div class="weui-mask"></div>'+
	        '<div class="weui-dialog">'+
	            '<div class="weui-dialog__hd"><span class="weui-dialog__title">提示</span></div>'+
	            '<div class="weui-dialog__bd">'+this.content+'</div>'+
	        '</div>'+
	    '</div>';
	}
	Dialog.prototype={
		constructor:Dialog,
		init:function(){
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
					$('span.weui-dialog__btn_primary').on('click',$.proxy(function(ev){
						$(ev.currentTarget).addClass('active');
						timer.setTimeout($.proxy(function(){
							dfd.resolve();
							this._hide();
						},this),200);
					},this));
					$('span.weui-dialog__btn_default').on('click',$.proxy(function(ev){
						$(ev.currentTarget).addClass('active');
						timer.setTimeout($.proxy(function(){
							dfd.reject();
							this._hide();
						},this),200);
					},this));
					break;
				case 3:
					$('body').append(this.html3);
					break;
				default:
					$('body').append(this.html);
					$('span.weui-dialog__btn_primary').on('click',$.proxy(function(ev){
						$(ev.currentTarget).addClass('active');
						timer.setTimeout($.proxy(function(){
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
			$('span.weui-dialog__btn_default').off('click');
			$('span.weui-dialog__btn_primary').off('click');
			$('.js_dialog').remove();
			oldDsDialog=null;
		}
	};
	return Dialog;
})($);
/*弹窗E*/
/*等待操作时的弹窗S*/
var waitLoad=(function($){
	var dsWaitAnim;
	function dsWait(config){
		if($.type(config)!=='object'){
			return;
		}
		this.type=config.type||1;
		this.txt=config.txt||'请稍后';
		this.html='<div class="ds-waitingBox">'+
					    '<div class="loader-container">'+
					        '<div class="la-ball-climbing-dot la-3x">'+
					            '<div></div>'+
					            '<div></div>'+
					            '<div></div>'+
					            '<div></div>'+
					        '</div><br>'+
				        	'<div class="txt">'+
					            '<span>'+this.txt+'</span>'+
					            '<b class="first">.</b>'+
					            '<b class="second">.</b>'+
					            '<b class="third">.</b>'+
					        '</div>'+
					    '</div>'+
					'</div>';
		this.html2='<div class="ds-waitingBox">'+
						'<div class="loader-container">'+
						        '<div class="la-ball-spin-clockwise la-2x">'+
						            '<div></div>'+
						            '<div></div>'+
						            '<div></div>'+
						            '<div></div>'+
						            '<div></div>'+
						            '<div></div>'+
						            '<div></div>'+
						            '<div></div>'+
						        '</div>'+
						        '<div class="txt">'+
						            '<span>'+this.txt+'</span>'+
						            '<b class="first">.</b>'+
						            '<b class="second">.</b>'+
						            '<b class="third">.</b>'+
					        	'</div>'+
				    	'</div>'+
			    	'</div>';
		this.html3='<div class="ds-waitingBox">'+
					    '<div class="loader-container">'+
	        				'<div class="la-timer la-3x">'+
	            				'<div></div>'+
	        				'</div>'+
					        '<div class="txt">'+
					            '<span>'+this.txt+'</span>'+
					            '<b class="first">.</b>'+
					            '<b class="second">.</b>'+
					            '<b class="third">.</b>'+
				        	'</div>'+
        				'</div>'+
    				'</div>';
	}
	dsWait.prototype={
		constructor:dsWait,
		_show:function(){
			if(dsWaitAnim){
				this.destroy();
			}
			dsWaitAnim=this;
			switch(this.type){
				case 3:
					$(this.html3).appendTo($('body'));
					break;
				case 2:
					$(this.html2).appendTo($('body'));
					break;
				default:
					$(this.html).appendTo($('body'));
					break;
			}
		},
		_hide:function(callback){
			this.destroy();
			callback&&callback(this);
		},
		destroy:function(){
			$('.ds-waitingBox').remove();
			dsWaitAnim=null;
		}
	};
	return dsWait;
})($);
/*等待操作时的弹窗E*/	
/*错误提示信息的弹窗S*/
var showErrorInfo=(function($){
	return function(options){
		if($.type(options)!=='object'){
			return;
		}
		new dsDialog({
        	type:options.type,
            title:options.title,
            content:options.content
    	}).init().done(function(obj){
    		obj._hide();
    		timer.setTimeout(function(){
    			window.location.reload();
    		},200);
    	});
	};
})($);
/*错误提示信息的弹窗E*/
	return {
		dialog:function(options){
			return new dsDialog(options).init();
		},
		showWaitLoad:function(options){
			return new waitLoad(options);
		},
		hideWaitLoad:function(delay){
			if(!delay||$.type(delay)!=='number'){
				this.showWaitLoad({})._hide();
				return false;
			}
			if(delay&&$.type(delay)==='number'){
				timer.setTimeout($.proxy(function(){
					this.showWaitLoad({})._hide();
				},this),delay);
			}
		},
		showErrorInfo:showErrorInfo,   //页面错误信息的提示
	};
	/*
	弹窗	pop.dialog({
			type:,
			title:,
			content:
		}).done(function(){
	
		}).fail(function(){
	
		});
		//
		pop.showWaitLoad({
			type:3
		})._show();
		pop.hideWaitLoad(1000);
		//
		pop.showErrorInfo({
			type:
			title:
			content:
		});
	*/
});