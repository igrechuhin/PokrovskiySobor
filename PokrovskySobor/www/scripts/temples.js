var isPlaying = 0, manualSeek = false;

$(function() {
    'use strict';
    FastClick.attach(document.body);
  var audio = $('#sound').get(0);
  $('#sound').bind('timeupdate', function() {
                   if (!window.manualSeek) $('#general .slider').slider("value", audio.currentTime);
                   
                   });
  var audio2 = $('#sound2').get(0);
  $('#sound2').bind('timeupdate', function() {
                   if (!window.manualSeek) $('#specific .slider').slider("value", audio2.currentTime);
                   
                   });
});

function formatTime (value) {
    var mins = Math.floor( value / 60 ),
    secs = Math.floor( value - mins*60 );
    return mins + ':' + (secs < 10 ? '0'+secs : secs);
}

$(function() {
    'use strict';
  var audio = $('#sound').get(0);
    var $generalSlider = $('#general .slider'),
  minValue = 0, maxValue;
  
  maxValue = $('#general').data('duration');

    $generalSlider.slider({
                    orientation: 'horizontal',
                    animate: true,
                    range: 'min',
                    min: minValue,
                    max: maxValue,
                    value: minValue,
                          
                    create: function (event) {
                          $('.value.min', $generalSlider).text(formatTime(minValue));
                          $('.value.max', $generalSlider).text(formatTime(maxValue));
                    },
                          
                    slide: function (event, ui) {
                          window.manualSeek = true;
                          var hidePercent = ui.value / maxValue,
                          $current = $('.value.current', $generalSlider);
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
                          $current = $('.value.current', $generalSlider);
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
    $('#general .play-pause').removeClass('active');
    $('#general .slider').slider("value", 0);
    window.isPlaying = 0;
}

function soundIsStopped2()
{
    $('#specific .play-pause').removeClass('active');
    $('#specific .slider').slider("value", 0);
    window.isPlaying = 0;
}

$('.panorama').on('click', function (event) {
    'use strict';
    window.open('pan://temples.html/' + $(event.target).data('destination'));
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

$('#images').on('click', function () {
    'use strict';
    window.open('photo://temples.html/' + event.target.className);
});

$(function () {
    'use strict';
    var isImageVisible = false,
        isPlanVisible = false,

        $pageHeader = $('.page-header'),
        $info = $('.info'),
        $image = $('#image'),
        $player = $('#specific.player'),
        $audioPlayer = $('#sound2').get(0);

    $('.button.back').on('click', function () {
        if (isImageVisible) {
            $image.fadeOut();
            $player.fadeOut();
            $pageHeader.html($pageHeader.data('info'));
            isImageVisible = false;
                         if (window.isPlaying)
                         {
                            $audioPlayer.pause();
                            $('#specific .play-pause').toggleClass('active');
                            window.isPlaying = 0;
                         }
            
            $('#specific .slider').slider('destroy');
            window.isPlaying = 0;
        } else if (isPlanVisible) {
            $info.fadeOut();
            $pageHeader.html($pageHeader.data('default'));
            isPlanVisible = false;
        } else {
            window.open('back://contents.html/dummy');
        }
    });

    $('#points').on('click', function () {
        if (window.isPlaying)
                    {
                    var audio = $('#sound').get(0);
                    audio.pause();
                    $('#general .play-pause').toggleClass('active');
                    window.isPlaying = 0;
                    }
        $info.fadeIn();
        $pageHeader.html($pageHeader.data('info'));
        isPlanVisible = true;
    });

    $('.audio').on('click', function (event) {
        window.isPlaying = 1;
        window.manualSeek = false;
        var $target = $(event.target);
        $image.removeClass().addClass($target.attr('id')).fadeIn();
        $player.fadeIn();
        $pageHeader.html($target.data('header'));
        isImageVisible = true;

                   $audioPlayer.setAttribute('src', $target.data('destination'));
                   $audioPlayer.load();
                   $audioPlayer.play();
        $('#specific .play-pause').addClass('active');
                   
        var audio = $audioPlayer;
        var $specificSlider = $('#specific .slider'),
            minValue = 0, maxValue;
                   
        var minValue = 0, maxValue = $target.data('duration');
                   
        $specificSlider.slider({
                    orientation: 'horizontal',
                    animate: true,
                    range: 'min',
                    min: minValue,
                    max: maxValue,
                    value: minValue,
                                          
                    create: function (event) {
                               $('.value.min', $specificSlider).text(formatTime(minValue));
                               $('.value.max', $specificSlider).text(formatTime(maxValue));
                    },
                               
                    slide: function (event, ui) {
                               window.manualSeek = true;
                               var hidePercent = ui.value / maxValue,
                               $current = $('.value.current', $specificSlider);
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
                               $current = $('.value.current', $specificSlider);
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

    $('#specific .play-pause', $info).on('click', function () {
        'use strict';
                                         $(this).toggleClass('active');
                                         if (window.isPlaying)
                                         {
                                         var s = document.getElementById('sound2');
                                         s.pause();
                                         window.isPlaying = 0;
                                         }
                                         else
                                         {
                                         var s = document.getElementById('sound2');
                                         s.play();
                                         window.isPlaying = 1;
                                         }
    });
});

