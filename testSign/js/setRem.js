define(function(){
    var docEle=window.document.documentElement;
    var tid=null;
    function refreshRem(){
        var width = docEle.getBoundingClientRect().width;
        var rem = width / 10;
        if(rem>=76.8){
            rem=76.8;
        }
        docEle.style.fontSize = rem + 'px';
    }
    return function(){
        window.addEventListener('resize', function() {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }, false);
        document.addEventListener('DOMContentLoaded', function() {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }, false);
        refreshRem();
    };
});