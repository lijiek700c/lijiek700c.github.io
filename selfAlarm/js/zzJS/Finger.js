

var read_callback;
var math_callback;
var close_callback;
//获取指纹
function fpReadFeature(data, callback) {

    read_callback = callback;
    window.external.Finger_read(data, "fpReadFeature_callback");

}
//获取指纹回调
function fpReadFeature_callback(json) {
    read_callback(json);
}
//比对指纹
function fpMatch(data, callback) {

    math_callback = callback;
    window.external.Finger_math(data, "fpMatch_callback");

}
//比对指纹回调
function fpMatch_callback(json) {
    math_callback(json);
}

//关闭指纹
function fpClose(data, callback) {

    close_callback = callback;
    window.external.Finger_close(data, "fpClose_callback");

}
//关闭指纹回调
function fpClose_callback(json) {
    close_callback(json);
}