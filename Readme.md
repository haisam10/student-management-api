# 🎓 Student Management System

A secure admin-only student management platform with JWT authentication and MongoDB database.

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based login with bcrypt password hashing
- 👤 **Admin Registration**: Create admin accounts with validation
- 📚 **Student Management**: Add, edit, delete, and view students
- 🛡️ **Role-Based Access**: Only admins can manage students
- 💾 **MongoDB Integration**: Persistent data storage
- 🎨 **Modern UI**: Beautiful responsive dashboard

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone/Setup the project**
   ```bash
   cd student-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   node index.js
   ```
   
   Server will run at: `http://localhost:5000`

## 📖 Usage

### Access the Application
1. Open browser and go to `http://localhost:5000`
2. You'll see the login/registration page

### First Time Setup
1. Click on **Register** tab
2. Create a new admin account
   - Username: Choose any username
   - Email: Enter your email
   - Password: Minimum 5 characters
   - Confirm Password: Must match
3. Click **Create Account**

### Login
1. Click on **Login** tab
2. Enter your email and password
3. Click **Sign In**

### Manage Students
Once logged in to dashboard:
- **View Stats**: See total students count
- **Add Student**: Fill form with student details and click "Add Student"
- **Edit Student**: Click "Edit" button to modify student info
- **Delete Student**: Click "Delete" button to remove student

### Logout
Click **Logout** button in top-right corner

## 🏗️ Project Structure

```
student-management-api/
├── index.js              # Express server & routes
├── index.html            # Frontend UI (login + dashboard)
├── db.js                 # MongoDB connection
├── package.json          # Dependencies
├── .env                  # Environment variables
├── models/
│   ├── User.js          # User schema (admin)
│   └── Student.js       # Student schema
├── middleware/
│   └── auth.js          # JWT verification & admin check
└── routes/
    └── auth.js          # Login & registration endpoints
```

## 🔗 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Create new admin account
- `POST /api/auth/login` - Login and get JWT token

### Student Routes (Admin Only)
- `GET /students` - Get all students
- `POST /students` - Add new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

## 🔐 Security

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ Bearer token authentication
- ✅ Admin-only access control
- ✅ CORS enabled for cross-origin requests

## 📊 Database Schema

### User Collection
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (default: "admin"),
  isActive: Boolean,
  createdAt: Date
}
```

### Student Collection
```javascript
{
  studentId: String (unique),
  name: String,
  dept: String,
  section: String,
  batch: String,
  createdAt: Date
}
```

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Frontend**: HTML, CSS, JavaScript
- **Environment**: dotenv

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/db |
| JWT_SECRET | Secret key for JWT tokens | your_secret_key_12345 |
| NODE_ENV | Environment mode | development |

## 🐛 Troubleshooting

### Server won't start
- Check if port 5000 is in use: `netstat -ano | findstr :5000`
- Kill process if needed: `taskkill /PID <PID> /F`
- Verify MongoDB connection in `.env`

### Login fails
- Ensure user registered first
- Check if MongoDB is connected
- Verify password is at least 5 characters

### Students not showing
- Make sure you're logged in with valid admin token
- Check MongoDB connection

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Support

For issues or questions, please check the code comments or verify:
- MongoDB is connected
- .env file is properly configured
- All dependencies are installed (`npm install`)

---

**Happy Hacking! 🎉**
