/* === VELORA MAIN UTILITIES === */

/* Show a toast notification */
function showToast(message, duration = 2800) {
  let toast = document.getElementById('velora-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'velora-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">✓</span> ${message}`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* Toggle mobile hamburger menu */
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger-btn');
  if (!menu) return;
  menu.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('open');
}

/* Highlight active nav link based on current page */
function setActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.navbar__links a, .mobile-menu a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* Shared navigation HTML (injected into pages) */
function renderNavbar() {
  const container = document.getElementById('navbar-container');
  if (!container) return;
  container.innerHTML = `
    <nav class="navbar">
      <a href="index.html" class="navbar__logo">Velora<span>.</span></a>
      <ul class="navbar__links">
        <li><a href="index.html">Home</a></li>
        <li><a href="products.html">Shop</a></li>
        <li><a href="cart.html">Cart</a></li>
      </ul>
      <div class="navbar__actions">
        <a href="cart.html" class="cart-btn">
          🛒 Cart
          <span class="cart-badge" style="display:none;">0</span>
        </a>
        <button class="hamburger" id="hamburger-btn" onclick="toggleMenu()" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <a href="index.html">Home</a>
      <a href="products.html">Shop</a>
      <a href="cart.html">Cart</a>
    </div>
  `;
  setActiveNavLink();
}

/* Shared footer HTML */
function renderFooter() {
  const container = document.getElementById('footer-container');
  if (!container) return;
  container.innerHTML = `
    <footer>
      <div class="footer__grid container">
        <div class="footer__brand-col">
          <div class="footer__brand">Velora<span>.</span></div>
          <p class="footer__desc">Thoughtfully curated goods made to last. We believe in quality over quantity.</p>
        </div>
        <div>
          <h4 class="footer__heading">Shop</h4>
          <div class="footer__links">
            <a href="products.html">All Products</a>
            <a href="products.html?category=Bags">Bags</a>
            <a href="products.html?category=Home">Home</a>
            <a href="products.html?category=Accessories">Accessories</a>
          </div>
        </div>
        <div>
          <h4 class="footer__heading">Help</h4>
          <div class="footer__links">
            <a href="#">Shipping Info</a>
            <a href="#">Returns</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
        <div>
          <h4 class="footer__heading">Company</h4>
          <div class="footer__links">
            <a href="#">About Velora</a>
            <a href="#">Sustainability</a>
            <a href="#">Careers</a>
          </div>
        </div>
      </div>
      <div class="footer__bottom container">
        <span>© 2024 Velora. All rights reserved.</span>
        <span>Made with care ♡</span>
      </div>
    </footer>
  `;
}

/* Initialize shared elements on every page */
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
});
