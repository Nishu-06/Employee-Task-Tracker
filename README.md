# TaskFlow ProU — Employee Task Tracker

A fullstack web application for managing employees and tracking their assigned tasks. Built with React frontend, Express backend, and MongoDB database.

## 🚀 Live Application

- **Backend API:** [https://employee-task-tracker-vfc4.onrender.com/api](https://employee-task-tracker-vfc4.onrender.com/api)
- **Backend URL:** [https://employee-task-tracker-vfc4.onrender.com](https://employee-task-tracker-vfc4.onrender.com)

**Default Admin Credentials:**
- Email: `admin@taskflow.com`
- Password: `admin123`

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Tech Stack & Architecture](#2-tech-stack--architecture)
- [3. Setup & Run Instructions](#3-setup--run-instructions)
- [4. API Endpoint Documentation](#4-api-endpoint-documentation)
- [5. Screenshots / Screen Recording](#5-screenshots--screen-recording)
- [6. Assumptions & Limitations](#6-assumptions--limitations)

---

# 1. Project Overview

**TaskFlow ProU** is a comprehensive Employee Task Tracker designed to streamline task management and employee oversight within organizations. The application provides a centralized platform where administrators can manage employees and assign tasks, while employees can view and update their assigned tasks.

### Key Features

- **Employee Management**: Create, view, update, and delete employee records
- **Task Management**: Full CRUD operations for tasks with status tracking
- **Role-Based Access**: Admin and Employee roles with different permission levels
- **Dashboard Analytics**: Overview statistics and visual charts
- **Kanban Board**: Drag-and-drop task management interface
- **Authentication**: Secure JWT-based authentication system

### Technology Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas (cloud-hosted)
- **Authentication**: JWT tokens with role-based access control

---

# 2. Tech Stack & Architecture

### Frontend Technologies

- **React 18+** — UI library for building user interfaces
- **Vite** — Fast build tool and development server
- **Tailwind CSS** — Utility-first CSS framework for styling
- **Axios** — HTTP client for API requests
- **React Router** — Client-side routing
- **Recharts** — Chart library for data visualization
- **@hello-pangea/dnd** — Drag-and-drop functionality for Kanban board

### Backend Technologies

- **Node.js** — JavaScript runtime environment
- **Express.js** — Web application framework
- **Mongoose** — MongoDB object modeling tool
- **JWT (jsonwebtoken)** — Authentication token management
- **express-validator** — Input validation middleware
- **bcrypt** — Password hashing

### Database

- **MongoDB Atlas** — Cloud-hosted NoSQL database

### Authentication

- **JWT-based Authentication** with two roles:
  - **Admin**: Full access to manage employees and tasks
  - **Employee**: View own tasks and update task status

### Project Structure

```
TaskFlow ProU/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/             # API service functions
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context (AuthContext)
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component with routes
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Express backend application
│   ├── config/              # Configuration files
│   │   └── database.js      # MongoDB connection
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   ├── taskController.js
│   │   └── dashboardController.js
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js          # JWT authentication
│   │   ├── validation.js    # Input validation
│   │   └── errorHandler.js  # Error handling
│   ├── models/              # Mongoose models
│   │   ├── User.js
│   │   ├── Employee.js
│   │   └── Task.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── taskRoutes.js
│   │   └── dashboardRoutes.js
│   ├── scripts/             # Utility scripts
│   │   └── seed.js          # Database seeding
│   ├── server.js            # Express server entry point
│   └── package.json
│
└── README.md                 # This file
```

---

# 3. Setup & Run Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)
- **MongoDB Atlas account** (free tier available) — [Sign up](https://www.mongodb.com/cloud/atlas)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd "TaskFlow ProU"
```

### Step 2: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow_db?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   CORS_ORIGIN=http://localhost:5173
   ```

   **Note:** Replace `MONGODB_URI` with your MongoDB Atlas connection string. You can get this from your MongoDB Atlas dashboard.

5. **Seed the database (optional but recommended):**
   ```bash
   npm run seed
   ```
   This creates sample employees, tasks, and default admin user (`admin@taskflow.com` / `admin123`).

6. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file (optional):**
   ```bash
   # Create .env file in frontend directory
   ```
   Add the following to `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   **Note:** If not specified, the frontend defaults to `http://localhost:5000/api`.

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Step 4: Access the Application

1. Open your browser and navigate to: `http://localhost:5173`
2. Login with default admin credentials:
   - **Email:** `admin@taskflow.com`
   - **Password:** `admin123`

### Deployment Instructions

#### Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from frontend directory:**
   ```bash
   cd frontend
   vercel
   ```

3. **Set environment variable in Vercel dashboard:**
   - Go to your project settings
   - Add environment variable: `VITE_API_URL` = `https://employee-task-tracker-vfc4.onrender.com/api`
   - Redeploy after setting the variable

#### Backend Deployment (Render)

1. **Create a new web service on Render:**
   - Visit [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the service:**
   - **Root Directory:** Set to `backend/`
   - **Build Command:** Leave blank (uses `npm run build` from `backend/package.json`)
   - **Start Command:** Leave blank (uses `npm start` from `backend/package.json`)

3. **Configure environment variables:**
   - `MONGODB_URI` — Your MongoDB Atlas connection string
   - `PORT` — Render will set this automatically
   - `NODE_ENV` — `production`
   - `JWT_SECRET` — Generate a secure random string
   - `CORS_ORIGIN` — Your frontend URL (e.g., `https://your-app.vercel.app`)

4. **Deploy:**
   - Render will automatically build the frontend and deploy the backend
   - Your backend will be available at `https://employee-task-tracker-vfc4.onrender.com`

#### Database (MongoDB Atlas)

1. **Create a MongoDB Atlas account:**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create a cluster:**
   - Choose a cloud provider and region
   - Select M0 (Free) tier

3. **Configure database access:**
   - Create a database user with username and password
   - Whitelist IP addresses (use `0.0.0.0/0` for all IPs in development)

4. **Get connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

---

# 4. API Endpoint Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://employee-task-tracker-vfc4.onrender.com/api
```

## Authentication

All endpoints (except `/auth/register` and `/auth/login`) require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register a new user | No |
| `POST` | `/auth/login` | Login and get JWT token | No |
| `GET` | `/auth/me` | Get current user profile | Yes |

**Register Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Login Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@taskflow.com",
  "password": "admin123"
}
```

**Login Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "Admin User",
    "email": "admin@taskflow.com",
    "role": "admin"
  }
}
```

### Employee Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| `GET` | `/employees` | List all employees | Yes | Admin |
| `GET` | `/employees/:id` | Get employee by ID | Yes | Admin |
| `POST` | `/employees` | Create new employee | Yes | Admin |
| `PUT` | `/employees/:id` | Update employee | Yes | Admin |
| `DELETE` | `/employees/:id` | Delete employee | Yes | Admin |

**Get All Employees:**
```http
GET /api/employees
Authorization: Bearer <token>
```

**Create Employee:**
```http
POST /api/employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@taskflow.com",
  "role": "Developer",
  "department": "Engineering",
  "phone": "+1-555-0101"
}
```

### Task Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| `GET` | `/tasks` | List tasks (admin = all, employee = own) | Yes | Any |
| `GET` | `/tasks/:id` | Get task by ID | Yes | Any (own tasks) |
| `POST` | `/tasks` | Create new task | Yes | Admin |
| `PUT` | `/tasks/:id` | Update task | Yes | Admin |
| `PATCH` | `/tasks/:id/status` | Update task status | Yes | Any (own tasks) |
| `DELETE` | `/tasks/:id` | Delete task | Yes | Admin |

**Get All Tasks:**
```http
GET /api/tasks
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` — Filter by status (To Do, In Progress, Completed)
- `priority` — Filter by priority (Low, Medium, High)
- `assigned_to` — Filter by employee ID
- `search` — Search by title or description

**Create Task:**
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Implement authentication",
  "description": "Create JWT-based authentication system",
  "status": "To Do",
  "priority": "High",
  "assigned_to": "employee_id",
  "deadline": "2024-12-31"
}
```

**Update Task Status:**
```http
PATCH /api/tasks/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "In Progress"
}
```

#### Dashboard Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| `GET` | `/dashboard/stats` | Get dashboard statistics | Yes | Any |
| `GET` | `/dashboard/employee-workload` | Get employee workload distribution | Yes | Admin |

**Get Dashboard Stats:**
```http
GET /api/dashboard/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalEmployees": 15,
      "totalTasks": 25,
      "completedTasks": 5,
      "pendingTasks": 20
    },
    "tasksByStatus": [
      {"status": "To Do", "count": 10},
      {"status": "In Progress", "count": 10},
      {"status": "Completed", "count": 5}
    ],
    "tasksByPriority": [
      {"priority": "High", "count": 8},
      {"priority": "Medium", "count": 12},
      {"priority": "Low", "count": 5}
    ],
    "recentTasks": [...]
  }
}
```

### Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:
- `200` — Success
- `201` — Created
- `400` — Bad Request
- `401` — Unauthorized
- `403` — Forbidden
- `404` — Not Found
- `500` — Internal Server Error

---

# 5. Screenshots / Screen Recording
## **Screen Recording:** [Watch demo](https://drive.google.com/file/d/1rv_VrEjfhr_QCYF0XlsL1sf5tIRcYNdz/view?usp=sharing)

**Dashboard & Login**
<p>
  <img src="frontend/assets/login-page.png" alt="Login Page" width="48%" />
  <img src="frontend/assets/dashboard.png" alt="Dashboard" width="48%" />
</p>

**Employees & Tasks**
<p>
  <img src="frontend/assets/Employees.png" alt="Employees" width="48%" />
  <img src="frontend/assets/Tasks.png" alt="Tasks" width="48%" />
</p>

**Add Employee & Add Task**
<p>
  <img src="frontend/assets/Add%20new%20Employee.png" alt="Add Employee" width="48%" />
  <img src="frontend/assets/Add%20new%20Task.png" alt="Add Task" width="48%" />
</p>

**Dark Mode & Recent Tasks**
<p>
  <img src="frontend/assets/dark-mode.png" alt="Dark Mode" width="48%" />
  <img src="frontend/assets/recent-tasks.png" alt="Recent Tasks" width="48%" />
</p>


---

# 6. Assumptions & Limitations

## Assumptions

1. **Default Admin User**: The database seed script creates a default admin user with credentials:
   - **Email:** `admin@taskflow.com`
   - **Password:** `admin123`
   - This user is linked to the first employee in the seed data.

2. **MongoDB Atlas**: The application assumes MongoDB Atlas is used for production. Local MongoDB can be used for development.

3. **Environment Variables**: All sensitive configuration is managed through environment variables.

4. **CORS Configuration**: Frontend and backend are expected to run on different ports/domains, requiring CORS configuration.

## Limitations

1. **Role Management**: The application supports only two roles (Admin and Employee). There is no advanced role management system with custom permissions or multiple role assignments.

2. **UI Design**: The UI is functional and responsive but focuses on functionality over extensive design polish. Advanced animations and complex UI components are not implemented.

3. **Task Assignment**: Employees can only update the status of tasks assigned to them. They cannot create, edit, or delete tasks.

4. **No Real-time Updates**: The application does not use WebSockets or real-time communication. Data updates require page refresh or manual API calls.

5. **File Uploads**: The application does not support file attachments for tasks or employee profile pictures (uses generated avatars).

6. **Email Notifications**: No email notification system for task assignments or updates.

7. **Pagination**: Large datasets are not paginated. All data is loaded at once.

8. **Search Functionality**: Basic search is implemented, but advanced filtering and sorting options are limited.

---

## License

This project is open source and available under the MIT License.

---

## Support

For questions, issues, or contributions, please open an issue in the repository.

---
