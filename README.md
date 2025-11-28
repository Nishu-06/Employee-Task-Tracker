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
- [Quick Start Guide](#quick-start-guide)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Role-Based Access Control](#role-based-access-control)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Project Summary & Requirements](#project-summary--requirements)
- [Deployment Guide](#deployment-guide)
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

## 🚀 Quick Start Guide

### Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v18+) installed
- ✅ MongoDB installed and running (or MongoDB Atlas account)
- ✅ npm or yarn package manager

### Quick Setup (5 minutes)

#### 1. Database Setup

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

#### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run seed  # Optional: Seed sample data
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### Access the Application

Open your browser and navigate to: `http://localhost:5173`

### Default Sample Data

After running `npm run seed` in the backend, you'll have:
- 15 sample employees
- 25 sample tasks
- Default users:
  - **Admin**: `admin@taskflow.com` / `admin123`
  - **User**: `user@taskflow.com` / `user123`
- Various departments and roles
- Mixed task statuses and priorities

### Troubleshooting

**Database Connection Error**
- Check MongoDB is running: `mongosh` (or `mongo` for older versions)
- Verify credentials in `.env` file
- Ensure MongoDB connection string is correct

**Port Already in Use**
- Backend: Change `PORT` in `.env`
- Frontend: Change port in `vite.config.js`

**CORS Errors**
- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL
- Default: `http://localhost:5173`

### Next Steps

1. Explore the Dashboard
2. Add your first employee (as Admin)
3. Create tasks and assign them
4. Try drag-and-drop on the Kanban board
5. Toggle dark mode!

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

## 🔐 Role-Based Access Control

The application implements strict role-based access control with two user roles:

- **Admin**: Full access to manage employees and tasks
- **Regular User**: Can view employees and manage their assigned tasks

### Access Control Matrix

#### Admin Users

**Employees:**
- ✅ View all employees
- ✅ Create employees
- ✅ Update employees
- ✅ Delete employees
- ✅ Search and filter employees

**Tasks:**
- ✅ View all tasks
- ✅ Create tasks
- ✅ Update tasks (all fields)
- ✅ Delete tasks
- ✅ Update task status
- ✅ Filter by assignee, status, priority
- ✅ Assign tasks to any employee

**Dashboard:**
- ✅ View all statistics
- ✅ See all employees count
- ✅ See all tasks count

#### Regular Users

**Employees:**
- ✅ View all employees (read-only)
- ❌ Cannot create employees
- ❌ Cannot update employees
- ❌ Cannot delete employees
- ✅ Can search and filter employees

**Tasks:**
- ✅ View only tasks assigned to them
- ❌ Cannot create tasks
- ❌ Cannot update tasks (except status)
- ❌ Cannot delete tasks
- ✅ Can update status of their assigned tasks (drag-and-drop)
- ❌ Cannot filter by assignee (only see their own)
- ✅ Can filter by status and priority

**Dashboard:**
- ✅ View global dashboard summary (all employees and all tasks)
- ✅ See total employee count
- ✅ See total task counts (all tasks in system)
- ✅ See tasks by status and priority (global view)
- ✅ See recent tasks (all tasks)

### Implementation Details

#### Backend Changes

1. **Task Routes** (`backend/routes/taskRoutes.js`):
   - `POST /api/tasks` - Admin only
   - `PUT /api/tasks/:id` - Admin only
   - `DELETE /api/tasks/:id` - Admin only
   - `PATCH /api/tasks/:id/status` - All authenticated users (with ownership check)

2. **Task Controller** (`backend/controllers/taskController.js`):
   - `getAllTasks()` - Filters by user's employeeId for regular users
   - `getTaskById()` - Checks ownership for regular users
   - `updateTaskStatus()` - Allows regular users to update their own tasks

3. **Dashboard Controller** (`backend/controllers/dashboardController.js`):
   - Filters all statistics by user's employeeId for regular users
   - Hides employee count for regular users

#### Frontend Changes

1. **Tasks Page** (`frontend/src/pages/Tasks.jsx`):
   - Hides "Add Task" button for regular users
   - Hides edit/delete buttons for regular users
   - Hides "Assign To" filter for regular users
   - Hides "Assign To" field in task form for regular users
   - Only fetches employees if admin

2. **Employees Page** (`frontend/src/pages/Employees.jsx`):
   - Hides "Add Employee" button for regular users
   - Hides edit/delete buttons for regular users

3. **Layout** (`frontend/src/components/Layout.jsx`):
   - Shows user name and role in navigation
   - Logout button visible to all users

### User-Employee Linking

Users are linked to employees via the `employeeId` field in the User model. This allows:
- Regular users to see tasks assigned to their employee record
- Proper filtering of tasks based on user's employee association

**Note:** When creating a new user account, you can optionally link them to an employee by providing `employeeId` during registration. The seed script automatically links default users to employees.

### Testing

**Test as Admin:**
1. Login: `admin@taskflow.com` / `admin123`
2. Should see all employees and tasks
3. Can create, update, delete both employees and tasks
4. Can assign tasks to any employee

**Test as Regular User:**
1. Login: `user@taskflow.com` / `user123`
2. Should only see tasks assigned to their employee record
3. Cannot create, update, or delete tasks (except status update)
4. Cannot manage employees
5. Can update status of their assigned tasks via drag-and-drop

### Security Notes

- All API endpoints require authentication (JWT token)
- Role checks are performed on the backend (never trust frontend)
- Regular users cannot bypass restrictions by manipulating API calls
- Task ownership is verified before allowing status updates
- Employee operations are restricted to admins only

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

## 📊 Project Summary & Requirements

### ✅ Requirements Coverage

#### Core Requirements

- ✅ **Fullstack Application**: Complete frontend, backend, and database
- ✅ **View All Employees**: Employee list with search and filters
- ✅ **View All Tasks**: Task list with Kanban board view
- ✅ **Add Tasks**: Create new tasks with full details
- ✅ **Update Tasks**: Update task status, details, assignments
- ✅ **Filter Tasks**: Filter by status, priority, assigned employee
- ✅ **Dashboard Summary**: Total tasks, completion rate, statistics

#### Tech Stack Requirements

- ✅ **Frontend**: React + Tailwind CSS + Axios
- ✅ **Backend**: Node.js + Express
- ✅ **Database**: MongoDB (Note: Originally requested PostgreSQL, but migrated to MongoDB for easier setup)
- ✅ **API**: RESTful endpoints with validation & error handling

#### Architecture Requirements

- ✅ **Frontend Structure**:
  - `src/components/` - UI components (Layout, Modal, LoadingSpinner, etc.)
  - `src/pages/` - Employee list, Task list, Dashboard, Login, Register
  - `src/api/` - Axios API calls
  - `src/context/` - Authentication context

- ✅ **Backend Structure**:
  - `models/` - Employee, Task, User models
  - `routes/` - REST endpoints
  - `controllers/` - Business logic
  - `middleware/` - Authentication, validation, error handling

- ✅ **Database**:
  - MongoDB schemas defined
  - Seed script with sample data

#### API Endpoints

- ✅ `GET /api/employees` → list employees
- ✅ `GET /api/tasks` → list tasks
- ✅ `POST /api/tasks` → add new task
- ✅ `PUT /api/tasks/:id` → update task status/details
- ✅ `GET /api/dashboard` → summary stats
- ✅ `POST /api/auth/register` → register user
- ✅ `POST /api/auth/login` → login user
- ✅ `GET /api/auth/me` → get current user

#### Bonus Features (Optional - ✅ Implemented)

- ✅ **Authentication**: Complete JWT-based authentication
- ✅ **Role-Based Access**: Admin vs Regular User roles
  - Admin: Can create, update, delete employees
  - User: Can view employees, manage tasks

#### Best Practices

- ✅ Environment variables for API URLs & DB config
- ✅ Responsive UI with clean design
- ✅ Proper CRUD operations with DB persistence
- ✅ Modular, readable code with consistent naming
- ✅ Error handling & validation in backend
- ✅ Protected routes with authentication
- ✅ Role-based access control

### 🎯 Key Features Implemented

#### Authentication & Security
- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control (Admin/User)
- Automatic token refresh
- Secure logout

#### Employee Management
- View all employees
- Search and filter employees
- Create employee (Admin only)
- Update employee (Admin only)
- Delete employee (Admin only)
- View employee tasks

#### Task Management
- View all tasks in Kanban board
- Create tasks
- Update task details
- Update task status (drag-and-drop)
- Delete tasks (Admin only)
- Filter by status, priority, assignee
- Search tasks
- Deadline tracking

#### Dashboard
- Total employees count
- Total tasks count
- Completed tasks count
- Pending tasks count
- Tasks by status (pie chart)
- Tasks by priority (bar chart)
- Recent tasks list

#### UI/UX
- Responsive design (mobile, tablet, desktop)
- Dark mode toggle
- Loading states
- Toast notifications
- Form validation
- Empty states
- Confirmation dialogs

### ✅ Everything is Covered!

All requirements from the specification have been implemented:
- ✅ Fullstack application
- ✅ All CRUD operations
- ✅ Filtering and search
- ✅ Dashboard with statistics
- ✅ Authentication & role-based access (bonus)
- ✅ Clean architecture
- ✅ Error handling
- ✅ Validation
- ✅ Documentation

The application is production-ready and fully functional!

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

## 🚢 Deployment Guide

This guide covers deploying TaskFlow Pro to various platforms.

### Backend Deployment

#### Railway / Render / Heroku

1. **Create a new project** on your chosen platform
2. **Connect your repository**
3. **Set environment variables:**
   ```
   MONGODB_URI=your-mongodb-connection-string
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=your-production-secret
   CORS_ORIGIN=https://your-frontend-domain.com
   ```
4. **Set build command:** (if needed)
   ```
   npm install
   ```
5. **Set start command:**
   ```
   npm start
   ```
6. **Database:** Use MongoDB Atlas (recommended) or platform's MongoDB addon

### Database Setup

For production, use a managed MongoDB service:
- **MongoDB Atlas** (Recommended - Free tier available)
- **Railway MongoDB**
- **Render MongoDB**
- **AWS DocumentDB**

After deployment, run migrations:
```bash
# The server will auto-sync on startup
# Or manually run seed script if needed
npm run seed
```

### Frontend Deployment

#### Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```
2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```
3. **Set environment variable:**
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
4. **Redeploy** after setting environment variables

#### Netlify

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```
2. **Build and deploy:**
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod --dir=dist
   ```
3. **Set environment variable** in Netlify dashboard:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

#### Manual Build

```bash
cd frontend
npm run build
# Upload dist/ folder to your hosting service
```

### Environment Variables Summary

#### Backend (.env)
```env
MONGODB_URI=your-mongodb-connection-string
PORT=5000
NODE_ENV=production
JWT_SECRET=generate-a-secure-random-string
CORS_ORIGIN=https://your-frontend-domain.com
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

### Post-Deployment Checklist

- [ ] Database is accessible and collections are created
- [ ] Backend API is responding at `/api/health` (if implemented)
- [ ] CORS is configured correctly
- [ ] Frontend can connect to backend API
- [ ] Environment variables are set correctly
- [ ] HTTPS is enabled (recommended)
- [ ] Database backups are configured
- [ ] Error logging is set up (consider Sentry)

### Troubleshooting

#### CORS Issues
- Ensure `CORS_ORIGIN` matches your frontend domain exactly
- Include protocol (https://) in CORS_ORIGIN

#### Database Connection
- Verify MongoDB connection string
- Check firewall rules allow connections
- Ensure database is publicly accessible (if needed)
- For MongoDB Atlas, whitelist your IP address

#### Build Errors
- Check Node.js version matches (v18+)
- Clear node_modules and reinstall
- Verify all environment variables are set

### Security Recommendations

1. **Use strong JWT_SECRET** (32+ characters, random)
2. **Enable HTTPS** for both frontend and backend
3. **Set up rate limiting** (consider express-rate-limit)
4. **Use environment variables** for all secrets
5. **Enable database SSL** connections (MongoDB Atlas default)
6. **Set up monitoring** (e.g., Sentry, LogRocket)
7. **Regular backups** of database
8. **Keep dependencies updated**

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

