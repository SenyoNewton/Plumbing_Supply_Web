// Function to get cart items from local storage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Function to save cart items to local storage
function saveCartItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
}

// Function to add an item to the cart
function addToCart(event) {
    const itemElement = event.target.closest('.tool-card');
    const itemName = itemElement.getAttribute('data-name');
    const itemPrice = parseFloat(itemElement.getAttribute('data-price'));
    const itemImage = itemElement.getAttribute('data-image');

    const cartItems = getCartItems();
    const existingItem = cartItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
    }

    saveCartItems(cartItems);
    alert(`${itemName} added to cart`);
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    const cartItems = getCartItems();
    const updatedCartItems = cartItems.filter(item => item.name !== itemName);
    saveCartItems(updatedCartItems);
    updateCartPage();
}

// Function to update the quantity of an item in the cart
function updateQuantity(itemName, quantity) {
    const cartItems = getCartItems();
    const item = cartItems.find(item => item.name === itemName);

    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(itemName);
        } else {
            saveCartItems(cartItems);
            updateCartPage();
        }
    }
}

// Function to update the cart page
function updateCartPage() {
    const cartItems = getCartItems();
    const cartList = document.getElementById('cart-list');
    const subtotalPriceElement = document.getElementById('subtotal-price');
    const taxPriceElement = document.getElementById('tax-price');
    const shippingPriceElement = document.getElementById('shipping-price');
    const totalPriceElement = document.getElementById('total-price');

    cartList.innerHTML = '';
    let subtotalPrice = 0;

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button class="remove-from-cart" data-name="${item.name}">Remove</button>
            <input type="number" min="0" value="${item.quantity}" class="item-quantity" data-name="${item.name}">
        `;
        cartList.appendChild(listItem);
        subtotalPrice += item.price * item.quantity;
    });

    const taxPrice = subtotalPrice * 0.05;
    const shippingPrice = 5.00;
    const totalPrice = subtotalPrice + taxPrice + shippingPrice;

    subtotalPriceElement.textContent = subtotalPrice.toFixed(2);
    taxPriceElement.textContent = taxPrice.toFixed(2);
    shippingPriceElement.textContent = shippingPrice.toFixed(2);
    totalPriceElement.textContent = totalPrice.toFixed(2);

    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.getAttribute('data-name');
            removeFromCart(itemName);
        });
    });

    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', (event) => {
            const itemName = event.target.getAttribute('data-name');
            const quantity = parseInt(event.target.value, 10);
            updateQuantity(itemName, quantity);
        });
    });
}

// Event listeners for "Add to Cart" buttons on the item list page
if (document.querySelectorAll('.add-to-cart')) {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Update the cart page on load
if (window.location.pathname.endsWith('cart.html')) {
    updateCartPage();
}
