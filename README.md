# Backend for Simple Book Catalog Application

This is the readme file for the backend part of the Simple Book Catalog Application project. The backend is responsible for providing the necessary APIs to serve data to the frontend and handle the logic. This readme will provide an overview of the project, instructions for setup, and details about the implemented API routes.

# Overview

The Simple Book Catalog Application is a full stack web project that allows users to view and manage a catalog of books. The backend is built using [insert technologies/frameworks used]. It provides various API routes to handle user authentication, book management, and data retrieval.

# Setup

To set up the backend locally, please follow these steps:

## Clone the backend repository from GitHub:

[Backend Repository Link](https://github.com/Labib2003/book-catalog-backend)

## Install the required dependencies:

Run the following command in the project directory:

```nodejs
npm install
```

## Configure the environment variables:

Create a .env file in the root directory and provide the necessary values for the following variables:

```.env
PORT=3000
DATABASE_URL=insert-database-url
BCRYPT_SALT_ROUNDS=insert-bcrypt-salt-rounds
JWT_SECRET=insert-jwt-secret
JWT_EXPIRES_IN=insert-jwt-expiration-time
JWT_REFRESH_SECRET=insert-refresh-token-secret
JWT_REFRESH_EXPIRES_IN=insert-refresh-token-expiration-time
```

Replace insert-database-url with the URL of your database, and insert-jwt-secret with a secret key for JWT token generation.

## Start the server:

Run the following command:

```nodejs
npm start
```

This will start the backend server at http://localhost:3000.

# API Routes

The backend provides the following API routes:

## User Routes

- GET /users: Fetches all users from the database.
- POST /users: Creates a new user in the database.
- GET /users/:id: Fetches a user by their ID.
- DELETE /users/:id: Deletes a user by their ID.
- PATCH /users/:id: Updates a user by their ID.

## Book Routes

- GET /books: Fetches all books from the database.
- POST /books: Creates a new book in the database.
- GET /books/:id: Fetches a book by its ID.
- PATCH /books/:id: Updates a book by its ID.
- DELETE /books/:id: Deletes a book by its ID.
- POST /books/add-review/:id: Adds a new review to a book.
- PATCH /books/mark-as-read/:id: Adds the user's ID to the readers array of the book.

## Authentication Routes

- POST /auth/login: Authenticates a user with their email and password.
- POST /auth/refresh-token: Retrieves a new JWT token and login info based on the cached refresh token.

**Note**: Replace :id with the corresponding ID or parameter in the route.

# Resources

[Frontend Repository]()

[Live Demo]()

# Conclusion

Thank you for reviewing the readme file for the backend part of the Simple Book Catalog Application. For any further assistance or inquiries, please contact the project developers.
