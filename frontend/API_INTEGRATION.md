# Frontend-Backend API Integration

## Backend URL

The frontend is configured to use the deployed backend:
```
https://smart-plumber-booking-system-7cbo.vercel.app
```

## API Configuration

The API base URL is set in `src/config/api.js`:
- Default: `https://smart-plumber-booking-system-7cbo.vercel.app`
- Can be overridden with `REACT_APP_API_URL` environment variable

## API Endpoints

All authentication endpoints are available:

- **Signup**: `POST /api/auth/signup`
- **Login**: `POST /api/auth/login`
- **Forgot Password**: `POST /api/auth/forgot-password`
- **Verify OTP**: `POST /api/auth/verify-otp`
- **Reset Password**: `POST /api/auth/reset-password`

## Integration Status

✅ **Login** - Connected to backend API
✅ **Signup** - Connected to backend API
✅ **Forgot Password** - Connected to backend API
✅ **Verify OTP** - Connected to backend API
✅ **Reset Password** - Connected to backend API

## How It Works

1. **Signup**: User creates account → API call → JWT token stored → User logged in
2. **Login**: User enters credentials → API call → JWT token stored → User logged in
3. **Forgot Password**: User enters email → API verifies email exists → OTP sent via email
4. **Verify OTP**: User enters OTP → API verifies → Proceed to password reset
5. **Reset Password**: User enters new password → API resets → Redirect to login

## Error Handling

All API calls include:
- ✅ Error handling with user-friendly messages
- ✅ Loading states during API calls
- ✅ Toast notifications for success/error
- ✅ Validation error display

## Token Management

- JWT tokens are stored in `localStorage` as `token`
- Tokens are automatically included in API requests (if needed in future)
- Tokens are cleared on logout

## Testing

To test the integration:

1. **Signup**: Create a new account
2. **Login**: Use the created credentials
3. **Forgot Password**: Enter registered email
4. **Check Email**: Receive OTP in email
5. **Verify OTP**: Enter the 6-digit code
6. **Reset Password**: Set new password

## Environment Variables

Create a `.env` file in the frontend directory (optional):
```
REACT_APP_API_URL=https://smart-plumber-booking-system-7cbo.vercel.app
```

If not set, it defaults to the deployed backend URL.
