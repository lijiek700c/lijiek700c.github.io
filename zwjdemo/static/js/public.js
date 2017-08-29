
//禁止右键和文字选取
// document.onselectstart=function(){return false;};

//禁止拖动图片
function imgdragstart(){
    return false;
}
for(i in document.images)document.images[i].ondragstart=imgdragstart;

//禁止网页缩放(对触屏无效。。。)
var scrollFunc=function(e){
    e=e || window.event;
    if(e.wheelDelta && event.ctrlKey){//IE/Opera/Chrome
        event.returnValue=false;
    }else if(e.detail){//Firefox
        event.returnValue=false;
    }
}
