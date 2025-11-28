# Quick Start Guide - MongoDB

## Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

## Setup Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB from: https://www.mongodb.com/try/download/community
# Then update .env:
MONGODB_URI=mongodb://localhost:27017/taskflow_db
```

**Option B: MongoDB Atlas (Cloud)**
```bash
# 1. Sign up at: https://www.mongodb.com/cloud/atlas
# 2. Create free cluster
# 3. Get connection string
# 4. Update .env:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow_db
```

### 3. Create .env File
```bash
# Copy example
copy env.example .env

# Edit .env and set MONGODB_URI
```

### 4. Start Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected: localhost
🚀 Server is running on http://localhost:5000
```

### 5. Seed Database (Optional)
```bash
npm run seed
```

## That's It!

Your backend is now running with MongoDB! 🎉

See `MONGODB_SETUP.md` for detailed setup instructions.

