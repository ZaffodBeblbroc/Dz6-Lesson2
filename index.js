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
        <button class='item-button' id = 'itemId${data.products[i].id}'>Add to cart</button>
      </div>`,
      );
    }

    // Массив кнопок 
   
  

   
    arrayButtonCart = document.querySelectorAll(`.item-button`);
    console.log(arrayButtonCart);

    // arrayButtonCart[1].addEventListener('click', textId);
    
    // function textId() {
    //   const price = data.products[1].price;
    //   console.log(price);
    // }
    
    arrayButtonCart[addEventListener('click', idnum)];

    function idnum(event) {
      const qwe = event.target.parentElement;
      const asd = qwe.querySelector('.item-price')

      let w = asd.textContent.slice(7, -2);
      w = Number(w);  
      arrQ.push(w); 
      console.log(arrQ);
      qa = arrQ.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
      });
    
      console.log(qa);
      // console.log(asd.innerText.replace);
    }

    let arrQ = []; 
    let qa = 0;


  
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

// Функция открытия модального окна
function modalEventOpenClose(event) {
  event.preventDefault();
  modal.classList.toggle('open');
}

// Функция закрытия модального окна
// function modalEventClose(){
//   modal.classList.toggle('open');
// }


// Кнопка добавление товара в корзину



  // qwerty.addEventListener('click', qwe);

  // function qwe() {
  //   console.log('hello');
  // };

