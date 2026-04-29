# Revnity

A data-driven B2B marketing intelligence platform.

## Project Structure

```
Revnity/
├── frontend/   ← Vite + React + TypeScript + Tailwind CSS + TanStack Router
└── backend/    ← Node.js + Express + MongoDB REST API
```

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev        # http://localhost:8080
npm run build      # Production build
```

### Backend
```bash
cd backend
npm install
npm start          # http://localhost:5000
```

## Environment Variables

### `backend/.env`
```
MONGO_URI=<your MongoDB connection string>
PORT=5000
```

### `frontend/.env`
```
VITE_API_URL=http://localhost:5000/api
```
