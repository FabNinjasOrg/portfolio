// Product Detail Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Thumbnail image switching
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            // Update main image
            const newImageSrc = thumbnail.dataset.image;
            mainImage.src = newImageSrc;
        });
    });

    // Quantity controls
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');

    decreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });

    // Ensure quantity stays within bounds
    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (value < 1) quantityInput.value = 1;
        if (value > 10) quantityInput.value = 10;
    });

    // Add to cart functionality
    const addToCartBtn = document.querySelector('.detail-add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const productName = document.querySelector('.product-detail-name').textContent;
        const quantity = quantityInput.value;
        const price = document.querySelector('.detail-current-price').textContent;

        // You can add cart functionality here
        alert(`${quantity} x ${productName} added to cart!`);

        // Optional: Add animation feedback
        addToCartBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added to Cart!';
        addToCartBtn.style.background = '#4CAF50';

        setTimeout(() => {
            addToCartBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
            addToCartBtn.style.background = '#C84A4A';
        }, 2000);
    });
});
