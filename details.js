// details.js

// --- 1. DOM ELEMENTS ---
// Product Cards
const detailLinks = document.querySelectorAll('.btn-link.text-primary[data-bs-target="#productDetailModal"]'); 

// Product Detail Modal Elements (These IDs must exist in your HTML modal)
const detailModalElement = document.getElementById('productDetailModal');
const modalTitle = document.getElementById('productDetailModalLabel');
const modalProductName = document.getElementById('modal-product-name');
const modalProductPrice = document.getElementById('modal-product-price');
const modalProductImage = document.getElementById('modal-product-image');
const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');

// --- 2. BOOTSTRAP MODAL INSTANCE ---
// Initialize the Bootstrap Modal object
// IMPORTANT: Ensure the Bootstrap JS file is loaded BEFORE this script.
let productDetailModalInstance;
if (detailModalElement) {
    productDetailModalInstance = new bootstrap.Modal(detailModalElement);
}


// --- 3. CORE FUNCTION ---
function showProductDetails(event) {
    event.preventDefault();

    // Get the button that was clicked
    const button = event.currentTarget; 

    // Extract the data from the button's data attributes
    const name = button.dataset.name || 'N/A';
    const priceText = button.dataset.price || '0.00';
    const cc = button.dataset.cc || 'N/A';
    const imgUrl = button.dataset.img || ''; 
    
    // Simple ID generation
    const id = name.replace(/\s/g, '').toLowerCase();
    const price = parseFloat(priceText);

    // 4. Populate the Modal Content
    if (modalTitle) modalTitle.textContent = `${name} Details`;
    if (modalProductName) modalProductName.textContent = name;
    if (modalProductPrice) modalProductPrice.textContent = `$ ${price.toFixed(2)}`;
    if (modalProductImage) {
        modalProductImage.src = imgUrl; // Sets the picture
        modalProductImage.alt = name;
    }
    // Assuming you have an element for CC in your modal:
    const modalProductCC = document.getElementById('modal-product-cc');
    if (modalProductCC) modalProductCC.textContent = cc;

    // 5. Set data on the 'Add to Cart' button for cart.js to use
    if (modalAddToCartBtn) {
        modalAddToCartBtn.dataset.productId = id;
        modalAddToCartBtn.dataset.productName = name;
        modalAddToCartBtn.dataset.productPrice = price; 
    }

    // 6. Show the modal using the Bootstrap JS instance
    if (productDetailModalInstance) {
        productDetailModalInstance.show();
    }
}


// --- 7. INITIALIZE EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    // Add listener to all 'Details' links
    detailLinks.forEach(link => {
        link.addEventListener('click', showProductDetails);
    });
});