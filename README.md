# 📋 Task Manager — Full Stack App

A production-grade full-stack task management application with JWT authentication and an analytics dashboard built with React, Node.js, Express, and PostgreSQL.

🔗 **Live Demo:** [task-manager-five-chi-22.vercel.app](https://task-manager-five-chi-22.vercel.app)  
🐙 **GitHub:** [github.com/swastika009/task-manager](https://github.com/swastika009/task-manager)

---

## 📸 Screenshots

> <img width="1406" height="929" alt="Screenshot 2026-05-17 150649" src="https://github.com/user-attachments/assets/02ba1b6a-aaca-4652-8f86-1c314b3b859c" />
<img width="1403" height="926" alt="Screenshot 2026-05-17 150632" src="https://github.com/user-attachments/assets/e76e6164-d912-4a68-b077-97fbd63601f5" />
<img width="1409" height="929" alt="Screenshot 2026-05-17 150618" src="https://github.com/user-attachments/assets/afdcfa27-328d-4783-9ccd-c818c324ebfc" />
<img width="655" height="571" alt="Screenshot 2026-05-17 150556" src="https://github.com/user-attachments/assets/e4d71258-7d85-4f47-b057-a118c8802b7a" />
<img width="760" height="628" alt="Screenshot 2026-05-17 150235" src="https://github.com/user-attachments/assets/1d147982-8caf-4ab0-b781-0771c91c8b35" />


---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register, login, and logout
- ✅ **Task Management** — Create, update, delete, and filter tasks
- 🎯 **Priority Levels** — Low, medium, and high priority per task
- 📅 **Due Dates** — Track deadlines per task
- 📊 **Analytics Dashboard** — Real-time charts showing:
  - Completion rate (donut chart)
  - Tasks completed per day over 30 days (line chart)
  - Tasks by priority (bar chart)
  - Overdue task list
- 🔒 **Protected Routes** — Frontend and backend both secured
- ☁️ **Fully Deployed** — Live on Vercel + Render + Supabase

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP requests |
| Recharts | Data visualization |
| Context API | Global auth state |
| Custom Hooks | Reusable data logic |

### Backend
| Tech | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API framework |
| PostgreSQL | Relational database |
| Supabase | Cloud database hosting |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT auth tokens |

### DevOps
| Tech | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| GitHub | Version control |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A Supabase account (free)

### 1. Clone the repository

```bash
git clone https://github.com/swastika009/task-manager.git
cd task-manager
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```
PORT=5000
DATABASE_URL=your-supabase-connection-string
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

Run the schema in your Supabase SQL editor:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:

```
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

### 4. Open the app

Visit `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |

### Tasks *(protected)*
| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks for user |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

### Analytics *(protected)*
| Method | Endpoint | Description |
|---|---|---|
| GET | `/analytics/summary` | Total, completed, pending, overdue counts |
| GET | `/analytics/by-day` | Completions per day (last 30 days) |
| GET | `/analytics/by-priority` | Task count by priority |
| GET | `/analytics/overdue` | List of overdue tasks |

---

## 🗂️ Project Structure

```
task-manager/
├── client/                  # React frontend
│   └── src/
│       ├── api/             # Axios instance
│       ├── context/         # AuthContext
│       ├── hooks/           # useTasks, useAnalytics
│       ├── components/      # Navbar, TaskCard, TaskForm, charts
│       └── pages/           # Login, Register, Tasks, Analytics
│
└── server/                  # Node/Express backend
    ├── db/                  # PostgreSQL connection + schema
    ├── middleware/          # JWT verification
    └── routes/              # auth, tasks, analytics
```

---

## 🔐 Auth Flow

```
Register/Login → bcrypt hash → JWT token → stored client-side
Every request  → Authorization: Bearer <token> → verifyToken middleware → user data
```

---

## 📈 Future Improvements

- [ ] Task filtering and search
- [ ] Drag and drop task ordering
- [ ] Email notifications for overdue tasks
- [ ] Team collaboration and task assignment
- [ ] Dark mode
- [ ] Mobile app (React Native)

---

## 👩‍💻 Author

**Swastika Soni**  
[GitHub](https://github.com/swastika009) · [LinkedIn](https://www.linkedin.com/in/swastika-soni-b84269274/)

---

## 📄 License

MIT License — feel free to use this project as a reference or template.
