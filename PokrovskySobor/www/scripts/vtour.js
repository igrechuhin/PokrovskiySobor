$(function() {
    'use strict';
    FastClick.attach(document.body);
});

$('#ClosePanorama').on('click', function () {
    window.open('back://vtour.html/dummy');
});
