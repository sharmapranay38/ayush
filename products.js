// products.js

// Array of product objects
const products = [
    {
        id: 1,
        title: "Men's Formal Coat-Brown",
        category: "men",
        description: "A stylish and durable formal coat perfect for business meetings.",
        price: "₹1900",
        image: "product1.jpg"
    },
    {
        id: 2,
        title: "Women's Crochet Cardigan",
        category: "women",
        description: "A trendy crochet cardigan to keep you cozy and stylish.",
        price: "₹1670",
        image: "product2.jpg"
    },
    {
        id: 3,
        title: "Men's Casual T-Shirt",
        category: "men",
        description: "Comfortable and casual t-shirt for everyday wear.",
        price: "₹800",
        image: "product3.jpg"
    },
    {
        id: 4,
        title: "Women's Leather Jacket",
        category: "women",
        description: "A stylish leather jacket perfect for the evening out.",
        price: "₹2200",
        image: "product4.jpg"
    }
];

// Display products on the homepage or shop page
function displayProducts(productsToDisplay) {
    const productList = document.getElementById('productList'); // Assuming this is the product container
    productList.innerHTML = ''; // Clear existing products

    productsToDisplay.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('pro');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h5>${product.title}</h5>
            <p>${product.price}</p>
            <a href="product-details.html?id=${product.id}" class="btn">View Details</a>
        `;
        productList.appendChild(productElement);
    });
}

// Filter products based on category (e.g., men's or women's clothing)
function filterProductsByCategory(category) {
    if (category === 'all') {
        displayProducts(products); // Display all products
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts); // Display filtered products
    }
}

// Event listener for category filter dropdown
const categoryFilter = document.getElementById('categoryFilter');
categoryFilter.addEventListener('change', function() {
    const selectedCategory = categoryFilter.value;
    filterProductsByCategory(selectedCategory);
});

// On page load, display all products (for home and shop pages)
window.onload = function() {
    displayProducts(products); // Display all products by default
};
