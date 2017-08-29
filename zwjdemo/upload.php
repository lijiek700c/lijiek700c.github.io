
<?php

$base64_arr=isset($_POST['img'])?$_POST['img']:'';

$b=substr($base64_arr,2);
$ba=substr($b,0,strlen($b)-1);
//print_r($ba);exit;
$bas=explode("*",$ba);
//print_r($bas);

foreach ($bas as $k=>$v){
    $url=$v;
    base64_upload($url);
//    print_r($url);
}



function base64_upload($base64) {
    //post的数据里面，加号会被替换为空格，需要重新替换回来，如果不是post的数据，则注释掉这一行
    $base64_imagess = str_replace(' ', '+', $base64);
    //把@转换空格;
    $b64 = str_replace('@', ' ', $base64_imagess);
    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $b64, $result)){
        //匹配成功
        if($result[2] == 'jpeg'){
            $image_name = uniqid().'.jpg';
            //纯粹是看jpeg不爽才替换的
        }else{
            $image_name = uniqid().'.'.$result[2];
        }
        $image_file = "./upload/$image_name";
        //服务器文件存储路径
        if (file_put_contents($image_file, base64_decode(str_replace($result[1], '', $b64)))){
            return $image_name;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
