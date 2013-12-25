$(function() {
    'use strict';
    FastClick.attach(document.body);
});

$(function () {
    'use strict';
    var $pageLevel1 = $('.page#level1'),
        $pageLevel2 = $('.page#level2'),

        $pageLevel1Plan = $('.list', $pageLevel1),
        $pageLevel2Plan = $('.list', $pageLevel2),

        $pageLevel1List = $('ul', $pageLevel1),
        $pageLevel2List = $('ul', $pageLevel2),

        $pageLevel1ListEntries = $pageLevel1List.children(),
        $pageLevel2ListEntries = $pageLevel2List.children(),

        $bonusHint1 = $('.bonus-hint', $pageLevel1),
        $bonusHint2 = $('.bonus-hint', $pageLevel2);

    function updateView ($plan, $listEntries, $bonusHint, target) {
        var classes    = target.className.split(' '),
            isBonus    = (classes.indexOf('bonus') !== -1),
            isPanorama = (classes.indexOf('panorama') !== -1),
            isInfo = (classes.indexOf('info') !== -1),
            filter     = classes.filter(function (element) { return element !== 'bonus' && element !== 'list'; })[0];
        if (isPanorama) {
            if ($(target).parent().hasClass('active')) {
                window.open('pan://temples_list.html/' + $(event.target).data('destination'));
            }
            return;
        }
        if (isInfo) {
            if ($(target).parent().hasClass('active')) {
                window.open('open://temples_list.html/' + $(event.target).data('destination'));
            }
            return;
        }
        $plan.removeClass('active');
        $listEntries.removeClass('active');
        $plan.filter('.' + filter).addClass('active');
        $listEntries.filter('.' + filter).addClass('active');
        $bonusHint[isBonus ? 'fadeIn' : 'fadeOut']();
    }

    $pageLevel1Plan.on('click', function (event) {
        updateView($pageLevel1Plan, $pageLevel1ListEntries, $bonusHint1, event.target);
    });

    $pageLevel2Plan.on('click', function (event) {
        updateView($pageLevel2Plan, $pageLevel2ListEntries, $bonusHint1, event.target);
    });

    $pageLevel1List.on('click', function (event) {
        updateView($pageLevel1Plan, $pageLevel1ListEntries, $bonusHint1, event.target);
    });

    $pageLevel2List.on('click', function (event) {
        updateView($pageLevel2Plan, $pageLevel2ListEntries, $bonusHint2, event.target);
    });
});

$('.button.model').on('click', function () {
    window.open('open://temples_list.html/model3d_apple');
});

$('.button.contents').on('click', function () {
    window.open('open://temples_list.html/contents');
});

$('.button.back').on('click', function () {
    window.open('back://temples_list.html/dummy');
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

                   window.open('page://temples_list.html/' + page);

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
