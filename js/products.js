/* === VELORA PRODUCTS MODULE === */

/* Product data array */
const PRODUCTS = [
  {
    id: 1,
    name: "Artisan Leather Tote",
    category: "Bags",
    price: 5499.00,
    originalPrice: 7499.00,
    badge: "Sale",
    description: "Hand-stitched full-grain leather tote with brass hardware. Spacious interior with zipper pocket. Perfect for work or weekend.",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviews: 142,
    inStock: true
  },
  {
    id: 2,
    name: "Merino Wool Scarf",
    category: "Accessories",
    price: 1499.00,
    originalPrice: null,
    badge: null,
    description: "Ultra-soft 100% merino wool scarf in a timeless herringbone weave. Naturally temperature-regulating.",
    imageUrl: "https://images.unsplash.com/photo-1601370552761-0c09e8e9a4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviews: 89,
    inStock: true
  },
  {
    id: 3,
    name: "Ceramic Pour-Over Set",
    category: "Home",
    price: 2199.00,
    originalPrice: null,
    badge: "New",
    description: "Hand-thrown ceramic dripper and server in matte forest green glaze. Each piece is slightly unique.",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews: 211,
    inStock: true
  },
  {
    id: 4,
    name: "Canvas Weekend Bag",
    category: "Bags",
    price: 4299.00,
    originalPrice: null,
    badge: null,
    description: "Waxed cotton canvas duffle with full-grain leather handles and solid brass zippers. Ready for adventure.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviews: 76,
    inStock: true
  },
  {
    id: 5,
    name: "Soy Wax Candle — Cedar",
    category: "Home",
    price: 799.00,
    originalPrice: null,
    badge: null,
    description: "Hand-poured soy wax candle with essential oils of cedar, sandalwood and bergamot. 60+ hour burn time.",
    imageUrl: "https://images.unsplash.com/photo-1603905756565-7047b1a8c08a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    reviews: 178,
    inStock: true
  },
  {
    id: 6,
    name: "Linen Shirt — Sage",
    category: "Clothing",
    price: 2499.00,
    originalPrice: 3299.00,
    badge: "Sale",
    description: "Relaxed-fit stone-washed linen shirt in earthy sage green. Naturally breathable for any climate.",
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    reviews: 95,
    inStock: true
  },
  {
    id: 7,
    name: "Wooden Serving Board",
    category: "Home",
    price: 1199.00,
    originalPrice: null,
    badge: null,
    description: "Live-edge acacia wood serving board with juice groove. Food-safe oil finish. Each one uniquely grained.",
    imageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviews: 133,
    inStock: true
  },
  {
    id: 8,
    name: "Leather Bifold Wallet",
    category: "Accessories",
    price: 1699.00,
    originalPrice: null,
    badge: "New",
    description: "Slim full-grain leather bifold with RFID blocking. Holds 6 cards + cash. Develops a beautiful patina.",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviews: 204,
    inStock: true
  },
  {
    id: 9,
    name: "Knit Beanie — Oatmeal",
    category: "Accessories",
    price: 999.00,
    originalPrice: null,
    badge: null,
    description: "Chunky-knit ribbed beanie in oatmeal/ecru. Alpaca-wool blend, incredibly soft. One size fits most.",
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviews: 61,
    inStock: true
  },
  {
    id: 10,
    name: "Men's Jeans",
    category: "Clothing",
    price: 1899.00,
    originalPrice: 2399.00,
    badge: "New",
    description: "Classic indigo men's jeans with stretch fabric and a modern slim cut. Durable enough for daily wear and stylish for shopping days.",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    reviews: 48,
    inStock: true
  }
];

/* Format currency as Indian rupees */
function formatPrice(amount) {
  return `₹${amount.toFixed(2)}`;
}

/* Render star rating HTML */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) html += '<span class="star filled">★</span>';
    else if (i === full && half) html += '<span class="star half">★</span>';
    else html += '<span class="star">☆</span>';
  }
  return html;
}

/* Render a single product card */
function renderProductCard(product) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return `
    <article class="product-card" data-id="${product.id}" data-category="${product.category}">
      <a href="product-detail.html?id=${product.id}">
        <div class="product-card__image">
          <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
          ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
        </div>
      </a>
      <div class="product-card__body">
        <p class="product-card__category">${product.category}</p>
        <h3 class="product-card__name">
          <a href="product-detail.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-card__rating">
          ${renderStars(product.rating)}
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <p class="product-card__price">
          ${formatPrice(product.price)}
          ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
        </p>
      </div>
      <div class="product-card__footer">
        <button class="btn btn-primary btn-add-to-cart" style="flex:1" onclick="addToCartById(${product.id}, this)">
          Add to Cart
        </button>
        <a href="product-detail.html?id=${product.id}" class="btn btn-ghost btn-sm" style="padding: 0.45rem 0.9rem;">
          Details
        </a>
      </div>
    </article>
  `;
}

/* Render multiple products into a container */
function renderProducts(containerId, products) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (products.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state__icon">🔍</div>
        <h3 class="empty-state__title">No products found</h3>
        <p class="empty-state__text">Try a different filter or search term.</p>
      </div>`;
    return;
  }
  container.innerHTML = products.map(renderProductCard).join('');
}

/* Add to cart by product ID (used from cards) */
function addToCartById(id, btnEl) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1, imageUrl: product.imageUrl });
  if (btnEl) {
    btnEl.classList.add('pulse');
    btnEl.textContent = '✓ Added';
    setTimeout(() => {
      btnEl.classList.remove('pulse');
      btnEl.textContent = 'Add to Cart';
    }, 1400);
  }
  showToast(`${product.name} added to cart!`);
}
