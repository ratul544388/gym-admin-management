```markdown
# Gym Admin Management

A fully secure admin dashboard for managing gym memberships, allowing admins to enroll, renew, update, and delete members with multiple membership plans. The dashboard provides detailed insights with revenue vs. expense graphs and membership statistics filtered by status.

> **Note:** This is a secure admin-only project. The live demo allows login using a provided admin username and password for demo purposes.

## 🖥️ Live Demo

- [Live Demo](https://gym-admin-management.vercel.app)

## 🚀 Features

- Secure admin login and protected routes
- Enroll new members with multi-tier membership plans
- Renew memberships with expiration tracking
- View members filtered by active, pending, or expired status
- Update and delete member records
- Dashboard with key metrics: revenue, expenses, new joins, renewals
- Interactive revenue vs. expense graph for data visualization
- Responsive design with modern UI components

## 🛠️ Tech Stack

- Next.js (React framework with Turbopack)
- Prisma ORM
- MongoDB
- Clerk.js for authentication and authorization
- Tailwind CSS with animations
- React Hook Form + Zod for forms and validation
- Radix UI components
- Recharts for charts and graphs
- Zustand for state management
- Cloudinary for media uploads
- Axios for HTTP requests

## 📁 Project Structure

```

gym-admin-management/
├── pages/           # Next.js pages
├── prisma/          # Prisma schema and migrations
├── public/          # Static assets
├── components/      # React UI components
└── styles/          # Tailwind CSS styles

````

## 🧑‍💻 Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/ratul544388/gym-admin-management.git
cd gym-admin-management
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
DATABASE_URL=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key
CLERK_API_SECRET=your_clerk_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Prisma Setup

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 6. Demo Admin Login

Use the provided admin credentials on the login page to access full dashboard functionality.

## ⚙️ Deployment

* Deployed on Vercel with serverless functions for API routes
* Uses Clerk for secure authentication management

## 📄 License

This project is licensed under the MIT License.

---

### 👤 Author

**Ratul Hossain**
Full-Stack Web Developer
📍 Dhaka 1310, Bangladesh
📧 [ratul.hossain.dev@gmail.com](mailto:ratul.hossain.dev@gmail.com)
📞 +8801815555105

---

> ⭐ If you find this project useful, please consider giving it a star on GitHub!

```
