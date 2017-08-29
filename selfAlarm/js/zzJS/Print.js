
var print_info;
var print_Qr;
//打印信息
function printerPrintInfo(data, callback) {
    print_info = callback;
    window.external.Printer_str(data, "printerPrintInfo_callback");
}
//打印信息回调
function printerPrintInfo_callback(receivedData) {
    print_info(receivedData);
}

//网络小票打印
function netprinterPrintInfo(data, callback) {
    print_info = callback;
    window.external.NetPrinter_str(data, "netprinterPrintInfo_callback");
}
//打印信息回调
function netprinterPrintInfo_callback(receivedData) {
    print_info(receivedData);
}

//打印二维码
function printerPrintQr(data, callback) {
    print_Qr = callback;
    window.external.Printer_QR(data, "printerPrintQr_callback");

}
//打印二维码回调
function printerPrintQr_callback(receivedData) {
    print_Qr(receivedData);
}
//清空打印列表
function printerClear(data, callback) {
    window.external.Clear_lst("", "");
}

