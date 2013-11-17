$(function() {
    'use strict';
    FastClick.attach(document.body);
});

$('.button.plan').on('click', function () {
                     window.open('open://legends.html/temples_list');
});

$('.button.contents').on('click', function () {
                         window.open('open://legends.html/contents');
});

$('.button.back').on('click', function () {
    window.open('back://legends.html/dummy');
});

$('.images').on('click', function () {
    'use strict';
    alert('Открыть фотогалерею на альбоме exterior');
});

$(function() {
    'use strict';
    var $navigation = $('.navigation'),
        $dots = $navigation.children();

    $navigation.on('click', function (event) {
        var $target = $(event.target),
            id = $target.attr('id'),
            page = $target.data('page');
                   
        window.open('page://legends.html/' + page);

        $dots.removeClass('active');
        $target.addClass('active');
    });
});

function scrollToPage(page)
{
    $(window).scrollTop(0);
    
    var $navigation = $('.navigation'),
    $dots = $navigation.children(),
    $pageHeader = $('.page-header'),
    id = 'nav' + page;
    
    $dots.removeClass('active');
    $('#'+id).addClass('active');
    
    $pageHeader.html($pageHeader.data(id));
}