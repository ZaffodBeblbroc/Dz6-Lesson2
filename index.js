fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    console.log(data.products);
    // Start here :)

    for (let i = 0; i < data.products.length; i++) {
      const element = document.querySelector('.wrapper');
      element.insertAdjacentHTML(
        'beforeend',
        `<div class='item'>
        <div class='img'><img class='img-full' src="${data.products[i].images[0]}" alt="no"></div>
        <h2 class='item-title'>${data.products[i].title}</h2>
        <p class='item-description'>${data.products[i].description}</p>
        <div class='item-container'>
          <p class='item-price'>Price: ${data.products[i].price} $</p>
          <p class='item-rating'>Rating: ${data.products[i].rating}</p>
          <button class='item-button'}'>Add to cart</button>
        </div>
      </div>`,
      );
    }

    // Массив кнопок покупки 'Add to cart'
    arrayItemButtonCart = document.querySelectorAll(`.item-button`);
   
    for (let i = 0; i < data.products.length; i++) {
      arrayItemButtonCart[i].addEventListener('click', nameItem);
      arrayItemButtonCart[i].addEventListener('click', getBasket); 
      arrayItemButtonCart[i].addEventListener('click', addClick);  
      arrayItemButtonCart[i].addEventListener('click', sum);     
    }

    let price = 0;
    let img = '';
    let titleText = '';
    const titleArr = [];
    
    //  Bозвращает стоимость и название товара по клику
    function nameItem(event){
      // Название товара
      const item = event.target.parentElement.parentElement;
      titleText = item.querySelector('.item-title').textContent;
      
      // стоимость товара
      for (let i = 0; i < data.products.length; i++) {
        if(data.products[i].title === titleText){
          price = data.products[i].price;
          img = data.products[i].images[0];
          console.log(img)
        }
      }
    }

    function getBasket () {
      // Корзина
      const modalList = document.querySelector('.modal-list');

      // Мини картинка товара в корзине
      const modalListElementImg = document.createElement('img');
      modalListElementImg.classList.add('modal-list-img');
      modalListElementImg.src = `${img}`;

      // Название товара в корзине
      const modalListTitle = document.createElement('h3');
      modalListTitle.classList.add('modal-list-title');
      modalListTitle.textContent = titleText;
      
      const buttonMinus = document.createElement('button');
      buttonMinus.classList.add('button-minus')
      buttonMinus.textContent = '-';
      buttonMinus.addEventListener('click', counterMinus);

      const counterValue = document.createElement('input');
      counterValue.classList.add('counter-value');
      counterValue.setAttribute('type', 'text');
      counterValue.setAttribute('value', 0);
      
      const counterPrice = document.createElement('div');
      counterPrice.classList.add('counter-price')
      counterPrice.textContent = `x ${price}`;
  
      const buttonPlus = document.createElement('button');
      buttonPlus.classList.add('button-plus');
      buttonPlus.textContent = '+';
      buttonPlus.addEventListener('click', counterPlus);

      const modalListCounter = document.createElement('div');
      modalListCounter.classList.add('modal-list-counter');
      modalListCounter.append(
        buttonMinus,
        counterValue,
        counterPrice,
        buttonPlus
      )

      // Кнопка удаления в корзине
      const buttonDelete = document.createElement('button');
      buttonDelete.classList.add('button-delete');
      buttonDelete.textContent = 'Remove from order';
      buttonDelete.addEventListener('click', deleteElement);

      // Счетчик
      function counterPlus (event) {
        let counter = parseInt(event.target.closest('div').querySelector('.counter-value').value);
        counter++;
        event.target.closest('div').querySelector('.counter-value').value = counter;
        sum();
      }

      function counterMinus (event) {
        let counter = parseInt(event.target.closest('div').querySelector('.counter-value').value);
        if (counter > 1){
          --counter;
        event.target.closest('div').querySelector('.counter-value').value = counter;
        sum();
        }
      }

      // Строка с товаром в корзине
      const modalListElement = document.createElement('li');
      modalListElement.classList.add('modal-list-element');
      modalListElement.append( 
        modalListElementImg,
        modalListTitle,
        modalListCounter,
        buttonDelete
      );

      if (!titleArr.includes(titleText)) {
        titleArr.push(titleText);
        modalList.append(modalListElement);
      } 
    }

    // Функция удаления товара из корзины
    function deleteElement(event) {
      const deleteElem = event.target.parentElement;
      const title = deleteElem.querySelector('.modal-list-title').textContent;
      const indexArr = titleArr.indexOf(title);
      titleArr.splice(indexArr, 1)
      deleteElem.remove()
      sum();
    } 

    // Добавление товара в корзину мк2
    function addClick() {
      let titleClick = this.parentElement.parentElement.querySelector('.item-title').textContent;
      let array = document.querySelectorAll('.modal-list-element');
     
      array.forEach(function(elem){
        let title = elem.querySelector('.modal-list-title').textContent;
        if (title === titleClick) {
          let num = elem.querySelector('.counter-value').value;
          num++;
          elem.querySelector('.counter-value').value = num;
        }
      });
    }
  });

// Сумма покупок
function sum(){
  let array = document.querySelectorAll('.modal-list-counter');
  let sum = 0;
  array.forEach(function(elem){
    let value = Number(elem.querySelector('.counter-value').value);
    let price = Number(elem.querySelector('.counter-price').textContent.slice(2));
    sum += value * price;
  });
  const sumTotal = document.querySelector('.total span');
  sumTotal.textContent = `${sum}$`;
  const sumCart = document.querySelector('.button-cart span');
  sumCart.textContent = `${sum}.00$`;
}

// Поиск
document.querySelector('.text-search').oninput = function() {
  let val = this.value.toLowerCase().trim();
  let array = document.querySelectorAll('.wrapper .item .item-title');

  if (val !== '') {
    array.forEach(function(elem){
       if (elem.innerText.toLowerCase().search(val) === -1) {
        elem.parentElement.classList.add('hide');
       } else {
        elem.parentElement.classList.remove('hide');
       }
    });
  } else {
    array.forEach(function(elem) {
      elem.parentElement.classList.remove('hide');
   });
  }
}

// Корзина
// Кнопка открывает модальное окно
const openModal = document.querySelector('.button-cart');

// Модальное окно
const modal = document.querySelector('.modal');

// Кнопка закрытия окна
const closeModal = document.querySelector('.close')

openModal.addEventListener('click',  modalEventOpenClose);
closeModal.addEventListener('click', modalEventOpenClose);

// Функция открытия и закрытия модального окна
function modalEventOpenClose(event) {
  event.preventDefault();
  modal.classList.toggle('open');
}