# Web Blog API

This project is a RESTful API for a Web Blog application built using Node.js. It provides a set of endpoints to manage users, posts, and comments. The API supports essential blog functionalities such as user authentication, creating and managing posts, and interacting with comments. 

<!--
https://www.postman.com/martian-meteor-939359/workspace/public-workspace/collection/18754010-ec536be0-b388-478e-baa5-b42ba97295b3?action=share&creator=18754010
-->


## Endpoints
Below is an overview of the available endpoints and their functionalities.
- ***To view the Swagger UI schema, navigate to `http://localhost:3000/api-docs` in your browser after running the server.***
- ***You can test these endpoints via this [Postman](https://www.postman.com/martian-meteor-939359/workspace/alitalhacoban-public-workspace/collection/18754010-ec536be0-b388-478e-baa5-b42ba97295b3?action=share&creator=18754010) collection***

<img width="750" alt="Screenshot 2024-08-31 at 00 08 18" src="https://github.com/user-attachments/assets/e29822e7-4cbf-4428-af04-cf84541f27f4">




## Technologies Used

- ***Node.js:*** Backend runtime environment.
- ***express.js:*** Web framework for Node.js.
- ***MongoDB:*** NoSQL database for storing user data.
- ***mongoose:*** ODM for MongoDB.
- ***express-validator:*** Server side validation for input fields
- ***bcrypt:*** Library for hashing passwords.
- ***JSON Web Tokens (JWT):*** Standard for creating secure access tokens.
- ***swagger-ui-express:*** Middleware to serve auto-generated Swagger API documentation in Express.js applications.
- ***swagger-jsdoc:*** Library to generate Swagger API documentation from JSDoc comments in your code.
- ***jest:*** Comprehensive testing of API endpoints using jest for unit tests and supertest for testing HTTP requests, ensuring reliable and consistent API functionality.
<!-- - ***jest:*** Testing framework for JavaScript, used to write and run unit tests. 
- ***supertest:*** Library for testing HTTP endpoints in Node.js applications. -->



 ## Installation
  1. Clone the repository
  
  ```bash
    git clone https://github.com/carpodok/node-blog-app.git
  ```
  
  2. Navigate to the project directory:
  
   ```bash
    cd node-blog-app
   ```

  3. Install required dependencies
  
  ```bash
   npm install
  ```
<br>

## Configuration

1. Creat a `.env` file on the root of the project and add the following environment variables

```
PORT=3000
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

<br>

## Running the Application

1. To start the server, run the following command on the root of the project path;

```
npm start
```

For the development purpose;
```
npm run dev
```

2. The application will be running on  `http://localhost:3000`

<br>

## Running the Application with Docker
You can also run this application using Docker

1. Ensure Docker and Docker Compose are installed. If not, follow the [official Docker installation guide](https://docs.docker.com/engine/install/).

2. Build and run the applicaiton with Docker Compose:
   ```bash
   docker-compose up
   ```
    The application will be accessible at `http://localhost:3000`
  
3. ***Using a custom `.env` file:***  Ensure you have a `.env` file with the required environment variables (`PORT`, `MONGODB_URL`, `JWT_SECRET`), as it will be loaded automatically.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.


## License
This project is licensed under the MIT License.
