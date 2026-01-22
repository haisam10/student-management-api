#  Student Management System

একট সমপরণ Student Management সসটম য **Node.js + Express.js + MongoDB** বযবহর কর তর এব একট সনদর **HTML/CSS/JavaScript** frontend সহ আস

---

##  Features

 **Student Add কর** - নতন student যগ করন  
 **Student List দখ** - সব student এর তলক দখন  
 **Student Edit কর** - Student এর তথয পরবরতন করন  
 **Student Delete কর** - Student remove করন  
 **Beautiful UI** - Modern এব responsive design  
 **Real-time Updates** - Database এ সরসর তথয সরকষণ  

---

##  Student Information Fields

পরতট Student এর নমনলখত তথয থকব:

- **Student ID** - Unique identifier (e.g., STU001)
- **Name** - Student এর নম
- **Department** - CSE / BBA / GDM
- **Section** - A / B / C / D
- **Batch** - সল (e.g., 2023, 2024)

---

##  পরযজনয Things

আগ নশচত করন আপনর কছ আছ:

- **Node.js** (v14+ recommended) - [ডউনলড](https://nodejs.org/)
- **npm** (Node.js এর সথ আস)
- **MongoDB** - [Account তর করন](https://www.mongodb.com/cloud/atlas)

### Node.js ইনসটল আছ কন চক করন:

\\\ash
node -v
npm -v
\\\

---

##  Installation & Setup

### 1 পরজকট ফলডর খলন

\\\ash
cd "Web programming Lab/student-management-api"
\\\

### 2 Dependencies ইনসটল করন

\\\ash
npm install
\\\

এট \package.json\ থক সব পযকজ ডউনলড করব

### 3 MongoDB Connection Setup

\db.js\ ফইল আপনর MongoDB connection string যগ করন

---

##  Server চল করন

### Development Mode:

\\\ash
npm run dev
\\\

### Production Mode:

\\\ash
npm start
\\\

**Success হল দখব:**

\\\
MongoDB connected
Server running on http://localhost:5000
\\\

---

##  Webpage বযবহর করন

### Option 1: Live Server দয (সবচয সহজ)

VS Code এ \index.html\ ফইল খল **Right Click**  **Open with Live Server**

### Option 2: Python HTTP Server

\\\ash
python -m http.server 8000
\\\

তরপর Browser এ খলন: \http://localhost:8000\

---

##  API Endpoints

###  GET - সব Students
\\\
GET http://localhost:5000/students
\\\

###  POST - নতন Student যগ করন
\\\
POST http://localhost:5000/students
\\\

###  PUT - Student আপডট করন
\\\
PUT http://localhost:5000/students/{id}
\\\

###  DELETE - Student ডলট করন
\\\
DELETE http://localhost:5000/students/{id}
\\\

---

##  Project Structure

\\\
student-management-api/
 index.js              # Express server main file
 db.js                 # MongoDB connection
 package.json          # Dependencies
 index.html            # Frontend webpage
 models/
    Student.js        # MongoDB Student schema
 Readme.md             # এই ফইল
\\\

---

##  Postman দয Test করন

[Postman ডউনলড](https://www.postman.com/downloads/) কর APIs test করন

---

##  Quick Start

\\\ash
# 1. Dependencies ইনসটল
npm install

# 2. MongoDB connection string যগ করন db.js এ

# 3. Server চল করন
npm run dev

# 4. Frontend খলন (Live Server)
\\\

---

**Happy Coding! **
