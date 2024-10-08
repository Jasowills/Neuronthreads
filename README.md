# Neuronthreads
E-Mart Application
Overview
E-Mart is a full-stack e-commerce application built using Vue.js for the frontend and Node.js/Express for the backend. This application allows users to register, login, and browse products. Admins can manage products (add, edit, delete) and users can view products and make purchases.

Features
User registration and authentication
Product listing and management (for admins)
Responsive design
Notifications for success and error messages
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14+)
npm 
Getting Started
1. Clone the Repository
bash
Copy code
git clone https://github.com/Jasowills/Neuronthreads
cd e-mart
2. Install Dependencies
Navigate to the root directory and install the necessary dependencies for both the frontend and backend:

bash
Copy code
npm install
cd backend
npm install
cd ../frontend
npm install
cd ..
3. Start the Application
You can start both the backend and frontend servers simultaneously using the following command:

bash
Copy code
npm start
This will start:

The backend server on http://localhost:3000
The frontend development server on http://localhost:5173
4. Accessing the Application
Once the servers are running, you can access the application by navigating to http://localhost:5173 in your web browser.

5. Registering a New User
To create a new user account:

Go to http://localhost:5173/register.
Fill in your first name, last name, username, and password.
Click "Register" to create your account.
6. Logging In
To log into your account:

Go to http://localhost:5173/login.
Enter your registered email and password.
Click "Login" to access your account.
7. Product Management (Admin)
Admins can manage products through the admin interface:

View Products: All products are listed on the admin page.
Add Product: Fill out the form and click "Add Product."
Edit Product: Click on the edit icon next to a product, update the details, and save.
Delete Product: Click on the delete icon next to a product, confirm the deletion.
8. Notifications
The application includes notifications that provide feedback on various actions (e.g., successful login, product added, error during registration). These notifications appear at the top right of the screen and disappear automatically after a few seconds.

Project Structure
backend/: Contains the Node.js/Express server, routes, and database configuration.
frontend/: Contains the Vue.js application, components, and styles.
public/: Static assets for the frontend.
src/: Source code for the frontend, including Vue components and router configuration.
Technologies Used
Frontend: Vue.js, Vue Router, Vuex, Vite
Backend: Node.js, Express, MongoDB/MySQL/PostgreSQL (depending on your setup)
Styling: Custom CSS (No Tailwind/Bootstrap)
Contributing
If you'd like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and commit them (git commit -m 'Add YourFeature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or issues, feel free to open an issue on GitHub or contact the me.