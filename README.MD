# E-Commerce Store API
This project provides a REST API for an e-commerce store, allowing customers to authenticate, create orders, retrieve their orders with pagination, and filter/sort orders based on price. It is built using TypeScript, Express, and SequelizeJS.

## Prerequisites
Node.js (v14 or higher),
MySQL database,
Sequelizejs,
Express

## Documentation
Postman Link: https://documenter.getpostman.com/view/26295633/2s9Y5ZvhY5
## Setup

Clone the repository:
git clone  https://github.com/Jayjokeer/soft-amos-Api-test.git

cd soft-amos-api-test
Install dependencies:

* [x] npm install
* [x] Create a .env file in the project root and provide the necessary environment variables:

* [x] Set up your MySQL database and configure the connection URL in the .env file.

* [x] Start the server:
npm start or npm run dev to run in development mode

### Authentication:
#### Endpoint: POST /api/v1/auth/create-customer
Request body:
json

{
  "firstName":"Your-firstname",
  "lastName:"Your -lastname",
  "email": "jayte@gmail.com",
  "phone":"your phone number",
  "password": "password"
}

Response:
json
{
  "message":"Customer created successfully"
  "registeredCustomer": {
    customer-details
  }
}

#### Endpoint: POST /api/v1/auth/login

Request body:
json

{
  "email": "jayte@gmail.com",
  "password": "password"
}

Response:
json

{
  "message":"Customer logged in successfully"
  "Token": "your-jwt-token"
}


### Create Order:
#### Endpoint: POST /api/v1/orders/create-order
Request body:
json

{
    "orderNumber":"6",
    "totalAmount":30
}
Response:

    "message": "Order created successfully",
    "order": {
        "id": "1cezt8KA9nCGwtNH63R6JS",
        "customerId": "aJ26kqnxUw2DbMiie4yrfB",
        "orderNumber": "6",
        "totalAmount": 30,
        "updatedAt": "2023-08-29T09:59:10.339Z",
        "createdAt": "2023-08-29T09:59:10.339Z"
    }

### Get Customer Orders:

#### Endpoint: GET /api/v1/orders/get-order
Query parameter: page (optional, default: 1)
Response: Array of order objects
Filter and Sort Customer Orders:

#### Endpoint: GET /api/v1/orders/get-by-price
Query parameter: q (optional, values: "ASC" or "DESC")
Response: Array of sorted order objects

Contributing
Contributions are welcome! If you find any issues or want to add enhancements, feel free to open a pull request.

License
This project is licensed under the MIT License.







