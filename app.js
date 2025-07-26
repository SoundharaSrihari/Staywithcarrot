const naturalDrinks1 = [
  {
    id: 1,
    name: "Minto Milk",
    description: "Our signature refreshing Minto Milk, With Zero sugar and artificial flovours.",
    price: 2.99,
    image: "https://www.theculinarycompass.com/wp-content/uploads/2019/03/Baileys-Grasshopper-720-7-683x1024.jpg"
  },
  {
    id: 2,
    name: "The Panagam",
    description: "A tropical blend of Panagam, With Spicy notes and Natural flovours.",
    price: 4.49,
    image: "https://cdn.shopify.com/s/files/1/0687/6050/2545/files/ginger-slices-jagger.webp?v=1688973432"
  },
  {
    id: 3,
    name: "Orangy Vibes",
    description: "Fresh, Juicy Orange with more & more vibe.",
    price: 4.99,
    image: "https://ohmyfacts.com/wp-content/uploads/2024/06/45-facts-about-orange-juice-1717912542.jpeg"
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
    minusBtn.className = 'btn-minus'; 
    minusBtn.onclick = () => changeQuantity(item.id, -1);

    const qtyText = document.createElement('span');
    qtyText.textContent = item.quantity;

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.title = 'Increase quantity';
    plusBtn.className = 'btn-plus'; 
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
    removeBtn.className = 'btn-remove'; 
    removeBtn.onclick = () => removeFromCart(item.id);

    cartItem.appendChild(name);
    cartItem.appendChild(qtyControls);
    cartItem.appendChild(price);
    cartItem.appendChild(removeBtn);

    cartItemsContainer.appendChild(cartItem);
  });

  cartCount.textContent = items.reduce((acc, item) => acc + item.quantity, 0);
  cartTotal.textContent = formatPrice(total);
  cartTotalContainer.style.display = 'block';
  checkoutBtn.style.display = 'inline-block';
}

document.getElementById('checkout-btn').addEventListener('click', () => {
  const contactSection = document.getElementById('contact');
  const msg = document.getElementById('checkout-msg');

  msg.style.display = 'block';

  contactSection.scrollIntoView({ behavior: 'smooth' });
});

window.onload = () => {
  renderProducts();
  updateCartUI();
};

// Scroll to contact section on checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
  const contactSection = document.getElementById('contact');
  const msg = document.getElementById('checkout-msg');
  msg.style.display = 'block';
  contactSection.scrollIntoView({ behavior: 'smooth' });
});

// Attach cart data to form on submit
document.getElementById('contact-form').addEventListener('submit', function (e) {
  const cartItemsField = document.getElementById('cart_items');
  const cartTotalField = document.getElementById('cart_total');

  const items = Object.values(cart);
  const cartSummary = items.map(item => {
    return `${item.name} (Qty: ${item.quantity}, Rate: $${formatPrice(item.price)})`;
  }).join('\n');

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  cartItemsField.value = cartSummary || 'Cart was empty';
  cartTotalField.value = `$${formatPrice(total)}`;
});

