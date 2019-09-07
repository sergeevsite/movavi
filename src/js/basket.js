var basket = {}; // Корзина

$(document).ready(function() {
  loadBasket(); // Визуализация корзины
  loadCheck(); // Вывод alert после оформления
});

function loadBasket() {
  $.getJSON('./js/item.json', function(data){ // Получение товаров из item.json
    checkBasket(); // Проверка корзины в localStorage
    basketShow(); // Вывод товаров
    basketTotal(); // Вывод общей суммы товаров

    // Вывод товаров
    function basketShow() {
      if ($.isEmptyObject(basket)) {
        var basketClear = '<span class="basket-element__text">Корзина пустая</span>';
        $('#basket-roll').html(basketClear);
      }else{
        var basketList = '';
        for (var key in basket) {
          basketList += '<li class="basket-element"><img src="./img/list/close.png" alt="Удалить" class="basket-element__close delete_item" data-item="'+ key +'">';
          basketList += '<span class="basket-element__title">' + data[key].name + '</span>';
          basketList += '<span class="basket-element__price">' + basket[key] * data[key].price + ' руб.</span></li>';
        }
      $('#basket-roll').html(basketList);
      $('.delete_item').on('click', deleteItem);
      }
    }

    // Вывод общей суммы в корзине
    function basketTotal() {
      if ($.isEmptyObject(basket)) {
        var basketClear = '<span class="basket-result__text">Всего:</span><span class="basket-result__price">0 руб.</span>';
        $('#basket-result').html(basketClear);
      }else{
        var total = '';
        var totalSum = 0;
        for (var key in basket) {
          totalSum += basket[key] * data[key].price;
          total = '<span class="basket-result__text">Всего:</span>' + totalSum + ' руб.</span>';
        }
      $('#basket-result').html(total);
      }
    }
  });
}

// Проверка корзины в localStorage
function checkBasket() {
  if (localStorage.getItem('basket') != null) {
    basket = JSON.parse (localStorage.getItem('basket'));
  }
}

// Удаление товара из корзины
function deleteItem() {
  var item = $(this).attr('data-item');
  delete basket[item];

  // Вывод данных корзины в localStorage после удаления
  localStorage.setItem('basket', JSON.stringify(basket));
  loadBasket();
}

// Добавляем товары в корзину
$('.add_basket').on('click', addToBasket);

  function addToBasket() {
    var item = $(this).attr('data-item');
  
    if (basket[item]!=undefined) {
      basket[item];
    }else{
      basket[item] = 1;
    }
    
    // вывод данных корзины в localStorage после добавления
    localStorage.setItem('basket', JSON.stringify(basket));
    loadBasket();
  }
  
// Выводим alert по нажатию кнопки "Оформить заказ" 
function loadCheck() {
  $.getJSON('./js/item.json', function(data) {

    $('.checkout').on('click', checkout);
      function checkout() {
        if ($.isEmptyObject(basket)){
          alert('Корзина пустая')
        }else{
          var checkoutData = '';
          checkoutData += 'Вы добавили в корзину: \n';
          for (var key in basket) {
            checkoutData +='- ' + data[key].name + '\n';
          }
          checkoutData += ' на сумму: '; 
          var total = 0;
          for (var key in basket) {
            total += basket[key] * data[key].price;
          }
          checkoutData += total + ' руб.';
          confirm(checkoutData);
        }
      }
  });
}