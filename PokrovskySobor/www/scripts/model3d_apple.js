var isPlaying = 0, manualSeek = false;

$(function() {
    'use strict';
    FastClick.attach(document.body);
    var audio = $('#sound').get(0);
    $('#sound').bind('timeupdate', function() {
        if (!window.manualSeek) $('.slider').slider("value", audio.currentTime);

    });

});

$(function() {
    'use strict';
    var audio = $('#sound').get(0);
    var $slider = $('.slider'),
        minValue = 0,
        maxValue = 232;

    function formatTime (value) {
        var mins = Math.floor( value / 60 ),
            secs = Math.floor( value - mins*60 );
        return mins + ':' + (secs < 10 ? '0'+secs : secs);
    }

    $slider.slider({
        orientation: 'horizontal',
        animate: true,
        range: 'min',
        min: minValue,
        max: maxValue,
        value: minValue,

        create: function (event) {
            $('.value.min', $slider).text(formatTime(minValue));
            $('.value.max', $slider).text(formatTime(maxValue));
        },

        slide: function (event, ui) {
            window.manualSeek = true;
            var hidePercent = ui.value / maxValue,
                $current = $('.value.current', $slider);
            if (hidePercent < 0.06 || hidePercent > 0.94) {
                $current.fadeOut();
            } else {
                $current.text(formatTime(ui.value))
                        .css('left', $(ui.handle).css('left'))
                        .fadeIn();
            }
        },
        change: function (event, ui) {
            var hidePercent = ui.value / maxValue,
            $current = $('.value.current', $slider);
            if (hidePercent < 0.06 || hidePercent > 0.94) {
                $current.fadeOut();
            } else {
                $current.text(formatTime(ui.value))
                .css('left', $(ui.handle).css('left'))
                .fadeIn();
            }
        },
        stop:function(e,ui) {
            window.manualSeek = false;
            audio.currentTime = ui.value;
        }
    });
});

function soundIsStopped()
{
    $('.play-pause').toggleClass('active');
    $('.slider').slider("value", 0);
    isPlaying = 0;
}

$('.button.audio').on('click', function () {
    'use strict';
    $(this).toggleClass('active');
    $('.player').fadeToggle();
});

$('.button.plan').on('click', function () {
    'use strict';
    window.open('open://model3d.html/temples_list');
});

$('.button.contents').on('click', function () {
    'use strict';
    window.open('open://model3d.html/contents');
});

$('.button.back').on('click', function () {
    window.open('back://model3d.html/dummy');
});

$('.play-pause').on('click', function () {
    'use strict';
    $(this).toggleClass('active');
    if (window.isPlaying)
    {
        var s = document.getElementById('sound');
        s.pause();
        window.isPlaying = 0;
    }
    else
    {
        var s = document.getElementById('sound');
        s.play();
        window.isPlaying = 1;
    }
});

threeSixty = {
    init: function() {
        this._vr = new AC.VR('viewer', 'images/3d/Pokrov_3d0###.jpg', 241, {
            invert: true,
            spinnable: false
        });
    },
    didShow: function() {
        this.init();
    },
    willHide: function() {
        recycleObjectValueForKey(this, '_vr');
    },
    shouldCache: function() {
        return false;
    }
};
if (!window.isLoaded) {
    window.addEventListener('load', function() {
        threeSixty.init();
    }, false);
}
document.observe('dom:loaded', function() {
    if(AC.Detector.isiPad()) {
        _$('viewer').addClassName('isipad');
    }
});
