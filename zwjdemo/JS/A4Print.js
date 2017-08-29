


var pbCallBack;
var pblCallBack;
var pflCallBack;
//打印图片
function printBitmap(data, callback) {
    pbCallBack = callback;
    window.external.PrintBitmap(data, "printBitmap_callback");

}

function printBitmap_callback(json) {
    pbCallBack(json);
}

//打印图片列表
function printBitmap_list(data, callback) {
    pblCallBack = callback;
    window.external.PrintBitmapList(data, "printBitmap_list_callback");

}

function printBitmap_list_callback(json) {
    pblCallBack(json);
}

//打印文件列表
function printFile_list(data, callback) {
    pflCallBack = callback;
    window.external.PrintFileList(data, "printFile_list_callback");

}

function printFile_list_callback(json) {
    pflCallBack(json);
}

var urlCallBack;
//打印指定网页
function printUrl(data, callback) {
    urlCallBack = callback;
    window.external.PrintWeb(data, "printUrl_callback");

}

function printUrl_callback(json) {
    urlCallBack(json);
}

var urlfileCallBack;
//打印指定网页文件
function printUrlFile(data, callback) {
    urlfileCallBack = callback;
    window.external.NetFilePrint(data, "printUrlFile_callback");

}

function printUrlFile_callback(json) {
    urlfileCallBack(json);
}

var htmlCallBack;
//打印html元素
function printhtml(data, callback) {
    htmlCallBack = callback;
    window.external.Printhtml(data, "printhtml_callback");

}

function printhtml_callback(json) {
    htmlCallBack(json);
}