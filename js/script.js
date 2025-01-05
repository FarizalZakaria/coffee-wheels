// Toggle class active for snacks
const navbarNav = document.querySelector(".navbar-nav");
// When snacks was clicked
document.querySelector("#snacks").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active for search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active for shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Click outside the element
const snacks = document.querySelector("#snacks");
const searchButton = document.querySelector("#search-button");
const shoppingcart = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!snacks.contains(e.target) && !navbarNav.contains(e.target))
    navbarNav.classList.remove("active");
});

document.addEventListener("click", function (e) {
  if (!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!shoppingcart.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});
