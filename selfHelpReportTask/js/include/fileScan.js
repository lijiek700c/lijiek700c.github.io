$(function () {
    window.parent.heightChange($(document).height());

    window.onload = function () {
        window.parent.heightChange($(document).height());
    };

    window.onresize = function () {
        window.parent.heightChange($(document).height())
    };




});