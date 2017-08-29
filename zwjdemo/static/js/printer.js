//调试logger
function logger(msg) {
    document.getElementById("logger").innerHTML = msg;
}

//小票打印
function printInfo() {
    logger('打印信息');
    
    var poem = [
        {"info": "长歌行", "cutPaperType": 0, "alignType": 1, "textSize": 0},
        {"info": "青青园中葵，朝露待日晞。", "cutPaperType": 0, "alignType": 2, "textSize": 0},
        {"info": "阳春布德泽，万物生光辉。", "cutPaperType": 0, "alignType": 2, "textSize": 0},
        {"info": "常恐秋节至，焜黄华叶衰。", "cutPaperType": 0, "alignType": 1, "textSize": 0},
        {"info": "百川东到海，何时复西归？", "cutPaperType": 0, "alignType": 0, "textSize": 0},
        {"info": "少壮不努力，老大徒伤悲！", "cutPaperType": 0, "alignType": 0, "textSize": 0},
        {"info": "", "cutPaperType": 0, "alignType": 1, "textSize": 0},
        {"info": "子曰", "cutPaperType": 0, "alignType": 1, "textSize": 0},
        {"info": "学而时习之，不义说呼？", "cutPaperType": 0, "alignType": 1, "textSize": 0},
        {"info": "有朋自远方来，不亦乐乎？", "cutPaperType": 0, "alignType": 1, "textSize": 0},
        {"info": "人不知而不愠，不亦君子乎？", "cutPaperType": 0, "alignType": 1, "textSize": 0},
        {"info": "", "cutPaperType": 1, "alignType": 1, "textSize": 0}
    ];

    var poems=[
        {"info": "奔想智能", "cutPaperType": 0, "alignType": 1, "textSize": 3},
        {"info": "取餐号：123456789,订餐号：987654321", "cutPaperType": 0, "alignType": 3, "textSize": 2},
        {"info": "时间：07-1 12:00:00,付款方式：微信支付宝", "cutPaperType": 0, "alignType": 3, "textSize": 2},
        {"info": "温馨提醒：凭小票取餐，请保管好小票", "cutPaperType": 0, "alignType": 0, "textSize": 0},
        {"info": "---------------------------------------------", "cutPaperType": 0, "alignType": 0, "textSize": 0},
        {"info": "名称,数量,单价,小计", "cutPaperType": 0, "alignType": 4, "textSize": 2},
        {"info": "---------------------------------------------", "cutPaperType": 0, "alignType": 0, "textSize": 0},

        {"info": "1.汉堡,1,20.00,20.00", "cutPaperType": 0, "alignType": 4, "textSize": 2},
        {"info": "打包", "cutPaperType": 0, "alignType": 0, "textSize": 0},
        {"info": "1.薯条,10,100.00,100.00", "cutPaperType": 0, "alignType": 4, "textSize": 2},
        {"info": "不打包", "cutPaperType": 0, "alignType": 0, "textSize": 0},
        {"info": "1.鸡腿,5,59.00,59.00", "cutPaperType": 0, "alignType": 4, "textSize": 2},
        {"info": "打包", "cutPaperType": 0, "alignType": 0, "textSize": 0},

        {"info": "---------------------------------------------", "cutPaperType": 0, "alignType": 0, "textSize": 0},
        {"info": "合计:333333", "cutPaperType": 0, "alignType": 2, "textSize": 4},
        {"info": "---------------------------------------------", "cutPaperType": 0, "alignType": 0, "textSize": 0},
        {"info": "电话：12345678910", "cutPaperType": 0, "alignType": 0, "textSize": 0},
        {"info": "地址:中国广东省广州市番禺区大石街河村", "cutPaperType": 0, "alignType": 0, "textSize": 0},
        {"info": "----------谢谢惠顾！！ 欢迎下次光临----------", "cutPaperType": 0, "alignType": 0, "textSize": 0}
 ]
    /*printer_choose = 0;   //1.pos 80打印   0.pos 58打印*/
    /*var data=JSON.stringify(poem);
    var st={"printer_choose":1,"data":data};
    var info = JSON.stringify(st);*/

    var ss = JSON.stringify(poem);

    send_command(
        "printerPrintInfo",
        ss,
        function (receivedData) {
            logger(receivedData);
        });
}


//网络打印
function webPrint() {
    logger('小票网络打印');
    var poem = [{ "alignType": 1,"textSize":1,"info": "长歌行", "boldType": 1, "doubleWH": 4,"line_Spacing":0,"cutPaperType":0,"qrCode":0},
        { "alignType": 0,"textSize":1,"info": "青青园中葵，朝露待日晞。", "boldType": 0, "doubleWH": 0,"line_Spacing":0,"cutPaperType":0,"qrCode":0},
        { "alignType": 2,"textSize":1,"info": "青青园中葵，朝露待日晞。", "boldType": 0, "doubleWH": 0,"line_Spacing":2,"cutPaperType":0,"qrCode":0},
        { "alignType": 1,"textSize":1,"info": "http://www.baidu.com", "boldType": 0, "doubleWH": 0,"line_Spacing":0,"cutPaperType":1,"qrCode":1}];

    var data = JSON.stringify(poem);

    send_command(
        "netprinterPrintInfo",
        data,
        function (receivedData) {
            logger(receivedData);
        });
}



    

//打印二维码
function printQr() {
    logger('打印二维码');

    var ewm = document.getElementById('ewm').value;

    var qr = {"qrString": ewm, "cutPaperType": 1, "alignType": 1,"QRwidth":6,"printer_choose":1};

    var data = JSON.stringify(qr);
    send_command(

        "printerPrintQr",
        data,
        function (receivedData) {
            logger(receivedData);
        });
}

//打印图片
var img3='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 n3GYUUG+0AAAAABJRU5ErkJggg==';

