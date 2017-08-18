var sex=0;
var type = 0;
$("#passport").click(function () {
    type = 1;
    $("#file").click();
})
$("#visa").click(function () {
    type = 2;
    $("#file").click();
})
$("#signature").click(function () {
    type = 3;
    $("#file").click();
})
$("#submit").click(function(){
    window.location.href = getMyLocation(lat,lng);
})
$("#add_item").click(function(){
    $("#items").append(" <div class='select_body' >"
       +"<input class='select_item' type='input' placeholder='单位外事专办员' id='dept'>"
        +"<a class='line_horizontal'></a>"
        +"<input class='select_item' type='input' placeholder='工作单位'  id='cept' >"
        +"<a class='line_horizontal'></a>"
        +"<input class='select_item' type='input' placeholder='单位地址' id='aept'>"
        +"</div>");
})
$("#delete_item").click(function(){
    var itemsCount = $('#items').children().length;
    // var str = new Array();
    // for(var i = 0 ; i< itemsCount;i++){
    //     str[i] = new Array();
    //     str[i][0] = $('#items').find('div:eq('+i+')').find('#dept').val();
    //     str[i][1] =$('#items').find('div:eq('+i+')').find('#cept').val();
    //     str[i][2] =$('#items').find('div:eq('+i+')').find('#aept').val();
    // }
    if (itemsCount==0) {
        alert("错误，无法删除！");
    }else{
    $('#items').find('div:eq('+(itemsCount-1)+')').remove();
    }
})
var filechange=function(event){
    var files = event.target.files, file;
    if (files.length > 0) {
        // 获取目前上传的文件
        file = files[0];// 文件大小校验的动作
//        if(file.size > 1024 * 1024 * 2) {
//            alert('图片大小不能超过 2MB!');
//            return false;
//        }
//        
        var URL = window.URL || window.webkitURL;
        // 通过 file 生成目标 url
        var imgURL = URL.createObjectURL(file);
        switch(type){
          case 1:
            $("#passport_name").html(file.name);
            $("#passport_size").html(getsize(file.size));
            // 获取 window 的 URL 工具
            //用attr将img的src属性改成获得的url
            $("#passport_img").attr("src",imgURL);
            $("#passport_body").css('display','block');
            $("#passport_body").css('display','flex');
          break;
          case 2:
            $("#visa_name").html(file.name);
            $("#visa_size").html(getsize(file.size));
            // 获取 window 的 URL 工具
            //用attr将img的src属性改成获得的url
            $("#visa_img").attr("src",imgURL);
            $("#visa_body").css('display','block');
            $("#visa_body").css('display','flex');
          break;
          case 3:
            $("#signature_name").html(file.name);
            $("#signature_size").html(getsize(file.size));
            // 获取 window 的 URL 工具
            //用attr将img的src属性改成获得的url
            $("#signature_img").attr("src",imgURL);
            $("#signature_body").css('display','block');
            $("#signature_body").css('display','flex');
          break;
          default:
          break;
        }
        // 使用下面这句可以在内存中释放对此 url 的伺服，跑了之后那个 URL 就无效了
        // URL.revokeObjectURL(imgURL);
    }
};
$("#man").click(function(){
	if(sex=2){
		$("#woman").attr("class","circle_uncheck");
	}
	$("#man").attr("class","circle_oncheck");
	sex=1;
})
$("#woman").click(function(){
	if(sex=2){
		$("#man").attr("class","circle_uncheck");
	}
	$("#woman").attr("class","circle_oncheck");
	sex=1;
})

function getsize(size){
    size = size/1024;
    if (size<1024) {
        return size.toFixed(2)+'KB';
    }else{
        size =size/1024;
        return size.toFixed(2)+'MB';
    }
}