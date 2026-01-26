# Vercel Deployment Guide

## Step-by-Step Deployment Instructions

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your Git repository
4. Select your repository

### 2. Configure Project Settings

#### Root Directory
- **Root Directory:** `backend`
- This tells Vercel to deploy only the backend folder

#### Build Settings
- **Framework Preset:** Other
- **Build Command:** Leave empty (or `npm install` if needed)
- **Output Directory:** Leave empty
- **Install Command:** `npm install`

#### Environment Variables
Add all these environment variables in Vercel:

```
# Database (Vercel Postgres/Neon)
POSTGRES_URL=your-postgres-url-here
POSTGRES_PRISMA_URL=your-prisma-url-here
POSTGRES_URL_NON_POOLING=your-non-pooling-url-here

# Email Configuration (Gmail)
EMAIL_USER=your-admin-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=https://smart-plumber-booking-system.vercel.app

# Server
PORT=5000
NODE_ENV=production
```

### 3. Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete
3. Check deployment logs for any errors

### 4. Verify Deployment

After deployment, test the health endpoint:
```
GET https://your-project.vercel.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Troubleshooting

### Issue: Build Fails

**Solution:**
- Check that `package.json` exists in the backend folder
- Verify all dependencies are listed in `package.json`
- Check build logs in Vercel dashboard

### Issue: 404 Errors

**Solution:**
- Verify `vercel.json` exists in the backend folder
- Check that `api/index.js` exists
- Ensure routes in `vercel.json` are correct

### Issue: Environment Variables Not Working

**Solution:**
- Go to Project Settings → Environment Variables
- Add all required variables
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### Issue: Database Connection Fails

**Solution:**
- Verify `POSTGRES_URL` is set correctly
- Check database credentials
- Ensure database allows connections from Vercel IPs
- Check Vercel function logs for connection errors

### Issue: Email Not Sending

**Solution:**
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are set
- Check Gmail App Password is correct (no spaces)
- Ensure 2-factor authentication is enabled on Gmail
- Check Vercel function logs for email errors

## File Structure Required

```
backend/
├── api/
│   └── index.js          (Vercel serverless function entry)
├── controllers/
│   └── authController.js
├── middleware/
│   └── validation.js
├── routes/
│   └── authRoutes.js
├── utils/
│   ├── db.js
│   ├── emailService.js
│   ├── otpService.js
│   └── userService.js
├── package.json
├── server.js
└── vercel.json          (Vercel configuration)
```

## Important Notes

1. **Root Directory:** Must be set to `backend` in Vercel project settings
2. **Environment Variables:** Must be added in Vercel dashboard (not just .env file)
3. **Build Command:** Can be left empty for Node.js projects
4. **Node Version:** Vercel uses Node.js 18.x by default (can be changed in settings)

## Quick Checklist

- [ ] Repository connected to Vercel
- [ ] Root directory set to `backend`
- [ ] All environment variables added
- [ ] `vercel.json` exists in backend folder
- [ ] `api/index.js` exists
- [ ] `package.json` has all dependencies
- [ ] Deployment successful
- [ ] Health check endpoint works
- [ ] API endpoints respond correctly

## After Deployment

1. Copy your deployment URL (e.g., `https://your-project.vercel.app`)
2. Update frontend `src/config/api.js` with the new URL
3. Test all API endpoints
4. Check CORS is working correctly
