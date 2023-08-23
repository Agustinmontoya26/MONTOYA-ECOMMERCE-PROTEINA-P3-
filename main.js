document.addEventListener("DOMContentLoaded", function () {
    const products = [
      { id: 1, name: "Proteína de Chocolate", price: 10, image: "chocolate.jpg" },
      { id: 2, name: "Proteína de Naranja", price: 20, image: "orange.jpg" },
      { id: 3, name: "Proteína de Vainilla", price: 30, image: "vanilla.jpg" },
    ];
  
    const productContainer = document.getElementById("product-container");
    const cartTotalElement = document.getElementById("cart-total");
    const cartItemsElement = document.getElementById("cart-items");
    const searchInput = document.getElementById("search-input");
  
    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
        <p>Precio: $${product.price}</p>
        <button class="add-to-cart" data-product-id="${product.id}">Agregar al Carrito</button>
      `;
  
      const addToCartButton = productCard.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", function () {
        addToCart(product);
        updateCart();
      });
  
      productContainer.appendChild(productCard);
    });
  
    searchInput.addEventListener("input", function () {
      performSearch();
    });
  
    function performSearch() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
      updateProductList(filteredProducts);
    }
  
    function updateProductList(productsToShow) {
      productContainer.innerHTML = "";
  
      productsToShow.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
          <h2>${product.name}</h2>
          <img src="${product.image}" alt="${product.name}">
          <p>Precio: $${product.price}</p>
          <button class="add-to-cart" data-product-id="${product.id}">Agregar al Carrito</button>
        `;
  
        const addToCartButton = productCard.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", function () {
          addToCart(product);
          updateCart();
        });
  
        productContainer.appendChild(productCard);
      });
    }
  
    function addToCart(product) {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.push(product);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert(`Se agregó "${product.name}" al carrito.`);
    }
  
    function updateCart() {
      updateCartItems();
      updateCartTotal();
    }
  
    function updateCartItems() {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItemsElement.innerHTML = "";
  
      cartItems.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <span>${product.name}</span>
          <span>$${product.price}</span>
          <span class="remove-from-cart" data-product-id="${product.id}">Quitar</span>
        `;
  
        const removeFromCartButton = cartItem.querySelector(".remove-from-cart");
        removeFromCartButton.addEventListener("click", function () {
          removeFromCart(product);
          updateCart();
        });
  
        cartItemsElement.appendChild(cartItem);
      });
    }
  
    function updateCartTotal() {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      let total = cartItems.reduce((acc, product) => acc + product.price, 0);
      cartTotalElement.textContent = `$${total}`;
    }
  
    function removeFromCart(product) {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems = cartItems.filter(item => item.id !== product.id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  
    updateCart();
    updateProductList(products);
  });
  