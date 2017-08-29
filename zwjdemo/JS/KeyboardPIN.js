
var kb_startp;
var kb_stopp;
//开启密文密码键盘并监听
function kbPasswordstart(data, callback) {
    //document.getElementById("text").innerHTML = "键盘监听已开始";
    kb_startp = callback;
    window.external.KB_startPasswork(data, "kbPasswordstart_callback");
}

//返回的监听密文数据
function kbPasswordstart_callback(data) {
    kb_startp(data);
}


//关闭密文密码键盘
function kbkbPasswordstop(data, callback) {
    kb_stopp = callback;
    window.external.KB_stopPasswork(data, "kbkbPasswordstop_callback");
}
//关闭密文密码键盘回调
function kbkbPasswordstop_callback(receivedData) {
    kb_stopp(receivedData)
}

var mKeycallback;
//加载主密钥
function LoadMkey(data, callback) {
     mKeycallback= callback;
     window.external.Load_Mkey(data, "LoadMkey_callback");
}
//加载主密钥回调
function LoadMkey_callback(receivedData) {
    mKeycallback(receivedData)
}
var wKeycallback;
//加载工作密钥
function LoadWkey(data, callback) {
    wKeycallback= callback;
    window.external.Load_Wkey(data, "LoadWkey_callback");
}
//加载工作密钥回调
function LoadWkey_callback(receivedData) {
    wKeycallback(receivedData)
}

var AlgCallback;
//加载算法设置
function LoadAlg(data, callback) {
    AlgCallback = callback;
    window.external.Load_Alg(data, "LoadAlg_callback");
}
//加载算法设置回调
function LoadAlg_callback(receivedData) {
    AlgCallback(receivedData)
}

