# MongoDB Setup Guide

## Quick Start

### Option 1: Local MongoDB Installation

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server for Windows
   - Run the installer with default settings

2. **Start MongoDB:**
   - MongoDB runs as a Windows service automatically
   - Or start manually: `net start MongoDB`

3. **Update `.env` file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskflow_db
   ```

4. **Run the application:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended)

1. **Create free account:**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create a cluster:**
   - Click "Build a Database"
   - Choose free tier (M0)
   - Select your region
   - Click "Create"

3. **Setup database access:**
   - Go to "Database Access"
   - Add new database user
   - Set username and password (remember these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"

4. **Setup network access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP

5. **Get connection string:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `taskflow_db`

6. **Update `.env` file:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow_db?retryWrites=true&w=majority
   ```

### Option 3: Docker (If you have Docker installed)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Then use:
```env
MONGODB_URI=mongodb://localhost:27017/taskflow_db
```

## Verify Installation

1. **Check MongoDB is running:**
   ```bash
   # Windows
   net start MongoDB
   
   # Or check services
   services.msc
   ```

2. **Test connection:**
   ```bash
   cd backend
   npm run dev
   ```
   
   You should see:
   ```
   ✅ MongoDB connected: localhost
   🚀 Server is running on http://localhost:5000
   ```

## Seed Sample Data

After MongoDB is connected, seed the database:

```bash
cd backend
npm run seed
```

This will create:
- 15 sample employees
- 25 sample tasks with assignments

## Troubleshooting

### "Connection refused"
- MongoDB service is not running
- Start it: `net start MongoDB`
- Or check if MongoDB is installed

### "Authentication failed"
- Check your MongoDB Atlas credentials
- Verify username and password in connection string
- Ensure IP is whitelisted in Network Access

### "Database not found"
- MongoDB creates databases automatically on first write
- No need to create manually
- Just run the seed script

### Port 27017 already in use
- Another MongoDB instance might be running
- Stop it or use a different port

## Connection String Formats

**Local MongoDB:**
```
mongodb://localhost:27017/taskflow_db
```

**MongoDB Atlas:**
```
mongodb+srv://username:password@cluster.mongodb.net/taskflow_db?retryWrites=true&w=majority
```

**With authentication (local):**
```
mongodb://username:password@localhost:27017/taskflow_db?authSource=admin
```

## Useful Commands

```bash
# Start MongoDB service (Windows)
net start MongoDB

# Stop MongoDB service
net stop MongoDB

# Connect via MongoDB shell (if installed)
mongo
# or
mongosh

# List databases
show dbs

# Use database
use taskflow_db

# Show collections
show collections

# Count documents
db.employees.countDocuments()
db.tasks.countDocuments()
```

## Next Steps

1. ✅ MongoDB is installed and running
2. ✅ `.env` file has correct `MONGODB_URI`
3. ✅ Run `npm install` in backend directory
4. ✅ Run `npm run dev` to start server
5. ✅ Run `npm run seed` to add sample data

For more information, visit: https://docs.mongodb.com/

