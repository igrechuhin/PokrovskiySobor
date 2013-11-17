$(function() {
    'use strict';
    FastClick.attach(document.body);
});

$(function() {
    'use strict';
    var $generalSlider = $('#general .slider'),
        $specificSlider = $('#specific .slider'),
        minValue = 0,
        maxValue = 255;

    function formatTime (value) {
        var mins = Math.floor( value / 60 ),
            secs = Math.floor( value - mins*60 );
        return mins + ':' + (secs < 10 ? '0'+secs : secs);
    }

    $generalSlider.slider({
        orientation: 'horizontal',
        range: 'min',
        min: minValue,
        max: maxValue,
        value: minValue,

        create: function (event) {
            $('.value.min', $generalSlider).text(formatTime(minValue));
            $('.value.max', $generalSlider).text(formatTime(maxValue));
        },

        slide: function (event, ui) {
            var hidePercent = ui.value / maxValue,
                $current = $('.value.current', $generalSlider);
            if (hidePercent < 0.08 || hidePercent > 0.92) {
                $current.fadeOut()
            } else
                $current.text(formatTime(ui.value))
                        .css('left', $(ui.handle).css('left'))
                        .fadeIn();
        }
    });

    $specificSlider.slider({
        orientation: 'horizontal',
        range: 'min',
        min: minValue,
        max: maxValue,
        value: minValue,

        create: function (event) {
            $('.value.min', $specificSlider).text(formatTime(minValue));
            $('.value.max', $specificSlider).text(formatTime(maxValue));
        },

        slide: function (event, ui) {
            var hidePercent = ui.value / maxValue,
                $current = $('.value.current', $specificSlider);
            if (hidePercent < 0.08 || hidePercent > 0.92) {
                $current.fadeOut()
            } else
                $current.text(formatTime(ui.value))
                        .css('left', $(ui.handle).css('left'))
                        .fadeIn();
        }
    });
});

$('.panorama').on('click', function (event) {
    'use strict';
    alert('Переход на панораму : ' + $(event.target).data('destination'));
});

$('.button.plan').on('click', function () {
    window.open('open://temples.html/temples_list');
});

$('.button.contents').on('click', function () {
    window.open('open://temples.html/contents');
});

$('#general .play-pause').on('click', function (event) {
    'use strict';
    $(this).toggleClass('active');
    alert('Начать / остановить воспроизведение аудио : ' + $(event.target.parentNode).data('destination'));
});

$('#images').on('click', function () {
    'use strict';
    alert('Открыть фотогалерею на альбоме : ' + event.target.className);
});

$(function () {
    'use strict';
    var isImageVisible = false,
        isPlanVisible = false,

        $pageHeader = $('.page-header'),
        $info = $('.info'),
        $image = $('#image'),
        $player = $('#specific.player');

    $('.button.back').on('click', function () {
        if (isImageVisible) {
            $image.fadeOut();
            $player.fadeOut();
            $pageHeader.html($pageHeader.data('info'));
            isImageVisible = false;
        } else if (isPlanVisible) {
            $info.fadeOut();
            $pageHeader.html($pageHeader.data('default'));
            isPlanVisible = false;
        } else {
            window.open('back://contents.html/dummy');
        }
    });

    $('#points').on('click', function () {
        $info.fadeIn();
        $pageHeader.html($pageHeader.data('info'));
        isPlanVisible = true;
    });

    $('.audio').on('click', function (event) {
        var $target = $(event.target);
        $image.removeClass().addClass($target.attr('id')).fadeIn();
        $player.fadeIn();
        $pageHeader.html($target.data('header'));
        isImageVisible = true;

        alert('Начать воспроизведение аудио : ' + $target.data('destination'));
    });

    $('#specific .play-pause', $info).on('click', function () {
        'use strict';
        $(this).toggleClass('active');
        alert('Начать / остановить воспроизведение аудио');
    });
});

