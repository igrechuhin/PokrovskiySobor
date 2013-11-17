$(function() {
    'use strict';
    FastClick.attach(document.body);
});

$('.button.plan').on('click', function () {
    window.open('open://about.html/temples_list');
});

$('.button.contents').on('click', function () {
    window.open('open://about.html/contents');
});

$('.button.back').on('click', function () {
    window.open('back://contents.html/dummy');
});

$('.link').on('click', function (event) {
              window.open($(event.target).data('url'));
});

$(function() {
    'use strict';
    var $navigation = $('.navigation'),
        $dots = $navigation.children(),

        $pageHeader = $('.page-header');

    $navigation.on('click', function (event) {
        var $target = $(event.target),
            id = $target.attr('id'),
            page = $target.data('page');

        window.open('page://about.html/' + page);

        $dots.removeClass('active');
        $target.addClass('active');

        $pageHeader.html($pageHeader.data(id));
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