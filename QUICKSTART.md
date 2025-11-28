# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v18+) installed
- ✅ PostgreSQL (v14+) installed and running
- ✅ npm or yarn package manager

## Quick Setup (5 minutes)

### 1. Database Setup

```bash
# Create database
createdb taskflow_db

# Or using psql
psql -U postgres
CREATE DATABASE taskflow_db;
\q
```

### 2. Backend Setup

```bash
cd backend
npm install
cp env.example .env
# Edit .env with your database credentials
npm run seed  # Optional: Seed sample data
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## Access the Application

Open your browser and navigate to: `http://localhost:5173`

## Default Sample Data

After running `npm run seed` in the backend, you'll have:
- 15 sample employees
- 25 sample tasks
- Various departments and roles
- Mixed task statuses and priorities

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env` file
- Ensure database `taskflow_db` exists

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Change port in `vite.config.js`

### CORS Errors
- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL
- Default: `http://localhost:5173`

## Next Steps

1. Explore the Dashboard
2. Add your first employee
3. Create tasks and assign them
4. Try drag-and-drop on the Kanban board
5. Toggle dark mode!

For detailed documentation, see [README.md](./README.md)

