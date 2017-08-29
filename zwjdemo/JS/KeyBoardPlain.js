

var kb_start;
var kb_stop;
//开启明文密码键盘并监听
function kbClearText(data,callback) {
    kb_start = callback;
    window.external.KeyBoard_start(data,"kbClearText_callback");
}

//返回的监听明文数据
function kbClearText_callback(receivedData) {
    kb_start(receivedData);
}


//关闭明文密码键盘
function kb_closed(data, callback) {
    kb_stop = callback;
    window.external.KeyBoard_stop(data,"kb_close_callback");
}

//关闭明文密码键盘回调
function kb_close_callback(receivedData) {
    kb_stop(receivedData)
}





