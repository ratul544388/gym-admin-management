# Gym Admin Management

A fully secure admin dashboard for managing gym memberships. Admins can enroll, renew, update, and delete members with flexible membership plans. The dashboard features detailed insights including revenue vs. expense graphs and membership statistics filtered by status.

> **Note:** This is an admin-only project. The live demo includes login access with demo admin credentials.

---

## 🖥️ Live Demo

👉 [Visit Live Site](https://gym-admin-management.vercel.app)

---

## 🚀 Features

- 🔐 Secure admin login with route protection
- 🧾 Enroll new members with multi-tier membership plans
- 🔁 Renew memberships with expiration tracking
- 📊 Filter members by status: active, pending, expired
- ✏️ Edit and delete member records
- 📈 Dashboard with metrics: revenue, expenses, joins, renewals
- 📉 Interactive revenue vs. expense graph
- 📱 Responsive and modern UI (mobile + desktop)

---

## 🛠️ Tech Stack

- **Next.js 15** (Turbopack enabled)
- **Prisma ORM**
- **MongoDB**
- **Clerk** for authentication & authorization
- **Tailwind CSS** with animations
- **React Hook Form + Zod** for validation
- **Radix UI** components
- **Recharts** for visualizing data
- **Zustand** for global state
- **Cloudinary** for image/media uploads
- **Axios** for API communication

---

## 📁 Project Structure

```

---

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

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following:

```env
DATABASE_URL=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key
CLERK_API_SECRET=your_clerk_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

### 6. Demo Admin Login

Use the demo admin credentials shown on the login page.

---

## ⚙️ Deployment

* Deployed on **Vercel** using serverless functions
* Authentication managed via **Clerk**

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Ratul Hossain**
Full-Stack Web Developer
📍 Dhaka 1310, Bangladesh
📧 [ratul.hossain.dev@gmail.com](mailto:ratul.hossain.dev@gmail.com)
📞 +8801815555105

---

> ⭐ If you found this project helpful, please consider giving it a star on GitHub!

```

---
