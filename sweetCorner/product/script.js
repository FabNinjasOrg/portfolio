document.addEventListener('DOMContentLoaded', () => {
    const productSearch = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceSort = document.getElementById('priceSort');
    const productsGrid = document.getElementById('productsGrid');
    const productsCount = document.getElementById('count');
    const productCards = Array.from(document.querySelectorAll('.product-card'));

    // Filtering Function
    function filterProducts() {
        const searchTerm = productSearch.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;

        let visibleCount = 0;

        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productCategory = card.dataset.category;

            const matchesSearch = productName.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        productsCount.textContent = visibleCount;
    }

    // Sorting Function
    function sortProducts() {
        const sortValue = priceSort.value;
        if (sortValue === 'default') return;

        const sortedCards = [...productCards].sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('₹', '').replace(',', ''));
            const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('₹', '').replace(',', ''));

            if (sortValue === 'low-high') {
                return priceA - priceB;
            } else if (sortValue === 'high-low') {
                return priceB - priceA;
            }
        });

        // Re-append cards in new order
        sortedCards.forEach(card => productsGrid.appendChild(card));
    }

    // Event Listeners
    productSearch.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    priceSort.addEventListener('change', sortProducts);

    // Initialize count
    productsCount.textContent = productCards.length;
});
