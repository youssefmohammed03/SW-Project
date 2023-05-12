class cartitem {
  constructor(name, img, price) {
    this.name = name;
    this.img = img;
    this.price = price;
    this.quantity = 1;
  }
}

class localcart {
  static key = 'cartItems';

  static getlocalcartitems() {
    let cartmap = new Map();
    const cart = localStorage.getItem(localcart.key);
    if (cart === null || cart.length === 0) return cartmap;
    return new Map(Object.entries(JSON.parse(cart)));
  }

  static additemtolocalcart(id, item) {
    let cart = localcart.getlocalcartitems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      mapItem.quantity += 1;
      cart.set(id, mapItem);
    } else cart.set(id, item);
    localStorage.setItem(localcart.key, JSON.stringify(Object.fromEntries(cart)));
    updatecartUI();
    generateCartList();
  }

  static removeitemfromcart(id) {
    let cart = localcart.getlocalcartitems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      if (mapItem.quantity > 1) {
        mapItem.quantity -= 1;
        cart.set(id, mapItem);
      } else {
        cart.delete(id);
      }
    }
    if (cart.length === 0) {
      localStorage.clear();
    } else {
      localStorage.setItem(localcart.key, JSON.stringify(Object.fromEntries(cart)));
    }
    updatecartUI();
    generateCartList();
  }
}

const carticon = document.querySelector('.fa-cart-shopping');
const cartbox = document.querySelector('.cart-box');
cartbox.inwindow = 0;
const addtocartbtns = document.querySelectorAll('.add_to_cart');
addtocartbtns.forEach((btn) => {
  btn.addEventListener('click', additemfunction);
});

function additemfunction(e) {
  const id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
  const img = e.target.parentElement.parentElement.previousElementSibling.src;
  const name = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
  const price = e.target.parentElement.previousElementSibling.children[0].textContent;
  const item = new cartitem(name, img, price);
  localcart.additemtolocalcart(id, item);
  console.log(price);
}

carticon.addEventListener('mouseover', () => {
  if (cartbox.classList.contains('hide')) cartbox.classList.remove('hide');
});

carticon.addEventListener('mouseleave', () => {
  setTimeout(() => {
    if (cartbox.inwindow === 0) cartbox.classList.add('hide');
  }, 500);
});

cartbox.addEventListener('mouseover', () => {
  cartbox.inwindow = 1;
});

cartbox.addEventListener('mouseleave', () => {
  cartbox.inwindow = 0;
  cartbox.classList.add('hide');
});

function updatecartUI() {
  const cartWrapper = document.querySelector('.cart-wrapper');
  cartWrapper.innerHTML = '';
  const items = localcart.getlocalcartitems('cartItems');
  if (items === null) return;
  let count = 0;
  let total = 0;

  for (const [key, value] of items.entries()) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    let price = parseFloat(value.price) * value.quantity;
    price = Math.round(price * 100) / 100;
    count += 1;
    total += price;
    total = Math.round(total * 100) / 100;
    cartItem.innerHTML = `
      <img src="${value.img}">
      <div class="details">
        <h3>${value.name}</h3>
        <p>
          <span class="quantity">${value.quantity}</span>
          <span class="price-tag">Price: ${value.price}</span>
        </p>
      </div>
      <button class="cancel-button"><i class="fa-solid fa-xmark fa-2xl"></i></button>
    `;
    cartItem.lastElementChild.addEventListener('click', () => {
      localcart.removeitemfromcart(key);
    });
    cartWrapper.append(cartItem);
  }
  if (count > 0) {
    carticon.classList.add('non-empty');
    let root = document.querySelector(':root');
    root.style.setProperty('--after-content', `"${count}"`);
    const subtotal = document.querySelector('.subtotal');
    subtotal.innerHTML = `Subtotal:${total}`;
  } else {
    carticon.classList.remove('non-empty');
    const subtotal = document.querySelector('.subtotal');
    subtotal.innerHTML = `Subtotal:0`;
    total = 0;
  }
  generateCartList();
}

function generateCartList() {
  const cartList = document.querySelector('.cart-list');
  const items = localcart.getlocalcartitems('cartItems');

  cartList.innerHTML = '';

  if (items === null) return;

  for (const [key, value] of items.entries()) {
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');
    let price = parseFloat(value.price) * value.quantity;
    price = Math.round(price * 100) / 100;
    cartItem.innerHTML = `
      <img src="${value.img}">
      <div class="details">
        <h3>${value.name}</h3>
        <p>
          <span class="quantity">${value.quantity}</span>
          <span class="price-tag">Price: ${value.price}</span>
        </p>
      </div>
      <button class="cancel-button"><i class="fa-solid fa-xmark fa-2xl"></i></button>
    `;

    cartItem.lastElementChild.addEventListener('click', () => {
      localcart.removeitemfromcart(key);
      cartList.removeChild(cartItem);
    });

    cartList.appendChild(cartItem);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updatecartUI();
  generateCartList();
});

const saveOrderBtn = document.getElementById('save-order-btn');
saveOrderBtn.addEventListener('click', saveOrder);

function saveOrder() {
  const items = localcart.getlocalcartitems('cartItems');
  const itemIds = [];

  for (const [key, value] of items.entries()) {
    itemIds.push(key);
  }

  fetch('/save_order/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
    },
    body: JSON.stringify({item_ids: itemIds})
  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/ordersaved/';
    } else if (response.status === 400) {
      throw new Error('Invalid request');
    } else if (response.status === 401) {
      throw new Error('Unauthorized');
    } else if (response.status === 403) {
      throw new Error('Forbidden');
    } else if (response.status === 404) {
      throw new Error('Resource not found');
    } else {
      throw new Error('Unknown error');
    }
  })
  .catch(error => {
    console.error(error);
    alert(`Failed to save order: ${error.message}`);
  });
}