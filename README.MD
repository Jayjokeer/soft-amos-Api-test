E-Commerce Store API
This project provides a REST API for an e-commerce store, allowing customers to authenticate, create orders, retrieve their orders with pagination, and filter/sort orders based on price. It is built using TypeScript, Express, and SequelizeJS.

Prerequisites
Node.js (v14 or higher)
MySQL database
Setup
Clone the repository:


git clone https://github.com//e-commerce-api.git
cd soft-amos-test
Install dependencies:


npm install
Create a .env file in the project root and provide the necessary environment variables:


DATABASE_URL=mysql://username:password@localhost:5432/ecommerce_db
JWT_SECRET=your-secret-key
Set up your PostgreSQL database and configure the connection URL in the .env file.

Run the migrations to create the database tables:

npm run sequelize db:migrate
Usage
Start the server:


npm start or npm run dev to run in development mode
Authentication:

Endpoint: POST /auth
Request body:
json

{
  "email": "customer@example.com",
  "password": "password"
}
Response:
json

{
  "token": "your-jwt-token"
}
Create Order:

Endpoint: POST /orders
Request body:
json

{
  "customerId": 1,
  "products": [
    {
      "name": "Product 1",
      "price": 100
    }
  ]
}
Response:

{
  "id": 1,
  "customerId": 1,
  "products": [
    {
      "name": "Product 1",
      "price": 100
    }
  ],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
Get Customer Orders:

Endpoint: GET /orders/:customerId
Query parameter: page (optional, default: 1)
Response: Array of order objects
Filter and Sort Customer Orders:

Endpoint: GET /orders/:customerId/sort
Query parameter: sortBy (optional, values: "asc" or "desc")
Response: Array of sorted order objects
Contributing
Contributions are welcome! If you find any issues or want to add enhancements, feel free to open a pull request.

License
This project is licensed under the MIT License.

Replace placeholders like your-username and your-secret-key with appropriate values. This README file provides a quick overview of the project, how to set it up, and how to use the API endpoints. Customize it further to match your project's specifics.





