document.addEventListener("DOMContentLoaded", () => {
  // Sample menu data
  const menuData = [
    { id: 1, name: "Parotta", price: 15.99 },
    { id: 2, name: "Butter Chicken", price: 10.99 },
    { id: 3, name: "Pasta", price: 9.99 },
    { id: 4, name: "Chicken Briyani", price: 15.99 },
    { id: 5, name: "Mutton Briyani", price: 20.99 },
  ];

  // DOM Elements
  const menuContainer = document.getElementById("menu");
  const cartButton = document.getElementById("cartButton");
  const cartModal = document.getElementById("cartModal");
  const closeCart = document.getElementById("closeCart");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");
  const checkoutButton = document.getElementById("checkoutButton");

  // State
  let cart = [];

  // Render Menu
  function renderMenu() {
    menuData.forEach((item) => {
      if (!item.id || !item.name || !item.price) {
        console.error("Invalid menu item:", item);
        return; // Skip invalid items
      }
      const menuItem = document.createElement("div");
      menuItem.className =
        "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow";
      menuItem.innerHTML = `
        <h3 class="text-xl font-bold">${item.name}</h3>
        <p class="text-gray-600">$${item.price.toFixed(2)}</p>
        <button data-id="${item.id}" class="mt-2 bg-green-600 text-white px-4 py-2 rounded add-to-cart">Add to Cart</button>
      `;
      menuContainer.appendChild(menuItem);
    });
  }

  // Add Event Listener Using Event Delegation
  menuContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      const item = menuData.find((item) => item.id === id);
      addToCart(item);
    }
  });

  // Add Item to Cart
  function addToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    updateCart();
  }

  // Update Cart Display with Remove Button
  function updateCart() {
    cartItems.innerHTML = ""; // Clear the cart display
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement("li");
      cartItem.className = "flex justify-between items-center mb-2";

      // Add item details and a "Remove" button
      cartItem.innerHTML = `
        <div>
          <span>${item.name} x ${item.quantity}</span>
          <button data-id="${item.id}" class="ml-2 text-red-500 hover:text-red-700 remove-item">Remove</button>
        </div>
        <span>$${itemTotal.toFixed(2)}</span>
      `;
      cartItems.appendChild(cartItem);
    });

    // Update total and cart count
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Add Event Listener for Remove Buttons Using Event Delegation
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(id);
    }
  });

  // Remove Item from Cart
  function removeFromCart(id) {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Decrease quantity if more than 1
      } else {
        cart.splice(index, 1); // Remove item entirely if quantity is 1
      }
      updateCart(); // Re-render the cart
    }
  }

  // Open Cart Modal
  cartButton.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
  });

  // Close Cart Modal
  closeCart.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });

  // Checkout Button
  checkoutButton.addEventListener("click", () => {
    alert("Thank you for your order! Total: $" + cartTotal.textContent);
    cart = [];
    updateCart();
    cartModal.classList.add("hidden");
  });

  // Initialize App
  renderMenu();
});
