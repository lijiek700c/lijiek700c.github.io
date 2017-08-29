/**
 * Created by M on 2017/6/21.
 */

/**
 * 打印 信息
 * @param msg
 */
function log(msg) {
    document.getElementById("log").innerHTML =  msg;
}

//退出程序
function exit() {
    RAIO_close();
}

/*-----------打开串口-------------*/
function openPort() {
    log('打开RFIDLIB');
    send_command(
        "OpenRFID",
        function (receivedData) {
            log(receivedData);
        });
}

function closeRFIDLIB() {
    log('关闭RFIDLIB');
    send_command(
        "CloseRFID",
        function (receivedData) {
            log(receivedData);
        });
}

/*----------------读取------------------*/
function openInfo1() {
    log('开始读取单次');
    var num = 1;

    send_command(
        "StartReadRFID",
        num,
        function (receivedData) {
            log(receivedData);
        });
}

function openInfo2() {
    log('开始读取多次');
    var num = 2;

    send_command(
        "StartReadRFID",
        num,
        function (receivedData) {
            log(receivedData);
        });
}

//关闭读取
function closeRead() {

    log('关闭读取');
    send_command(
        "StopReadRFID",
        function (data) {
            log(data);
        }
    );
}
/*-------------------end-----------------*/

/*-------------------写入ID-----------------*/
function writeAFI() {
    log('写入AFI');
    // var data = $('#wAFI').val();
    var data = document.getElementById('wAFI').value;
    var uid = document.getElementById('AFI_uid').value;
    SetAFI(
        data,
        uid,
        function (receivedData) {
            log(receivedData);
        }
    );
}

function writeDSFID() {
    log('写入DSFID');
    // var data = $('#wDSFID').val();
    var data = document.getElementById('wDSFID').value;
    var uid = document.getElementById('DSFID_uid').value;
    SetDSFID(
        data,
        uid,
        function (receivedData) {
            log(receivedData);
        }
    );
}

/*-------------------EAS-----------------*/

//传uid
function openEASUid() {
    log('打开openEAS');
    var data = ("E00401506B989D62,E00401506B9898A3");

    send_command(
        "OpenEAS",
        data,
        function (receivedData) {
            log(receivedData);
        });
}

//传空
function openEAS() {
    log('打开openEAS');
    OpenEAS('',function (data) {
        log(data);
    });
}

function closeEASUid() {
    log('关闭EAS');
    var data=("E00401506B989D62,E00401506B9898A3");

    send_command(
        "CloseEAS",
        data,
        function (receivedData) {
            log(receivedData);
        });
}

function closeEAS() {
    log('关闭EAS');

    send_command(
        "CloseEAS",
        '',
        function (receivedData) {
            log(receivedData);
        });
}
/*----------------end--------------*/