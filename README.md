<div align="center">
  <img src="public/for favicon.png" alt="Aura Force Logo" style="width: 100px; height: auto;">
</div>

<div align="center">
  <h1>AURA FORCE</h1>
</div>

AuraForce is a comprehensive, Full-stack fitness and gym management platform built with modern web technologies. It provides a seamless experience for both gym members and administrators, featuring robust user authentication, a complete booking and payment system, a community forum, personalized nutrition planning, and a secure administration dashboard for managing all aspects of the gym.

<div align="center">
  <img src="https://img.shields.io/badge/Key%20Features-purple?style=for-the-badge" alt="Key Features" height="40">
</div>


### For Members
- **Secure Authentication**: User sign-up, login, and Google SSO powered by Clerk, including password reset functionality.
- **Personalized Profiles**: Members can view and edit their profiles, update personal and physical stats, and upload a custom profile picture using UploadThing.
- **Booking System**: Easily book memberships, personal training sessions, and group classes.
- **Payment Gateway**: Securely process payments for all bookings using SSLCommerz integration.
- **Community Forums**: Engage with other members in a dynamic forum. Create posts, and upvote/downvote discussions.
- **Nutrition Plans**: Automatically generate a personalized nutrition plan based on the user's BMI, calculated from their profile stats.
- **Session Management**: Automatic logout after 30 minutes of inactivity for enhanced security.

### For Administrators
- **Secure Admin Portal**: A protected dashboard accessible via a unique PIN.
- **Comprehensive Dashboard**: At-a-glance overview of total members, active trainers, revenue, and recent activities.
- **Data Management**: View and manage all database records including members, trainer bookings, class bookings, memberships, and payments.
- **Plans Overview**: A clear view of all available membership plans, trainer pricing, and class schedules stored in the database.

<div align="center">
  <img src="https://img.shields.io/badge/Tech%20Stack-purple?style=for-the-badge" alt="Tech Stack" height="40">
</div>

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS with DaisyUI
- **Animations**: Framer Motion
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **File Uploads**: UploadThing
- **Payments**: SSLCommerz
- **State Management**: TanStack Query (React Query)
- **Emails**: Nodemailer with Gmail
- **Rate Limiting**: Upstash Redis
- **UI Components**: Headless UI, Lucide React, React Hot Toast

<div align="center">
  <img src="https://img.shields.io/badge/Project Structure%20-purple?style=for-the-badge" alt="Project Structure" height="40">
</div>

The repository is structured to leverage the Next.js App Router paradigm, separating concerns for clarity and scalability.

```
/
├── app/                  # Next.js App Router: pages, layouts, and API routes
│   ├── api/              # API endpoints for payments, admin data, and uploads
│   ├── admin/            # All pages for the secure admin dashboard
│   ├── (user)/           # User-facing routes like profile, booking, etc.
│   └── page.tsx          # Homepage
├── prisma/               # Prisma schema and database configuration
│   └── schema.prisma     # Database models and relations
├── public/               # Static assets: images, fonts
├── src/                  # Source files for components, actions, and helpers
│   ├── Components/       # Reusable React components for pages and shared UI
│   ├── actions/          # Server Actions for form submissions and data mutations
│   ├── hooks/            # Custom React hooks (e.g., useAutoLogout)
│   └── lib/              # Library functions (e.g., db client, user checks)
└── ...                   # Root configuration files (next.config.mjs, package.json, etc.)
```

<div align="center">
  <img src="https://img.shields.io/badge/Setup & Installations%20-purple?style=for-the-badge" alt="Setup & Installation" height="40">
</div>


To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn
- A PostgreSQL database instance

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/uzicodes/AuraForce.git
    cd AuraForce
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the necessary environment variables. Use the `.env.example` below as a template.

4.  **Push the database schema:**
    This will sync your Prisma schema with your PostgreSQL database.
    ```sh
    npx prisma db push
    ```

5.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:3000`. The admin panel is available at `/admin` (default PIN is `12345`).

## Environment Variables

Create a `.env` file in the root of your project and add the following variables. Replace the placeholder values with your actual service credentials.

```env
# Prisma / Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Clerk Authentication (https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# SSLCommerz Payment Gateway (https://sslcommerz.com)
SSLCOMMERZ_STORE_ID=
SSLCOMMERZ_STORE_PASSWORD=
SSLCOMMERZ_IS_LIVE="false" # Set to "true" for production

# UploadThing (https://uploadthing.com)
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=



# Gmail / Nodemailer (for sending welcome emails)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=


<div align="center">
  <a href="[https://repostars.dev/?repos=uzicodes%2FAuraForce&theme=synthwave](https://repostars.dev/?repos=uzicodes%2FAuraForce&theme=synthwave)">
    <img src="[https://repostars.dev/api/embed?repo=uzicodes%2FAuraForce&theme=synthwave](https://repostars.dev/api/embed?repo=uzicodes%2FAuraForce&theme=synthwave)" alt="RepoStars" />
  </a>
</div>
