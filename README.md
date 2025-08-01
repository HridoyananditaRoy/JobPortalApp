# 🧑‍💼 Job Portal Backend API

This repository contains the **backend** for a full-featured Job Portal system. It allows:
- Recruiters to register companies and post jobs
- Students/applicants to register, log in, update their profiles, and apply for jobs

✅ Built using **Node.js**, **Express**, **MongoDB**, **JWT Authentication**, **Multer**, and **Cloudinary** for file uploads.

---

## 🚀 Live API (Backend)

🧪 Test using Postman  
📩 [Postman Collection C:\Users\user\JobPortalApp\JobPortalApp.postman_collection.json]

---

## 📦 Key Features

### 👤 Authentication
- Register, Login, Logout
- Update profile with resume and skills (Cloudinary)

### 🏢 Company Management (Recruiter)
- Register a company with logo
- View and update company details

### 💼 Job Management
- Create, update, delete job posts
- View all jobs or specific job by ID

### 📝 Applicant Management (Student)
- Apply to jobs
- See applied jobs
- Recruiters can view applicants
- Update application status (hired/rejected/etc.)

---

## 🧪 API Endpoints

> All `GET`, `POST`, `PUT`, `DELETE` routes are protected using JWT unless marked public.

| Method | Endpoint                              | Description                              |
|--------|---------------------------------------|------------------------------------------|
| POST   | `/api/v1/user/register`               | Register new user (with profile image)   |
| POST   | `/api/v1/user/login`                  | Login and receive JWT token              |
| PUT    | `/api/v1/user/update`                 | Update user profile (resume, skills)     |
| POST   | `/api/v1/company/register`            | Recruiter registers company              |
| GET    | `/api/v1/company/get`                 | View all companies (auth required)       |
| GET    | `/api/v1/company/get/:id`             | Get company by ID                        |
| PUT    | `/api/v1/company/update`              | Update company info                      |
| POST   | `/api/v1/jobs/create`                 | Create a new job post                    |
| GET    | `/api/v1/jobs/get`                    | View all job posts                       |
| GET    | `/api/v1/jobs/get/:id`                | View job by ID                           |
| PUT    | `/api/v1/jobs/update/:id`             | Update job info                          |
| DELETE | `/api/v1/jobs/delete/:id`             | Delete job                               |
| POST    | `/api/v1/applicant/apply/:id`         | Apply to job (job ID)                    |
| GET    | `/api/v1/applicant/get`               | Get jobs applied by user                 |
| GET    | `/api/v1/applicant/:id/applicants`    | Get all applicants for a job             |
| POST   | `/api/v1/applicant/status/:id/update` | Update application status                |

---

## ⚙️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Bcrypt.js**
- **Multer + Cloudinary** for file uploads
- **CORS**, **dotenv**

---

## 🔧 Setup Instructions (Run Locally)

###  Clone the Repository

```bash
git clone https://github.com/your-username/job-portal-backend.git
cd job-portal-backend
npm install

⚙️ Create .env File

Create a .env file in the root directory and add the following:

PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

🚀 4. Run the Server
# Development with nodemon
npm run dev

# OR

# Production
npm start
Server will run at: http://localhost:8000

📁 Folder Structure

📁 job-portal-backend/
├── controllers/
│   ├── applicant.controllers.js
│   ├── company.controllers.js
│   ├── job.controllers.js
│   └── user.controllers.js
├── routes/
│   ├── applicant.routes.js
│   ├── company.routes.js
│   ├── job.routes.js
│   └── user.routes.js
├── models/
│   └── user.models.js
├── middlewares/
│   ├── auth.middleware.js
│   └── multer.js
├── utils/
│   └── getDataUri.js
├── index.js
├── .env              # 🔒 Environment variables (NOT committed)
├── package.json
├── .gitignore        # ✅ Includes .env and node_modules

You can test the backend API using tools like:

🧪 API Testing
You can test the backend API using:

✅ Postman – for full route testing
