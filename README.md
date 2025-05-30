# 🧩 Join – Task Manager Frontend

**Join** is a task management web application inspired by tools like Jira. It allows users to create and manage tasks, collaborate with contacts, and stay organized with a clean and interactive UI.

This repository contains the **Frontend** of Join, developed using Angular 17, modern JavaScript, HTML, and CSS.

---

## 🚀 Features

- 📝 Create, edit, and delete tasks
- ✅ Organize tasks by status (To Do, In Progress, Awaiting Feedback, Done)
- 👥 Contact book to manage collaborators
- 🔒 Login & registration with email and password
- 📱 Responsive design for desktop and mobile
- 🌐 Communication with a Django backend via REST API (see backend repository for more info)

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BayerTobias/join-frontend-angular17.git
   cd join-frontend-angular17

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Create the environment file
   Create a new file at: src/environments/environment.ts

   Then paste the following content inside it, and replace the placeholder values with your actual credentials:

   ```ts
   export const environment = {
     production: true,
     baseUrl: "https://your-django-backend.example.com", // <-- Replace with your real backend URL
   };
   ```

4. Start the development server:

   ```bash
   ng serve

   ```

5. Open the app in your browser: http://localhost:4200

### 🔗 Backend

This frontend is intended to work with the [Join Django backend](https://github.com/BayerTobias/join-backend).  
Please make sure the backend is running and reachable at the `baseUrl` defined in `environment.ts`.### 🔗 Backend
