/* === VELORA CART MODULE === */

const CART_KEY = 'velora_cart';

/* Load cart from localStorage */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch { return []; }
}

/* Save cart to localStorage */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

/* Add item to cart or increment quantity */
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.price, quantity: 1, imageUrl: item.imageUrl });
  }
  saveCart(cart);
}

/* Remove item from cart by ID */
function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
}

/* Update quantity of a cart item */
function updateQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity < 1) {
    removeFromCart(id);
    return;
  }
  saveCart(cart);
}

/* Get total item count in cart */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/* Get cart subtotal */
function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/* Update cart badge in navbar */
function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count === 0 ? 'none' : 'flex';
    badge.classList.add('bounce');
    setTimeout(() => badge.classList.remove('bounce'), 600);
  });
}

/* Render full cart page items */
function renderCartPage() {
  const container = document.getElementById('cart-items');
  const emptyState = document.getElementById('cart-empty');
  const cartContent = document.getElementById('cart-content');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (cartContent) cartContent.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (cartContent) cartContent.style.display = 'grid';

  container.innerHTML = cart.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item__image">
        <img src="${item.imageUrl}" alt="${item.name}">
      </div>
      <div class="cart-item__info">
        <h3 class="cart-item__name">${item.name}</h3>
        <p class="cart-item__price">$${item.price.toFixed(2)} each</p>
      </div>
      <div class="cart-item__qty">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-val">${item.quantity}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <div class="cart-item__subtotal">$${(item.price * item.quantity).toFixed(2)}</div>
      <button class="cart-item__remove" onclick="deleteItem(${item.id})" aria-label="Remove ${item.name}">✕</button>
    </div>
  `).join('');

  updateCartTotals();
}

/* Change item quantity from cart page */
function changeQty(id, delta) {
  updateQuantity(id, delta);
  renderCartPage();
}

/* Delete item from cart page */
function deleteItem(id) {
  const el = document.getElementById(`cart-item-${id}`);
  if (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'all 0.25s ease';
    setTimeout(() => {
      removeFromCart(id);
      renderCartPage();
    }, 260);
  }
}

/* Update totals display */
function updateCartTotals() {
  const subtotal = getCartSubtotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('cart-subtotal', `$${subtotal.toFixed(2)}`);
  setEl('cart-tax', `$${tax.toFixed(2)}`);
  setEl('cart-total', `$${total.toFixed(2)}`);
}

/* Clear entire cart */
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

/* Initialize badge on every page load */
document.addEventListener('DOMContentLoaded', updateCartBadge);
