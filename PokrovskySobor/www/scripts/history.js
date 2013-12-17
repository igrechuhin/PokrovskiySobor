$(function() {
    'use strict';
    FastClick.attach(document.body);
});

$(function() {
    'use strict';
    var $wrapper = $('.timeline-wrapper'),
        $timeline = $('.timeline'),
        $points = $('.point'),
        $content = $('#content'),
        $contentText = $('.text', $content),
        offsetLeft = $points.filter('#p1').offset().left,
        screenWidth = 1536,
        pointsStep = 262,
        yearShift = 40,
        smallPoint = {
            offset: 0,
            size: 28
        },
        bigPoint = {
            offset: -16,
            size: 60
        },
        smallYear = {
            left: -44,
            top: 56,
            size: 72
        },
        bigYear = {
            left: -82,
            top: 49,
            size: 140
        },
        points = [],
        scrollTimer,
        skipEnd = false;

    $points.each(function (index, element) {
        var $left = $('.circle.left', element),
            $right = $('.circle:not(.left)', element);
        points.push({
            left:       ($left.length !== 0 ? $left.offset().left : $right.offset().left) - offsetLeft,
            right:      $right.offset().left - offsetLeft,
            element:    element
        });
    });

    function scroll (event) {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(scrollEnd, 200);

        var scrollPos = event.target.scrollLeft;

        $points.removeClass('active');

        points.forEach(function (point) {
            var distance = (scrollPos < point.left) ? point.left - scrollPos :
                           (scrollPos > point.right) ? scrollPos - point.right : 0,
                scale = Math.min(Math.max(distance / pointsStep, 0), 1),

                offset = scale * smallPoint.offset + (1 - scale) * bigPoint.offset,
                size = scale * smallPoint.size + (1 - scale) * bigPoint.size,

                leftYear = scale * smallYear.left + (1 - scale) * bigYear.left,
                topYear = scale * smallYear.top + (1 - scale) * bigYear.top,
                sizeYear = scale * smallYear.size + (1 - scale) * bigYear.size,

                $left = $('.circle.left', point.element),
                $right = $('.circle:not(.left)', point.element),

                $leftYear = $('.year.left', point.element),
                $rightYear = $('.year:not(.left)', point.element),
                yearOffset;

            if ($left.length !== 0) {
                $left.css({
                    left: -pointsStep + offset + 'px',
                    top: offset + 'px',
                    width: size + 'px',
                    height: size + 'px'
                });
                yearOffset = $left.offset().left;
                $leftYear.css({
                    left: -pointsStep - ((1 - scale) * yearShift) + leftYear + 'px',
                    top: topYear + 'px',
                    'font-size': sizeYear + 'px'//,
                    //display: (yearOffset < 0 || yearOffset > screenWidth) ? 'none' : 'block'
                });
            }
            $right.css({
                left: offset + 'px',
                top: offset + 'px',
                width: size + 'px',
                height: size + 'px'
            });
            yearOffset = $right.offset().left;
            $rightYear.css({
                left: leftYear + 'px',
                top: topYear + 'px',
                'font-size': sizeYear + 'px'//,
                //display: (yearOffset < 0 || yearOffset > screenWidth) ? 'none' : 'block'
            });
        });
    }

    function scrollEnd () {
        if (skipEnd) {
            return;
        }
        skipEnd = true;
        var minDistance = 1536,
            scrollPos = - $timeline.offset().left,
            selectedPoint, $element;
        points.forEach(function (point) {
            var distance = (scrollPos < point.left) ? point.left - scrollPos :
                           (scrollPos > point.right) ? scrollPos - point.right : 0;
            if (minDistance > distance) {
                minDistance = distance;
                selectedPoint = point;
            }
        });

        $element = $(selectedPoint.element);

        $content.removeClass();

        $wrapper.animate({
            scrollLeft: selectedPoint.right
        }, 200, function () {
            $element.addClass('active');
            $contentText.html($element.data('text'));
            $content.addClass('delay').addClass($element.attr('id'));
            setTimeout(function () {
                skipEnd = false;
            }, 400);
        });
    }

  $wrapper.on('scroll', scroll).scrollLeft(5);

    $points.on('click', function () {
        var id = event.currentTarget.id,
            offset = points.filter(function (point) {
                return point.element.id === id;
            })[0].right;

        $wrapper.animate({
            scrollLeft: offset
        }, 500);
    });
});

$('.button.plan').on('click', function () {
                     window.open('open://history.html/temples_list');
});

$('.button.contents').on('click', function () {
                         window.open('open://history.html/contents');
});

$('.button.back').on('click', function () {
    window.open('back://contents.html/dummy');
});