photo ={"Num": 1,"Imgstr": img3 };

function printbitma() {
    logger('打印单个图片');
    var data = JSON.stringify(photo);
    send_command(
        "printBitmap",
        data,
        function (receivedData) {
            logger(receivedData);
        });
}

//打图片列表
var img1 = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCADcAHwDASIAAhEBAxEB/8QAHgAAAgIDAQEBAQAAAAAAAAAABgcFCAMECQIBAAr/xABFEAACAQMCBAQEAgYGCgEFAAABAgMEBREABgcSITEIE0FRFCJhcTKBFSNCUpGhFzNicoKxCRYkJVODksHR8DRERZOi4f/EABsBAAIDAQEBAAAAAAAAAAAAAAMFAgQGAQAH/8QAMREAAgICAQIEBQIGAwEAAAAAAQIAAwQRIRIxBRNBURQiIzJhcYEGFUKRseEWM1LB/9oADAMBAAIRAxEAPwBTnw4bOop2YUDy4PymWolII+vzddYxwh2nb5FWCzxEBgwiDyEcwPTALemnpU+Q7clTNkkfi5RkaQ/iJ35T7FtfwVrkK3u5qVidDk08PZ5cehPVV/M+g18nXIysuxaqX5M2gSqpS1gi/wCMXF+msdRV2Wwx09VdJCDWV+OdYGBPyIPws49ScgemTpTrxh3fRr5MV9qlGAueWPIA9Pw/XUBBRvUVKQxgu7sAPc60amB1q3jdCrKSCPsdfRsfGWlAu9n3mbsYsT6CH9p4qbxaRTBf6wOcRghlyCw5cjp3661uJd9vMs9rWsuFRLCsJCLIRgdsnt9tG/h92DTbpu9rkrFkaCStldowMDkhiByTj1eVMD6aOPFjwwgsVvtdxp6UolPL5chRehR+gJ/MD+J9tAtsCZAX0jKitTjMD37/ANpFbE4XXvcMdLUN5sdNMiyc7HHQjIONPHb/AAfjttJHE9RI2Vy4/ebUx4eoxfuGm3asgF/hBFI3fDxkxkZ/wabP6IyMhevtjSxaj1EuYzsyyygKNCV43nwrpK631FO1MZQ6EFSccw9tU+33w7qdi3RpoeaS2l+VJsEGNv3G+v19ddMa6yfESFGT8J9u2lXxh4QQ7js83lUizs0ZEsCnBkHuD6MP/GrFVhobjtAOiZSdDd/SVx4YWGh4z7ardt3BhFcYI/Ot8692K5LRn69eYH+/9NJffGwLpsO6z0VwhaLkYhWZSOYj0++Ov17jRtt643Tg5vwcuMROHjmYcvMobIJHuCOo+/vq33EbZNs45cOaK80lEqzzRAlIz86nqGTPqytkA/8AY6Zs3QPMXlTForD7ps+4djOdEDZ6glT/AAI1LtPLKiSS9VfoG79cdjrNuXb0+2btUUFUpSWNsBiOkn9ofQ/+fbU1sG1Rbkasssg/2mriPwTt0CVC/Mmfow5k/wAQPpq0rdY2vaLWUoSpg9EkElSvxD8kORkgddHVv2GKylWWk3Da0gJPKtXQztIPuYwyn75/IaX5k8iUxTJysO6v3B7Y/jrahQpGAk7IvcBTga9qdE6MXG72yy2Sru9bDVU1HSQtNM08eAAPT7k4AGqH753TV773RVXmrBBkASGLr+qjH4U+uAe/qc6f3iw3pHHeV2jRnlUclRVgN1GBmND7dyxH0Gq5yMjD5M9O+sV/DWD5VHxNg+Zu36f7jvxG4M3lA9oQ8Kdu/p3edFAQSc5C++SFHT16Fj+WhW7qKvdV1lIUedWTOAvbrI3QfTtp4eGK0PXb+SVFR1jpZHKt6n8I6+mC2k9frcaPdFzgkGGirJYxy/R2H/bWsVybSvsIvasCoN+ZaLwoWeLyXqkU4pKYRlmzgyVEnmuQO3RIoR79TqwXGjY0e9eHlwplhXzJqYoGYZw+Mof+oDS58Mm26mHhstdUKsZrKiWYuzKqYDBFAJIB+VF1Yi2Uj3e3z0fNHUNgg+QyydPb5Se2s/bcXubcd11hal16ytfgcvHxe09wWCoUrWWqtV0gY9opVOT/APkR/wCOrW0NrWeULyjm+2qsbNsD8I/FLEJVWnsu8qeWijkI5QtWuJQh9AS6nHv5mrg7Yg+JuMGCC3MVbHtq8Dtx+ZWZOlSPaQVxsEY52VQHI6nGodLIWdgeXPpkaY27aBbfWNGgxkZGhnyst838tAuPS+pKoEqDKj+KTgAtfRGtt6qjTE1EXy9EqB3TP7rgD/0a9eDDeiX6guO0rkGSpiQzx+YRkMmFkUjvkrg/8ttWq3LYqXcViq6KfkSJI2lMsrBEj5QTzMx6Ko65J6Y1RS71snC7jNbN57dpytsnn5UqamFhTVEwX5iFUhjGyk9Ty83zEZBzo+Nbr6bdjJZFXWosX7hCTxH+H7/WI1lTaoP95UhZ0WMD9b7p+Yxj2YD3OqgbVdrde4SGdZI5MjPRgynJB9vbXTaq2fu/ccUs1fu2406zdf8AdcMFLHg/ujkY4P1J++qh+J3gTU8MdzU+4Ya2evpK2QNUTVMYDrMcksxUBcOAeuO6nPcaNiW9DGsnj0gMukOosHeLnxEbKhsHENK2mTlt98o4rtTsRgEOMPj/ABq38dBtHJRJTos9FFJIBgt166f3ECzvxI4O8Oa0RPLcrY91tIIbKsiQx1cYA9sCYfw0gEo3kUNjH0Om3UCxAicKenZkjedwVl9ulTdbrUmruNU/mTzt3dsYz/ADXi20xntdTLEDI0XM7YGcDPrrVrIS4/Bge+mzwF2il0prhHJGoWrWro0JUfM5opOX+DSA/TGgELUnHAEKgNj69TJjwgUe4b3u+4UG3ILfJdJrdLE01z52jpYeZOeUIuC7AlQq5AyepxoJ40bXq9r8YtzW2pqxXSU9cxkqhEIw7MAzNyjoPmJH5aangGkmp/ENJaHQmorLHcYfK9S8SpLjP/KI1H+MfbNVZeNdyuDALHdFFVHzdOYZAJ98Z6Z9wR6arb6cga9RLoXqoIPpLCeH/hRZrxwS2hdbraKGurq2iNU1RPSo7sGkfkySPReUfYaOf6JdvGeNorNTQSocpLSR/Dup9w0fKc/no08LWx7jubw78Pp5rl8DRy2Wn8iK2UqE4wf6ySYOWb35QqjsB66ZFdwmr7dA0lHeJ5JBjC3GhjkjP5xeWR9+uqj4FjOWU95erzq1QKR2lbuIvAnde9ttSxW+91bz0UiVVC1cBUNT1ETB4nSQ4cEEYOWYEE5HbU3tjjbfpN07amqNtVVnrJKtbZcrcjxT08lRz8kgLABoJFb5l5h5bKQOY8ynVhNu3lrXWQ2m+WxLZNUlFp66mkMtJO5JHKWYBomOBgOME4AYkgHS31w2hlqlvVAI6OrTlFTy9POVf6uTH/EUfKf3lwP2RqTUPUmyeRIrfXc+td5i3Y7VdZI4B5ewz36aD1V5HJAJX0I9dF9P/t1CGc5kx1z31I2SweacCHC46kDSmwNc3UJcTpqXpMS26NvXLiHfzYZYGp9tUTKzUj9Tc5hhhJNg/wBQp6pEfxkFnH4V0u/Evw6ppdv1NvuV0pKKsqohPQxzSfrXnTrHyoPnIYfLnGPm76stbIJTcKuG3hY7lVyS5lKh2padSBI6gjHNkqqg5HMcnPKQWFs7hPQWAyVqU8UNZUMJZakHnqZW780kzZdj9z0+2mmPjeYFduNSnflCraAd4geAW46XiHwd2dUwy08l3Fujp6yjEi/ERyR/IcxZ5wPlBzjr1148QPCBeIfCa50rKoqFXkQnurEgxn6ASBPyJ0f2Dw92SbdfEPb90tVNUWaW5xX6zGSPD05qUPnKky4dCs8b4KsMB1163NtbcPDSzVhStr947UKkXC3XWTzrhS05/FLSVPRpvLGXaGXmLKh5X5sAsHxhvYlGvK38pnPjw0wS7goaLb1fC6tQbiYvE2MoGoKqJgR36EEarHuOjksG47tbVUkUlZNAM98K5A/kNX22XsqPbnjBvFrhkhlpblW010hkiAKTrJSVbO6Y9C4c/nqqfiX22lj8QPECgp418mG7zBeVcDrhj/M68Duzr9NSJXSlPyYuU+dH5jnlAOnh4cKUxx0lchchq6tgfm/qwVpVI5frhuv3GkRHl5Ag9dOXw9VFQ9MFaoYxpffhfIAwFE1FKebP1MQHT90a9kf9Ta9pDEP10/WFVxafw7eJHaPE+G31FVYpq01MkNL0eQFGjqacHsC4kJH3z+ydXK4qeGKt4neHbcHmCK48QqhxfWqUUEy1EYbFHF6rCkRaKNB0LAE9WOhGi4YWzjZwuoNrXaOSWimuTNUyQkLNEgSUqY2PY8xjyPUZHqdWN8Pzbr23tWl2fvSOWXcdggSCO8wqWprrSAkQVKP+zKFAWWNvmVhnqrA6hgv5lKlu4h/EV8u9gvrAvwAXw3Dwu7RomcCptElXa5kY/MhinflBHp8rLqx4fAOTzZ9znQdsbhda9nbh3HW2LnpI9yVkdfV2/p8OlYQVknjAGU8wcnMo6ZXmABJ1Ui7/AOkgNv4gXWjptr/HbYS4iiofLqQlQ0YkCGQjlyWc5YDOACABnux7RUeZdW+bYo9w0E8M8SyiWNo3R/wsp6EEaAq64VFLBWWycuTTnylZjklQAASfU/XTPRGijdmIXlBZixwFA6nPtgd9Ku7SLV1dVVxuskFUS6uhyCp7H/vpTnkhRr1jTAALcwcs9UyTMjtnqBpt7YSOO3iToSRzE/QaR71sdFVqkr+W3Vix7AZ0x7LfHk23yUkxDPU0sXnJ3CvPGrY+6kr/AItKcI7YqY2zUKqGExcGqSGpqq6rmjzW8xjaRh1K87uB393Y6bT1SU0TyzSxwQxjLySOFVR2ySeg/PS72x5Vj3DXRtiCBpHYM5wFHUkknsAAcn6HS18cG2d/bw4Y2QbEhuNbDT1zT3GjtEhFRMhjHkuAuC6KxYlRnqVONPsTmvp9ohzD9Tq95ZGOdJlWWNldG/aHUHWSaKOpg5ZFyo6/UfUarh4HdlcS9qbBvP8ASM1dT/FVUZtNBdJRJUwQqmGLDqU5mPRSSflycZ0/9z7iodoWKa43GoEMCskSqBzPLI7BURF7sxY9h9dWmPSNmU1HIlTH2Q6+Iu23amjRI7RSVtE6xgBSzMogAHpyq8/boM6pbxx2VW7645cRrnR0TtENwVlPlUZhmN+TuPtrpNw8sPx+5rtfq5kigMz1E0zHEcSAl3JPqMDSw8PHhWXiLw0g3juG8Xvb9buSurLxFQ055CsE9Q8kTyAjIdkYMR6BgPTS7DDNst29I7zbK0IUd/WclaUFJQcddF3DC/NYd1xeazR0y1UFaTn5T5Tgtn/AW/idB9LUhnD4yB0xrft86x3CKqZOdI8hoyejBgVIP5E6uFeoERVWelwROlvDC5SWC7VFGx8tWl8yGQnoD2H8QdWx21uqgu/k0fxkKXNo/MajkfllYepUH8YHqVzj1xnVA+Hu9o7ttKz1TrUSJRWWetvVTCnmyxCnYQrHGP2p5pPLVeboOckg6bGw+L7VNObbuq0361WUAukO5LPBWxwP9ayj5sAAYw0SH+130pwhZR1b7TR5yLlgMg5lyElalccwaJh1BIwR9dKZ/DVwc2zxAPEGp2nQ0V8E3xUdTWVL/DpOTkypTs/Jz56jlU4PUDOhWz7ht1Tyi23QfDyH5IortMEb7I0nb6Y0YWX4e3ZKUSLKSWeVmMjnP9o5P89XvjFPGoo+CYDmE24rjWb/AIJ7NbVnprNOOStuMqNG9ShPzQxqQCqMOjOcEjIUDPMM9fteCnt6lAS8ecsBgH7D21HpuWWJf1UnQDHuB9NeV3FPUqytzBPXJ6aqW2paNN3lmmpqjte0Ru9qn4a78vsWUj89S+w6hK2juFjvCmqslwgamqo0kMbiMg5KsOqsO4YdQQCNSO/dpTHzbjFEJOvNgdCAe50rX27uG93JoYr3KlCZESGjpCIkCADKydD5pJ5up6DIAxjOkdSslm5prCr0an1eOG6OEfHOh4Tbpr6DfdPNV01PQ7jqG8muijnQFEqFVSsz8rKGBGTnPMR2stYKy6bIRqakk/SliAX4S313MJKFR3jinAJMf7qOGKdg3KAAo+FHh+t2wN3XHeV2dbxu6smk8itnGY6GmwFSKJT1B5AgZz8zYx0Axpq3a13XcJWS3btuVmwvK8FJTU1RCxH7REsLHP2OO2nfnabqTiZo4/Gm5k9NxQqlVJHt0FBC7BBLWVZcZJwAAFXJz7kai9x3KiuVte61s8E9ypEaWhkvz/B0EUhGMLyliuRkc5DNkj0yNLre+265NtXGK5cVK6GVwjRNXrRUcSujq655Ygx6r6EdSNblg3VtCCuKbcklvVdzFvNo4JrhOSev48Mfz5gM66Mh2IB5kfhkUb7RmbJ3LUblnoI7DbFs+3ad2W4m6RFasy8n/wAeOLOVwzKzSyYDDHIrBuYMo3mkt4WFyVIGQO/TSutE9ZbYrluyfa11iqKe2iORKiaOKaqjiZnGIeYjnVS5UuQcDlGM9CC83yKV6SemfzqeemjmjkQjDKwyCOvtpsnCjjUUWjba3ufz80KDlx651K0tKIkZ3PydzjUfb6cKicxPOe4+upObmameNSBkd9ROyeJ0CXU4KbC3DDwjmp6SrtFfQ7ur7PTfCfOtXSkVaOzK2CrK6RgMDjHynPQjVqdkcB6axBBJeKuSsLc0wjAEJ7kqB3x6ZJ9Ow1XXwebiMm3dr2+sQw1FvuQpKiOQ/Mk0IqI+Uj35lTA1dSyVzVdFVT4AdYzgYx1wdeo9QfeM/iraABUdA95qW/hbt2OEfpG00d5q5ExJU18SyNjOQq5zyKPQD79TrOODG2ZQDSm6WaT3tdymhH/TzFT9iMakrHdUutEs0ThgjNDJ9HQ8rD8iNENGzEpy9SdGatCeRFzX2FiSeYuqvgLXyROKXiVuankPRXqIKGpKjPbrACf461ouCG96NR8HxQZ0J+ZqzbtOx/8A0dR/LTg88Q/1jKv3I1sJKOUP+JSM5XqPz0H4ev2E4Mi3/wBRIVfAPfN1UJV8V5mh/aiprDGikex/XHWe3+G+7Ur839JFwVvaGzUqAfbOdOGW700OGkfyh1wX+UH+OsEO6LbVNIKeqjqWjOH8hlkCt35Tyk4P0PXUTj1+qiEGVdrXWYD0vA2rWTmreI+6qpyMEQfCU4I+6wk/z1MJwH2nUwGOvW63Ut3asvFQ2fyV1H8tEZ3JTIMlZH+gXrr3T7lSWQrFHI7AZ5eUj/tqYqReywTXWH+oyEsfAbh5tx1ko9nWkzA8wmqoBUyA+/NLzHRzTpHSxJFDGsEadBHEoRR+Q6aHbvvqj29Ck1wSWGN3CACJ5CxPsEVj/LULUcVxgfD7c3RXAnoaWxTAf9UnINEGvQSsST3MPJIkmBV15gylSD2IIIx/PST2Tt932Pt2GqZmnpKFKVjGcL+rJXp/DU5feLW57dYLtcqHhhuirejo5qmP4iSip+dkUkLyGdnJ+wJOMAHUhw8sC12yLLPXO5q5KZHkPNjLMOY4HtknVe4nYEsU60dzgzDTIVxzd/XWOSkZkeN+YowIJHQ4II1ZLht4Gd27h39e7HuK8Ue2tvWumSokvUUQqXqPMLBViXmVV5eRyzPjAHYk6YF2/wBHaNw7ee6cL+Jdu3kiNyNS3OEU/M2DlRNHzKrZHQOg++Ouo1XJcoas73LDVuhII7SE2HLWUlA/EG0U5kqbpt2gvkVPA5Ky3i2TiOugb0VpgjPn183v01dWj4nWux3NbdNDc6e8V8Ssm3vg3mr4uZc4MaAggducNydM82qa+Ha0X7hndtybB39aam2V1irReqejqsHz6SoT4WsETKSrof1TEqSAWzq7PBvdFVdrDQQ3CdpbpaOe0VjPISZGiA8mXHqssLRSD+8ddpf6jIe8NfX9NHWYNr3rckVRuSC02CmqKemuc0TQVV1EVUlSVWSXJ8tovKJYcoU5Bz1YaMae0b8vgj/3hY9sx8o5gkElzqFJ+paKMY/usNSVsooKCruc0MYjkqajzpDjqzcqrn+CgflomtUgcE4+bV0xee8gaXhtO6D9I7v3DWOOhaleGjU+/SKIH+Z++pSHhjttir1NBLcZFGPMuFXNUE/fncg/w1PIT11tRk4xoe5DUG24R7HnqBNPs6xzzf8AFmoI3f8AiwOiC22C1WWl+Gt1upbfAGLeVSwpEpOMZwoAzj11th+w9dfca9ucPEyRxqqAqCv2OveMIcZ6/XXlGwuNfQ3p6a7uc3PaBgp6sPsca9gEqObr9xrxzY6a9eZ8vYn212DIg1xMvse1tiXm5Pz80UHlp5YwxkkYRxhfrzuuPrqLuG77XsaKgtNZMpmipIjzSD5m6YyfuQToX453OW97k2Ds+mxIlTc1vdzIwVSjoyHUOPTnnaFR78jexwlfFVTbtuXE+KWzWesr6QW2nVpqZgE5/mJHf6jQCQW1DqrBdyI2xeqa53+5Wiaf4f8ATNGlPTTlR+sniLyCLr0JZS7AHv5ZHqAVrfLj/Rdvm77k2zX1dguRlJmpo154Kxcj9XLEfk8sd/cZ+UgknRdBb412vX1rgxh2URTqcPE6NzJIns4YAg+41pb52h/SNs1NwRSQLXTYSvMcWBT1ajBIXPSN1IIXOCpx3GvkfgviVlmOlW/nUb/b3n0OypEtPV9rTcXjna+OlrpIa22RW/c9seSszAvOslMRyVPkOfmTEbB2Ru4QdWI1K8O9zjbG4UqqqURUxhW2XJ8fLGiMTTVBz0Hlszox/wCHKD2j0htsbE35wv4grfdsWSPcNNXUstBPTLMqr5EgXnwW6o3ygrnIPY986ZNlmmoJ46Sppq62XBKcVKUVyg5ZZIObkyw6qxj6I+CR1U9mGthVkuGW3uZTtx6iGqXgekuGtR51TGyhgJQVZcfgcdCDogtS8nNn0xqu2wuLtDtLb9TBfhUfoKjQMlwgRpnoeUYWGVRljEcgJL+z+GQjAcu/ZG7LXva0wXCy1cdbDIPmWM5eM+quo7H/ANBOtdVaty9SzKW41lZOx2hisqqMn11sQzL39NBu4t3Ue3nSGo82aqfLCmp053CgZLHqMew9Sf46k7JeEvdtp66iYVdNOoZXhUtj6MB1Vh2IOCCOuidJlcoy8sIQPMFnT21tK4YdNBlZu222+7fBVFbFHVKiu0LN86hiQOYfs5x+1jI66IqOuhqYhJHNG0Z/aDgjXunieNZ1vUkx17a+gHQVuDiPbLUDBTSfpKt5wpipWBWMepdwCo/ujLHPYd9RFJxno6fzf0tQVFCIhzNUU/LPAR9PmDL9iPz17pMIuJcy9YU6jMZ8ZznprVr7wlFT8qo8lTJ8sMSDqx99Iyz+Iqr4nbtnteyKEtQUXKJamqpvMVnzk+Y6Nyxr2AUHn9fppqVFdTWKhrbve6tKOnpYTPUVU7cscCDqxJ9APbue3fXCdcTlmO1WuviQc1PHtwXnc24pVSeUKXIf5YYV+WGnU+pLM2T2LyMew1zz4h+Mnclx3veanb9bS0lreoPliSjEzSYAUvzE9jjoMDChfrqf8ZHixO9FqduWRpYaHlMYgYFWhjbo0koz/wDIkUkBT/VRkg/rHYJSw3JwcKvQdNDCAHc6ORqdMd57XqKHbMEFPC8kSS5mkRTgfkfTWLhbDXx1ldLa7jF57qqS000fPDPCCflkXI5sZODkFST19NIQ/wClI3YJkaLZ9pZBIrzxS1LyB165APKCp7dev20N8LfHXDty6XOq3NtaG6fGAnlo5WgEWXDEIRnlGOmCrD5fTJ182/4tdjZK5ND9hrU0n80Syso45lo91Xagt08sc1BdtvVS/Ms1okWdCPdQxBxn0ydIjjX4ldw7Ss8dur6Cv3KikyWa9XaljpjR1JXHOjK7sfl+Vo3wHUkEEdjWPxjcFdwxqLjBcrYQMho5XqGyfTHkr/noL3x4gOBdTC0EyXjd9qlUie0zwGMTnqBlhy8hGQQ4PMpHQau0Y3ideSpesFP1InGyqGpIDHq/SYeD3id23vGekiulVHsvdMbCINPNm3VJIwQJT0jB/dk6Y6cx057hw829JcFuVLVzcPrnMnOJLYhe2Vakk86xqcJzZJJQhTqkto4eWTcdwuv6FNRV7NvXnfoyepINTb6yH9atLUsqqBJ5Rcg45ZkHMvUMBl2JvbiJwddbXabysdvVj/uu4KKq3SL/AGUf+rJ9eQqRrUdIrtKodH2g0tseoWMNidEbNR3mhtsbVUtFeVAGKqhZuVx6Eqclf4nWhWfDT1U05tKeeTzO0VUIZJM9OrBlJP31XPY3i8t1uqEh3Htq47Vqi3LJWWRzWURPq3lPiUDPsW+2nXYPERsTdUR5N17auozny7jOKGfHplJwv/fVn4i5fSE87q76hta6a5JFy0FlkjQsTnz4ADnHUsZMnPvrObfcIW5q5LTQopGGrbrSxqD9+Yn+R0NxVW277k0VNaavm7/D1sEi/wAA51MWux0NJKksVkp1b98QRkD/ABa98Y+9FZI2OBwQP2hbbLJWXqIfBX+xoYzjmoKea4cv0BHJGD9TkakoOBm166Uz7lguO7GkPN8NfKgClUf2aWLlTH97mOgjefiGsHCui8zcG6bVaIFGBE1QstSR7JBGS7f9ONVq4s/6UBqekqKfhraZJaxFYrf7/GCRhTgxUoJUdezSM3vyjRhdZYeBFt19hGi/9uP8TofSy23aVkRFSltFupoyYqaBEhiijAPVV6KqjByxwg9SNc9PFz4zY941X+ru1KgGgpZlb9IUcrGNJF/ajPTzJAR0lI5VB/Vrn9YUx4kuKO6L5u+fbNbuS4XOhtUNPBUNVzEmuqfJR5p5h2ZjI7hRjlRFRUAA0jKiV+fHMO+j60Ir1zsz3VVRllLt1Y/t+p+59T176weeo9BrxUBwvcn7a8CnbA1GTg4jgnWVWDMo99YxNCkiwh081uoQsAx+w16QsGxgdfqNT7QYHtMrsVOF18kfCcp6dc9NewOccrdCPrrE4KSqCMhu2vako4PDVugWndl1oKio5KKutMzMjDOZadknRh/aCLOAe4DsP2jpu8XNiVu363zJ6cCnIDxsBlSD2I+uqz8Oagf640iQvE0kkVVS4MoXBkppY/8ANv5avjvu4pc9nWiOf9YktLA/PIPmHNEpOsv4wChW0HWpqPCT1q1ZlWnCJSIKqF2pC/MGLHoR7dzjQyKyn+OmpVpoZklyo85QSM+wOnM1hFBWT0pZZqOfqQw/AR2I9s50I7r2FTxBp4PmUktzpgug9tBw/FSPlt5lzK8MYDqriw3DQUtKsaR2+KnblwzQ/KW7dSM/f76gJ6UeaBEZRFnspOMfXRjNTNb1lUQGZnOfm6k60I3mWTzBQyJg9gnUn8s606ZFFo2GEztmPap0RIEW5Y5cpShyf2ie/wB9SO0+FO5OIW8rTtaw0Qqb3eZhS01OzY5SwOXc/sqoyxJ7Aa3Z0uNfWxLTULmdgVjiigdicDJAAHXXTjwFeFufg/ZI9+7uo2Xed1h/U0sy/PbaYkNyEeksmFLfugBffVlXQjancp2KUHInO/jDRz02/K55u9TBS1X1xJTxt/nnS9Zg1QEHfOraeOvY1Ptnf9skgjSKKP4y1FBkYEM5lgJ9yYKqED6KNVQqk5Z2Kjt2OotBryJtwfrXBb8OpD4VcDUPR1TK/KFBPtreFS7d+n56HJal8Kzd/B3eFHV2qS+T0lPVELJBeIKmZWx2zHVJImOvcYP10sb9wWtFgoJq62bRsfE7b7o3nPttaWnraZckk/DiFkcgfusSfUaslxI8IW290D4zZjQ7WueDzUHIzUMpx0xjJiOfVcjv8uqz7ioN3+Hncwo73RTW6WoTmiqF/BUID+JZF+V8ffI9QNVvMfp2OZtsbHwco9K/K3tB/bvBThHxkiE227+1ouKryPbJSaCoiYZAR1fzYvxAAlVXoc9+mj/afhM4Q8Oqamn4lV19v93kjZ1tzlqSgUjBwrRNmbHbq4z+6M40C70sVFxGpJN12KKKj3NAoes5G8o1SL+3gftjr17n1172ZxfrqykG393CSttysQksx5ni9j19unUddAbK6F2YyT+HanYEj9RLFT0Ww75ZpbZsGHb0V7p6OojttNc6bmhR3geLCsymSFwrnlkjPRvxKwJwu7hdKW+WOGkWOopqu1D4Kqo6teSeF41C8jr6EADqOhGCCQdLu+7XlssyVVurC9LOeemqFlwe+ep/eGNTa7ibiHSx09fXpZN+UsYho72yEwXRB+Gnq/YjJ5ZB1X+RX5qHMrGjzCDw1MRy9Q/aatbEWYP8yHPUN1OpWn23DVU6zgszSrkDHb3GNQdJuBKivqKK5UM1su1I3l1NHUDDxv3H3B7gjoR1GjbYV8iN0SF4/MjUnmVuxGc9P56yIBR9N3l5nBSCdZwlobjKpjRgx7+ZjB/hrbs3Bf4ec5EKx5HYFiB9NOzcOzJ44Y623qrwN+sEYP41PYZ9NatgrqeBjSViSRMzZKkHKk+gPqNXlQ63FxKP6RneGngXarJJ/rBVRefXnApvMOREP3gP3j/LGrQ0+IwqKeX6Z0gdo8RY7HT08AUiIARrjv8AnpzbWuUl3pxXVCeSsg/Vx+wBxn+WtV4fYoQVr3mL8UpfrNh7Snf+kX4fvdKOtutOhJioae7xnlz/AFMvwtXj/BPRMfpFnXNORizsP567beJXaduvu0rZX3CRYLdR1hoLhIT/APb69Pg6jOewVpYZf+TrjLvfaNx2Nuy7bfukXkXG11clHUx/uyIxU/kcZB9iNOz2iWs+kgaKFlrlYt0HUg6lmiGfxjrqNcSJNzEjGO2sJqpMnqdDh52wgqAzj5iBr9fbJZ9+WKp29ue3w3O0Va8rRTDqPZkbujjuGHUaikqHLj5eUa3oqnmAbOCvb66U1WdMZMujsSkXHPgrf/DvcY7lRM9fsyeUJTXQKGMJOSIqgZ+U46Bvwt6YPTQNUrbrw0NdTQwokmOdj1/MAdxrpO0Nr3LZ62yXyiiuVouELU1VSTDKyo3cH6+oPcEAjtrl9x74Z3XgBxLu2zDVS1ViqIxcLHWydHemYnlXPuh5kYe6/XUL8UWfUq/cTdeC+PEEYuSNkdjDq03mC0U8lBPTrVWeoBWeEfPj+2ueqn+WhDc+3paCeSppHlqaSUl42YE4X0yfpoL23vqenYQ1itKPTBwen+Y+mmdtbcdBcyYZZvioJBiWIjDRsexB0pPm1t0v2n0NTi5addXDe0jLZuOj31HSWK7TCi3FTqIbXd5mOHA6iCc92Tvj1UnIz2MxYqu5Wi5GC40rUFVTyckqyDPIw98dwe4I6EHOsW+eF1PcLe01GrLOo5iI84kHcEezD27+uiXghfqXibcKPae6xVG9U6+TTVdNIsU1xph1MDFlI50PUZH17c2p3YgyQCp595j82vyC1gWWX4SXiO9WtLbOwBAJifH4ge4++dTm5eHqxyebTw9iSQMDQDY5+HW0a80VNxDr7VW00nk/CbgszqqspwyM6FSrjsfrp701dc6+giagr9l3hJPlUmrqafnPp6Pr1OI2ijEHX5mKtygjB0B1+hiLu0M1sqoUkyF5lIx/e6/y08m3bPS7etkdLKYmkj+Zl6EKP/PXULebPXU0iVG5NrUdJaourXG0VzVkC+/m8yI8AHo5DRnPzMnQ6y32zRCxW6W2SNPTQoYgQckL7k+40fybcYFxOHJpyyqnuI06yC08Rtj11muQSqtl4opKGqUEZ5JEKv8AYjOR9tVY2psvYe/akWHipW2/dfFK2o1uuq3ihoo6hniJjQxv5CtOpRUdSzOxVxk6cWzbzPbcRrEBC3VgQMA+o0nPGP4aJuKrf0gbNrkod1UlIiVdqf5DWLGSfOVh1Eirhe2CFHUEacUZXXXsxUMOtMjps+0xZ8ZvA3YqSCqu23oPgaNVYvJa4nzSKPmaSajJcyIvUsadlcAEiJ8EaqXdOCm/7fVmKDZd6v8ATFQ8N029QyXGgqkIyskNRCrJIjDqCDnrggHIFwfC54qLxNd6PYG//NprzDIsNLcapsvn9mOVj3J6crn7EnI1ZReHDUbSLY3tdvtru0qU0luMgjLEswUrIgC8xJC46ZxnGMXkZLBzCXYLI3yHifXjZFxnr76wNWeSQD3/AM9R9Xuemp6lKSrJoapscsMvUTE56Rv2cjHXHX6eutaquMNSMgnmXsR01nHbpG51RvtCa2VpklVlODkHSa8ffDFd98DYd2wwl7ttCo+K8xR1ajlKpOv2DeW/5HTCsd1ArfK6kn1x2+mmNQWei3lZ7hY7knnWy6UktFUxN2aORSrfyOfy1fwrQ/yn1gXJpYWj0M410dre82+eenX5osnl9cZ9PfGpzaZmoS3MQzdMejD7alLLtip4eb2rLHdUMdVbK2SjlRu/OkhjyR7EDP2OjW57bgs96b4WNXjnYzxl1xgeq/8AjVC/qUsk+w+HolqpcvqIZ8L91w3m5UVjr5Ejq2zySyfhmHt9Gx76kOIXCKS23BLvZpZqeemkWbzKY8ssMinKSIfcH/8Auhek2RTXCaCsSN4HjImQDI6g/iU/fVpOHsS7itEVLWEzTIoImkOWPTB++fb31PFIYanfF67Kh832zJTWOh48bMpt22ymFdu+2xilv9pEYDXMBQC6qflEwAyvo3VCfwkCyWahoYYK+xqkdLVHKvT8wQgZBHIfwsCCGUgEFSDgjGjGjt9dwxviXmxIECk/E0iLgTrjBzj1Hp9tTPEmG2U1rl4g2anWo29cOWq3BTwAmSlfGP0hEg74AxOg6sq+YPmVuYuZh/EDzK+GHf8AM+bo7YdnS3NZ7fj/AFIrZfEu97Wr4om56mjBDPC/XI7HlPv27ab9p2xbKikW7WGQRWa4czzW5h+qhbGP1Y/Z+YdR2GTjAwAsoblt6sSllWWKQMivHLFgo6kZVkYd1IIOR3zpg7ErGoKuShDc9vqQGCd+V/cffS7FtcHybDwYPOoVtXVjRE2KaOC2KVMYZ2Yh8YBYDtpF8W7PvjecSUdgaWGpauhqGaNhGsaxsSDknqoJVivryDvp57kga3VgkcgM3b641qUNePmZuVQ3TLDXGbofpnqW+Utre5Tbxe8ILLsO+Wu62paw0tdTiT4qWVpZmqEbLyM5OeYt833Y4AGNWG4KeJbb194aWWe71SxXSOLyKnnB+eRPlLjAPRsZ/PW7xz2NFxD4Q3RFVGqbWxqkDDqUx8wH3H+WudJq7jsyeotUdWYI4pWZVePqQeoP5jB0wotdTtY3waqsqvybj9s6Hbohp9x2ySgnQTQv1wcgq3owPcEd8jSvF5uGxJjSXxpKikTBgr1GUljzg5Poy56g9wQQcdje83GajQ+Vyjp3xoXfcFTU1MUVQsNTFI4jaOaMMpU9CCD9CR+eqBJfgzOAdPIhxbmjmgpLjROtRC/zB1OQRpk7GuMlSwbkB5WIwPb00lttbdptqJJZKGap/R9H+shSaZnZc9eXmPUqM4APoBpw7AcusBwBlRnAxnR8cGuwagbWDIRKUePPY42px/gvtOhSLctBHcG9FWaM+VIB9yit/i1k2rtGivlkpau43T4CbljNPAYwzVBbr8pPTp17+mrFePDb1ur6ThxLUUkc0jT1cHM4yQhjiYgfmoOhrgnt6gqRYopofOjgpQEWQ5A5uYH+XbTDIrD2hj6zceA+IP8Ay4gEgr68f/YE3Kx7csFsrY7fueG519rqfK+HUhVZjylx+QYfmDo44VXu3z0dHE9VBHXrJI3Ks/M7R8jH5gfwkPyjHr6ZycK3i7aoLRxH3+KUNGi35lWMH5V/2anY4H1LMfz0IwVctLMs0TckuQOcd++lL5BouKBeBN7Xhr4j4eGssJLc869vxL02620t0VZWqCqmMBgRkZPp99e7Dt07XuMsdLO5tldJ5pWTtC/Y9O2G6H+Oorw81D7o2Fb6yuw05aRCyfLkK5Az/DTYktsFM6xIpKMOYhjnrnWoTTIHAnxzNdqLmqJ3qVY3rw5tfCWvE0l2ntmxK6oMdJAyqRa6l/8A6eMn8MTYLLnp1KL1A0a8LrqBfprVJUrPEmWpqlmXEq5+UjJGcjBxpz8Qtj2fevDfctqutN59FVW2eKVA3LnCc6sD6MrqrA+hA1WPw2/744U2O41X6ysMMUvmeoYqCcfnpJnVLXYtijvAYmSbkep/TtLXXOxR3iwGWRI2kjC83MOwHQ/yzpeUSxU8lVE6RM3O6xgKAD1GOh64x6Z9dNnbh8+2tz/MHjQsPQ5GlVuy100FVUSpEA/mA59jnUMngLYBKmFt3epj2kjs96eW5zW10jIq4poyijmRl5iF6n6Z6apbxY8NFyh33ckooohArAAFCfT/ANP56uFtimSK7UEi5BDEAZ6emjTctrpHuru0CMzKCSR3Ou0KbK+fSXPOOLkHp/qH+J//2Q==';

