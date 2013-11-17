$(function() {
    'use strict';
    FastClick.attach(document.body);
});

$('.button.plan').on('click', function () {
                     window.open('open://bonus.html/temples_list');
});

$('.button.contents').on('click', function () {
                         window.open('open://bonus.html/contents');
});

$('.button.back').on('click', function () {
    window.open('back://bonus.html/dummy');
});

$('.panorama').on('click', function (event) {
                  window.open('pan://bonus.html/' + $(event.target).data('destination'));
});
