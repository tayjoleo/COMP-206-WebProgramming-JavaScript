# COMP-206: Web Programming with JavaScript

## Project Overview
This repository contains my **final assignment** for Web Programming with JavaScript (COMP 206) at St. Lawrence College. The project is a **full-stack to-do application** built using **Node.js, Express.js, and MySQL**, with RESTful API endpoints and a templated front-end.

## Learning Objectives
This project applies:
- **JavaScript & Node.js Development**: Server-side scripting with event-driven programming.
- **RESTful API Design**: Implementing CRUD operations for task management.
- **Database Integration**: Handling structured data using **MySQL & SQL queries**.
- **Templating with Pug (Jade)**: Rendering dynamic views for the front-end.
- **Middleware & Routing in Express.js**: Managing requests, responses, and authentication flows.
- **Soft Delete Functionality**: Implementing a system that archives tasks instead of deleting them.

## Project Features
- **Task Management API**: Handles creating, retrieving, updating, and soft-deleting tasks.
- **Database-Backed Storage**: Stores tasks persistently in a **MySQL database**.
- **Templated UI with Pug (Jade)**: Generates dynamic HTML views.
- **Error Handling & Validation**: Prevents invalid requests and ensures API reliability.
- **Modular Code Structure**: Organized into different files for clarity and maintainability.

## Repository Structure
```
COMP-206-TodoApp-NodeJS/
│── README.md                    # Project Overview
│── routes/                      # Main server logic
│   ├── index.js                 # Home page template
│   ├── todolist.js              # Shared layout template
│── app.js                       # API documentation file
│── todolist.js                  # API logic for CRUD operations
│── database.js                  # Database connection
│── db.js                        # SQL queries and data access
│── views/                       # Templating with Pug (Jade)
│   ├── index.jade               # Home page template
│   ├── layout.jade              # Shared layout template
│   ├── error.jade               # Error handling page
│── public/                      # Static assets (CSS, images, JS)
│   ├── style.css                # Application styles
│── package.json                 # Node.js dependencies
│── package-lock.json            # Dependency lock file
│── JavaPseudo.txt               # Program pseudocode
│── .gitignore                   # Ignored files (node_modules, etc.)
```

## How to Install & Run
### **1. Clone the Repository**
```bash
git clone https://github.com/tayjoleo/COMP-206-TodoApp-NodeJS.git
cd COMP-206-TodoApp-NodeJS
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure the Database**
1. Create a MySQL database.
2. Update `database.js` with your database credentials.
3. Run the migration script (if applicable) to create tables.

### **4. Start the Application**
```bash
node app.js
```

## Future Improvements
- Implement **authentication** for secure access.
- Add **pagination & filtering** for large datasets.
- Enhance **UI responsiveness** with a front-end framework.

## Author
Taylor Evans | Contact: **taylor.evans@student.sl.on.ca**
