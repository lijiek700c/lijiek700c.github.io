function logger(msg) {
    document.getElementById("logger").innerHTML = msg;
}

//离开关闭身份证读卡器
function stopIdCard() {
    send_command(
        "stopRead",
        "nothing",
        function (receivedData) {
            logger(receivedData);
        });
}


//读取身份证
function readIdInfo() {
    // logger('读取身份证');

    send_command(
        "idReaderReadInfo",
        "nothing",
        function (receivedData) {
            var idInfo = JSON.parse(receivedData);
            if (idInfo.status==100){
                // alert(idInfo);
            function saveInfo(){
                m_info=receivedData;
                save_info(m_info);
                delete m_info;
                delete receivedData;
                window.location.href = "idcardinfo.html";
            }
            saveInfo();
            }
            else if (idInfo.status==200){
                alert('身份证连接错误！请重试！');
                return false;
            }
        });
}

readIdInfo();


