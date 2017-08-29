/*--------------------语音播放-----------------------*/
//播放本地wav文件
function sound_play(path) {
    window.external.soundPlayer(path);
}
//停止播放本地wav文件
function sound_play_stop() {
    window.external.soundPlayer_stop();
}
//语音播报字符串
function sound_speak(saystr) {
    window.external.soundSpeak(saystr);
}
//停止语音播报字符串
function sound_speak_stop() {
    window.external.soundSpeak_stop();
}


/*--------------------语音识别-----------------------*/
//初始化语音识别引擎
function lis_Init() {
    var t = window.external.listen_Init();
    alert(t);
}
//关闭语音识别引擎
function lis_Close() {
    var t = window.external.listen_Close();
    alert(t);
}

var ls_callback;
//开始语音识别
function lis_Start(time, callback) {
    ls_callback = callback;
    var t = window.external.listen_Start(time, "lis_Start_callback");
    alert(t);
}

function lis_Start_callback(receivedData) {
    ls_callback(receivedData);
}

//停止语音识别
function lis_Stop() {
    var t = window.external.listen_Stop();
    alert(t);
}



