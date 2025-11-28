# Role-Based Access Control Implementation

## Overview

The application now implements strict role-based access control with two user roles:

- **Admin**: Full access to manage employees and tasks
- **Regular User**: Can only view their assigned tasks

## Access Control Matrix

### Admin Users

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

### Regular Users

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

## Implementation Details

### Backend Changes

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

### Frontend Changes

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

## User-Employee Linking

Users are linked to employees via the `employeeId` field in the User model. This allows:
- Regular users to see tasks assigned to their employee record
- Proper filtering of tasks based on user's employee association

**Note:** When creating a new user account, you can optionally link them to an employee by providing `employeeId` during registration. The seed script automatically links default users to employees.

## Testing

### Test as Admin:
1. Login: `admin@taskflow.com` / `admin123`
2. Should see all employees and tasks
3. Can create, update, delete both employees and tasks
4. Can assign tasks to any employee

### Test as Regular User:
1. Login: `user@taskflow.com` / `user123`
2. Should only see tasks assigned to their employee record
3. Cannot create, update, or delete tasks (except status update)
4. Cannot manage employees
5. Can update status of their assigned tasks via drag-and-drop

## Security Notes

- All API endpoints require authentication (JWT token)
- Role checks are performed on the backend (never trust frontend)
- Regular users cannot bypass restrictions by manipulating API calls
- Task ownership is verified before allowing status updates
- Employee operations are restricted to admins only

