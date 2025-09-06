# Quick Setup Guide

## 1. Create Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 2. Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Settings > API
3. Copy your Project URL and API keys
4. Paste them into your `.env.local` file

## 3. Run the Application

```bash
npm run dev
```

## 4. Test Authentication

Visit these pages to test the authentication system:
- http://localhost:3000/signup
- http://localhost:3000/signin

## 5. Optional: Configure OAuth

To enable Google/Apple sign-in:
1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Google OAuth
3. Add your OAuth credentials

## Note

The application will work without Supabase configuration, but authentication features will be disabled. The middleware will skip auth checks when Supabase is not configured.
