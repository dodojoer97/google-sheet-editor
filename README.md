Here's the updated **README.md** with **esbuild** changes and backend deployment on **Render**, but without frontend deployment details yet.

---

📂 **`README.md`**  
```md
# Google Sheet Editor 🚀  

A **monorepo** application to manage and edit job application tracking inside a **Google Sheet**.  
Built with **React (Vite) + Express + Firebase Authentication + Google Sheets API**.  

✅ **Backend deployed on [Render](https://render.com) (Express API)**

---

## 🏗️ Project Structure  
```
google-sheet-editor/
│── node_modules/       # Shared dependencies
│── package.json        # Defines workspaces
│── shared/             # Shared TypeScript models & validation
│   ├── src/
│   ├── dist/
│   ├── package.json
│── backend/            # Express.js API for interacting with Google Sheets
│   ├── src/
│   ├── dist/
│   ├── package.json
│   ├── build.js        # esbuild config
│── frontend/           # React app for submitting and managing job applications
│   ├── src/
│   ├── package.json
```

---

## ✨ Features
- **Google Sheets API Integration**: Append and retrieve job applications from a Google Sheet.
- **Authentication with Firebase**: Secure sign-in via Google OAuth.
- **Shared Models & Validation**: Ensures consistency across **backend & frontend**.
- **NPM Workspaces**: Monorepo architecture with shared dependencies.
- **TypeScript**: Strict type safety across the entire stack.
- **Lightning-fast Builds with esbuild** ⚡

---

## 🚀 Getting Started  

### 1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/yourusername/google-sheet-editor.git
cd google-sheet-editor
```

### 2️⃣ **Install Dependencies**  
```sh
npm install
```

### 3️⃣ **Setup Firebase Authentication**
1. Go to **Firebase Console** → **Authentication**  
2. Enable **Google Sign-In**  
3. Create a **Web App** and get your Firebase Config (`apiKey`, `authDomain`, etc.).  
4. Update **`frontend/.env`**:
   ```sh
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   ```

### 4️⃣ **Setup Google Sheets API**
1. Enable **Google Sheets API** in **Google Cloud Console**.  
2. Generate a **Service Account Key** (`.json` file).  
3. Update **`backend/.env`**:
   ```sh
   GOOGLE_SHEET_ID=your_sheet_id
   GOOGLE_SERVICE_ACCOUNT_JSON=path/to/service-account.json
   ```

---

## 🛠️ Running the Application

### **🟢 Start the Backend (Express.js)**
Using **esbuild**:
```sh
npm run build -w backend
npm run start -w backend
```
Or in **watch mode**:
```sh
npm run dev -w backend
```

### **🔵 Start the Frontend (Vite + React)**
```sh
npm run dev -w frontend
```

### **⚡ Build the Shared Module**
```sh
npm run build -w shared
```

---

## 🏗️ Backend Deployment on Render  

### **1️⃣ Create a New Web Service on Render**
- Go to [Render](https://dashboard.render.com/) and create a **new Web Service**.
- Connect your **GitHub repo**.
- Select **backend/** as the root directory.

### **2️⃣ Set the Build & Start Commands**
Use the following commands:
- **Build Command:**  
  ```sh
  npm install && npm run build -w backend
  ```
- **Start Command:**  
  ```sh
  npm run start -w backend
  ```

### **3️⃣ Add Environment Variables**
In the **Render dashboard**, go to **Environment Variables** and add:
```sh
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_JSON=your_json_key
```

✅ **Now your backend is live on Render!**

---

## 📜 API Routes (`backend/`)
### **📌 Add a New Job**
```http
POST /sheets/add-job
```
#### ✅ **Request Body**
```json
{
  "company": "Google",
  "jobLink": "https://careers.google.com/job123",
  "jobPostDate": "2025-02-16",
  "jobFoundDate": "2025-02-16",
  "applicationDate": "2025-02-17",
  "status": "Applied",
  "connectionName": "John Doe",
  "connectionLinkedIn": "https://linkedin.com/in/johndoe",
  "hiringManager": "Jane Smith",
  "hiringManagerLinkedIn": "https://linkedin.com/in/janesmith",
  "jobTitle": "Frontend Developer"
}
```

---

## 🛠️ Useful Commands
| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev -w backend` | Start the backend server in watch mode |
| `npm run build -w backend` | Build backend with esbuild |
| `npm run start -w backend` | Run backend after build |
| `npm run dev -w frontend` | Start the frontend (Vite) |
| `npm run build -w shared` | Compile shared models & validation |

---

## 🎉 Contributing
1. **Fork the repo**  
2. **Create a branch** (`feature/new-feature`)  
3. **Commit your changes**  
4. **Push the branch**  
5. **Submit a PR** 🚀  

---

## 📜 License
This project is licensed under **MIT License**.

🚀 **Happy coding!** Let me know if you need any updates! 🔥  
```

---

### 🔥 **What’s Updated?**
✅ **Switched from Webpack to esbuild**  
✅ **Updated backend deployment instructions for Render**  
✅ **Kept frontend deployment section empty for now**  

Let me know when you’re ready to add frontend deployment! 🚀