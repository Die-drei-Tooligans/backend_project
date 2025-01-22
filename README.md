# Car Repair Shop Task Management System

-   [Car Repair Shop Task Management System](#car-repair-shop-task-management-system)
    -   [Introduction and Project Overview](#introduction-and-project-overview)
        -   [Purpose](#purpose)
        -   [Features](#features)
        -   [Team Members](#team-members)
    -   [Project Structure](#project-structure)
    -   [File Descriptions](#file-descriptions)
    -   [Installation](#installation)
    -   [Usage](#usage)
        -   [Register](#register)
            -   [Requirements createAdmin createUser input](#requirements-createadmin-createuser-input)
        -   [Login](#login)
            -   [Requirements](#requirements)
        -   [User](#user)
            -   [Requirements createCar input](#requirements-createcar-input)
        -   [Admin](#admin)
        -   [Tasks](#tasks)
    -   [License](#license)
    -   [Acknowledgements](#acknowledgements)

## Introduction and Project Overview

### Purpose

This project provides a robust backend system for managing tasks within a car repair shop environment. It offers a comprehensive RESTful API to handle user authentication, manage user profiles (customers and administrators), track car details, organize repair shops, and streamline task management. By centralizing and automating these essential functions, the system aims to enhance efficiency and productivity for car repair shops.

### Features

**User Authentication and Authorization:**

-   Secure user authentication using JWT (JSON Web Tokens) and role-based authorization (admin, user).

**User Profile Management:**

-   Create, read, update, and delete (CRUD) operations for user profiles, including soft delete functionality to manage user data effectively.

**Car Management:**

-   Add, modify, and remove car records, associating them with specific users for efficient tracking and management.

**Shop Management:**

-   Handle CRUD operations for repair shop records, linking them to administrators for streamlined oversight and control.

**Task Management:**

-   Create, assign, update, and track tasks, facilitating efficient workflow management within the repair shop.

**Soft Delete Functionality:**

-   Allows for the temporary removal of records, providing a safety net for data recovery and preventing accidental permanent deletions.

**Input Validation:**

-   Ensures data integrity and prevents errors by validating user input, using tools like `express-validator`.

### Team Members

-   **Lara (Project Owner):**

-   Manages overall development, ensures feature completeness, and coordinates the team.

-   **Oguz (Data and Testing):**

-   Handles testing, data validation, and ensuring smooth project operations.

-   **Ju (Documentation):**

-   Writes detailed and user-friendly documentation, including user guides and technical specifications.

## Project Structure

```bash
backend_project
│
├── src/
│   ├── controller/
│   │   ├── adminController.js
│   │   ├── carController.js
│   │   ├── loginController.js
│   │   ├── registerController.js
│   │   ├── shopController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── invalidPathHandler.js
│   │   ├── logger.js
│   │   ├── rateLimiter.js
│   │   └── validator/
│   │       ├── carValidator.js
│   │       ├── companyValidator.js
│   │       ├── taskValidator.js
│   │       └── userValidator.js
│   ├── models/
│   │   ├── adressModel.js
│   │   ├── bookingModel.js
│   │   ├── carModel.js
│   │   ├── companyModel.js
│   │   ├── personalDataModel.js
│   │   ├── taskModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── adminRouter.js
│   │   ├── loginRouter.js
│   │   ├── registerRouter.js
│   │   ├── taskRouter.js
│   │   └── userRouter.js
│   ├── services/
│   │   ├── registerEmail.html
│   │   └── sendEmail.js
│   └── utils/
│       └── auth/
│           └── authController.js
│           └── hashManyPasswords.js
│           └── hashPassword.js
├── forSeeding.js
├── seed.js
└── server.js
```

## File Descriptions

**server.js:**

-   This is the main entry point of the application. It initializes the Express.js server, sets up middleware for handling CORS, parsing JSON, and serving static files, and defines the main API routes. It also connects to the MongoDB database and starts the server listening on the specified port.

**src/middleware/invalidPathHandler.js:**

-   This middleware function handles requests made to invalid or non-existent API endpoints. It returns a 404 Not Found error to the client.

**src/middleware/logger.js:**

-   This middleware function logs basic information about incoming requests, including the timestamp, HTTP method, and requested URL, to the console. This helps with monitoring and debugging the application.

**src/middleware/errorHandler.js:**

-   This middleware function handles errors that occur during the processing of requests. It logs the error details to the console and sends an error response to the client with the appropriate HTTP status code.

**src/middleware/rateLimiter.js:**

-   This middleware function implements rate limiting to prevent abuse of the API. It limits the number of requests from a single IP address within a specific time window.

**src/middleware/validator/taskValidator.js:**

-   This middleware function validates the data provided in requests related to tasks. It uses express-validator to define validation rules for each field in the task data, ensuring data integrity.

**src/middleware/validator/carValidator.js:**

-   Similar to taskValidator, this middleware validates data related to car management, ensuring that the data conforms to the expected format and rules.

**src/middleware/validator/companyValidator.js:**

-   This middleware validates data for company-related requests, ensuring that fields like company name, address, and contact information meet the required criteria.

**src/middleware/validator/userValidator.js:**

-   This middleware validates user-related data, including fields like first name, last name, username, email, and password, to ensure data quality and security.

**src/utils/auth/hashPassword.js:**

-   This utility function hashes user passwords before they are stored in the database, enhancing security by making it difficult to recover passwords from the stored hashes.

**src/utils/auth/hashManyPasswords.js:**

-   This function hashes multiple passwords, likely used for seeding the database with initial user data or for batch processing of passwords.

**src/utils/auth/authController.js:**

-   This controller handles user authentication and authorization. It uses JWT to verify user identity and roles, ensuring that only authorized users can access specific resources.

**src/models/personalDataModel.js:**

-   This file defines the Mongoose schema for personal data, which is used to structure and store user information like name, contact details, and address.

**src/models/userModel.js:**

-   This file defines the Mongoose schema for users, including fields for user roles, personal data, and any relationships with other data, such as bookings or cars.

**src/models/carModel.js:**

-   This file defines the Mongoose schema for cars, including details like license plate, make, model, and any associated tasks or repairs.

**src/models/adressModel.js:**

-   This file defines the Mongoose schema for addresses, which is used to store address information for users and potentially for companies or shops.

**src/models/taskModel.js:**

-   This file defines the Mongoose schema for tasks, including details like task name, description, associated shop, and status.

**src/models/companyModel.js:**

-   This file defines the Mongoose schema for companies, including information like company name, address, contact details, and associated tasks or bookings.

**src/controller/shopController.js:**

-   This controller handles API requests related to shop management, such as creating, reading, updating, and deleting shop records.

**src/controller/userController.js:**

-   This controller handles API requests related to user management, such as creating, reading, updating, and deleting user profiles.

**src/controller/carController.js:**

-   This controller handles API requests related to car management, such as adding, updating, and deleting car records.

**src/controller/adminController.js:**

-   This controller handles API requests specific to admin users, such as managing admin profiles and potentially accessing admin-specific functionalities.

**src/controller/taskController.js:**

-   This controller handles API requests related to task management, such as creating, updating, and deleting tasks, and potentially assigning tasks to shops or users.

**src/controller/registerController.js:**

-   This controller handles user registration requests, processing new user data and potentially sending registration confirmation emails.

**src/controller/loginController.js:**

-   This controller handles user login requests, verifying user credentials and generating JWTs for authentication.

**src/routes/loginRouter.js:**

-   This file defines the API routes specifically for login and authentication functionalities, handling requests related to user login.

**src/routes/userRouter.js:**

-   This file defines the API routes for user-related actions, such as managing user profiles, cars associated with users, and other user-specific functionalities.

**src/routes/adminRouter.js:**

-   This file defines the API routes specifically for admin users, providing access to functionalities like managing users, shops, and tasks.

**src/routes/registerRouter.js:**

-   This file defines the API routes for user registration, handling requests for creating new user accounts.

**src/routes/taskRouter.js:**

-   This file defines the API routes for managing tasks, including creating, reading, updating, and deleting tasks.

**src/services/sendEmail.js:**

-   This service handles the sending of emails, such as registration confirmation emails or password reset emails.

src/services/registerEmail.html: This file contains the HTML template used for the registration emails sent to new users.

## Installation

1. Clone the repository: `git clone <repository_url>`
2. Install dependencies: `npm install`
3. Configure environment variables. See `.env.example` for an example.
4. Start the server: `npm start server` or `nodemon server.js`

## Usage

### Register

#### Requirements createAdmin createUser input

    ```json
    {
        "deleted": false,
        "role": "user",
        "person": {
                "firstname": "STRING",
                "lastname": "STRING",
                "username": "STRING",
                "image": "STRING",
                "mail": "STRING",
                "password": "STRING",
                "phone": "STRING",
                "adress": "STRING",
                "dob": "2020-12-31",
        },
    }
    ```

**POST /register/user**

    - Registers a new user.

**POST /register/admin**

    - Registers a new admin.

### Login

#### Requirements

```json
{
	"person": {
		"username": "username",
		"password": "password"
	}
}
```

**POST /login/user**

    - Logs in an existing user.

**POST /login/admin**

    - Logs in an existing admin.

### User

**GET /user**

    - Retrieves a single user by their email address.

**PATCH /user**

    - Soft deletes a user by their email address.

**PUT /user**

    - Edits a single user by their email address.

**GET /user/cars**

    - Retrieves all cars associated with the logged-in user.

**POST /user/cars**

    - Creates a new car associated with the logged-in user.
    requirements for carSchema and validation

#### Requirements createCar input

    ```json
    {
        "deleted": false,
        "fitUser": [],
        "licensePlate": "STRING",
        "lastNameOrCompany": "STRING",
        "firstName": "STRING",
        "adress": "STRING",
        "nextHU": "2025-12-31",
        "dateOfFirstRegistration": "2020-12-31",
        "manufacturerNumber": "STRING",
        "typeNumber": "STRING",
        "vehicleClass": "STRING",
        "FIN": "STRING",
        "checkDigit": 5,
        "brand": "STRING",
        "type": "STRING",
        "variant": "STRING",
        "version": "STRING",
        "tasks": [],
    }
    ```

**PATCH /user/cars**

    - Soft deletes all cars associated with the logged-in user.

**GET /user/cars/:id**

    - Retrieves a specific car by ID associated with the logged-in user.

**POST /user/cars/:id**

    - Reactivates a specific car by ID associated with the logged-in user.

**PATCH /user/cars/:id**

    - Soft deletes a specific car by ID associated with the logged-in user.

**PUT /user/cars/:id**

    - Edits a specific car by ID associated with the logged-in user.

### Admin

**GET /admin/manageprofile/:id**

    - Retrieves an admin by ID.

**POST /admin/manageprofile/:id**

    - Reactivates an admin by ID.

**PATCH /admin/manageprofile/:id**

    - Soft deletes an admin by ID.

**PUT /admin/manageprofile/:id**

    - Edits an admin by ID.

**GET /admin/manageusers**

    - Retrieves all users.

**GET /admin/manageshops**

    - Retrieves all shops associated with the logged-in admin.

**POST /admin/manageshops**

    - Creates a new shop associated with the logged-in admin.

**PATCH /admin/manageshops**

    - Soft deletes all shops associated with the logged-in admin.

**GET /admin/manageshops/:id**

    - Retrieves a specific shop by ID associated with the logged-in admin.

**POST /admin/manageshops/:id**

    - Reactivates a specific shop by ID associated with the logged-in admin.

**PATCH /admin/manageshops/:id**

    - Soft deletes a specific shop by ID associated with the logged-in admin.

**PUT /admin/manageshops/:id**

    - Edits a specific shop by ID associated with the logged-in admin.

**POST /admin/managetasks**

        - Creates a new task.

    #### Requirements for createTask

    ```json
    {
        "deleted": false,
        "fitShop": "STRING",
        "name": "STRING",
        "topic": "STRING",
        "image": "STRING",
        "about": "STRING",
        "timeRequired": "NUM",
        "isFree": true,
        "isDoneBefore": false,
        "doneLast": "2020-12-31",
        "costs": "NUM",
        "neededMaterials": [
            {
                "name": "STRING",
                "image": "STRING",
                "quantity": "NUM"
            }
        ],
        "slots_booked": {}
    }
    ```

**PATCH /admin/managetasks**

    - Soft deletes all tasks.

**POST /admin/managetasks/:id**

    - Reactivates a specific task by ID.

**PATCH /admin/managetasks/:id**

    - Soft deletes a specific task by ID.

**PUT /admin/managetasks/:id**

    - Edits a specific task by ID.

### Tasks

**GET /tasks**

    - Retrieves all tasks.

**GET /tasks/:id**

    - Retrieves a specific task by ID.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgements

Special thanks to the contributors and maintainers of the libraries and tools used in this project, including Express, Mongoose, and JWT.

Feel free to reach out with any questions or feedback!
