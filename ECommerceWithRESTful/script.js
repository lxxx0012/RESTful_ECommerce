// Simulate a RESTful API backend with an in-memory database
        let products = [
            { id: 1, name: 'Wireless Headphones', price: 99.99 },
            { id: 2, name: 'Smartwatch', price: 199.99 },
            { id: 3, name: 'Portable Charger', price: 29.99 }
        ];

        let nextId = 4;

        // Declare variables globally (using let) but initialize them inside init()
        let productListEl, loadingEl, errorEl, addFormEl, productIdSelectEl, editNameInput, editPriceInput, updateBtn, deleteBtn, messageBoxEl;

        // Flag to prevent handlers from firing before all elements are assigned
        let isAppInitialized = false;

        // --- Utility Functions for simulating API calls (REST Verbs) ---

        // Simulate a GET request to get all products
        function apiGetProducts() {
            return new Promise(resolve => setTimeout(() => resolve({ products }), 500));
        }

        // Simulate a POST request to add a new product
        function apiAddProduct(newProduct) {
            return new Promise(resolve => {
                setTimeout(() => {
                    const productWithId = { ...newProduct, id: nextId++ };
                    products.push(productWithId);
                    resolve({ product: productWithId });
                }, 500);
            });
        }

        // Simulate a PUT request to update a product
        function apiUpdateProduct(id, updatedData) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const index = products.findIndex(p => p.id === id);
                    if (index !== -1) {
                        products[index] = { ...products[index], ...updatedData };
                        resolve({ product: products[index] });
                    } else {
                        reject(new Error('Product not found.'));
                    }
                }, 500);
            });
        }

        // Simulate a DELETE request to delete a product
        function apiDeleteProduct(id) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const initialLength = products.length;
                    products = products.filter(p => p.id !== id);
                    if (products.length < initialLength) {
                        resolve({ success: true });
                    } else {
                        reject(new Error('Product not found.'));
                    }
                }, 500);
            });
        }

        // --- UI Rendering and Interaction Logic ---

        // Function to show a temporary message to the user
        function showMessage(text) {
            messageBoxEl.textContent = text;
            messageBoxEl.classList.remove('opacity-0');
            messageBoxEl.classList.add('opacity-100');
            setTimeout(() => {
                messageBoxEl.classList.remove('opacity-100');
                messageBoxEl.classList.add('opacity-0');
            }, 3000);
        }

        // Function to reset the edit form fields defensively
        function resetEditFormFields() {
            // Only attempt to set the value if the element is not null
            if (editNameInput) editNameInput.value = '';
            if (editPriceInput) editPriceInput.value = '';
        }
        
        // Renders the list of products on the page
        function renderProducts() {
            productListEl.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white p-6 rounded-lg shadow-md';
                productCard.innerHTML = `
                    <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                    <p class="mt-1 text-gray-600">$${product.price.toFixed(2)}</p>
                    <p class="text-sm text-gray-400">ID: ${product.id}</p>
                `;
                productListEl.appendChild(productCard);
            });
        }

        // Fetches products from the "API" and updates the UI
        async function fetchAndRenderProducts() {
            loadingEl.classList.remove('hidden');
            errorEl.classList.add('hidden');
            try {
                // RESTful GET: Call the mock API to get all products
                const response = await apiGetProducts();
                products = response.products;
                renderProducts();
                populateProductSelect();
            } catch (err) {
                console.error(err);
                errorEl.classList.remove('hidden');
            } finally {
                loadingEl.classList.add('hidden');
            }
        }

        // Populates the dropdown list for editing/deleting products
        function populateProductSelect() {
            // Clear existing options except the first one
            while (productIdSelectEl.options.length > 1) {
                productIdSelectEl.remove(1);
            }
            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = `ID ${product.id}: ${product.name}`;
                productIdSelectEl.appendChild(option);
            });
            // Reset form fields using the defensive function
            resetEditFormFields();
        }

        // Event Handler for adding a product (POST)
        async function handleAddProduct(e) {
            e.preventDefault();
            const name = document.getElementById('new-product-name').value;
            const price = parseFloat(document.getElementById('new-product-price').value);

            if (name && !isNaN(price)) {
                const newProduct = { name, price };
                try {
                    // RESTful POST: Call the mock API to add a product
                    await apiAddProduct(newProduct);
                    addFormEl.reset();
                    await fetchAndRenderProducts(); // Re-render the list
                    showMessage('Product added successfully!');
                } catch (err) {
                    showMessage('Failed to add product.');
                    console.error('Error adding product:', err);
                }
            }
        }

        // Event Handler for selecting a product to edit
        function handleProductSelectChange() {
            // New guard check using the initialization flag
            if (!isAppInitialized) {
                console.warn("App not initialized, skipping handleProductSelectChange.");
                return;
            }

            const selectedId = parseInt(productIdSelectEl.value, 10);
            const product = products.find(p => p.id === selectedId);
            if (product) {
                editNameInput.value = product.name;
                editPriceInput.value = product.price;
            } else {
                // If no product is selected (default option), reset the fields defensively
                resetEditFormFields();
            }
        }

        // Event Handler for updating a product (PUT)
        async function handleUpdateProduct() {
            // New guard check using the initialization flag
            if (!isAppInitialized) {
                console.error("Attempted to call handleUpdateProduct before app was initialized.");
                showMessage("Application is still loading. Please try again.");
                return; 
            }
            
            const id = parseInt(productIdSelectEl.value, 10);
            if (!id) {
                showMessage('Please select a product to update.');
                return;
            }
            const name = editNameInput.value;
            const price = parseFloat(editPriceInput.value);
            
            if (name && !isNaN(price)) {
                const updatedData = { name, price };
                try {
                    // RESTful PUT: Call the mock API to update a product
                    await apiUpdateProduct(id, updatedData);
                    await fetchAndRenderProducts();
                    showMessage('Product updated successfully!');
                } catch (err) {
                    showMessage('Failed to update product.');
                    console.error('Error updating product:', err);
                }
            } else {
                showMessage('Please enter a valid name and price.');
            }
        }

        // Event Handler for deleting a product (DELETE)
        async function handleDeleteProduct() {
            // New guard check using the initialization flag
            if (!isAppInitialized) {
                console.error("Attempted to call handleDeleteProduct before app was initialized.");
                showMessage("Application is still loading. Please try again.");
                return; 
            }
            
            const id = parseInt(productIdSelectEl.value, 10);
            if (!id) {
                showMessage('Please select a product to delete.');
                return;
            }
            try {
                // RESTful DELETE: Call the mock API to delete a product
                await apiDeleteProduct(id);
                await fetchAndRenderProducts();
                showMessage('Product deleted successfully!');
            } catch (err) {
                showMessage('Failed to delete product.');
                console.error('Error deleting product:', err);
            }
        }

        // Initialization function called when the DOM is ready
        function initApp() {
            // Assign all elements (guaranteed to exist now)
            productListEl = document.getElementById('product-list');
            loadingEl = document.getElementById('product-list-loading');
            errorEl = document.getElementById('product-list-error');
            addFormEl = document.getElementById('add-product-form');
            productIdSelectEl = document.getElementById('product-id-select');
            editNameInput = document.getElementById('edit-product-name');
            editPriceInput = document.getElementById('edit-product-price');
            updateBtn = document.getElementById('update-btn');
            deleteBtn = document.getElementById('delete-btn');
            messageBoxEl = document.getElementById('message-box');

            // Attach all event listeners
            addFormEl.addEventListener('submit', handleAddProduct);
            productIdSelectEl.addEventListener('change', handleProductSelectChange);
            updateBtn.addEventListener('click', handleUpdateProduct);
            deleteBtn.addEventListener('click', handleDeleteProduct);

            // Initial fetch and render
            fetchAndRenderProducts();
            
            // Set the flag to true ONLY after all assignments and listeners are ready
            isAppInitialized = true;
        }

        // Initial call to initialize the app when the page loads
        document.addEventListener('DOMContentLoaded', initApp);