define(function(){
	function testIE(opt){
		$('.weui-tab').hide();
		var re=/(trident)|(msie)/gi;
		var txtTips=opt.closeDialog.find('.weui-dialog__title');
		var txtCon=opt.closeDialog.find('.weui-dialog__bd');
		var confirm=opt.closeDialog.find('.weui-dialog__btn_primary');
		var exit=opt.closeDialog.find('.weui-dialog__btn_default');
		if(re.test(window.navigator.userAgent)){
			txtTips.text('温馨提示');
			txtCon.text('拜托，拜托，不要用IE打开咯!');
			exit.hide();
			opt.mask.show();
			opt.closeDialog.show(200);
			confirm.on('click',function(){
				opt.closeDialog.hide(200,function(){
					opt.mask.hide(200);
					txtTips.text('删除');
					txtCon.text('确定要删除吗？');
					$('.weui-tab').show();
					window.close(true);
				});
			});
		}else{
			$('.weui-tab').show();
		}
	}
	return testIE;
});