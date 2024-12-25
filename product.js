// product.js

// Get product ID from the URL parameters (for product details page)
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = parseInt(urlParams.get('id'));

// Find the product based on the ID from the products array
const product = products.find(p => p.id === productId);

if (product) {
    // Display product details on the product details page
    document.getElementById('product-img').src = product.image;
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = product.price;

    // Add to Cart functionality
    document.getElementById('add-to-cart').addEventListener('click', function() {
        addToCart(product);
        alert('Product added to cart!');
    });
}

// Function to add product to cart (with quantity handling)
function addToCart(product) {
    // Get current cart from localStorage or initialize an empty array if no cart exists
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // If the product already exists in the cart, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If the product doesn't exist in the cart, add it with quantity 1
        product.quantity = 1;
        cart.push(product);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optional: Notify the user that the item has been added to the cart
    alert(`${product.title} has been added to the cart.`);
}

// Function to decrease item quantity or remove it from the cart
function decreaseItemQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1; // Decrease quantity
        } else {
            cart.splice(productIndex, 1); // Remove item if quantity is 1
        }
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
        updateCartDisplay(); // Update the cart display on the page
    }
}

// Function to display cart items on the cart page
function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.getElementById('cart-items');
    
    // Clear the current cart table
    cartTableBody.innerHTML = '';
    
    if (cartItems.length > 0) {
        cartItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.title}" style="width: 70px;"></td>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>  <!-- Show quantity -->
                <td>${item.price * item.quantity}</td>  <!-- Total price for the item -->
                <td><button onclick="decreaseItemQuantity(${item.id})">Remove 1</button></td>
            `;
            cartTableBody.appendChild(row);
        });
    } else {
        cartTableBody.innerHTML = '<tr><td colspan="6">Your cart is empty!</td></tr>';
    }
}

// Example: Handling "Add to Cart" button click on the product detail page
document.getElementById('add-to-cart').addEventListener('click', function() {
    const product = {
        id: 1, // Example product ID
        title: "Men's Formal Coat-Brown", // Example product title
        description: "A stylish and durable formal coat perfect for business meetings.",
        price: "₹1900", // Example product price
        image: "product1.jpg" // Example product image
    };

    addToCart(product);  // Add product to cart
    updateCartDisplay();  // Update the cart display
});

// Update the cart display on the cart page when the page loads
if (window.location.pathname.includes('cart.html')) {
    updateCartDisplay();  // Call the function to display cart items when the page loads
}
