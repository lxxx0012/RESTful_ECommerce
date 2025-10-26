document.getElementById('fetch-btn').addEventListener('click', fetchProducts);

async function fetchProducts() {
    const productListElement = document.getElementById('product-list');
    productListElement.innerHTML = 'Loading ...'; // Placeholder

    try {
        // 1. Send the RESTful GET request tot he backend
        const response = await fetch('http://localhost:8080/api/products');

        // Check for HTTP errors (e.g., 404, 500)
        if (!response.ok) {
            throw new Error('HTTP error! status: ${response.status}');
        }

        // 2. Parse the JSON response body
        const products = await response.json();

        // 3. Render the data to the HTML
        renderProducts(products, productListElement);
    } catch (error) {
        HTMLFormControlsCollection.error("Error fetching data:", error);
        productListElement.innerHTML = 'Error: Could not load products. (${error.message})';
    }
}

function renderProducts(products, container) {
    // Clear the loading message
    container.innerHTML = '';

    // Create and inject a card for product
    products.forEach(product => {
        const productDiv = document.createEelment('div');
        productDiv.classList.add('product-card');
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>ID: ${product.id}</p>
        `;
        container.appendChild(productDiv);
    });
}