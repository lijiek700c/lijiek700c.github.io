(function($,win){
	/*键盘*/
	if(!('dsKeyBoard' in win)){
		win.dsKeyBoard=function(container){
			$.fn.createKeys=function(options){
				var settings=$.extend({
		    		layout: [],			  //按键数组
		    		rowSeperator: 'br',   //换行
		            buttonWrapper: 'p',   //softkeys的每个子元素
		    	},options);
		    	/*创建每一行的按键S*/
		        var createRow = function(obj, buttons) {
		            for (var i = 0; i < buttons.length; i++) {
		                createButton(obj, buttons[i]);
		            }
		            obj.append('<' + settings.rowSeperator + '>');
		        },
		        createButton = function(obj, button) {
		            var character = '',
		            type = 'letter',
		            styleClass = '';

		            switch (typeof button) {
		            /*case 'array':*/
			            case 'object':
			                if (typeof button[0] !== 'undefined') {
			                    character += '<span>' + button[0] + '</span>';
			                }
			                if (typeof button[1] !== 'undefined') {
			                    character += '<span>' + button[1] + '</span>';
			                }
			                type = 'symbol';
			                break;

			            case 'string':
			                switch (button) {
			                case 'capslock':
			                    character = '<span>caps</span>';
			                    type = 'capslock';
			                    break;

			                case 'shift':
			                    character = '<span>shift</span>';
			                    type = 'shift';
			                    break;

			                case 'return':
			                    character = '<span>return</span>';
			                    type = 'return';
			                    break;

			                case 'tab':
			                    character = '<span>tab</span>';
			                    type = 'tab';
			                    break;

			                case 'space':
			                    character = '<span>space</span>';
			                    type = 'space';
			                    styleClass = 'softkeys__btn--space';
			                    break;

			                case 'delete':
			                    character = '<span>delete</span>';
			                    type = 'delete';
			                    break;
			                case '隐藏':
			                	character = '<span>隐藏</span>';
			                	type='hide';
			                	break;
			                default:
			                    character = button;
			                    type = 'letter';
			                    break;
			                }
			                break;
		            }

		            obj.append('<' + settings.buttonWrapper + ' class="softkeys__btn  ' + styleClass + '" data-type="' + type + '">' + character + '</' + settings.buttonWrapper + '>');
		        };
		        /*创建每一行的按键E*/
		        return this.each(function(){
		        	if($(this).children('p').length===0){
			            for (var i = 0; i < settings.layout.length; i++) {
			                createRow($(this), settings.layout[i]);
			            }
			            $(this).prepend($('<div></div>').text('隐藏').addClass('softHideBtn'));
		        	}
		        });
		    };
		    $.fn.bindKeyPress=function(input){
		    	var _this=this;
		    	this.children('p').on('click touchstart',
		            function(event){
		                event.preventDefault();
		                var character='',
		                type = $(this).data('type'),
		                targetValue=input.val();
		                switch (type) {
			                case 'capslock':
			                    toggleCase(obj);
			                    break;

			                case 'shift':
			                    toggleCase(obj);
			                    toggleAlt(obj);
			                    break;

			                case 'return':
			                    character = '\n';
			                    break;

			                case 'tab':
			                    character = '\t';
			                    break;

			                case 'space':
			                    character = ' ';
			                    break;

			                case 'delete':
			                    targetValue = targetValue.substr(0, targetValue.length - 1);
			                    break;

			                case 'symbol':
			                    if (_this.hasClass('softkeys--alt')) {
			                        character = $(this).children('span').eq(1).html();
			                    } else {
			                        character = $(this).children('span').eq(0).html();
			                    }
			                    break;

			                case 'letter':
			                    character = $(this).html();

			                    if (_this.hasClass('softkeys--caps')) {
			                        character = character.toUpperCase();
			                    }
			                    break;
		                }
		                input.focus().val(targetValue + character);

		            });
		    		var toggleCase=function(obj){
		            	obj.toggleClass('softkeys--caps');
		        	},
		        	toggleAlt=function(obj){
		            	obj.toggleClass('softkeys--alt');
		        	};
		        	return this;
		    };
		    $.fn.unBindKeyPress=function(){
		    	this.children('p').off('click touchstart');
		    	return this;
		    };
		    var container=$(container);
		    container.createKeys({
				layout : [
		            [
		                ['`','~'],
		                ['1','!'],
		                ['2','@'],
		                ['3','#'],
		                ['4','$'],
		                ['5','%'],
		                ['6','^'],
		                ['7','&amp;'],
		                ['8','*'],
		                ['9','('],
		                ['0',')'],
		                ['-', '_'],
		                ['=','+'],
		                'delete'
		            ],
		            [
		                'q','w','e','r','t','y','u','i','o','p',
		                ['[','{'],
		                [']','}']
		            ],
		            [
		                'capslock',
		                'a','s','d','f','g','h','j','k','l',
		                [';',':'],
		                ["'",'&quot;'],
		                ['\\','|']
		            ],
		            [
		                'shift',
		                'z','x','c','v','b','n','m',
		                'space',
		                [',','&lt;'],
		                ['.','&gt;'],
		                ['/','?'],
		                ['@']
		            ]
		        ]
			});
		    var input=$('input[name]');
		    $.each(input,function(index){
		    	(function(i){
		    		input.eq(i).focus(function(){
		    			container.unBindKeyPress();
		    			container.show().removeClass('bounceOutDown').addClass('bounceInUp');
		    			container.bindKeyPress($(this));
		    		});
		    	})(index);
		    });
		    $('div.softHideBtn').on('click',function(){
		    	$(this).parent().addClass('bounceOutDown').removeClass('bounceInUp');
		    });
		}
	}

})(jQuery,window);
/*设置iframe的高度*/
function setIframeSize(){
	var oHead=$('.ds-header'),
	oFoot=$('.ds-footer'),
	oArea=$('.ds-operateArea'),
	win=$(window);
	var timer=null;
	oArea.height(win.innerHeight()-oHead.height()-oFoot.height());
	win.on('resize',function(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			oArea.height(win.innerHeight()-oHead.height()-oFoot.height());
		},200);
	});
}
/*设置iframe的src链接*/
function setIframeSrc(){
	var tabBtn=$('span','.btnBox');
	var oIframe=$('.ds-iframe');
	var timer=null;
	oIframe.attr('src',srcArr[index]);
	tabBtn.on('click',function(){
		var _this=$(this);
		if(_this.hasClass('return')){
			index--;
			if(index<=0){
				index=0;
			}
		}else if(_this.hasClass('next')){
			index++;
			if(index>=srcArr.length){
				index=srcArr.length-1;
			}
		}
		clearTimeout(timer);
		timer=setTimeout(function(){
			oIframe.attr('src',srcArr[index]);
		},200);
	});
}
/*加载---S*/
;(function(window,$){
	var dsLoading=function(opt){
		if(!$.isPlainObject(opt)){
			console.warn('对象...');
			return;
		};
		if(opt.txt&&typeof opt.txt!=='string'){
			console.warn('字符串...');
			return;
		}
		if(typeof opt.bool!=='boolean'){
			console.warn('布尔值...');
			return;
		}
		opt.box=opt.box||'.ds-loadingBox';
		opt.txt=opt.txt||'正在加载';
		var loadingBox=$(opt.box);
		if(opt.bool){
			var spanTxt=loadingBox.find('span');
			spanTxt.text(opt.txt);
			loadingBox.fadeIn(200,function(){
				opt.fn&&opt.fn();
			});
		}else{
			loadingBox.fadeOut(200,function(){
				opt.fn&&opt.fn();
			});
		}
	};
	if(!('dsLoading' in window)){
		window.dsLoading=dsLoading;
	}
})(window,$);
/*加载---E*/

