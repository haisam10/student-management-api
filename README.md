# Student Management API

A comprehensive RESTful API for managing student records with authentication, file upload, and role-based access control built with Node.js and Express.js.

## 🚀 Features

- **Authentication & Authorization**
  - User registration and login with JWT tokens
  - Secure password hashing with bcrypt
  - Role-based access control (User/Admin)
  - Protected routes and admin-only endpoints

- **Student Management (CRUD)**
  - Create new student records
  - Retrieve all students or search by ID
  - Update student information
  - Update student status (active/inactive/suspended)
  - Delete individual students or all records
  - Search students by name (partial match)

- **File Upload**
  - Upload student documents and images
  - Support for PDF, DOC, DOCX, JPG, PNG
  - Maximum file size: 5MB
  - Secure file storage

- **Validation & Error Handling**
  - Input validation for all endpoints
  - Proper HTTP status codes
  - Detailed error messages
  - Request validation middleware

- **Database**
  - MongoDB integration
  - Mongoose schema validation
  - Proper data relationships and references

## 📋 Project Structure

```
student-management-api/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth endpoints logic
│   │   └── studentController.js # Student CRUD logic
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   ├── admin.js             # Admin role checking
│   │   └── validation.js        # Input validation
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Student.js           # Student schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── studentRoutes.js     # Student endpoints
│   ├── utils/
│   │   └── multer.js            # File upload config
│   └── server.js                # Express server setup
├── uploads/                      # User-uploaded files
├── .env                         # Environment variables
├── .env.example                 # Example env file
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   cd student-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy example to .env
   copy .env.example .env
   
   # Update .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   ```

5. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

   Server will run on: `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### 1. Register User
- **URL**: `POST /api/auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "_id": "60d5ec49c1234567890abcde",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "createdAt": "2024-01-18T10:30:00Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### 2. Login User
- **URL**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "_id": "60d5ec49c1234567890abcde",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### 3. Get User Profile
- **URL**: `GET /api/auth/profile`
- **Access**: Protected (Requires JWT token)
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Profile retrieved successfully",
    "data": {
      "user": {
        "_id": "60d5ec49c1234567890abcde",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      }
    }
  }
  ```

#### 4. Delete User (Admin Only)
- **URL**: `DELETE /api/auth/:id`
- **Access**: Protected/Admin
- **Headers**:
  ```
  Authorization: Bearer <admin_token>
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "User deleted successfully",
    "data": {
      "user": {
        "_id": "60d5ec49c1234567890abcde",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  }
  ```

### Student Management Endpoints

#### 1. Get All Students
- **URL**: `GET /api/students`
- **Access**: Protected
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Students retrieved successfully",
    "count": 2,
    "data": [
      {
        "_id": "60d5ec49c1234567890abcd1",
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "rollNumber": "STU001",
        "courseEnrolled": "Computer Science",
        "gpa": 3.8,
        "status": "active",
        "phoneNumber": "+1234567890",
        "address": "123 Main St",
        "createdBy": {
          "_id": "60d5ec49c1234567890abcde",
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    ]
  }
  ```

#### 2. Get Student by ID
- **URL**: `GET /api/students/:id`
- **Access**: Protected
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **URL Parameters**:
  ```
  :id = Student ID (MongoDB ObjectId)
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Student retrieved successfully",
    "data": {
      "_id": "60d5ec49c1234567890abcd1",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "rollNumber": "STU001",
      "courseEnrolled": "Computer Science",
      "gpa": 3.8,
      "status": "active",
      "createdBy": {
        "_id": "60d5ec49c1234567890abcde",
        "name": "John Doe"
      }
    }
  }
  ```

#### 3. Search Students by Name
- **URL**: `GET /api/students/search?name=value`
- **Access**: Protected
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters**:
  ```
  name=Alice (partial match, case-insensitive)
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Search results retrieved successfully",
    "count": 1,
    "data": [
      {
        "_id": "60d5ec49c1234567890abcd1",
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "rollNumber": "STU001",
        "courseEnrolled": "Computer Science"
      }
    ]
  }
  ```

#### 4. Create Student
- **URL**: `POST /api/students`
- **Access**: Protected
- **Headers**:
  ```
  Authorization: Bearer <token>
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "rollNumber": "STU001",
    "courseEnrolled": "Computer Science",
    "gpa": 3.8,
    "phoneNumber": "+1234567890",
    "address": "123 Main St"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "Student created successfully",
    "data": {
      "_id": "60d5ec49c1234567890abcd1",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "rollNumber": "STU001",
      "courseEnrolled": "Computer Science",
      "gpa": 3.8,
      "status": "active",
      "phoneNumber": "+1234567890",
      "address": "123 Main St",
      "createdBy": "60d5ec49c1234567890abcde"
    }
  }
  ```

#### 5. Update Student
- **URL**: `PUT /api/students/:id`
- **Access**: Protected
- **Headers**:
  ```
  Authorization: Bearer <token>
  Content-Type: application/json
  ```
- **URL Parameters**:
  ```
  :id = Student ID
  ```
- **Request Body** (partial update):
  ```json
  {
    "gpa": 3.9,
    "status": "active"
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Student updated successfully",
    "data": {
      "_id": "60d5ec49c1234567890abcd1",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "gpa": 3.9,
      "status": "active"
    }
  }
  ```

#### 6. Update Student Status
- **URL**: `PATCH /api/students/:id/status`
- **Access**: Protected
- **Headers**:
  ```
  Authorization: Bearer <token>
  Content-Type: application/json
  ```
- **URL Parameters**:
  ```
  :id = Student ID
  ```
- **Request Body**:
  ```json
  {
    "status": "suspended"
  }
  ```
- **Valid Status Values**: `active`, `inactive`, `suspended`
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Student status updated successfully",
    "data": {
      "_id": "60d5ec49c1234567890abcd1",
      "status": "suspended"
    }
  }
  ```

#### 7. Upload Student Document
- **URL**: `POST /api/students/:id/upload`
- **Access**: Protected
- **Headers**:
  ```
  Authorization: Bearer <token>
  Content-Type: multipart/form-data
  ```
- **URL Parameters**:
  ```
  :id = Student ID
  ```
- **Form Data**:
  ```
  document: <file> (max 5MB, PDF/DOC/DOCX/JPG/PNG)
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Document uploaded successfully",
    "data": {
      "_id": "60d5ec49c1234567890abcd1",
      "name": "Alice Johnson",
      "documentUrl": "/uploads/1234567890-transcript.pdf"
    }
  }
  ```

#### 8. Delete Student
- **URL**: `DELETE /api/students/:id`
- **Access**: Protected
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **URL Parameters**:
  ```
  :id = Student ID
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Student deleted successfully",
    "data": {
      "_id": "60d5ec49c1234567890abcd1",
      "name": "Alice Johnson"
    }
  }
  ```

#### 9. Delete All Students (Admin Only)
- **URL**: `DELETE /api/students`
- **Access**: Protected/Admin
- **Headers**:
  ```
  Authorization: Bearer <admin_token>
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "All students deleted successfully",
    "deletedCount": 5
  }
  ```

## 🔐 Authentication

### JWT Token Usage

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Token Expiry

- Tokens expire after **7 days**
- After expiry, user must login again to get a new token

### Admin Roles

Certain endpoints are restricted to admin users:
- `DELETE /api/auth/:id` - Delete any user
- `DELETE /api/students` - Delete all students

## 💾 Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  name: String (required, 2-100 chars),
  email: String (required, unique, valid email),
  password: String (required, 6+ chars, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Student Schema
```javascript
{
  _id: ObjectId,
  name: String (required, 2-100 chars),
  email: String (required, unique, valid email),
  rollNumber: String (required, unique),
  courseEnrolled: String (required),
  gpa: Number (0-4, default: 0),
  status: String (enum: ['active', 'inactive', 'suspended'], default: 'active'),
  phoneNumber: String (optional),
  address: String (optional),
  documentUrl: String (optional, file path),
  createdBy: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/student-management-db
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-management-db

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_very_secure_jwt_secret_key_change_in_production

# File Upload
MAX_FILE_SIZE=5242880

# API
API_VERSION=1.0.0
API_PREFIX=/api
```

## 📝 Testing with Postman

### Setup
1. Import the API endpoints into Postman
2. Create a collection called "Student Management API"
3. Add all endpoints from the API Documentation section

### Testing Flow

1. **Register a User**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Body (JSON):
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

2. **Login**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```
   - Save the returned token

3. **Create Student**
   - Method: POST
   - URL: `http://localhost:5000/api/students`
   - Headers: `Authorization: Bearer <token>`
   - Body (JSON):
     ```json
     {
       "name": "John Smith",
       "email": "john@example.com",
       "rollNumber": "STU123",
       "courseEnrolled": "Data Science"
     }
     ```

4. **Get All Students**
   - Method: GET
   - URL: `http://localhost:5000/api/students`
   - Headers: `Authorization: Bearer <token>`

5. **Search Students**
   - Method: GET
   - URL: `http://localhost:5000/api/students/search?name=John`
   - Headers: `Authorization: Bearer <token>`

6. **Upload Document**
   - Method: POST
   - URL: `http://localhost:5000/api/students/<student_id>/upload`
   - Headers: `Authorization: Bearer <token>`
   - Body: form-data
     - Key: `document`
     - Value: Select a file (PDF/DOC/JPG/PNG)

## 🐛 Error Handling

The API returns appropriate HTTP status codes:

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (invalid/missing token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **413**: Payload Too Large (file > 5MB)
- **500**: Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional: array of validation errors
}
```

## 🚀 Deployment

### Steps for Production Deployment

1. **Set environment variables**
   ```bash
   PORT=3000
   NODE_ENV=production
   JWT_SECRET=<strong_random_secret>
   MONGODB_URI=<production_mongodb_uri>
   ```

2. **Install dependencies**
   ```bash
   npm install --production
   ```

3. **Start the server**
   ```bash
   npm start
   ```

### Recommended Hosting Platforms
- Heroku
- AWS (EC2, Elastic Beanstalk)
- Google Cloud Platform
- DigitalOcean
- Railway
- Render

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation
- **multer**: File upload handling
- **cors**: Cross-Origin Resource Sharing
- **express-validator**: Input validation
- **dotenv**: Environment variables
- **nodemon**: Development auto-reload

## 📄 License

ISC License - Feel free to use this project

## 👤 Author

Developer

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## ❓ Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### JWT Token Error
- Ensure token is passed in Authorization header
- Check token hasn't expired (7 days)
- Regenerate token by logging in again

### File Upload Error
- File size must be less than 5MB
- Only PDF, DOC, DOCX, JPG, PNG allowed
- Ensure uploads directory exists

### Port Already in Use
```bash
# Change PORT in .env or
netstat -ano | findstr :5000  # Find process
taskkill /PID <PID> /F         # Kill process
```

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding! 🎉**
