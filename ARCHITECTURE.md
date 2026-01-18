# API Architecture & Flow Diagram

## System Architecture

```
┌─────────────┐
│   Client    │
│  (Postman)  │
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────────────────────────┐
│      Express Server (Port 5000)     │
├─────────────────────────────────────┤
│  Middleware Stack:                  │
│  ├─ CORS Handler                   │
│  ├─ JSON Parser                    │
│  ├─ Auth Middleware (JWT)          │
│  ├─ Admin Middleware               │
│  └─ Error Handler                  │
└──────────┬──────────────────────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌──────────┐  ┌─────────────────────┐
│ Routes   │  │ Controllers         │
├──────────┤  ├─────────────────────┤
│ /auth    │  │ authController      │
│ /students│  │ studentController   │
└──────────┘  └──────────┬──────────┘
                         │
                    ┌────┴─────┐
                    │           │
                    ▼           ▼
              ┌──────────┐  ┌──────────┐
              │ Models   │  │ Utils    │
              ├──────────┤  ├──────────┤
              │ User     │  │ Multer   │
              │ Student  │  │ Validation
              └──────┬───┘  └──────────┘
                     │
                     ▼
          ┌────────────────────┐
          │  MongoDB Database  │
          ├────────────────────┤
          │  Collections:      │
          │  ├─ users          │
          │  └─ students       │
          └────────────────────┘
```

## Authentication Flow

```
┌─────────────────┐
│  User Registers │
└────────┬────────┘
         │
         ▼
    ┌─────────────────────────────┐
    │ POST /api/auth/register     │
    │ - Validate input            │
    │ - Check duplicate email     │
    │ - Hash password (bcrypt)    │
    └────────┬────────────────────┘
             │
             ▼
      ┌────────────────┐
      │ Save to DB     │
      └────────┬───────┘
               │
               ▼
      ┌────────────────────────┐
      │ Generate JWT Token     │
      │ (expires in 7 days)    │
      └────────┬───────────────┘
               │
               ▼
      ┌────────────────────┐
      │ Return Token to    │
      │ Client             │
      └────────────────────┘

          USER LOGS IN
               │
               ▼
    ┌─────────────────────────────┐
    │ POST /api/auth/login        │
    │ - Validate credentials      │
    │ - Compare password (bcrypt) │
    └────────┬────────────────────┘
             │
             ▼
      ┌────────────────────┐
      │ Generate JWT Token │
      └────────┬───────────┘
               │
               ▼
      ┌────────────────────┐
      │ Return Token to    │
      │ Client             │
      └────────┬───────────┘
               │
      ┌────────┴──────────────┐
      │ Token stored in       │
      │ Postman (or local     │
      │ storage in frontend)  │
      └───────────────────────┘
```

## Protected Route Flow

```
┌──────────────────────────┐
│ Client Request with JWT  │
│ Authorization: Bearer    │
│ <token>                  │
└────────┬─────────────────┘
         │
         ▼
    ┌─────────────────────────┐
    │ Auth Middleware         │
    │ (auth.js)               │
    ├─────────────────────────┤
    │ 1. Extract token        │
    │ 2. Verify signature     │
    │ 3. Check expiration     │
    └────────┬────────────────┘
             │
         ┌───┴────┐
         │        │
    Valid│        │Invalid
         ▼        ▼
     ┌────────┐┌─────────┐
     │Continue││Return   │
     │Request ││401 Error│
     └────┬───┘└─────────┘
          │
          ▼
    ┌──────────────┐
    │ Route Handler│
    │ (Controller) │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Process Data │
    └──────┬───────┘
           │
           ▼
    ┌──────────────────┐
    │ Return Response  │
    └──────────────────┘
```

## Student CRUD Flow

```
                    STUDENT OPERATIONS
    ┌──────────────────────────────────────┐
    │                                      │
    ▼                                      │
GET /api/students           CREATE         │
├─ Get all students         POST /api/students
├─ Populate creator info    ├─ Validate data
├─ Return as JSON array     ├─ Check duplicates
└─ Status: 200              ├─ Save to DB
                            └─ Return created
                            
    GET /api/students/:id    UPDATE
    ├─ Find by ID            PUT /api/students/:id
    ├─ Populate creator      ├─ Find by ID
    ├─ If not found: 404     ├─ Check duplicates
    └─ Status: 200           ├─ Update fields
                             └─ Status: 200
                             
    SEARCH                  STATUS UPDATE
    GET /api/students/search PATCH /api/students/:id/status
    ?name=value             ├─ Validate status
    ├─ Case-insensitive     ├─ Update status only
    ├─ Partial match        └─ Status: 200
    └─ Return matches
    
    DELETE                  UPLOAD
    DELETE /api/students/:id POST /api/students/:id/upload
    ├─ Find by ID           ├─ Validate file
    ├─ Delete record        ├─ Store in /uploads
    └─ Status: 200          ├─ Update documentUrl
                            └─ Status: 200
```

