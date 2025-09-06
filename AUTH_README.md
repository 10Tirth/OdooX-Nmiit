# EcoFinds Authentication System

A comprehensive authentication system for EcoFinds built with Next.js 15, Supabase, and Tailwind CSS.

## Features

- ✅ Email/Password Authentication
- ✅ Magic Link Authentication
- ✅ OAuth (Google, Apple)
- ✅ Password Reset Flow
- ✅ Email Verification
- ✅ User Onboarding
- ✅ Secure Session Management
- ✅ Rate Limiting
- ✅ Accessibility Features
- ✅ Analytics Integration

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# JWT Secret (for additional security if needed)
JWT_SECRET=your_jwt_secret_key

# Analytics (optional)
NEXT_PUBLIC_GA_TRACKING_ID=your_google_analytics_id
NEXT_PUBLIC_SEGMENT_WRITE_KEY=your_segment_write_key
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and keys
3. Configure OAuth providers in Authentication > Providers:
   - Enable Google OAuth
   - Enable Apple OAuth (if needed)
4. Set up email templates in Authentication > Email Templates
5. Configure redirect URLs in Authentication > URL Configuration

### 3. OAuth Provider Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://your-project-ref.supabase.co/auth/v1/callback`
   - `http://localhost:3000/api/auth/oauth/callback` (for development)

#### Apple OAuth
1. Go to [Apple Developer Console](https://developer.apple.com)
2. Create a new App ID
3. Create a Service ID
4. Configure Sign in with Apple
5. Add redirect URLs in Supabase

### 4. Test Accounts

For development, you can create test accounts in Supabase:

```sql
-- Insert test users (run in Supabase SQL editor)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  gen_random_uuid(),
  'demo_buyer@ecofinds.test',
  crypt('Password1!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Demo Buyer", "newsletter_opt_in": true}'::jsonb
), (
  gen_random_uuid(),
  'demo_seller@ecofinds.test',
  crypt('Password1!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Demo Seller", "newsletter_opt_in": true}'::jsonb
);
```

### 5. Run the Application

```bash
npm install
npm run dev
```

## API Endpoints

### Authentication Routes

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/magic-link` - Send magic link
- `GET /api/auth/magic-link/verify` - Verify magic link
- `POST /api/auth/password-reset` - Request password reset
- `GET /api/auth/oauth/callback` - OAuth callback handler

### Request/Response Examples

#### Signup
```json
POST /api/auth/signup
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "full_name": "John Doe",
  "newsletter_opt_in": true,
  "source": "signup-page"
}

Response:
{
  "success": true,
  "message": "Check your email to verify your account",
  "userId": "uuid"
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

Response:
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

## Security Features

- HttpOnly cookies for session management
- Rate limiting on authentication endpoints
- Password strength validation
- Email verification required
- CSRF protection
- Secure cookie settings
- Input validation and sanitization

## Analytics Events

The system tracks the following events:

- `auth_view` - When auth pages are viewed
- `signup_started` - When signup process begins
- `signup_completed` - When signup is successful
- `login_attempt` - When login is attempted
- `login_success` - When login is successful
- `login_failed` - When login fails
- `password_reset_requested` - When password reset is requested
- `magiclink_sent` - When magic link is sent
- `magiclink_used` - When magic link is used
- `oauth_initiated` - When OAuth flow begins
- `oauth_completed` - When OAuth flow completes
- `email_verified` - When email is verified
- `onboarding_completed` - When onboarding is completed

## Testing

### Manual Testing Checklist

- [ ] Sign up with email/password
- [ ] Sign up with Google OAuth
- [ ] Sign up with Apple OAuth (on supported devices)
- [ ] Sign in with email/password
- [ ] Sign in with OAuth providers
- [ ] Magic link signup/signin
- [ ] Password reset flow
- [ ] Email verification
- [ ] User onboarding
- [ ] Session persistence
- [ ] Logout functionality
- [ ] Form validation
- [ ] Error handling
- [ ] Accessibility (keyboard navigation, screen readers)

### Test Accounts

- **Buyer**: `demo_buyer@ecofinds.test` / `Password1!`
- **Seller**: `demo_seller@ecofinds.test` / `Password1!`

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Troubleshooting

### Common Issues

1. **OAuth redirect errors**: Check redirect URLs in OAuth provider settings
2. **Email not sending**: Verify SMTP settings in Supabase
3. **Session not persisting**: Check cookie settings and domain configuration
4. **Rate limiting**: Adjust rate limit settings in environment variables

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details
