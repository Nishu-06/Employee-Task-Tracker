# TaskFlow Pro - Employee & Task Management System

A full-stack web application for managing employees and their assigned tasks with a modern, intuitive interface. Built with React, Node.js, Express, and MongoDB.

![TaskFlow Pro](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Bonus Features](#bonus-features)
- [Assumptions Made](#assumptions-made)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

## ✨ Features

### Core Features

- **Employee Management**
  - Create, read, update, and delete employees
  - Search employees by name or email
  - Filter by department and role
  - View employee details with assigned tasks
  - Automatic avatar generation using UI Avatars API

- **Task Management**
  - Full CRUD operations for tasks
  - Kanban board with drag-and-drop functionality
  - Task status tracking (To Do, In Progress, Completed)
  - Priority levels (Low, Medium, High)
  - Task assignment to employees
  - Deadline tracking with overdue indicators
  - Search and filter tasks

- **Dashboard**
  - Overview statistics (total employees, tasks, completed/pending tasks)
  - Visual charts for tasks by status and priority
  - Recent tasks list
  - Real-time data updates

### UI/UX Features

- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Loading States**: Skeleton loaders and spinners for async operations
- **Toast Notifications**: Success and error messages
- **Form Validation**: Client-side validation with error messages
- **Empty States**: Helpful messages when no data is available
- **Confirmation Dialogs**: Safe delete operations with confirmation

## 🛠 Tech Stack

### Frontend
- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Chart library for data visualization
- **@hello-pangea/dnd** - Drag and drop for Kanban board
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **date-fns** - Date formatting utilities

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas cloud) - [Download](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Git** (optional, for cloning)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "TaskFlow ProU"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file (copy from .env.example)
cp .env.example .env

# Edit .env file with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/taskflow_db
# (or MongoDB Atlas connection string)
# PORT=5000
# NODE_ENV=development
# JWT_SECRET=your-secret-key
# CORS_ORIGIN=http://localhost:5173
```

### 3. Database Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB from: https://www.mongodb.com/try/download/community
# Start MongoDB service (Windows: net start MongoDB)
# No need to create database manually - MongoDB creates it automatically
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
```bash
# 1. Sign up at: https://www.mongodb.com/cloud/atlas
# 2. Create free cluster
# 3. Get connection string
# 4. Update .env with MONGODB_URI
```

### 4. Configure Environment Variables

```bash
# Copy example file
cp env.example .env

# Edit .env and set:
# MONGODB_URI=mongodb://localhost:27017/taskflow_db
# (or your MongoDB Atlas connection string)
```

### 5. Run Database Seed (Optional)

```bash
# Seed sample data
npm run seed
```

### 5. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file (optional, for custom API URL)
# VITE_API_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

#### Start Backend in Production

```bash
cd backend
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Employee Endpoints

**Note:** All employee endpoints require authentication. Create/Update/Delete operations require admin role.

#### Get All Employees
```http
GET /api/employees
Authorization: Bearer <token>
```

**Query Parameters:**
- `department` (optional): Filter by department (Engineering, Design, Marketing, HR)
- `role` (optional): Filter by role (Manager, Developer, Designer, Intern)
- `search` (optional): Search by name or email

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Smith",
      "email": "john.smith@taskflow.com",
      "role": "Manager",
      "department": "Engineering",
      "phone": "+1-555-0101",
      "avatar_url": "https://...",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Get Employee by ID
```http
GET /api/employees/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Smith",
    "email": "john.smith@taskflow.com",
    "role": "Manager",
    "department": "Engineering",
    "tasks": [...]
  }
}
```

#### Create Employee (Admin Only)
```http
POST /api/employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane.doe@taskflow.com",
  "role": "Developer",
  "department": "Engineering",
  "phone": "+1-555-0102"
}
```

#### Update Employee (Admin Only)
```http
PUT /api/employees/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe Updated",
  "role": "Manager"
}
```

#### Delete Employee (Admin Only)
```http
DELETE /api/employees/:id
Authorization: Bearer <token>
```

### Task Endpoints

**Note:** All task endpoints require authentication. Delete operations require admin role.

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (To Do, In Progress, Completed)
- `priority` (optional): Filter by priority (Low, Medium, High)
- `assigned_to` (optional): Filter by employee ID or "unassigned"
- `search` (optional): Search by title or description

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Implement authentication",
      "description": "Create JWT-based auth",
      "status": "In Progress",
      "priority": "High",
      "assigned_to": 2,
      "deadline": "2024-02-15T00:00:00.000Z",
      "assignedEmployee": {...},
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Get Task by ID
```http
GET /api/tasks/:id
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "To Do",
  "priority": "Medium",
  "assigned_to": 1,
  "deadline": "2024-02-20"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated Task",
  "status": "In Progress"
}
```

#### Update Task Status
```http
PATCH /api/tasks/:id/status
Content-Type: application/json

{
  "status": "Completed"
}
```

#### Delete Task (Admin Only)
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

### Dashboard Endpoints

**Note:** All dashboard endpoints require authentication.

#### Get Dashboard Statistics
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

#### Get Employee Workload
```http
GET /api/dashboard/employee-workload
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Smith",
      "email": "john@taskflow.com",
      "role": "Manager",
      "department": "Engineering",
      "taskCount": 5
    }
  ]
}
```

## 📁 Project Structure

```
TaskFlow ProU/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── dashboardController.js
│   │   ├── employeeController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handler
│   │   └── validation.js        # Input validation rules
│   ├── models/
│   │   ├── Employee.js          # Employee model
│   │   └── Task.js             # Task model
│   ├── routes/
│   │   ├── dashboardRoutes.js
│   │   ├── employeeRoutes.js
│   │   └── taskRoutes.js
│   ├── scripts/
│   │   └── seed.js              # Database seeding script
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Express server entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js         # Axios configuration
│   │   │   ├── dashboard.js
│   │   │   ├── employees.js
│   │   │   └── tasks.js
│   │   ├── components/
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── Modal.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   └── Tasks.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── postcss.config.js
│
└── README.md
```

## 📸 Screenshots

### Dashboard
The dashboard provides an overview of employees and tasks with visual statistics and charts.

### Employees Page
Manage your team with a clean card-based layout, search, and filters.

### Tasks Page (Kanban Board)
Drag and drop tasks between columns to update their status. View task details, priorities, and deadlines.

## 🎁 Bonus Features Implemented

1. ✅ **Authentication & Role-Based Access** - Complete JWT authentication with Admin/User roles
2. ✅ **Dark Mode Toggle** - Persistent theme preference in localStorage
3. ✅ **Drag-and-Drop Kanban** - Full drag-and-drop functionality using @hello-pangea/dnd
4. ✅ **Charts** - Recharts integration for dashboard analytics
5. ✅ **Search & Advanced Filters** - Debounced search with multiple filter combinations
6. ✅ **Sorting** - Tasks sorted by creation date (can be extended)
7. ⚠️ **Pagination** - Not implemented (can be added for large datasets)
8. ⚠️ **Export Data** - Not implemented (can be added with CSV/JSON export)
9. ✅ **Avatar Upload** - Automatic avatar generation using UI Avatars API

## 💭 Assumptions Made

1. **Database**: MongoDB is installed locally or MongoDB Atlas account is available
2. **Ports**: Backend runs on port 5000, frontend on 5173 (default Vite port)
3. **Authentication**: JWT authentication is fully implemented - all endpoints require authentication except login/register
4. **Roles**: Two user roles - Admin (can manage employees) and User (can view and manage tasks)
5. **Avatar URLs**: Using UI Avatars API for automatic avatar generation
6. **Date Format**: Dates are stored in ISO 8601 format
7. **CORS**: Frontend and backend are on different ports, CORS is configured
8. **Environment**: Development environment assumed (NODE_ENV=development)
9. **Default Users**: Seed script creates default admin and user accounts for testing

## 🔮 Future Enhancements

1. **Enhanced Authentication**
   - Password reset functionality
   - Email verification
   - Two-factor authentication (2FA)
   - Social login (Google, GitHub)

2. **Advanced Features**
   - Task comments and activity logs
   - File attachments for tasks
   - Email notifications for task assignments
   - Task templates and recurring tasks

3. **Analytics & Reporting**
   - Employee performance metrics
   - Task completion trends
   - Time tracking integration
   - Export reports (PDF, CSV, Excel)

4. **Collaboration**
   - Real-time updates using WebSockets
   - Task mentions and @notifications
   - Team chat integration

5. **UI/UX Improvements**
   - Pagination for large lists
   - Advanced sorting options
   - Bulk operations (delete, update multiple)
   - Keyboard shortcuts
   - Customizable dashboard widgets

6. **Mobile App**
   - React Native mobile application
   - Push notifications
   - Offline mode support

## 👤 Author

**TaskFlow Pro Development Team**

- Built with ❤️ using modern web technologies
- For questions or support, please open an issue in the repository

## 📄 License

This project is open source and available under the MIT License.

---

**Note**: This is a production-ready application with comprehensive features. Make sure to configure your environment variables properly before deployment.

