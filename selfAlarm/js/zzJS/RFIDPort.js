/**
 * Created by M on 2017/7/6.
 */

function send_command(func_name, data, callback) {
    window[func_name](data, callback);
}

function RAIO_close() {
    window.external.exit();
}

//OpenRFID | 打开模块
var RFID_open;
function OpenRFID(callback) {
    RFID_open = callback;
    alert(1);
    window.external.open_RFID("OpenRFID_callback");
}

function OpenRFID_callback(json) {
    RFID_open(json)
}

//CloseRFID | 关闭模块
var RFID_close;
function CloseRFID(callback) {
    RFID_close = callback;
    window.external.close_RFID("CloseRFID_callback");
}

function CloseRFID_callback(json) {
    RFID_close(json)
}

//StartReadRFID | 开始阅读
var RFID_start;
function StartReadRFID(data, callback) {
    RFID_start = callback;
    window.external.read_RFID(data,"StartReadRFID_callback");
}

function StartReadRFID_callback(json) {
    RFID_start(json)
}

//StopReadRFID | 关闭阅读
var RFID_stop;
function StopReadRFID(callback) {
    RFID_stop = callback;
    window.external.close_read_RFID("StopReadRFID_callback");
}

function StopReadRFID_callback(json) {
    RFID_stop(json)
}

//SetAFI | 写入AFI
var RFID_SetAFI;
function SetAFI(data, uid, callback) {
    RFID_SetAFI = callback;
    window.external.write_RFID_AFI(data, uid, "SetAFI_callback");
}

function SetAFI_callback(json) {
    RFID_SetAFI(json)
}

//SetDSFID | 写入DSFID
var RFID_SetDSFID;
function SetDSFID(data, uid, callback) {
    RFID_SetDSFID = callback;
    window.external.write_RFID_DSFID(data, uid, "SetDSFID_callback");
}

function SetDSFID_callback(json) {
    RFID_SetDSFID(json)
}

//OpenEAS | 打开EAS
var EAS_open;
function OpenEAS(data, callback) {
    EAS_open = callback;
    window.external.open_RFID_EAS(data, "OpenEAS_callback");
}

function OpenEAS_callback(json) {
    EAS_open(json)
}

//CloseEAS | 关闭EAS
var EAS_close;
function CloseEAS(data, callback) {
    EAS_close = callback;
    window.external.close_RFID_EAS(data, "CloseEAS_callback");
}

function CloseEAS_callback(json) {
    EAS_close(json)
}

