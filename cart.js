let cartItems = []; 

// --- DOM ELEMENTS ---
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCountSpan = document.getElementById('cart-count');
const cartTotalSpan = document.getElementById('cart-total');
const emptyCartMessage = document.getElementById('empty-cart-message');
const addToCartButtons = document.querySelectorAll('.card button.btn-outline-success');

// --- UTILITY FUNCTIONS ---

function toggleCart(e) {
    if (e) e.preventDefault();
    cartModal.classList.toggle('visible');
    // Re-render the cart content every time it opens
    if (cartModal.classList.contains('visible')) {
        renderCart();
    }
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cartItems.length === 0) {
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';

        cartItems.forEach(item => {
            const itemPrice = item.price * item.quantity;
            total += itemPrice;

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <span class="item-name fw-semibold">${item.name}</span>
                <span class="item-qty text-muted">Qty: ${item.quantity}</span>
                <span class="item-price text-danger">$${itemPrice.toFixed(2)}</span>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    // Update global totals
    cartTotalSpan.textContent = total.toFixed(2);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountSpan.textContent = itemCount;
}

function addItemToCart(itemData) {
    // Check if the item already exists in the cart
    const existingItem = cartItems.find(i => i.id === itemData.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({...itemData, quantity: 1}); // Add new item with quantity 1
    }
    
    // Render the cart to update the icon badge immediately
    renderCart(); 
    // Optionally open the cart after adding an item
    if (!cartModal.classList.contains('visible')) {
        toggleCart();
    }
}

function removeItem(itemId) {
    const id = parseInt(itemId);
    const itemIndex = cartItems.findIndex(item => item.id === id);
    
    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
        renderCart();
    }
}

// --- INITIALIZE & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Listeners for opening and closing the cart modal
    if (openCartBtn) openCartBtn.addEventListener('click', toggleCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);

    // 2. Listener for removing items (delegation)
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const itemId = e.target.dataset.id;
            removeItem(itemId);
        }
    });

    // 3. Listeners for "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get product data from the HTML structure
            const card = button.closest('.card');
            const name = card.querySelector('.card-title').textContent.trim();
            const priceText = card.querySelector('.text-danger').textContent;
            
            // Extract numerical price and convert to float
            const price = parseFloat(priceText.replace('Price: $', '').trim());

            // Simple unique ID based on name (in a real app, this should be a proper product ID)
            const id = name.replace(/\s/g, '').toLowerCase(); 

            if (price) {
                addItemToCart({ id: id, name: name, price: price });
            } else {
                console.error("Could not parse price for item:", name);
            }
        });
    });
    
    // 4. Add listener for all 'Details' links
    detailLinks.forEach(link => {
        link.addEventListener('click', showProductDetails);
    });

    // 5. Add listener for the 'Add to Cart' button inside the Modal
    modalAddToCartBtn.addEventListener('click', () => {
        const id = modalAddToCartBtn.dataset.productId;
        const name = modalAddToCartBtn.dataset.productName;
        const price = parseFloat(modalAddToCartBtn.dataset.productPrice);
        
        // Use the existing addItemToCart function from your cart.js
        if (id && name && price) {
            addItemToCart({ id: id, name: name, price: price });
            productDetailModal.hide(); // Close modal after adding
        }
    });

    // ... rest of your existing DOMContentLoaded code (e.g., renderCart())


// IMPORTANT: Ensure this line is defined globally or just before DOMContentLoaded
const productDetailModal = new bootstrap.Modal(document.getElementById('productDetailModal'));

    // Initial render to show correct count (0) on load
    renderCart();
});

// ... existing variables ...

// --- DETAILS MODAL ELEMENTS ---
const detailLinks = document.querySelectorAll('.btn-link.text-primary'); // All 'Details' links
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalImage = document.getElementById('modal-image');
const modalBrand = document.getElementById('modal-brand');
const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');

// --- BOOTSTRAP MODAL INSTANCE ---
// Initialize the Bootstrap Modal object using the ID
const productDetailModal = new bootstrap.Modal(document.getElementById('productDetailModal')); 
// Add this line inside your existing DOMContentLoaded block if the rest of your JS is outside.