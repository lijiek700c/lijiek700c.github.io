$(function () {
    window.parent.heightChange($(document).height());

    window.onload = function () {
        window.parent.heightChange($(document).height());
    };

    window.onresize = function () {
        window.parent.heightChange($(document).height())
    };

    function inspect() {

        var un = $('input[name=un]'),
            pwd = $('input[name=pwd]'),
            alert = $('#alert');

        alert.attr({
            class: ''
        }).text('');

        if (un.val().length == 0) {
            alert.text('请输入用户名');
            un.focus();
            return false;
        } else if (pwd.val().length == 0) {
            alert.text('请输入密码');
            pwd.focus();
            return false;
        }
        return true;
    }

    function login() {

        var un = $('input[name=un]'),
            pwd = $('input[name=pwd]'),
            alert = $('#alert');

        if (inspect()) {

            if (un.val() == '1' && pwd.val() == '1') {
                alert.text('正在登陆...').addClass('pass');
                setInterval(function () {

                    window.parent.jump('./include/selfMotionReportACase.html');
                    
                }, 1);
                return true;
            } else {

                alert.text('用户名或者密码错误, 请重新输入').addClass('waring');
                un.focus();
                return false;
            }

        }
    }


    $('#loginBtn').click(function () {
        window.parent.jump('twoChoices.html');
        login();
    });

    document.onkeydown = function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            login();// 处理事件


        }
    };

});