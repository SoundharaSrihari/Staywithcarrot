const naturalDrinks1 = [
  {
    id: 1,
    name: "Classic Lemonade",
    description: "Our signature refreshing lemonade, perfectly balanced with tart and sweet notes.",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Mango Tango Smoothie",
    description: "A tropical blend of fresh mango, banana, and a hint of lime.",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1594916301328-98e6e2f1b0a0?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Green Detox Juice",
    description: "Spinach, kale, apple, cucumber, and ginger for a refreshing cleanse and more & more fresh.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1606774435889-122e2b34c9c2?auto=format&fit=crop&w=400&q=80"
  }
];

const naturalDrinks2 = [
  {
    id: 101,
    name: "Berry Blast Smoothie",
    description: "A vibrant mix of strawberries, blueberries, raspberries, and a touch of honey.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 102,
    name: "Sparkling Mint Limeade",
    description: "Zesty limeade with fresh mint, topped with sparkling water for a fizz.",
    price: 3.49,
    image: "https://images.unsplash.com/photo-160677435889-122e2b34c9c2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 103,
    name: "Tropical Pineapple Punch",
    description: "A sweet and tangy punch made with fresh pineapple, orange, and coconut water.",
    price: 4.29,
    image: "https://images.unsplash.com/photo-1627962489813-bc75510f2c41?auto=format&fit=crop&w=400&q=80"
  }
];

const cart = {};

function formatPrice(price) {
  return price.toFixed(2);
}

function renderProducts() {
  const drinkContainer1 = document.getElementById('drink-list-1');
  const drinkContainer2 = document.getElementById('drink-list-2');

  naturalDrinks1.forEach(item => {
    const card = createProductCard(item);
    drinkContainer1.appendChild(card);
  });

  naturalDrinks2.forEach(item => {
    const card = createProductCard(item);
    drinkContainer2.appendChild(card);
  });
}

function createProductCard(item) {
  const card = document.createElement('div');
  card.className = 'product-card';

  const img = document.createElement('img');
  img.src = item.image;
  img.alt = item.name;

  const name = document.createElement('h3');
  name.textContent = item.name;

  const desc = document.createElement('p');
  desc.textContent = item.description;

  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = `$${formatPrice(item.price)}`;

  const button = document.createElement('button');
  button.textContent = 'Add to Cart';
  button.onclick = () => {
    addToCart(item);
    card.classList.add('added');
    setTimeout(() => card.classList.remove('added'), 300);
  };

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(desc);
  card.appendChild(price);
  card.appendChild(button);

  return card;
}

function addToCart(item) {
  if (cart[item.id]) {
    cart[item.id].quantity += 1;
  } else {
    cart[item.id] = { ...item, quantity: 1 };
  }
  updateCartUI();
}

function removeFromCart(itemId) {
  delete cart[itemId];
  updateCartUI();
}

function changeQuantity(itemId, delta) {
  if (cart[itemId]) {
    cart[itemId].quantity += delta;
    if (cart[itemId].quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartUI();
    }
  }
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotalContainer = document.getElementById('cart-total-container');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  cartItemsContainer.innerHTML = '';
  const items = Object.values(cart);

  if (items.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartCount.textContent = '0';
    cartTotalContainer.style.display = 'none';
    checkoutBtn.style.display = 'none';
    return;
  }
    let total = 0;
  items.forEach(item => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const name = document.createElement('span');
    name.className = 'cart-item-name';
    name.textContent = item.name;

    const qtyControls = document.createElement('span');
    qtyControls.className = 'cart-item-qty';

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '−';
    minusBtn.title = 'Decrease quantity';
    minusBtn.className = 'btn-minus'; // 👈 Unique class
    minusBtn.onclick = () => changeQuantity(item.id, -1);

    const qtyText = document.createElement('span');
    qtyText.textContent = item.quantity;

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.title = 'Increase quantity';
    plusBtn.className = 'btn-plus'; // 👈 Unique class
    plusBtn.onclick = () => changeQuantity(item.id, 1);

    qtyControls.appendChild(minusBtn);
    qtyControls.appendChild(qtyText);
    qtyControls.appendChild(plusBtn);

    const price = document.createElement('span');
    price.className = 'cart-item-price';
    price.textContent = `$${formatPrice(item.price * item.quantity)}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.title = 'Remove item';
    removeBtn.className = 'btn-remove'; // 👈 Unique class
    removeBtn.onclick = () => removeFromCart(item.id);

    cartItem.appendChild(name);
    cartItem.appendChild(qtyControls);
    cartItem.appendChild(price);
    cartItem.appendChild(removeBtn);

    cartItemsContainer.appendChild(cartItem);
  });

  // let total = 0;
  // items.forEach(item => {
  //   total += item.price * item.quantity;

  //   const cartItem = document.createElement('div');
  //   cartItem.className = 'cart-item';

  //   const name = document.createElement('span');
  //   name.className = 'cart-item-name';
  //   name.textContent = item.name;

  //   const qtyControls = document.createElement('span');
  //   qtyControls.className = 'cart-item-qty';

  //   const minusBtn = document.createElement('button');
  //   minusBtn.textContent = '−';
  //   minusBtn.title = 'Decrease quantity';
  //   minusBtn.onclick = () => changeQuantity(item.id, -1);

  //   const qtyText = document.createElement('span');
  //   qtyText.textContent = item.quantity;

  //   const plusBtn = document.createElement('button');
  //   plusBtn.textContent = '+';
  //   plusBtn.title = 'Increase quantity';
  //   plusBtn.onclick = () => changeQuantity(item.id, 1);

  //   qtyControls.appendChild(minusBtn);
  //   qtyControls.appendChild(qtyText);
  //   qtyControls.appendChild(plusBtn);

  //   const price = document.createElement('span');
  //   price.className = 'cart-item-price';
  //   price.textContent = `$${formatPrice(item.price * item.quantity)}`;

  //   const removeBtn = document.createElement('button');
  //   removeBtn.textContent = '×';
  //   removeBtn.title = 'Remove item';
  //   removeBtn.onclick = () => removeFromCart(item.id);

  //   cartItem.appendChild(name);
  //   cartItem.appendChild(qtyControls);
  //   cartItem.appendChild(price);
  //   cartItem.appendChild(removeBtn);

  //   cartItemsContainer.appendChild(cartItem);
  // });

  cartCount.textContent = items.reduce((acc, item) => acc + item.quantity, 0);
  cartTotal.textContent = formatPrice(total);
  cartTotalContainer.style.display = 'block';
  checkoutBtn.style.display = 'inline-block';
}

document.getElementById('checkout-btn').addEventListener('click', () => {
  alert('Thank you for your purchase! This is a demo checkout.');
  Object.keys(cart).forEach(key => delete cart[key]);
  updateCartUI();
});

window.onload = () => {
  renderProducts();
  updateCartUI();
};
