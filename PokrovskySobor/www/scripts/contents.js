$(function() {
    'use strict';
    FastClick.attach(document.body);
    var parts = window.location.search.substr(1).split("&");
    if (parts.length > 0)
    {
        var query = parts[0].split("=");
        if (query[0] == "first")
        {
            $('.button.back').hide();
        }
    }
});

$(function() {
    'use strict';
    var $hintScreen = $('.hint-screen');
    $('.button.hint').on('click', function () {
        $hintScreen.fadeIn();
    });

    $hintScreen.on('click', function () {
        $hintScreen.fadeOut();
    });
});

$('.button.back').on('click', function () {
    window.open('back://contents.html/dummy');
});

$('.photo').on('click', function () {
               window.open('open://menu.html/photo');
               });

$('.panorama').on('click', function () {
                  window.open('pan://contents.html/scene_1_hall_3');
                  });

$('.info').on('click', function () {
              window.open('open://contents.html/info');
              });

$('.temples').on('click', function () {
                 window.open('open://contents.html/temples_list');
                 });

$('.history').on('click', function () {
                 window.open('open://contents.html/history');
                 });

$('.about').on('click', function () {
               window.open('open://contents.html/about');
               });

$('.bonus').on('click', function () {
               window.open('open://contents.html/bonus');
               });

$('.legends').on('click', function () {
                 window.open('open://contents.html/legends');
});
