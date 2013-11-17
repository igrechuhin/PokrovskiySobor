$(function() {
    'use strict';
    FastClick.attach(document.body);
});

$(function() {
    'use strict';
    var jsParams    = {};
    jsParams.path   = '';
    jsParams.id     = '3D';
    jsParams.target = 'rotateContent';
    jsParams.targetWidth  = '1536';
    jsParams.targetHeight = '1808';
    RotateTool.add(jsParams);
});

$(function() {
    'use strict';
    var $slider = $('.slider'),
        minValue = 0,
        maxValue = 255;

    function formatTime (value) {
        var mins = Math.floor( value / 60 ),
            secs = Math.floor( value - mins*60 );
        return mins + ':' + (secs < 10 ? '0'+secs : secs);
    }

    $slider.slider({
        orientation: 'horizontal',
        range: 'min',
        min: minValue,
        max: maxValue,
        value: minValue,

        create: function (event) {
            $('.value.min', $slider).text(formatTime(minValue));
            $('.value.max', $slider).text(formatTime(maxValue));
        },

        slide: function (event, ui) {
            var hidePercent = ui.value / maxValue,
                $current = $('.value.current', $slider);
            if (hidePercent < 0.06 || hidePercent > 0.94) {
                $current.fadeOut();
            } else {
                $current.text(formatTime(ui.value))
                        .css('left', $(ui.handle).css('left'))
                        .fadeIn();
            }
        }
    });
});

$('.button.audio').on('click', function () {
    'use strict';
    $(this).toggleClass('active');
    $('.player').fadeToggle();

    alert('Загрузить файл 29.mp3 в плеер');
});

$('.button.plan').on('click', function () {
    'use strict';
    alert('Переход на страницу temples_list');
});

$('.button.contents').on('click', function () {
    'use strict';
    alert('Переход на страницу contents');
});

$('.button.back').on('click', function () {
    'use strict';
    alert('Переход на предыдущую страницу');
});

$('.play-pause').on('click', function () {
    'use strict';
    $(this).toggleClass('active');
    alert('Начать / остановить воспроизведение аудио');
});

