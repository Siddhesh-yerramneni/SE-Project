# 📚 ShelfWise

ShelfWise is a full-stack web application designed for book enthusiasts to discover, organize, and share their reading journey. Users can browse books, manage personal collections, write reviews, and create posts to share insights or recommendations with the community—all through a responsive and intuitive interface.

## 🚀 Tech Stack

- **Frontend**: React, Vite, TailwindCSS  
- **Backend**: Go with the Fiber framework, GORM ORM  
- **Database**: MySQL (or PostgreSQL)  
- **Testing**: Vitest (unit tests), React Testing Library, Cypress (end-to-end), Go’s built-in testing

## 🛠 Prerequisites

Ensure you have the following installed on your machine:
- Go (v1.20+)
- Node.js (v18+)
- npm or yarn
- MySQL (local instance) or access to a relational database
- [Optional] Docker & Docker Compose (for containerization)

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Siddhesh-yerramneni/SE-Project.git
cd SE-Project
```

### 2. Setup and run the backend

```bash
cd server
go mod tidy
# Create a .env file with your database connection:
# DATABASE_URL="user:pass@tcp(localhost:3306)/shelfwise_db?charset=utf8mb4&parseTime=True&loc=Local"
go run server.go
```

The API will be available at `http://localhost:3000`.

### 3. Setup and run the frontend

```bash
cd ../client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser to explore the app.

## 🧪 Running Tests

### Frontend

- **Unit tests**:
  ```bash
  cd client
  npm test
  ```
- **Cypress E2E tests**:
  ```bash
  cd client
  npx cypress open
  ```

### Backend

```bash
cd server
go test ./tests -v
```

Ensure any required environment variables or test databases are configured before running tests.

## 📂 Project Structure

```
SE-Project/
├── client/          # Frontend (React + Vite)
│   ├── src/
│   └── tests/
├── server/          # Backend (Go + Fiber)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── tests/
└── FrontPage.md     # This documentation
```

## 🤝 Contributing

Contributions welcome! Please open an issue to discuss major changes before submitting a pull request.

## 📄 License

MIT License
