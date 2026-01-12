// Cart Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.querySelectorAll('.cart-item');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    const removeButtons = document.querySelectorAll('.remove-btn');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const proceedToCheckout = document.getElementById('proceedToCheckout');

    // Item prices (in rupees)
    const itemPrices = {
        0: 3200, // Strawberry Dream Cake
        1: 2800  // Vanilla Layer Cake
    };

    // Update quantity
    quantityButtons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            const cartItem = this.closest('.cart-item');
            const quantityInput = cartItem.querySelector('.quantity-input');
            const itemIndex = Array.from(cartItemsContainer.children).indexOf(cartItem);
            let currentQuantity = parseInt(quantityInput.value);

            if (action === 'increase') {
                quantityInput.value = currentQuantity + 1;
            } else if (action === 'decrease' && currentQuantity > 1) {
                quantityInput.value = currentQuantity - 1;
            }

            updateItemPrice(cartItem, itemIndex);
            updateTotals();
        });
    });

    // Remove item
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const cartItem = this.closest('.cart-item');
            cartItem.style.animation = 'fadeOut 0.3s ease';

            setTimeout(() => {
                cartItem.remove();
                updateTotals();
                checkEmptyCart();
            }, 300);
        });
    });

    // Update item price
    function updateItemPrice(cartItem, itemIndex) {
        const quantity = parseInt(cartItem.querySelector('.quantity-input').value);
        const price = itemPrices[itemIndex] || 0;
        const totalPrice = price * quantity;
        const priceElement = cartItem.querySelector('.price-amount');

        if (priceElement) {
            priceElement.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
        }
    }

    // Calculate and update totals
    function updateTotals() {
        let subtotal = 0;
        const cartItems = document.querySelectorAll('.cart-item');

        cartItems.forEach((item, index) => {
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            const price = itemPrices[index] || 0;
            subtotal += price * quantity;
        });

        const shipping = 200;
        const tax = Math.round(subtotal * 0.1); // 10% tax
        const total = subtotal + shipping + tax;

        if (subtotalElement) {
            subtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
        }
        if (totalElement) {
            totalElement.textContent = `₹${total.toLocaleString('en-IN')}`;
        }

        // Update tax in summary
        const taxElement = document.querySelector('.summary-row:nth-child(3) span:last-child');
        if (taxElement) {
            taxElement.textContent = `₹${tax.toLocaleString('en-IN')}`;
        }
    }

    // Check if cart is empty
    function checkEmptyCart() {
        const cartItems = document.querySelectorAll('.cart-item');
        if (cartItems.length === 0) {
            cartItemsContainer.style.display = 'none';
            emptyCart.style.display = 'block';
            if (proceedToCheckout) {
                proceedToCheckout.disabled = true;
                proceedToCheckout.style.opacity = '0.5';
                proceedToCheckout.style.cursor = 'not-allowed';
            }
        } else {
            cartItemsContainer.style.display = 'flex';
            emptyCart.style.display = 'none';
            if (proceedToCheckout) {
                proceedToCheckout.disabled = false;
                proceedToCheckout.style.opacity = '1';
                proceedToCheckout.style.cursor = 'pointer';
            }
        }
    }

    // Proceed to checkout
    if (proceedToCheckout) {
        proceedToCheckout.addEventListener('click', function () {
            // In a real application, you would collect cart data and send to checkout
            const cartData = [];
            const cartItems = document.querySelectorAll('.cart-item');

            cartItems.forEach((item, index) => {
                cartData.push({
                    name: item.querySelector('.item-name').textContent,
                    quantity: parseInt(item.querySelector('.quantity-input').value),
                    price: itemPrices[index] || 0
                });
            });

            console.log('Cart Data:', cartData);

            // Redirect to checkout page (you can create this later)
            // window.location.href = '../checkout/checkout.html';
            alert('Proceeding to checkout...');
        });
    }

    // Initialize totals on page load
    updateTotals();
    checkEmptyCart();

    // Add fade out animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-20px);
            }
        }
    `;
    document.head.appendChild(style);
});
