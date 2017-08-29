function send_command(func_name, data, callback) {
    window[func_name](data, callback);
}

//保存数据到窗体
function save_info(info) {
    window.external.save_str(info);
}
//读取保存的数据
function read_info() {
    m_info = window.external.open_str();
    return m_info;
}
//清除保存的数据
function clear_info() {
    window.external.clear_str();
}

function RAIO_close() {
    window.external.exit();
}

var hwcallback;
    //开始手写输入
function handwrite(data, callback) {
    hwcallback = callback;
    window.external.StartWrite(data, "handwrite_callback");
}

//开始手写输入回调
function handwrite_callback(receivedData) {
    hwcallback(receivedData);
}

//停止手写输入
function handwriteStop() {
    window.external.closewritekb();
}

//手写输入接口
function openhandwrite(eleID) {

    if (typeof eleID == "string") {
        var data = document.getElementById(eleID).value;
    } else {
        return;
    }

    if (data == '') {
        data = '';
    }
    send_command(
        "handwrite",
        data,
        function (receivedData) {
            if (receivedData == undefined) {
                receivedData = '';
            }
            document.getElementById(eleID).value = receivedData;
        }
    );
}

var imecallback;
    //开始手写输入
function imewrite(data, callback) {
    imecallback = callback;
    window.external.StartIME(data, "imewrite_callback");
}

//开始手写输入回调
function imewrite_callback(receivedData) {
    imecallback(receivedData);
}

//停止输入
function imewriteStop() {
    window.external.CloseIME();
}
