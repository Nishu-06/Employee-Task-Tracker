# Deployment Guide

This guide covers deploying TaskFlow Pro to various platforms.

## Backend Deployment

### Railway / Render / Heroku

1. **Create a new project** on your chosen platform
2. **Connect your repository**
3. **Set environment variables:**
   ```
   DB_HOST=your-db-host
   DB_PORT=5432
   DB_NAME=taskflow_db
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
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
6. **Database:** Use the platform's PostgreSQL addon or external database

### Database Setup

For production, use a managed PostgreSQL service:
- **Railway PostgreSQL**
- **Render PostgreSQL**
- **Supabase**
- **AWS RDS**
- **Heroku Postgres**

After deployment, run migrations:
```bash
# The server will auto-sync on startup
# Or manually run seed script if needed
npm run seed
```

## Frontend Deployment

### Vercel

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

### Netlify

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

### Manual Build

```bash
cd frontend
npm run build
# Upload dist/ folder to your hosting service
```

## Environment Variables Summary

### Backend (.env)
```env
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=taskflow_db
DB_USER=your-db-user
DB_PASSWORD=your-db-password
PORT=5000
NODE_ENV=production
JWT_SECRET=generate-a-secure-random-string
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

## Post-Deployment Checklist

- [ ] Database is accessible and tables are created
- [ ] Backend API is responding at `/api/health`
- [ ] CORS is configured correctly
- [ ] Frontend can connect to backend API
- [ ] Environment variables are set correctly
- [ ] HTTPS is enabled (recommended)
- [ ] Database backups are configured
- [ ] Error logging is set up (consider Sentry)

## Troubleshooting

### CORS Issues
- Ensure `CORS_ORIGIN` matches your frontend domain exactly
- Include protocol (https://) in CORS_ORIGIN

### Database Connection
- Verify database credentials
- Check firewall rules allow connections
- Ensure database is publicly accessible (if needed)

### Build Errors
- Check Node.js version matches (v18+)
- Clear node_modules and reinstall
- Verify all environment variables are set

## Security Recommendations

1. **Use strong JWT_SECRET** (32+ characters, random)
2. **Enable HTTPS** for both frontend and backend
3. **Set up rate limiting** (consider express-rate-limit)
4. **Use environment variables** for all secrets
5. **Enable database SSL** connections
6. **Set up monitoring** (e.g., Sentry, LogRocket)
7. **Regular backups** of database
8. **Keep dependencies updated**