var img2 = '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';



function printbitmas() {

    var poem =[{"Num": 1,"Imgstr": img1},{"Num": 1,"Imgstr": img2 }];

    logger('打印图片列表');

    var data = JSON.stringify(poem);
    printBitmap_list(
        data,
        function (receivedData) {
            logger(receivedData);
        });
}

//打印多个文件
function printfile() {
    var docPath = document.getElementById('doc').value;
    var pdfPath = document.getElementById('pdf').value;

    if (!docPath && !pdfPath){
        alert('请输入本地路径');
    }
    var testfile=[
        {"FileNum": 1,"FileInfo": docPath ,"FilePages":1},
        {"FileNum": 1,"FileInfo": pdfPath ,"FilePages":1}
    ];

    logger('打印多个文件');
    //序列化对象
    var data = JSON.stringify(testfile);

    send_command(
        "printFile_list",
        data,
        function (receivedData) {
            logger(receivedData);
        });
}

//打印网页
function printweb(){

    logger('打印指定网页页面');
    printurl="http://zwtest.benxiangai.com/net/zwwindow/zwjdemo/testprinthtml.html";
    send_command(
        "printUrl",
        printurl,
        function (receivedData) {
            logger(receivedData);
        });
}

//打印网上文件
function printwebfile(){

    logger('打印网上文件');
    printurl="http://zwtest.benxiangai.com/net/zwwindow/zwjdemo/test.doc";
    send_command(
        "printUrlFile",
        printurl,
        function (receivedData) {
            logger(receivedData);
        });
}

//打印网页元素
function printwebeven(){

    logger('打印网页元素');
    printeven=document.getElementById('printwebeven').value;
    // alert(printeven);
    // return false;
    send_command(
        "printhtml",
        printeven,
        function (receivedData) {
            logger(receivedData);
        });
}

