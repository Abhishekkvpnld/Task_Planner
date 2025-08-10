# Month Task Planner

A task planning application built with **Vite**, **React**, **TypeScript**, and **Docker**.  
Features include task filtering, calendar view, and drag-and-drop scheduling.

---

## Tech Stack
- [Vite](https://vitejs.dev/) – Fast frontend build tool
- [React](https://react.dev/) – UI library
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [React Big Calendar](https://github.com/jquense/react-big-calendar) – Calendar view
- [TailwindCSS](https://tailwindcss.com/) – Styling
- [Docker](https://www.docker.com/) – Containerization

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Abhishekkvpnld/Task_Planner.git
cd month-task-planner/client
```

## Live Demo
[**View the deployed app here**](https://task-planner-green.vercel.app/)  


---

### 2. Install dependencies
```bash
npm install
```

---

## 🛠 Development
Run locally:
```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Running with Docker

### Build the Docker image
```bash
docker build -t month-task-planner .
```

### Run the container
```bash
docker run -p 5173:5173 month-task-planner
```
