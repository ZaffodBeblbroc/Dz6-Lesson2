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
        <p class='item-price'>Price: ${data.products[i].price} $</p>
        <p class='item-rating'>Rating: ${data.products[i].rating}</p>
        <button class='item-button'}'>Add to cart</button>
      </div>`,
      );
      
    }

    // Массив кнопок покупки 'Add to cart'
    arrayItemButtonCart = document.querySelectorAll(`.item-button`);
   
    for (let i = 0; i < data.products.length; i++) {
      arrayItemButtonCart[i].addEventListener('click', nameItem);
    }

//  Выведение суммы покупок 
    const buttonCart = document.querySelector('.button-cart');
    const total = document.querySelector('.total');
    const modalList = document.querySelector('.modal-list');
    
    const buttonPrice = document.createElement('span');
    buttonPrice.textContent = ` - 00.00 $`;
    buttonCart.append(buttonPrice);

    const totalPrice = document.createElement('span');
    totalPrice.textContent = ` 00.00 $`;
    total.append(totalPrice);

    const arrayPrice = [0];
    let sum = 0;

    
   
    //  Bозвращает стоимость товара
    function nameItem(event){
      // Название товара
      const item = event.target.parentElement;
      const itemTitle = item.querySelector('.item-title');
      const titleText = itemTitle.textContent;
      
      for (let i = 0; i < data.products.length; i++) {
        if(data.products[i].title === titleText){
          arrayPrice.push(data.products[i].price);
        }
      } 


      // Короткий вариант
      // modalList.insertAdjacentHTML(
      //   'beforeend',
      //   `<li class='modal-list-element'>
      //   <div class='modal-list-img'>Фото</div>
      //   <h3 class='modal-list-title'>Tovar</h3>
      
      //   <button class='button-delete'}'>Del</button>
      // </li>`,
      // );
      
      // Мини картинка товара в корзине
      const modalListElementImg = document.createElement('div');
      modalListElementImg.classList.add('modal-list-img');
      modalListElementImg.textContent = 'Фото';

      const modalListTitle = document.createElement('h3');
      modalListTitle.classList.add('modal-list-title')
      modalListTitle.textContent = 'Tovar';

      // Кнопка удаления в корзине
      const buttonDelete = document.createElement('button');
      buttonDelete.classList.add('button-delete');
      buttonDelete.textContent = 'Remove from order';
      
      // Строка с товары в корзине
      const modalListElement = document.createElement('li');
      modalListElement.classList.add('modal-list-element');
      modalListElement.append( modalListElementImg, titleText, buttonDelete);

      
      modalList.append(modalListElement)


      
      // Сложение масива 
      sum = arrayPrice.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      });
      buttonPrice.textContent = ` - ${sum}.00$`;
      buttonCart.append(buttonPrice);

      totalPrice.textContent = ` ${sum}.00$`;
      total.append(totalPrice);
      console.log(sum);
    } 
     
    
  
    

     
       
   
  
 

  
    // const item = document.createElement('div');
    // const img = document.createElement('div')
    // const imgFull = document.createElement('img');
    // const itemTitle = document.createElement('h2');
    // const itemDescription = document.createElement('p');
    // const itemPrice = document.createElement('p');
    // const itemRating = document.createElement('p');
    // const itemButton = document.createElement('button');

    // // Создаем див с классом Item
    // item.classList.add('item');

    // // Оболочка картинки
    // img.classList.add('img');
    
    // // Картинка 
    // imgFull.classList.add('img-full');

    // // Тайтл 
    // itemTitle.classList.add('item-title');
    // itemTitle.textContent = data.products[0].title;

    // // Описание товара
    // itemDescription.classList.add('item-description');
    // itemDescription.textContent = data.products[0].description;

    // // Цена
    // itemPrice.classList.add('item-price');
    // itemPrice.textContent = data.products[0].price;    

    // // Рейтинг
    // itemRating.classList.add('item-rating');
    // itemRating.textContent = data.products[0].rating;   

    // // Кнопка покупки
    // itemButton.classList.add('item-button');
    // itemButton.textContent = 'Add to cart';
    
    // function createItem(elem) {
    //   const element = document.querySelector('.wrapper');
    //   element.append(item);
    //   item.append(img, itemTitle, itemDescription, itemPrice, itemRating, itemButton);
    //   img.append(imgFull);
    // }
    // createItem();

  });

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


