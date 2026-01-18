# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Postman (for testing)

## Installation & Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure MongoDB
Edit `.env` file:

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/student-management-db
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-management-db
```

### Step 3: Update JWT Secret (Production)
```env
JWT_SECRET=your_super_secret_key_change_this
```

### Step 4: Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
Server is running on port 5000
MongoDB Connected: localhost
```

## Quick Testing (Using Postman)

### 1. Import Collection
1. Open Postman
2. Click `Import`
3. Select `postman_collection.json` from project root
4. Click `Open`

### 2. Register & Login
1. Go to `Authentication` folder
2. Click `Register User`
3. Click `Send`
4. Copy the `token` from response
5. Click `Login User`
6. Click `Send`
7. Copy the new token

### 3. Set Token Variable
1. Go to Variables tab at top
2. Find `token` variable
3. Paste your token in the `Current value` field
4. Click `Save`

### 4. Test Student Operations
Now you can use all endpoints in the `Students` folder:
- ✅ Create Student
- ✅ Get All Students
- ✅ Search by Name
- ✅ Update Student
- ✅ Upload Document
- ✅ Delete Student

## API Response Examples

### Success Response (200)
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response (400)
```json
{
  "success": false,
  "message": "Email already exists",
  "errors": [...]
}
```

## Common Issues & Solutions

### Issue: "Cannot find module"
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: MongoDB Connection Error
```
# Solution: 
# 1. Check MongoDB is running
# 2. Verify MONGODB_URI in .env
# 3. For Atlas: Whitelist your IP address
```

### Issue: Port 5000 Already in Use
```bash
# Solution: Change PORT in .env to 5001 or higher
PORT=5001
```

### Issue: JWT Token Error
```
# Solution:
# 1. Re-login to get new token
# 2. Check Authorization header format: "Bearer <token>"
# 3. Ensure token hasn't expired (7 days)
```

## File Structure
```
src/
├── config/database.js          # MongoDB setup
├── controllers/
│   ├── authController.js       # Login/Register logic
│   └── studentController.js    # CRUD operations
├── middleware/
│   ├── auth.js                # JWT verification
│   ├── admin.js               # Admin checks
│   └── validation.js          # Input validation
├── models/
│   ├── User.js                # User schema
│   └── Student.js             # Student schema
├── routes/
│   ├── authRoutes.js          # Auth endpoints
│   └── studentRoutes.js       # Student endpoints
└── server.js                  # Main app
```

## Environment Variables Reference
```env
# Database
MONGODB_URI=mongodb://localhost:27017/database-name

# Server
PORT=5000
NODE_ENV=development

# Security
JWT_SECRET=your-secret-key

# File Upload
MAX_FILE_SIZE=5242880

# API
API_VERSION=1.0.0
```

## Key Endpoints Summary

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /api/auth/register | ❌ | Create account |
| POST | /api/auth/login | ❌ | Login |
| GET | /api/auth/profile | ✅ | Get user profile |
| DELETE | /api/auth/:id | ✅ Admin | Delete user |
| GET | /api/students | ✅ | Get all students |
| GET | /api/students/:id | ✅ | Get student |
| POST | /api/students | ✅ | Create student |
| PUT | /api/students/:id | ✅ | Update student |
| PATCH | /api/students/:id/status | ✅ | Update status |
| POST | /api/students/:id/upload | ✅ | Upload document |
| DELETE | /api/students/:id | ✅ | Delete student |
| DELETE | /api/students | ✅ Admin | Delete all |

## Next Steps

1. ✅ Run `npm install`
2. ✅ Configure `.env` with MongoDB
3. ✅ Run `npm run dev`
4. ✅ Test with Postman collection
5. ✅ Read full [README.md](README.md) for detailed documentation

## Getting Help

- Check [README.md](README.md) for full documentation
- Review error messages - they indicate what went wrong
- Check MongoDB connection: `mongodb://localhost:27017`
- Verify all dependencies installed: `npm list`

---
**You're all set! Start building! 🎉**
