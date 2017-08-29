/**
 * Created by M on 2017/6/27.
 */
function logger(msg) {
    document.getElementById("logger").innerHTML =  msg;
}


/*--------------------语音播放-----------------------*/
//播放本地wav文件
function localvoiceplay() {
    var voicefile=document.getElementById('pllocalvoice').value;
    sound_play(voicefile);
}
//停止播放本地wav文件
function stoplocalvoiceplay() {
    sound_play_stop();
}
//语音播报字符串
function voicestring() {
    var voicestr=document.getElementById('plvoicestr').value;
    sound_speak(voicestr);
}
//停止语音播报字符串
function stopvoicestring() {
    sound_speak_stop();
}

/*--------------------语音识别-----------------------*/



function startVoice() {
    var time = $('#time').val();
    logger('开始语音识别');
    lis_Start(
        time,                          // 最多录制时间
        function (receivedData) {
            strbeen=JSON.parse(receivedData);
            if(strbeen.flag==1)
            {
                logger(strbeen.info);
            }
            else
            {
                logger("未识别到有效语音");
            }
        }                           // 回调函数
    );
}