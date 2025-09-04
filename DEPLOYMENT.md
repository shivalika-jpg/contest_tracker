# Deployment Guide

## Architecture
- **Backend**: Deployed on Render (Node.js API)
- **Frontend**: Deployed on Vercel (Static Files)

## Backend Deployment (Render)

1. **Create a Render account** at https://render.com
2. **Connect your GitHub repository**
3. **Create a new Web Service**:
   - Repository: Your GitHub repository
   - Branch: `main`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node.js

4. **Environment Variables** (Set in Render dashboard):
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   TWILIO_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE=your_twilio_phone
   ```

5. **Your Render URL**: 
   `https://contest-tracker-qhfl.onrender.com`

## Frontend Deployment (Vercel)

1. **Update the config file**:
   - Edit `frontend/config.js`
   - Replace `'https://your-render-app-name.onrender.com'` with your actual Render URL

2. **Update CORS in backend**:
   - Edit `server.js`
   - Replace the CORS origins with your actual Vercel URL

3. **Deploy to Vercel**:
   - Create a Vercel account at https://vercel.com
   - Connect your GitHub repository
   - Deploy with these settings:
     - Framework Preset: Other
     - Build Command: (leave empty)
     - Output Directory: `frontend`
     - Install Command: (leave empty)

4. **Your Vercel URL**:
   `https://contest-tracker-3dov.vercel.app/`

## Local Development

```bash
# Start backend
npm run dev

# Open frontend in browser
# Serve frontend files using Live Server or similar
```

## Important Notes

1. **CORS Configuration**: Make sure to update the CORS origins in `server.js` with your actual Vercel domain
2. **API URL**: Update `frontend/config.js` with your actual Render URL
3. **Environment Variables**: Never commit `.env` files to version control
4. **Database**: Make sure your MongoDB Atlas database allows connections from Render's IP ranges

## Testing

1. Test your backend API endpoints using the Render URL
2. Test your frontend using the Vercel URL
3. Verify CORS is working by checking browser network requests

## Troubleshooting

- **CORS Errors**: Check that your Vercel domain is added to the CORS configuration
- **API Connection**: Verify the API URL in `frontend/config.js` matches your Render URL
- **Database Connection**: Check MongoDB Atlas network access settings
