<script>
    // Initialize cart variables
    let cart = [];
    let totalAmount = 0;

    function addToCart(productId, productName, productPrice, button) {
        // Get the quantity from the input field
        const quantityInput = button.previousElementSibling;
        const quantity = parseInt(quantityInput.value);

        // Check if the quantity is valid
        if (quantity < 1) {
            alert("Please select a valid quantity.");
            return;
        }

        // Create a cart item
        const cartItem = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: quantity
        };

        // Check if the item already exists in the cart
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        if (existingItemIndex > -1) {
            // Update the existing item quantity
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add the new item to the cart
            cart.push(cartItem);
        }

        // Update the total amount
        totalAmount += productPrice * quantity;

        // Log the cart and total amount for demonstration
        console.log("Cart:", cart);
        console.log("Total Amount: $" + totalAmount.toFixed(2));

        // Optionally, update the UI or notify the user
        alert(`${quantity} x ${productName} has been added to your cart. Total amount: $${totalAmount.toFixed(2)}`);
    }
</script>