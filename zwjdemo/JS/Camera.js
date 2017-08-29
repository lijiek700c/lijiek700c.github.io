
var cam_open;
var cam_close;
var cam_takephoto;

//打开高拍仪
function openCamera(data, callback) {
    cam_open = callback;
    window.external.Open_Camera(data, "openCamera_callback");
}

//打开高拍仪回调
function openCamera_callback(json) {
    cam_open(json);
}

//关闭高拍仪
function closeCamera(callback) {
    cam_close = callback;
    window.external.Close_Camera("closeCamera_callback");

}
//关闭高拍仪回调
function closeCamera_callback(json) {
    cam_close(json);
}
//拍照
function takePhoto(callback) {
    cam_takephoto = callback;
    window.external.TakePhoto_Camera("takePhoto_callback");

}
//拍照回调
function takePhoto_callback(json) {
    cam_takephoto(json)
}

//二维码扫描
var camQR;
function scanQR(data, callback) {
    camQR = callback;
    window.external.Open_CameraQR(data, "scanQR_callback");

}

function scanQR_callback(json) {
    camQR(json);
}

//显示拍照框
function show_ca() {
    window.external.Show_Camera();
}
//隐藏拍照框
function hide_ca() {
    window.external.NotShow_Camera();
}


//--------------------------------------------------------------------
var scan_QR_callback;

function ScanQRInfo(callback) {
    scan_QR_callback = callback;
    window.external.StartScanQR("ScanQR_getback");
}

function ScanQR_getback(json) {
    scan_QR_callback(json)
}

function ScanQRStop() {
    window.external.CloseScanQR();
}
