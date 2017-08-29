
function logger(msg) {
    document.getElementById("logger").innerHTML = msg;
}

var fpcode;
function fpMacReadFeature() {
    logger('指纹读取');
    send_command(
        "fpReadFeature",
        "",
        function (receivedData) {
            var been = JSON.parse(receivedData);
            fpcode = been.fpFeature;
            base64="data:image/jpeg;base64," + been.imgStr;
            document.getElementById("fpImg").src = base64;
        });
}

function fpMacMatch() {
    logger('指纹对比');
    var fpcodedata = new Object();
    fpcodedata.fpFeature = fpcode;
    jsonfpcode = JSON.stringify(fpcodedata);
    send_command(
        "fpMatch",
        jsonfpcode,
        function (receivedData) {
            var fpMatchObj = JSON.parse(receivedData);
            if (fpMatchObj.status == 100) {
                if (fpMatchObj.matchScore > 50) {
                    alert("match success!");
                }
            } else {
                alert(fpMatchObj.msg);
            }
        });
}

//关闭指纹
function closefp() {
    logger('关闭指纹');
    send_command(
        "fpClose",
        "",
        function (receivedData) {
            logger(receivedData);
        });
}