## File Upload Flow

```
┌──────────────────────┐
│ User Selects File    │
│ (PDF/DOC/JPG/PNG)    │
└────────┬─────────────┘
         │
         ▼
    ┌──────────────────────────┐
    │ POST /api/students/:id/  │
    │ upload                   │
    │ Content-Type:            │
    │ multipart/form-data      │
    └────────┬─────────────────┘
             │
             ▼
    ┌────────────────────────────┐
    │ Multer Middleware          │
    ├────────────────────────────┤
    │ 1. Check MIME type         │
    │    (Only allowed types)    │
    │ 2. Check file size         │
    │    (Max 5MB)               │
    │ 3. Generate unique name    │
    │    (Timestamp + random)    │
    └────────┬───────────────────┘
             │
         ┌───┴────┐
         │        │
       Valid│      │Invalid
         │        │
         ▼        ▼
    ┌─────────┐┌──────────┐
    │Save to  ││Return    │
    │/uploads ││Error 400 │
    └────┬────┘└──────────┘
         │
         ▼
    ┌──────────────────────┐
    │ Update Student Doc   │
    │ documentUrl field    │
    └────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ Return 200 with      │
    │ updated student data │
    └──────────────────────┘
```

## Database Relationships

```
┌──────────────────────────────────────┐
│           DATABASE                   │
├──────────────────────────────────────┤
│                                      │
│  ┌──────────────┐  ┌─────────────┐  │
│  │ users        │  │ students    │  │
│  ├──────────────┤  ├─────────────┤  │
│  │ _id          │  │ _id         │  │
│  │ name         │  │ name        │  │
│  │ email (U)    │  │ email (U)   │  │
│  │ password (H) │  │ rollNumber  │  │
│  │ role (E)     │  │ course      │  │
│  │ isActive     │  │ gpa         │  │
│  │ createdAt    │  │ status (E)  │  │
│  │ updatedAt    │  │ phone       │  │
│  │              │  │ address     │  │
│  │              │  │ documentUrl │  │
│  │              │  │ createdBy*──┼──►_id of users
│  │              │  │ createdAt   │  │
│  │              │  │ updatedAt   │  │
│  └──────────────┘  └─────────────┘  │
│                                      │
│  Legend:                             │
│  (U) = Unique constraint             │
│  (H) = Hashed value                  │
│  (E) = Enum values                   │
│  *   = Foreign key reference         │
│                                      │
└──────────────────────────────────────┘
```

## Error Handling Flow

```
┌──────────────────┐
│ Request Arrives  │
└────────┬─────────┘
         │
         ▼
    ┌─────────────┐
    │ Try Execute │
    │ Route Logic │
    └────────┬────┘
             │
         ┌───┴────┐
         │        │
    Success Error │
         │        │
         ▼        ▼
    ┌────┐   ┌──────────────┐
    │200 │   │ Error Caught  │
    │Response├──────────────┤
    └────┘   │ Type Check:  │
             ├──────────────┤
             │ Validation?  ├─► 400
             │ Auth?        ├─► 401
             │ Permission?  ├─► 403
             │ Not Found?   ├─► 404
             │ File Size?   ├─► 413
             │ Server?      ├─► 500
             └──────────────┘
                    │
                    ▼
             ┌─────────────┐
             │ Return JSON │
             │ with error  │
             │ message     │
             └─────────────┘
```

## Request Validation Flow

```
┌──────────────────────┐
│ Incoming Request     │
│ with Data            │
└────────┬─────────────┘
         │
         ▼
    ┌──────────────────────────────┐
    │ Validation Middleware        │
    │ (validation.js)              │
    ├──────────────────────────────┤
    │ Rules Applied:               │
    │ - Required fields check      │
    │ - String length check        │
    │ - Email format check         │
    │ - Enum values check          │
    │ - Custom validators          │
    └────────┬─────────────────────┘
             │
         ┌───┴────┐
         │        │
    Valid│        │Invalid
         ▼        ▼
    ┌────────┐┌──────────────┐
    │Pass to ││buildMessage()│
    │Handler ││- Extract     │
    └────────┘│  errors      │
             │└──────────────┘
                    │
                    ▼
             ┌─────────────────┐
             │ Return 400 with │
             │ error details   │
             └─────────────────┘
```

---

This architecture ensures:
- ✅ Clear separation of concerns
- ✅ Secure authentication flow
- ✅ Proper validation at each step
- ✅ Comprehensive error handling
- ✅ Database integrity with relationships
