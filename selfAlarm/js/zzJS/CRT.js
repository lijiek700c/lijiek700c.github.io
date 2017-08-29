


var BCopen;

function CRT_open(data, callback) {
    BCopen = callback;
    window.external.CRT_Open(data, "CRT_open_callback");
}

function CRT_open_callback(json) {
    BCopen(json);
}

var BCread_IC;
//读取银行卡号(接触式IC卡)
function readBCard_IC(data, callback) {
    BCread_IC = callback;
    window.external.GetBankCardID_IC(data, "readBCard_IC_callback");

}

function readBCard_IC_callback(json) {
    BCread_IC(json);
}

var BCread_RF;
//读取银行卡号(非接触式IC卡)
function readBCard_RF(data, callback) {
    BCread_RF = callback;
    window.external.GetBankCardID_RF(data, "readBCard_RF_callback");

}

function readBCard_RF_callback(json) {
    BCread_RF(json);
}

var BCread_Mag;
//读取银行卡号(磁卡)
function readBCard_Mag(data, callback) {
    BCread_Mag = callback;
    window.external.GetBankCardID_Mag(data, "readBCard_Mag_callback");

}

function readBCard_Mag_callback(json) {
    BCread_Mag(json);
}

var BCout;
//弹出银行卡
function takeoutBC(data, callback) {
    BCout = callback;
    window.external.CRT_CardOut(data, "takeoutBC_callback");

}
function takeoutBC_callback(json) {
    BCout(json);
}



var BCclose;
//关闭银行卡读取
function CRT_close(data, callback) {
    BCclose = callback;
    window.external.CRT_Close(data, "CRT_close_callback");

}
function CRT_close_callback(json) {
    BCclose(json);
}

var BChold;
//弹出银行卡（持卡）
function takeholdBC(data, callback) {
    BChold = callback;
    window.external.CRT_CardHold(data, "takeholdBC_callback");

}
function takeholdBC_callback(json) {
    BChold(json);
}



var BCclosehold;
//关闭银行卡读取（持卡）
function CRT_closehold(data, callback) {
    BCclosehold = callback;
    window.external.CRT_CloseHold(data, "CRT_closehold_callback");

}
function CRT_closehold_callback(json) {
    BCclosehold(json);
}