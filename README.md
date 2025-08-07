# CareerConnect Hub 🌐  
*A MERN stack application for managing job referral outreach and professional networking*

---

## 🚀 Features
- **Company Management**  
  ✨ Register companies with metadata (industry, location, salary bands, etc.)  
  🌐 Track company websites, LinkedIn pages, and career portals  

- **Employee Profiles**  
  👥 Create detailed employee records (designation, contact info, social links)  
  🔗 Associate employees with companies via `companyId`  

- **Referral Outreach**  
  📈 Track outreach success levels (1–10 scale)  
  ✉️ Manage communication via LinkedIn, email, or phone  

- **Data Insights**  
  📊 Filter companies by industry, salary band, and type  
  🎯 Prioritize outreach based on success metrics  

---

## 🛠️ Tech Stack
| Layer        | Technologies                                                                                                  |
|--------------|---------------------------------------------------------------------------------------------------------------|
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)                    |
| **Backend**  | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js) ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat) |
| **Hosting**  | ![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?style=flat&logo=amazon-aws) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel) ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render) |

---

## ⚙️ Installation

### Clone Repository
```bash
git clone https://github.com/your-username/career-connect-hub.git
cd career-connect-hub
```

### Backend Setup
```bash
cd backend
npm install

# Create .env file with MongoDB URI
echo "MONGODB_URI=your_connection_string" > .env

npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Access Application
Visit: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Overview

### Models

**Company** (`/models/company.model.js`)
```js
{
  name: String,        // Company name (required)
  website: String,     // Official website (required)
  industry: String,    // Industry sector
  location: String,    // Headquarters location
  LinkedIn: String,    // Company LinkedIn URL
  careersPage: String, // Careers page link
  type: String,        // ['Startup','Service','Product','Government','Freelance']
  averageSalaryBand: String // ['Under 2 LPA','2-5 LPA','5-10 LPA','Over 10 LPA']
}
```

**Employee** (`/models/employee.model.js`)
```js
{
  fullName: String,     // Employee name (required)
  designation: String,  // Job title (required)
  email: String,        // Contact email
  linkedIn: String,     // LinkedIn profile URL
  twitter: String,
  github: String,
  PhoneNumber: String,
  successlevel: String, // Outreach success score (1-10)
  companyId: ObjectId   // Reference to Company (required)
}
```

### Endpoints

| Method | Path                | Description                           |
|--------|---------------------|---------------------------------------|
| GET    | `/api/companies`    | Fetch all companies                   |
| POST   | `/api/companies`    | Create new company                    |
| GET    | `/api/employees`    | Get all employees (with company ref)  |
| POST   | `/api/employees`    | Add new employee                      |
| PUT    | `/api/employees/:id`| Update outreach success level         |

---

## 💼 Use Case

**Personal Career Management Workflow**:
- Register target companies with industry/location metadata
- Add employees from LinkedIn/career portals
- Track outreach using success levels (1–10)
- Prioritize follow-ups based on engagement metrics
- Export data for referral requests or networking

📌 *Example*:  
Find all Product companies paying 5–10 LPA → Contact employees with success level < 5

---

## 📜 License

This project is licensed under the **MIT License**.  
*Note: Intended for personal career management use only.*

---
