//调试logger
function logger(msg) {
    document.getElementById("logger").innerHTML = msg;
}

//离开关闭明文密文输入
function checkLeave() {
    closeinput();
    closereceivetext();
}


var accout='';

//开始接受明文字
function startreceivetext() {
    logger('开始接受明文字');
    send_command(
        "kbClearText",             // 打开密码键盘方法名
        "",                        // 暂无传递信息（随便传，不可省略）
        function (receivedData) {
            var textBean = JSON.parse(receivedData);
            logger(receivedData);
            switch (textBean.keyType) {
                // number
                case 1:
                    // alert(accout);
                    accout += textBean.keyStr;
                    // alert(accout);
                    break;
                // cancel
                case 2:
                    accout = "";
                    break;
                // clear
                case 3:
                    if (accout.length > 0) {
                        accout = accout.substring(0, accout.length - 1);
                    }
                    break;
                // confirm
                case 13:
                    accout=accout.substring(0,accout.length);
                    alert(accout+"点击了确定！");
                    break;
                // up
                case 33:
                    break;
                // down
                case 34:
                    break;
                // point
                case 46:
                    accout += textBean.keyStr;
                    break;
            }
            var textval = document.getElementById('text');
            textval.innerHTML=accout;
        });
}


//停止接受明文字
function closereceivetext() {
    logger('停止接受明文字');

    send_command(
        "kb_closed",
        "",
        function (receivedData) {
            logger(receivedData);
            var backinfo = JSON.parse(receivedData);
            // alert(receivedData);
            if (backinfo.status == 200) {
                logger("关闭连接时失败：" + backinfo.msg);
            }
        });
}

//加载主密钥
function setmkey(){
    logger('加载主密钥');
    var info={"need_sm4": false ,"public_keyNum":0,"public_keyLen":8,"public_keyValue":"CF1A5D3C7B9E1104","public_keyKCV":true};
    // need_sm4 ：是否需要sm4算法加密
    // public_keyNum ：主密钥号
    // public_keyLen ：主密钥长度
    // public_keyValue ：密钥
    // public_keyKCV ：是否需要返回校验值
    data=JSON.stringify(info);
    send_command(
        "LoadMkey",
        data,
        function (receivedData) {
            logger(receivedData);
        }
    );
}

//加载工作密钥
function setwkey(){
    logger('加载工作密钥');
    var info={"need_sm4": false ,"public_keyNum":0,"work_keyNum":0,"work_keyLen":8,"work_keyValue":"81C0B0C6FDF1C53D","work_keyKCV":true};
    // need_sm4 ：是否需要sm4算法加密
    // public_keyNum ：主密钥号
    // work_keyNum ：工作密钥号
    // work_keyLen ：工作密钥长度
    // work_keyValue ：密钥
    // work_keyKCV ：是否需要返回校验值
    data=JSON.stringify(info);
    send_command(
        "LoadWkey",
        data,
        function (receivedData) {
            logger(receivedData);
        }
    );
}

//加载算法设置
function setalg(){
    logger('加载算法设置');
    var info={"Algorithm": 1 ,"useMKey":false,"public_keyNum":0,"work_keyNum":0};
    // Algorithm ：是否需要sm4算法加密
    // useMKey ：使用主密钥加密
    // public_keyNum ：主密钥号
    // work_keyNum ：工作密钥号
    data=JSON.stringify(info);
    send_command(
        "LoadAlg",
        data,
        function (receivedData) {
            logger(receivedData);
        }
    );
}

var pwd='';
//开始监听密文输入
function listeninput() {
    logger('开始监听密文输入');

    //清空input
    document.getElementById('testpwd').value='';
    // alert(test);
    document.getElementById('finish').value='';

    var accouts=document.getElementById('account').value;
    if (accouts.length<12){
        alert('账号不能少于12位数');
        return;
    }else {
        var poem = {
            "Account": accouts,
            "password_len": 6,
            "AddMode": 01,
            "timeout": 60,
            "PadType": 2,
            "PadValue": 255,
            "AutoEnter": 2
        };
    }

    // Account ：账号
    // password_len ：密码长度
    // AddMode ：加密模式
    // timeout ：超时时间
    // PadType ：补偿方式
    // PadValue :补偿值
    // AutoEnter ：是否自动确认

    data=JSON.stringify(poem);
    pwd="";
    send_command(
        "kbPasswordstart",
        data,
        function (receivedData) {
            // alert(receivedData);

                var textBean = JSON.parse(receivedData);

                var testpwd=document.getElementById('testpwd').value;

                switch (textBean.keyType) {
                    case 0:
                        passStr= textBean.keyStr;
                        break;
                    // number
                    case 1:
                        pwd = pwd+textBean.keyStr;
                        break;
                    // cancel
                    case 2:
                        pwd = "";
                        break;
                    // clear
                    case 3:
                        if (pwd.length > 0) {
                            pwd = pwd.substring(0, pwd.length - 1);
                        }
                        break;
                }


            //密码赋值
            var testpwds=pwd;
            document.getElementById('testpwd').value=testpwds;

            //完成
            var passStr;
            if (passStr == undefined){
                passStr='';
            }
            document.getElementById('finish').value=passStr;

        });
    // closeinput();
}

//停止监听密文输入
function closeinput(){
    logger('停止监听密文输入');
    send_command(
        "kbkbPasswordstop",
        "",
        function (receivedData) {
            logger(receivedData);
        }
    );
}