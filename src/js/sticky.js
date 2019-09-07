// Фиксированная корзина при прокрутке
$(document).ready(function(){
  var stickyBlock = $('#basketList'); //Блок списка с корзиной товаров
  var topWin = stickyBlock.offset().top; //Расстояние от топа страницы до блока
  $(window).scroll(function(){
    var positionWin = $(window).scrollTop();
    if(positionWin < topWin) {
      stickyBlock.css('position', 'absolute');
    } else {
      stickyBlock.css('position', 'fixed');
      stickyBlock.css('top', 0);
    }
  });
});