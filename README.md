# Everletter

A modern, full-featured newsletter platform built with Next.js that enables creators, businesses, and communities to create, manage, and grow their newsletters with ease.

## 🚀 Features

### Core Functionality

- **Newsletter Management**: Create, design, and send beautiful email newsletters
- **User Dashboard**: Comprehensive dashboard for managing your newsletter campaigns
- **Analytics**: Track performance and engagement metrics
- **Email Templates**: Unlimited templates for Pro users
- **Campaign Management**: Organize and schedule your email campaigns

### Authentication & Security

- **Better Auth Integration**: Secure authentication with email/password
- **Email Verification**: Automatic email verification on sign-up
- **Password Reset**: Secure password reset functionality
- **Role-Based Access Control**: Super Admin, Admin, and User roles
- **User Management**: Admin dashboard for managing users, permissions, and bans

### Payment Integration

- **Razorpay Integration**: Seamless payment processing for subscriptions
- **Subscription Plans**: Free and Pro tiers with different feature sets
- **Payment Tracking**: Complete payment history and subscription management

### Additional Features

- **Contact Form**: User-friendly contact form with country selection
- **Responsive Design**: Mobile-first, fully responsive UI
- **Dark Mode**: Built-in dark mode support with theme switching
- **Modern UI**: Built with Radix UI and Tailwind CSS
- **Type Safety**: Full TypeScript support throughout the application

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Icon library
- **Next Themes** - Theme management

### Backend & Database

- **Better Auth** - Authentication library
- **Prisma** - ORM for database management
- **PostgreSQL** - Primary database
- **NodeMailer** - Email service integration

### Payment & Services

- **Razorpay** - Payment gateway integration
- **Gmail SMTP** - Email delivery service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm/yarn/pnpm/bun
- **PostgreSQL** database
- **Gmail account** (for email service) or SMTP credentials
- **Razorpay account** (for payment processing)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd everletter
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/everletter?schema=public"

   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key-here"
   BETTER_AUTH_URL="http://localhost:3000"

   # Email Service (Nodemailer)
   NODEMAILER_USER="your-email@gmail.com"
   NODEMAILER_APP_PASSWORD="your-app-password"

   # Razorpay (Payment Gateway)
   RAZORPAY_ID="your-razorpay-key-id"
   RAZORPAY_SECRET="your-razorpay-secret"

   # Admin Configuration
   ADMIN_EMAILS="admin1@example.com,admin2@example.com"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client and push schema to database
   npm run prisma
   # or
   pnpm prisma
   ```

5. **Generate Better Auth types**
   ```bash
   npm run better-auth
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
everletter/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   └── verify-email/
│   ├── (dashboard)/       # Protected dashboard routes
│   │   └── dashboard/
│   │       ├── profile/
│   │       └── manage-dashboard/
│   ├── (main)/            # Public pages
│   │   ├── pricing/
│   │   ├── contact-us/
│   │   ├── privacy/
│   │   └── terms/
│   └── api/               # API routes
│       └── auth/
├── actions/               # Server actions
│   ├── contact-action.ts
│   ├── razorpay-actions.ts
│   └── users-action.ts
├── components/            # React components
│   ├── dashboard/        # Dashboard-specific components
│   ├── home/             # Homepage components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── auth.ts           # Better Auth configuration
│   ├── auth-client.ts    # Client-side auth
│   ├── nodemailer.ts     # Email service
│   ├── prisma.ts         # Prisma client
│   └── razorpay.ts       # Razorpay client
├── prisma/               # Database schema
│   └── schema.prisma
└── providers/            # Context providers
```

## 🔑 Key Features Explained

### Authentication System

- Email/password authentication with Better Auth
- Email verification required for new accounts
- Password reset via email
- Session management with IP and user agent tracking
- Role-based access control (SUPERADMIN, ADMIN, USER)

### User Management

- Admin dashboard for managing all users
- Toggle user bans and website permissions
- Change user roles dynamically
- View user subscriptions and payment status
- Delete users with cascade deletion

### Payment System

- Razorpay integration for Indian payment processing
- Subscription-based model (Free and Pro plans)
- Payment tracking and order management
- Automatic subscription creation on successful payment

### Email Service

- Nodemailer integration with Gmail SMTP
- Automated emails for:
  - Email verification
  - Password reset
  - Welcome messages
  - Admin notifications

## 🗄️ Database Schema

The application uses PostgreSQL with the following main models:

- **User**: User accounts with roles and permissions
- **Session**: User session management
- **Account**: OAuth and authentication accounts
- **Verification**: Email verification tokens
- **Payment**: Payment records
- **Subscription**: User subscription plans
- **Contact**: Contact form submissions

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run prisma` - Generate Prisma client and push schema
- `npm run better-auth` - Generate Better Auth types
- `npm run seed` - Seed the database (if configured)

## 🔒 Security Features

- Password strength validation (minimum 8 characters with special characters)
- Email verification required for account activation
- Role-based access control
- Secure session management
- CSRF protection via Better Auth
- Environment variable validation

## 🌐 Deployment

### Environment Variables for Production

Ensure all environment variables are set in your production environment:

- Database connection string
- Better Auth secret and URL
- Email service credentials
- Razorpay production keys
- Admin email list

### Recommended Platforms

- **Vercel** - Optimized for Next.js deployments
- **Railway** - Easy PostgreSQL hosting
- **Render** - Full-stack deployment platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support, email support@everletter.com or use the contact form on the website.

---

Built with ❤️ using Next.js and modern web technologies.
