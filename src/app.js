document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Latte", img: "menu-latte.jpg", price: 8.0 },
      { id: 2, name: "Cappuccino", img: "cappuccino.jpg", price: 7.5 },
      { id: 3, name: "Caramel", img: "caramel.jpg", price: 8.0 },
      { id: 4, name: "Hazelnut", img: "hazelnut.jpg", price: 8.0 },
      { id: 5, name: "Americano", img: "americano.jpg", price: 7.5 },
      { id: 6, name: "Donut", img: "donut.jpg", price: 0.6 },
      { id: 7, name: "Curry puff", img: "curry-puff.jpg", price: 0.6 },
      { id: 8, name: "Cream puff", img: "cream-puff.jpg", price: 0.6 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // check if there are same item in cart
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // if there are none
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // if there are in cart, check if it the same or not
        this.items = this.items.map((item) => {
          // if they are different items
          if (item.id !== newItem.id) {
            return item;
          } else {
            // if they are the same item, add quantity and total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // take items that want to get removed by their id
      const cartItem = this.items.find((item) => item.id === id);
      // if items are more than one
      if (cartItem.quantity > 1) {
        // check one by one
        this.items = this.items.map((item) => {
          // if not clicked item
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // if there are only one item
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// Convert to MYR
const ringgit = (number) => {
  return new Intl.NumberFormat("ms-MY", {
    currencySign: "standard",
    style: "currency",
    currency: "MYR",
  }).format(number);
};
