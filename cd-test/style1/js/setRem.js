;(function(win,lib){
	var docEle=win.document.documentElement;
	var tid=null;
	resObj=lib.resObj||(lib.resObj={});
	function refreshRem(){
		var width = docEle.getBoundingClientRect().width;
		var rem = width / 10;
		if(rem>=76.8){
			rem=76.8;
		}
        docEle.style.fontSize = rem + 'px';
        resObj.rem = win.rem = rem;
	}
	win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    refreshRem();
    resObj.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    resObj.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
})(window,window.lib||{});