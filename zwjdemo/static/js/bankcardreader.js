function logger(msg) {
    document.getElementById("logger").innerHTML =  msg;
}

//接收银行卡号
function getbankcard(){
    logger('请插入银行卡');
    send_command(
        "CRT_open",
        "",
        function (receivedData) {
            logger(receivedData);
        }
    );
}

//开始读取银联卡账号（非接触型IC卡形式）
function readcard(){
    logger('读取中。。。');
    document.getElementById('readcard').value='';
    send_command(
        "readBCard_RF",
        "",
        function (receivedData) {
            logger(receivedData);
            strbeen=JSON.parse(receivedData);
            bankcard=strbeen[0].Account;
            bankcard=undefined?" ":bankcard;
            document.getElementById('readcard').value=bankcard;
        }
    );
}

//开始读取银联卡账号（接触式IC卡形式）
function readcardIC(){
    logger('读取中。。。。。。');
    document.getElementById('readcard').value='';
    send_command(
        "readBCard_IC",
        "",
        function (receivedData) {
            logger(receivedData);
            strbeen=JSON.parse(receivedData);
            bankcard=strbeen[0].Account;
            bankcard=undefined?" ":bankcard;
            document.getElementById('readcard').value=bankcard;
        }
    );
}

//读取银联卡账号（磁卡）
function readmag(){
    logger('读取磁卡。。')
    document.getElementById('readcard').value='';
    send_command(
        "readBCard_Mag",
        "",
        function (receivedData) {
            strbeen=JSON.parse(receivedData);
            logger(receivedData);
            bankcard=strbeen[0].Account;
            bankcard=undefined?" ":bankcard;
            document.getElementById('readcard').value=bankcard;
        }
    );
}



//退卡并继续工作
function closebutwork(){
    logger('退卡并继续工作');
    send_command(
        "takeoutBC",
        "",
        function (receivedData) {
            logger(receivedData);
            strbeen=JSON.parse(receivedData);
            if(strbeen.status==200)
            {
                logger(strbeen.msg)
            }
        }
    );
}

//停止工作并退卡
function closesotp(){
    logger('停止工作并退卡');
    send_command(
        "CRT_close",
        "",
        function (receivedData) {
            logger(receivedData);
            strbeen=JSON.parse(receivedData);
            if(strbeen.status==200)
            {
                logger(strbeen.msg)
            }
        }
    );
}

//退卡并继续工作（持卡）
function closehold(){
    send_command(
        "takeholdBC",
        "",
        function (receivedData) {
            strbeen=JSON.parse(receivedData);
            if(strbeen.status==200)
            {
                logger(strbeen.msg)
            }
        }
    );
}

//停止工作并退卡（持卡）
function stophold(){
    send_command(
        "CRT_closehold",
        "",
        function (receivedData) {
            // alert(receivedData);
            strbeen=JSON.parse(receivedData);
            if(strbeen.status==200)
            {
                // alert('错误回调');
                logger(strbeen.msg);
            }
        }
    );
}



function closeall(){
    try {
        send_command(
            "CRT_closehold",
            "",
            function (receivedData) {
                strbeen=JSON.parse(receivedData);
                // alert(receivedData);
                /*if(strbeen.status==200)
                 {
                 alert(strbeen.msg+','+'请联系工作人员！');
                 return false;
                 }else {
                 // alert('跳转了');
                 window.location.href="index.html";
                 }*/
                window.location.href="index.html";
            }
        );
    }
    catch (e){
        if(e)
        window.location.href="index.html";
    }
}