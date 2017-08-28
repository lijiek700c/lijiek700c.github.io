/*键盘*/
;(function($,win){
	if(!('dsKeyBoard' in win)){
		win.dsKeyBoard=function(container,layouts,bool){
			var layout=layouts||[
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
		                '删除'
		            ],
		            [
		                'q','w','e','r','t','y','u','i','o','p',
		                ['[','{'],
		                [']','}'],
		                '清空'
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
		                '空格',
		                [',','&lt;'],
		                ['.','&gt;'],
		                ['/','?'],
		                ['@']
		            ]
		        ];
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

			                case '空格':
			                    character = '<span>空格</span>';
			                    type = 'space';
			                    styleClass = 'softkeys__btn--space';
			                    break;

			                case '删除':
			                    character = '<span>删除</span>';
			                    type = 'delete';
			                    break;
			                case '隐藏':
			                	character = '<span>隐藏</span>';
			                	type='hide';
			                	break;
			                case '清空':
			                	character = '<span>清空</span>';
			                	type='clear';
			                	break;
			                case '回退':
			                	character = '<span>回退</span>';
			                	type='backspace';
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
			            if(bool){	
			            	$(this).prepend($('<div></div>').text('隐藏').addClass('softHideBtn'));
			            }
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
			                    toggleCase(_this);
			                    break;

			                case 'shift':
			                    toggleCase(_this);
			                    toggleAlt(_this);
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
			                    
			                    if (_this.hasClass('softkeys--caps')) {
			                        character = $(this).children('span').eq(1).text();
			                    } else {
			                        character = $(this).children('span').eq(0).text();
			                    }
			                    break;

			                case 'letter':
			                    character = $(this).html()||$(this).text();

			                    if (_this.hasClass('softkeys--caps')) {
			                        character = character.toUpperCase();
			                    }
			                    break;
			                case 'clear':
			                	targetValue='';
			                	break;
			                case 'backspace':
			                	targetValue = targetValue.substr(0, targetValue.length - 1);
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
		    container.addClass('animated');
		    container.createKeys({
				layout:layout
			});
		    var input=$('input[name],textarea[name]');
		    input.eq(0).focus();
		    container.bindKeyPress(input.eq(0));
		    container.removeClass('animated');
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
		    	if(!container.hasClass('animated')){
    				container.addClass('animated');
	    		}
		    	$(this).parent().addClass('bounceOutDown').removeClass('bounceInUp');
		    });
		}
	}
})(jQuery,window);
/*数字键盘的数组*/
function createNumArr(){
	var numArr=[];
	while(numArr.length<9){
		var num=random1(0,9);
		if(testRepeat(num,numArr)){
			numArr.push(num);
		}
	}
	numArr.splice(random2(0,8),0,0);
	var layouts=[];
	for(var i=0;i<4;i++){
		var tempArr=[];
		for(var j=0;j<3;j++){
			tempArr.push(String(numArr[0]));
			numArr.splice(0,1);
		}
		layouts.push(tempArr);
	}
	var temp=layouts[3][0];
	layouts[3][0]='清空';
	layouts[3][1]=temp;
	layouts[3][2]='回退';
	function testRepeat(num,arr){
		for(var i=0;i<arr.length;i++){
			if(arr[i]===num){
				return false;
			}
		}
		return true;
	}
	function random1(m,n){
		return Math.floor(m+1+Math.random()*(n-m));
	}
	function random2(m,n){
		return Math.floor(m+Math.random()*(n-m));
	}
	return layouts;
}
/*调出摄像头拍照*/
function showCarema(){
	var cameraBox=$('.ds-getCamera'),
		pBtn=cameraBox.find('span'),
		page=$('.ds-page');
	page.hide();
	cameraBox.show();
	pBtn.on('click',function(){
		cameraBox.hide();
		page.show();
	});

}
