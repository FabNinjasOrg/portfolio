const filterType = document.getElementById('filter-type');
const filterPrice = document.getElementById('filter-price');
const filterLocation = document.getElementById('filter-location');
const filterBeds = document.getElementById('filter-beds');
const applyFiltersBtn = document.getElementById('apply-filters');
const clearFiltersBtn = document.getElementById('clear-filters');
const resetFiltersBtn = document.getElementById('reset-filters');
const sortBy = document.getElementById('sort-by');
const resultsCount = document.getElementById('results-count');
const propertiesGrid = document.getElementById('properties-grid');
const noResults = document.getElementById('no-results');

let propertyCards = Array.from(document.querySelectorAll('.property-card'));

document.addEventListener('DOMContentLoaded', function() {
    if (resultsCount) {
        resultsCount.textContent = propertyCards.length;
    }

    propertyCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
});
