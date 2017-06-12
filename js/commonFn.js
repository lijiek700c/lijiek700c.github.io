define(function(){
	function showToast(ele){
			var timer=null,obj=ele;
			showMaskToast(obj);
			clearTimeout(timer);
			timer=setTimeout(function(){
				hideMaskToast(obj);	
			},800);	
	}
	function showMaskToast(){
		allEleToggle(arguments,'block');		
	}
	function hideMaskToast(){
		allEleToggle(arguments,'none');		
	}
	function allEleToggle(arr,str){
		for(var i=0,len=arr.length;i<len;i++){
			arr[i].css('display',str);
		}
	}
	return {
		showToast:showToast,
		showMaskToast:showMaskToast,
		hideMaskToast:hideMaskToast
	};
});