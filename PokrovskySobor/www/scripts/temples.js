var isPlaying = false, manualSeek = false;

$(function () {
  'use strict';
  FastClick.attach(document.body);
});

function formatTime (value) {
  var mins = Math.floor( value / 60 ),
  secs = Math.floor( value - mins*60 );
  return mins + ':' + (secs < 10 ? '0'+secs : secs);
}

function onChange (ui, maxValue, $slider) {
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

$(function () {
  'use strict';
  var $generalSlider = $('#general .slider'),
      $sound = $('#sound'),
      audio = $sound.get(0),

      minValue = 0,
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
      onChange(ui, maxValue, $generalSlider);
    },
    change: function (event, ui) {
      onChange(ui, maxValue, $generalSlider);
    },
    stop: function (event, ui) {
      window.manualSeek = false;
      audio.currentTime = ui.value;
    }
  });

  $sound.bind('timeupdate', function () {
    if (!window.manualSeek) $generalSlider.slider("value", audio.currentTime);
  });
});

function soundIsStopped() {
  $('#general .play-pause').removeClass('active');
  $('#general .slider').slider("value", 0);
  window.isPlaying = false;
}

function soundIsStopped2() {
  $('#specific .play-pause').removeClass('active');
  $('#specific .slider').slider("value", 0);
  window.isPlaying = false;
}

$('.panorama').on('click', function (event) {
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
  var s = document.getElementById('sound');

  $(this).toggleClass('active');
  if (window.isPlaying) {
    s.pause();
    window.isPlaying = false;
  } else {
    s.play();
    window.isPlaying = true;
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

      $mainContent = $('#images,#points,#general,.text'),

      $pageHeader = $('.page-header'),
      $info = $('.info'),
      $background = $('.background', $info),
      $image = $('#image', $info),
      $player = $('#specific.player'),
      $specificSlider = $('#specific .slider'),

      $sound2 = $('#sound2'),
      audio2 = $sound2.get(0);

  $('.button.back').on('click', function () {
    if (isImageVisible) {
      $background.fadeIn();
      $image.fadeOut();
      $player.fadeOut();
      $pageHeader.html($pageHeader.data('info'));
      isImageVisible = false;
      if (window.isPlaying) {
        audio2.pause();
        $('#specific .play-pause').toggleClass('active');
      }
      $sound2.unbind('timeupdate');
      $specificSlider.slider('destroy');
      window.isPlaying = false;
    } else if (isPlanVisible) {
     $mainContent.fadeIn();
      $info.fadeOut();
      $pageHeader.html($pageHeader.data('default'));
      isPlanVisible = false;
    } else {
      window.open('back://contents.html/dummy');
    }
  });

  $('#points').on('click', function () {
    if (window.isPlaying) {
      var audio = $('#sound').get(0);
      audio.pause();
      $('#general .play-pause').toggleClass('active');
      window.isPlaying = false;
    }
    $mainContent.fadeOut();
    $info.fadeIn();
    $pageHeader.html($pageHeader.data('info'));
    isPlanVisible = true;
  });

  $('.audio').on('click', function (event) {
    window.isPlaying = true;
    window.manualSeek = false;
    var $target = $(event.target);
    $background.fadeOut();
    $image.removeClass().addClass($target.attr('id')).fadeIn();
    $player.fadeIn();
    $pageHeader.html($target.data('header'));
    isImageVisible = true;

    audio2.setAttribute('src', $target.data('destination'));
    audio2.load();
    audio2.play();
    $('#specific .play-pause').addClass('active');

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
        onChange(ui, maxValue, $specificSlider);
      },
      change: function (event, ui) {
        onChange(ui, maxValue, $specificSlider);
      },
      stop: function (event, ui) {
        window.manualSeek = false;
        audio2.currentTime = ui.value;
      }
    });

    $sound2.bind('timeupdate', function () {
      if (!window.manualSeek) $specificSlider.slider("value", audio2.currentTime);
    });
  });

  $('#specific .play-pause', $info).on('click', function () {
    var s = document.getElementById('sound2');
    $(this).toggleClass('active');
    if (window.isPlaying) {
      s.pause();
      window.isPlaying = false;
    } else {
      s.play();
      window.isPlaying = true;
    }
  });
});

