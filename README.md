
Here is the combined README.md for RESTful_ECommerce repository:

🛒 RESTful E-Commerce Demos
This repository contains two simple, front-end web projects designed to demonstrate fundamental web development concepts, primarily focusing on dynamic data manipulation and simulating RESTful API interactions.

The core focus is to illustrate how JavaScript can be used to load, create, modify, and delete data within a user interface.

📂 Project Structure
RESTful_ECommerce/
├── Product_Catalog/
│   ├── index.html          <-- Simple Catalog Viewer
│   ├── script.js
│   └── css/style.css
├── RESTful_ECommerce_Demo/
│   ├── index.html          <-- Advanced CRUD Demo
│   ├── script.js
│   └── css/style.css
├── README.md               <-- This file

1️⃣ Project: Simple Product Catalog Viewer (Product_Catalog/)
This is the most basic project, serving as a clean, minimal example of data loading and display.

Features
Load on Demand: Products are only loaded and rendered when the user clicks the "Load Products" button.

Dynamic List: Demonstrates fundamental Read (R) functionality by fetching product data (likely hardcoded or from a simple mock endpoint) and rendering the HTML dynamically using JavaScript.

Files: Located in the Product_Catalog/ subdirectory.

Technologies
HTML5
CSS (Basic Styling)
JavaScript

2️⃣ Project: Full RESTful CRUD Demo (RESTful_ECommerce_Demo/)
This is the main, more complex project that simulates a full interaction with a RESTful product API, including all four CRUD operations.

Features
View Products (Read): Displays the initial list of products.

Add Product (Create): Form to create new products using a simulated POST request.

Edit Product (Update): Form to modify existing product details using a simulated PUT or PATCH request.

Delete Product (Delete): Functionality to remove a product using a simulated DELETE request.

Modern UI: Styled using Tailwind CSS for a responsive, clean, and modern look.

RESTful Mapping: The JavaScript logic maps user actions to standard RESTful HTTP methods, providing a robust demonstration of API interaction principles.

Files: Located in the RESTful_ECommerce_Demo/ subdirectory.

Technologies
HTML5
Tailwind CSS (via CDN for styling)
Google Fonts
JavaScript
