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

$('.button.back').on('click', function () {
    window.open('back://contents.html/dummy');
});

$('.photo').on('click', function () {
    window.open('open://menu.html/photo');
});

$('.panorama').on('click', function () {
    window.open('pan://temples_list.html/scene_1_hall_3');
});

$('.info').on('click', function () {
    window.open('open://menu.html/info');
});

$('.temples').on('click', function () {
    window.open('open://menu.html/temples_list');
});

$('.history').on('click', function () {
    window.open('open://menu.html/history');
});

$('.about').on('click', function () {
    window.open('open://menu.html/about');
});

$('.bonus').on('click', function () {
    window.open('open://menu.html/bonus');
});