/*点击后延迟页面跳转*/
function delayGo(str){
    var timer=null;
    clearTimeout(timer);
	timer=setTimeout(function(){
		window.parent.jump(str);
	},200);
}

function setFirstOpen(){
	var strArr=location.href.split('/');
	var str=strArr[strArr.length-1].split('.')[0];
	localStorage.setItem(str,true);
}
function getFirstOpen(){
	var strArr=location.href.split('/');
	var str=strArr[strArr.length-1].split('.')[0];
	return localStorage.getItem(str,true);
}
/*页面打开时的加载动画*/
function openLoad(opt){
	var timer=null;
	opt.showBool=opt.showBool||null;
	if(opt.showBool){
		$(opt.str).css('display','block');
		return;
	}
	window.parent.dsLoading({
		txt:opt.txt,
		bool:true
	});
	clearTimeout(timer);
	timer=setTimeout(function(){
		window.parent.dsLoading({
			bool:false,
			fn:function(){
				$(opt.str).show();
				setFirstOpen();
			}
		});
	},1800);
}
/*页面第一次打开时执行加载动画*/
function firstOpen(txt,str){
	if(!getFirstOpen()){
    	openLoad({
    		txt:txt,
    		str:str,
    	});
    }else{
    	openLoad({
    		txt:txt,
    		str:str,
    		showBool:true,
    	});
    }
}


