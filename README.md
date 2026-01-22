@"
# 📚 Student Management System

একটি সম্পূর্ণ Student Management সিস্টেম যা **Node.js + Express.js + MongoDB** ব্যবহার করে তৈরি এবং একটি সুন্দর **HTML/CSS/JavaScript** frontend সহ আসে।

---

## 🎯 Features

✅ **Student Add করা** - নতুন student যোগ করুন  
✅ **Student List দেখা** - সব student এর তালিকা দেখুন  
✅ **Student Edit করা** - Student এর তথ্য পরিবর্তন করুন  
✅ **Student Delete করা** - Student remove করুন  
✅ **Beautiful UI** - Modern এবং responsive design  
✅ **Real-time Updates** - Database এ সরাসরি তথ্য সংরক্ষণ  

---

## 📋 Student Information Fields

প্রতিটি Student এর নিম্নলিখিত তথ্য থাকবে:

- **Student ID** - Unique identifier (e.g., STU001)
- **Name** - Student এর নাম
- **Department** - CSE / BBA / GDM
- **Section** - A / B / C / D
- **Batch** - সাল (e.g., 2023, 2024)

---

## 🛠️ প্রয়োজনীয় Things

আগে নিশ্চিত করুন আপনার কাছে আছে:

- **Node.js** (v14+ recommended) - [ডাউনলোড](https://nodejs.org/)
- **npm** (Node.js এর সাথে আসে)
- **MongoDB** - [Account তৈরি করুন](https://www.mongodb.com/cloud/atlas)

### Node.js ইনস্টল আছে কিনা চেক করুন:

\`\`\`bash
node -v
npm -v
\`\`\`

---

## 📦 Installation & Setup

### 1️⃣ প্রজেক্ট ফোল্ডার খুলুন

\`\`\`bash
cd "Web programming Lab/student-management-api"
\`\`\`

### 2️⃣ Dependencies ইনস্টল করুন

\`\`\`bash
npm install
\`\`\`

এটি \`package.json\` থেকে সব প্যাকেজ ডাউনলোড করবে।

### 3️⃣ MongoDB Connection Setup

\`db.js\` ফাইলে আপনার MongoDB connection string যোগ করুন।

---

## ▶️ Server চালু করুন

### Development Mode:

\`\`\`bash
npm run dev
\`\`\`

### Production Mode:

\`\`\`bash
npm start
\`\`\`

**Success হলে দেখাবে:**

\`\`\`
MongoDB connected
Server running on http://localhost:5000
\`\`\`

---

## 🌐 Webpage ব্যবহার করুন

### Option 1: Live Server দিয়ে (সবচেয়ে সহজ)

VS Code এ \`index.html\` ফাইল খুলে **Right Click** → **Open with Live Server**

### Option 2: Python HTTP Server

\`\`\`bash
python -m http.server 8000
\`\`\`

তারপর Browser এ খুলুন: \`http://localhost:8000\`

---

## 📝 API Endpoints

### 🟢 GET - সব Students
\`\`\`
GET http://localhost:5000/students
\`\`\`

### 🔵 POST - নতুন Student যোগ করুন
\`\`\`
POST http://localhost:5000/students
\`\`\`

### 🟡 PUT - Student আপডেট করুন
\`\`\`
PUT http://localhost:5000/students/{id}
\`\`\`

### 🔴 DELETE - Student ডিলেট করুন
\`\`\`
DELETE http://localhost:5000/students/{id}
\`\`\`

---

## 🗂️ Project Structure

\`\`\`
student-management-api/
├── index.js              # Express server main file
├── db.js                 # MongoDB connection
├── package.json          # Dependencies
├── index.html            # Frontend webpage
├── models/
│   └── Student.js        # MongoDB Student schema
└── Readme.md             # এই ফাইল
\`\`\`

---

## 🧪 Postman দিয়ে Test করুন

[Postman ডাউনলোড](https://www.postman.com/downloads/) করে APIs test করুন।

---

## ⚡ Quick Start

\`\`\`bash
# 1. Dependencies ইনস্টল
npm install

# 2. MongoDB connection string যোগ করুন db.js এ

# 3. Server চালু করুন
npm run dev

# 4. Frontend খুলুন (Live Server)
\`\`\`

---

**Happy Coding! 🚀**
"@ | Set-Content "C:\Users\mdhhd\Desktop\Web programming Lab\student-management-api\Readme.md" -