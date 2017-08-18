$(function () {
    window.parent.heightChange($(document).height());

    window.onload = function () {
        window.parent.heightChange($(document).height());
    };

    window.onresize = function () {
        window.parent.heightChange($(document).height())
    };



    $('.dropDown').on('touchend', function (e) {
        e.stopPropagation();
        var _this = $(e.currentTarget);
        _this.children('ul').addClass('show');
        $(document).one('touchend', function () {
            e.stopPropagation();
            $('.dropDown > ul').removeClass('show');
        });
    });

    $(".dropDown > ul > li").on('click', function (e) {
        e.stopPropagation();
        var _this = $(e.currentTarget);
        _this.parent().removeClass('show').siblings('span').text(_this.text());
    })

});