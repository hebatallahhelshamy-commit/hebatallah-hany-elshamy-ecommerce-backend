GitHub Repository URL:
https://github.com/hebatallahhelshamy-commit/hebatallah-helshamy-ecommerce-backend

E-COMMERCE BACKEND API PROJECT - README

1. PROJECT DESCRIPTION & TECH STACK
A fully functional E-Commerce Backend API built to handle core e-commerce operations.
* Tech Stack: Node.js, Express.js, MongoDB, Mongoose, dotenv.

2. KEY FEATURES
* Categories Management: Full CRUD operations for product categorization.
* Products Catalog: Advanced product managing with automated dynamic filtering (category, price ranges, stock status, and text search).
* Shopping Cart: Database-persistent cart per user. Automatically calculates totals server-side to prevent price manipulation.
* Orders System & Checkout: Converts active cart into a permanent order with a 'pending' status, reduces product stock, and clears the user's cart.
* Global Error Handling: Centralized middleware to handle Validation, Cast, and Duplicate key errors seamlessly.

3. PREREQUISITES & INSTALLATION
* Prerequisites: Node.js installed, MongoDB Atlas or MongoDB Compass account.
* Installation Steps:
  1. Open the project folder in VS Code.
  2. Run the following command to install dependencies:
     npm install
  3. Run the database seed script to populate sample data:
     npm run seed
  4. Start the development server using:
     npm run dev

4. ENVIRONMENT VARIABLES (.env)
* PORT: The port network number for the server (e.g., 5000).
* MONGO_URI: MongoDB database connection string.
* NODE_ENV: Application environment status (development).

5. PROJECT STRUCTURE (MVC)
* config/db.js - Database connection setup & central error catcher setup.
* controllers/ - Business logic layers (cart, category, order, and product controllers).
* models/ - Database schemas definitions (Cart, Category, Order, Product).
* routes/ - API routing definitions mapping endpoints.
* app.js - Main entry point configuring middlewares and routes wiring.
* server.js - App bootstrapper starting up the server listener.

6. API ENDPOINTS OVERVIEW
* Categories: GET /categories, POST /categories
* Products: GET /products (Supports queries: ?category, ?minPrice, ?maxPrice, ?search), POST /products
* Cart: GET /cart, POST /cart/add
* Orders: POST /orders/checkout, GET /orders, GET /orders/:id, PATCH /orders/:id/status