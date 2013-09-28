$(function() {
  'use strict';
  FastClick.attach(document.body);
  });

$(function () {
  'use strict';
  var $pageLevel1 = $('.page.level1'),
  $pageLevel2 = $('.page.level2'),
  
  $pageLevel1Plan = $('.list', $pageLevel1),
  $pageLevel2Plan = $('.list', $pageLevel2),
  
  $pageLevel1List = $('ul', $pageLevel1),
  $pageLevel2List = $('ul', $pageLevel2),
  
  $pageLevel1ListEntries = $pageLevel1List.children(),
  $pageLevel2ListEntries = $pageLevel2List.children();
  
  function updateView ($plan, $listEntries, target) {
  $plan.hide();
  $listEntries.removeClass('active');
  $plan.filter('.' + target.className).show();
  $(target).addClass('active');
  }
  
  $pageLevel1List.on('click', function (event) {
                     updateView($pageLevel1Plan, $pageLevel1ListEntries, event.target);
                     });
  
  $pageLevel2List.on('click', function (event) {
                     updateView($pageLevel2Plan, $pageLevel2ListEntries, event.target);
                     });
  });

$('.button.model').on('click', function () {
    window.open('open://temples_list.html/model3d');
});

$('.button.contents').on('click', function () {
    window.open('open://temples_list.html/contents');
});

$('.arrow.down').on('click', function () {
    window.open('scroll://temples_list.html/down');
});

$('.arrow.up').on('click', function () {
    window.open('scroll://temples_list.html/up');
});

$('.button.back').on('click', function () {
    window.open('back://temples_list.html/dummy');
});

$('.info').on('click', function (event) {
    'use strict';
    alert('Переход на страницу церкви: ' + $(event.target).data('destination'));
});

$('.panorama').on('click', function (event) {
    window.open('pan://temples_list.html/' + $(event.target).data('destination'));
});
