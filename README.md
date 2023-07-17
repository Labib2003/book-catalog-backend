# Backend for Simple Book Catalog Application

This is the readme file for the backend part of the Simple Book Catalog Application project. The backend is responsible for providing the necessary APIs to serve data to the frontend and handle the logic. This readme will provide an overview of the project, instructions for setup, and details about the implemented API routes.

# Overview

The Simple Book Catalog Application is a full stack web project that allows users to view and manage a catalog of books. The backend is built using `Express` and `Mongoose`. It provides various API routes to handle user authentication, book management, and data retrieval.

# Setup

To set up the backend locally, please follow these steps:

### Clone the backend repository from GitHub:

[Backend Repository Link](https://github.com/Labib2003/book-catalog-backend)

### Install the required dependencies:

Run the following command in the project directory:

```nodejs
npm install
```

### Configure the environment variables:

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

### Start the server:

Run the following command:

```nodejs
npm start
```

This will start the backend server at http://localhost:3000.

# Dependencies:

### Production Dependencies

- Node.js: A JavaScript runtime environment used for building server-side applications.
- Express.js: A web application framework for Node.js that simplifies the development of server-side applications.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript and provides static type checking.
- MongoDB: A popular NoSQL database used for storing and retrieving data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a higher-level abstraction for interacting with the database.
- JWT (JSON Web Token): A standard for securely transmitting information between parties as a JSON object.
- bcrypt: A library used for hashing passwords and comparing hashed passwords for authentication.
- cors: A middleware that enables Cross-Origin Resource Sharing, allowing requests from different origins.
- dotenv: A module that loads environment variables from a .env file into process.env.
- Winston: A versatile logging library for Node.js applications.
- winston-daily-rotate-file: A transport for Winston that rotates log files on a daily basis.
- zod: A TypeScript-first schema validation library that makes it easy to validate data and ensure its integrity.

### Dev Dependencies

- @types/cors: TypeScript type definitions for the cors module.
- @types/express: TypeScript type definitions for the express module.
- eslint-config-prettier: An ESLint configuration that disables formatting rules conflicting with Prettier.
- husky: A Git hook framework used to run scripts before committing or pushing code.
- lint-staged: A tool used to run scripts on staged files in Git before committing.
- prettier: A code formatter that enforces consistent code style.
- ts-node-dev: A development tool that restarts the server when changes are detected, using TypeScript directly.
- typescript: A programming language that enables static typing in JavaScript.

# API Routes

The backend provides the following API routes:

### User Routes

- `GET` /users : Fetches all users from the database.
- `POST` /users : Creates a new user in the database.
- `GET` /users/:id : Fetches a user by their ID.
- `DELETE` /users/:id : Deletes a user by their ID.
- `PATCH` /users/:id : Updates a user by their ID.

### Book Routes

- `GET` /books : Fetches all books from the database.
- `POST` /books : Creates a new book in the database.
- `GET` /books/:id : Fetches a book by its ID.
- `PATCH` /books/:id : Updates a book by its ID.
- `DELETE` /books/:id : Deletes a book by its ID.
- `POST` /books/add-review/:id : Adds a new review to a book.
- `PATCH` /books/mark-as-read/:id : Adds the user's ID to the readers array of the book.

### Authentication Routes

- `POST` /auth/login: Authenticates a user with their email and password.
- `POST` /auth/refresh-token: Retrieves a new JWT token and login info based on the cached refresh token.

**Note**: Replace :id with the corresponding ID or parameter in the route.

# Resources

[Frontend Repository](https://github.com/Labib2003/book-catalog-frontend)

[Live Demo](https://book-catalog-backend-one.vercel.app/)

# Conclusion

Thank you for reviewing the readme file for the backend part of the Simple Book Catalog Application. For any further assistance or inquiries, please contact the project developers.
