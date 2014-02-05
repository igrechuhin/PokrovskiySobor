$(function() {
    'use strict';
    FastClick.attach(document.body);
});

$(function () {
    'use strict';

    var month = (new Date()).getMonth(),
        $time = $('.time'),
        $period = $('.period'),
        activePeriodID;

    function selectPeriod (id) {
        var selector = '#' + id;
        $time.hide().filter(selector).show();
        $period.removeClass('active').filter(selector).addClass('active');
    }

    if (month === 4 || month === 8 || month === 9) {
        activePeriodID = '2';
    } else if (month >= 5 && month <= 7) {
        activePeriodID = '3';
    } else {
        activePeriodID = '1';
    }
    selectPeriod('selector' + activePeriodID);

    $period.on('click', function (event) {
        selectPeriod($(event.target).attr('id'));
    });
});

$(function () {
    'use strict';
    var colors = ['light-blue', 'green', 'yellow'].join(' '),
        action = {
            'nonpro-photo': {
                'price': '0',
                'color': 'light-blue'
            },
            'nonpro-video': {
                'price': '0',
                'color': 'green'
            },
            'audio': {
                'price': '200',
                'color': 'yellow'
            }
        },
        group = {
            'individual': {
                'adult': '250',
                'children': '100',
                'pensioner': '100',
                'special': '30',

                'color': 'light-blue'
            },
            'medium': {
                'adult': '6000',
                'children': '3750',
                'pensioner': '6000',
                'special': '6000',

                'color': 'green'
            },
            'small': {
                'adult': '4750',
                'children': '3250',
                'pensioner': '4750',
                'special': '4750',

                'color': 'yellow'
            }
        },

        activeGroup = 'individual',
        activeCategory = 'adult',

        $price = $('.price'),
        $group = $price.filter('.group'),
        $category = $price.filter('.category'),
        $action = $price.filter('.action'),

        $priceCard = $('.price-card'),
        $priceValue = $('.price-value', $priceCard);

    function setPrice (color, value) {
        $price.removeClass('active');
        $category.removeClass(colors);

        $priceCard.removeClass(colors).addClass(color);
        $priceValue.text(value);
    }

    function setGroup () {
        var color = group[activeGroup].color,
            price = group[activeGroup][activeCategory];

        setPrice(color, price);

        $group.filter('#' + activeGroup).addClass('active');
        $category.addClass(color)
            .filter('#' + activeCategory).addClass('active');
    }

    function setAction (actionID) {
        var currentAction = action[actionID];

        setPrice(currentAction.color, currentAction.price);

        $action.filter('#' + actionID).addClass('active');
    }

    setGroup();


    $group.on('click', function (event) {
        activeGroup = $(event.target).attr('id');
        setGroup();
    });

    $category.on('click', function (event) {
        activeCategory = $(event.target).attr('id');
        setGroup();
    });

    $action.on('click', function (event) {
        setAction($(event.target).attr('id'));
    });
});

$('.button.plan').on('click', function () {
                     window.open('open://info.html/temples_list');
});

$('.button.contents').on('click', function () {
                         window.open('open://info.html/contents');
});

$('.button.back').on('click', function () {
    window.open('back://info.html/dummy');
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

        window.open('page://info.html/' + page);

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
