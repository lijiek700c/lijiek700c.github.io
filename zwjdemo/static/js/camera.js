function logger(msg) {
    document.getElementById("logger").innerHTML =  msg;
}

function addPhoto(base64) {
    picLayout = document.getElementById("pic-layout");
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.setAttribute("src", base64);
    li.appendChild(img);
    picLayout.appendChild(li);
}

//离开页面关闭高拍仪
function checkLeave() {
    send_command(
        "closeCamera",
        function (data) {
            // logger(data);
    });
}

//打开高拍仪、设置相对位置、窗口大小
function A3takePhotos() {
    logger('打开A3拍照');
    var layout={'openType':0,'layoutX': 50,'layoutY': 100,'layoutWidth': 690,'layoutHeight': 550,'choiceCamera':'1'};
    var jsonlayout=JSON.stringify(layout);
    send_command(
        "openCamera",
        jsonlayout,
        function (receivedData) {
            logger(receivedData);
        });
}

function A4takePhotos() {
    logger('打开A4拍照');
    var layout={'openType':1,'layoutX': 50,'layoutY': 100,'layoutWidth': 690,'layoutHeight': 550,'choiceCamera':'1'};
    var jsonlayout=JSON.stringify(layout);
    send_command(
        "openCamera",
        jsonlayout,
        function (receivedData) {
            logger(receivedData);
        });
}

function IdtakePhotos() {
    logger('打开身份证拍照');

    var layout={'openType':2,'layoutX': 50,'layoutY': 100,'layoutWidth': 690,'layoutHeight': 550,'choiceCamera':'1'};
    var jsonlayout=JSON.stringify(layout);
    send_command(
        "openCamera",
        jsonlayout,
        function (receivedData) {
            logger(receivedData);
        });
}

//扫描二维码
function takeQr() {
    logger('扫描二维码');

    var layout={'openType':5,'layoutX': 50,'layoutY': 100,'layoutWidth': 690,'layoutHeight': 550,'choiceCamera':'1'};

    var jsonlayout=JSON.stringify(layout);
    send_command(
        "scanQR",
        jsonlayout,
        function (receivedData) {
            logger(receivedData);
        });
}

//高拍仪
function camear1() {
    logger('高拍仪1');

    var layout={'openType':0,'layoutX': 50,'layoutY': 100,'layoutWidth': 690,'layoutHeight': 550,'choiceCamera':'1'};

    var jsonlayout=JSON.stringify(layout);
    send_command(
        "openCamera",
        jsonlayout,
        function (receivedData) {
            logger(receivedData);
        });
}
function camear2() {
    logger('高拍仪2');

    var layout={'openType':0,'layoutX': 50,'layoutY': 100,'layoutWidth': 690,'layoutHeight': 550,'choiceCamera':'0'};

    var jsonlayout=JSON.stringify(layout);
    send_command(
        "openCamera",
        jsonlayout,
        function (receivedData) {
            logger(receivedData);
        });
}




//开始拍照
function takePhotos() {
    logger('开始拍照');
    send_command(
        "takePhoto",
        function (receivedData) {
            var photoBean = JSON.parse(receivedData);
            if (photoBean.status == 100) {
                base64="data:image/jpeg;base64," + photoBean.imgStr;
                addPhoto(base64);
            }
        });
}
//关闭高拍仪
function stopCamear() {
    closeCamera();
}

//关闭相机
function closeCameras() {
    logger('关闭');

    var imgpath= new Array();
    var i=0;
    var lis=$('#pic-layout li img');
    lis.each(function () {
        imgpath[i]=$(this).attr('src');
        i=i+1;
    });

    // logger(imgpath[0]);

    var strs = new Array();
    for(var j=0;j<imgpath.length;j++){
        if(imgpath.length===1){
            strs = imgpath[0];
        }else{
            str ="*"+imgpath[j];
            strs += str;
        }
    }
    //删除变量
    delete imgpath;

    //保存数据
    save_info(strs);
    strss='"'+strs+'"';

    delete strs;

    //把空格转换@;
    arrstr=strss.replace(/\s+/g,'@');

    delete strss;


    $.ajax({
        url:'./././upload.php',
        type:'post',
        dataType:'json',
        data:'img='+arrstr,
        success:function () {
            // alert('成功');
        },
        error:function () {
            // alert('错误');
        }
    });

    closeCamera();

    window.location.href = 'sweepattachment.html';
}



