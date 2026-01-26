# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Vercel Project Settings

**In Vercel Dashboard → Your Project → Settings:**

- [ ] **Root Directory:** Set to `backend`
- [ ] **Framework Preset:** `Other` or `Node.js`
- [ ] **Build Command:** Leave empty (or `npm install`)
- [ ] **Output Directory:** Leave empty
- [ ] **Install Command:** `npm install` (default)

### 2. Environment Variables

**In Vercel Dashboard → Your Project → Settings → Environment Variables:**

Add ALL these variables (copy from your `.env` file):

```
POSTGRES_URL=your-postgres-url
POSTGRES_PRISMA_URL=your-prisma-url
POSTGRES_URL_NON_POOLING=your-non-pooling-url

EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

FRONTEND_URL=https://smart-plumber-booking-system.vercel.app

NODE_ENV=production
PORT=5000
```

**Important:**
- ✅ No spaces in values
- ✅ Copy exact values from `.env`
- ✅ Apply to: Production, Preview, Development (all environments)

### 3. File Structure Verification

Ensure these files exist in `backend/` folder:

```
backend/
├── api/
│   └── index.js          ✅ Must exist
├── vercel.json           ✅ Must exist
├── package.json          ✅ Must exist
├── server.js             ✅ Must exist
├── .env                  ❌ Don't commit (use Vercel env vars)
└── ... (other files)
```

### 4. Git Repository

- ✅ All files committed
- ✅ `backend/vercel.json` exists
- ✅ `backend/api/index.js` exists
- ✅ `.env` is in `.gitignore` (not committed)

## 🚀 Deployment Steps

### Step 1: Connect Repository
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your Git repository
4. Select repository

### Step 2: Configure Project
1. **Root Directory:** Type `backend` and select it
2. **Framework Preset:** Select `Other`
3. **Build Command:** Leave empty
4. **Output Directory:** Leave empty

### Step 3: Add Environment Variables
1. Click **"Environment Variables"**
2. Add each variable one by one:
   - Click **"Add"**
   - Enter name (e.g., `POSTGRES_URL`)
   - Enter value (paste from `.env`)
   - Select environments (Production, Preview, Development)
   - Click **"Save"**
3. Repeat for all variables

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for build to complete
3. Check build logs for errors

### Step 5: Verify Deployment
1. Copy deployment URL (e.g., `https://your-project.vercel.app`)
2. Test health endpoint:
   ```
   GET https://your-project.vercel.app/api/health
   ```
3. Should return: `{"status":"OK","message":"Server is running"}`

## 🔍 Troubleshooting

### Build Fails

**Check:**
- [ ] `package.json` exists in backend folder
- [ ] All dependencies listed in `package.json`
- [ ] Node version compatible (Vercel uses Node 18.x)
- [ ] Build logs show specific error

**Fix:**
- Check build logs in Vercel dashboard
- Verify all npm packages are in `dependencies` (not `devDependencies`)
- Ensure no syntax errors in code

### 404 Errors on API Calls

**Check:**
- [ ] `vercel.json` exists in backend folder
- [ ] `api/index.js` exists
- [ ] Routes in `vercel.json` are correct
- [ ] Root directory is set to `backend`

**Fix:**
- Verify file structure matches requirements
- Check `vercel.json` syntax is valid JSON
- Ensure `api/index.js` exports the Express app

### Environment Variables Not Working

**Check:**
- [ ] Variables added in Vercel dashboard
- [ ] Variable names match exactly (case-sensitive)
- [ ] Values copied correctly (no extra spaces)
- [ ] Applied to correct environments
- [ ] Redeployed after adding variables

**Fix:**
- Re-add variables in Vercel
- Redeploy after adding variables
- Check function logs for undefined values

### Database Connection Fails

**Check:**
- [ ] `POSTGRES_URL` is set correctly
- [ ] Database allows external connections
- [ ] SSL mode is correct (`sslmode=require`)
- [ ] Database credentials are correct

**Fix:**
- Verify connection string format
- Check database provider allows Vercel IPs
- Test connection string locally first

### CORS Errors

**Check:**
- [ ] Frontend URL is in allowed origins
- [ ] `FRONTEND_URL` environment variable is set
- [ ] OPTIONS requests are handled

**Fix:**
- Add frontend URL to `allowedOrigins` in `server.js`
- Verify CORS middleware is first in Express app
- Check CORS headers in response

## 📝 Quick Test Commands

After deployment, test these endpoints:

```bash
# Health Check
curl https://your-project.vercel.app/api/health

# Signup
curl -X POST https://your-project.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"Test123","confirmPassword":"Test123"}'
```

## 🎯 Success Indicators

Your deployment is successful if:
- ✅ Build completes without errors
- ✅ Health endpoint returns 200 OK
- ✅ API endpoints respond (not 404)
- ✅ CORS headers are present
- ✅ Database operations work
- ✅ Email sending works (if configured)

## 📞 Still Having Issues?

1. Check Vercel function logs: Dashboard → Your Project → Functions → View Logs
2. Check build logs: Dashboard → Your Project → Deployments → Click deployment → View Build Logs
3. Verify all files are committed and pushed to Git
4. Ensure root directory is correctly set to `backend`
