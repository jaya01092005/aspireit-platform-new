# Aspireit Platform

A full-stack web application for user authentication and profile management. The application uses React for the frontend and Express for the backend. It implements JWT-based authentication, responsive design using Material-UI, and secure API requests with Axios.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Contributing](#contributing)


## Features
- User authentication with JWT
- Profile management
- Responsive design
- User-friendly error messages and loading indicators

## Tech Stack
- Frontend: React, Material-UI, Axios
- Backend: Node.js, Express, JWT, Multer
- State Management: Redux Toolkit

## Setup

### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/aspireit-platform.git
   cd aspireit-platform/server

2. Install the dependencies:
   ``` bash
   npm install
   
3. Start the backend server:
   ``` bash
   node server.js

### Frontend
1. Navigate to the client directory:
   ``` bash
   cd ../client

2. Install the dependencies
   ``` bash
   npm install

3. Start the frontend development server
   ``` bash
   npm start

### Usage
1.Open your browser and navigate to http://localhost:3000/login.

2.Use the following credentials to log in:
Username: user1
Password: password1

3.After logging in, you will be redirected to the profile page where you can view and edit your profile details.


### Project Structure
aspireit-platform/
|-- server/
|   |-- uploads/
|   |-- server.js
|   |-- package.json
|-- client/
|   |-- src/
|   |   |-- api/
|   |   |   |-- axios.js
|   |   |-- components/
|   |   |   |-- LoginForm.js
|   |   |-- pages/
|   |   |   |-- LoginPage.js
|   |   |   |-- ProfilePage.js
|   |   |-- store/
|   |   |   |-- authSlice.js
|   |   |   |-- store.js
|   |   |-- App.js
|   |   |-- index.js
|   |   |-- index.css
|   |-- public/
|   |   |-- index.html
|   |-- package.json

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Summary

This `README.md` provides:

1. **Project Overview**: A brief description of the project and its features.
2. **Tech Stack**: The technologies used in the project.
3. **Setup Instructions**: Detailed steps to set up the backend and frontend.
4. **Usage Instructions**: How to use the application after setup.
5. **Project Structure**: A directory tree to understand the project organization.
6. **Contributing**: A section inviting contributions.

### DONE BY:
Jayashree M

jayamanik2005@gmail.com





