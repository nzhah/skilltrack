# SkillTrack - Full Stack Developer Portfolio Project Setup Guide

## 📋 Overview
**SkillTrack** is a personal Developer Skill Tracker web app showcasing full-stack development skills:
- 🔐 Secure authentication (JWT + bcrypt)
- 💾 Full CRUD operations for skills
- 📈 Progress tracking with visualizations
- 📚 Learning resources management
- 🧠 Analytics dashboard

---

## 🎯 Skills Demonstrated

### Frontend (React)
- ES6+, Hooks, Context API/Redux
- React Router for navigation
- Axios for HTTP requests
- Recharts for data visualization
- Jest for testing
- Error handling & loading states

### Backend (Node.js + Express)
- RESTful API design
- JWT authentication & authorization
- Password hashing with bcrypt
- Input validation & error handling
- Middleware architecture
- CORS & security headers

### Database (MongoDB)
- Schema design with Mongoose
- Data validation & indexing
- Relationships (User → Skills)
- Aggregation for statistics

### DevOps & Deployment
- Environment configuration
- Git version control
- Docker containerization (optional)
- Deployment to Vercel (frontend) & Render (backend)

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ and npm/yarn
- MongoDB Atlas account (free tier)
- Git
- VS Code or similar editor

### 1. Clone and Setup

```bash
# Navigate to project directory
cd skilltrack

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Configuration

#### Backend (.env)
Already configured at `server/.env`:
```
NODE_ENV=development
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

#### Frontend (.env)
Already configured at `client/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# Client runs on http://localhost:3000
```

---

## 📁 Project Structure

### Backend (`server/`)
```
server/
├── models/              # Mongoose schemas
│   ├── User.js         # User model with password hashing
│   └── Skill.js        # Skill model with resources
├── controllers/         # Route handlers
│   ├── authController.js
│   └── skillsController.js
├── middleware/          # Express middleware
│   ├── auth.js         # JWT protection
│   └── errorHandler.js # Error handling & asyncHandler
├── routes/             # API routes
│   ├── auth.js
│   └── skills.js
├── server.js           # Main server file
└── package.json
```

### Frontend (`client/`)
```
client/
├── src/
│   ├── pages/          # React page components
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── Skills.js
│   │   └── NotFound.js
│   ├── components/     # Reusable components
│   │   └── ProtectedRoute.js
│   ├── context/        # Context API
│   │   ├── AuthContext.js
│   │   └── SkillsContext.js
│   ├── services/       # API calls (to be created)
│   └── utils/          # Utility functions (to be created)
├── public/
└── package.json
```

---

## 🔐 Authentication Flow

1. **Register**: User creates account → Password hashed with bcrypt → JWT issued
2. **Login**: Email & password verified → JWT issued
3. **Protected Routes**: JWT verified in middleware → User ID extracted
4. **Token Storage**: Stored in localStorage, sent in Authorization header

### JWT Structure
```
Header: { alg: "HS256", type: "JWT" }
Payload: { id: <user_id>, iat: <timestamp>, exp: <expiration> }
Signature: HMACSHA256(<header>.<payload>, <secret>)
```

---

## 💾 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, lowercase),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Skill Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  name: String,
  description: String,
  category: String ['frontend', 'backend', 'database', 'devops', 'testing', 'other'],
  proficiencyLevel: Number (1-5),
  progressPercentage: Number (0-100),
  learningGoal: String,
  resources: [{
    title: String,
    url: String,
    type: String ['documentation', 'tutorial', 'video', 'article', 'course', 'other']
  }],
  startedAt: Date,
  lastUpdated: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (Protected)
```

### Skills
```
GET    /api/skills           - Get all user skills (Protected)
GET    /api/skills/stats     - Get skill statistics (Protected)
GET    /api/skills/:id       - Get single skill (Protected)
POST   /api/skills           - Create new skill (Protected)
PUT    /api/skills/:id       - Update skill (Protected)
DELETE /api/skills/:id       - Delete skill (Protected)
```

### Query Parameters
```
GET /api/skills?category=frontend&sort=-proficiencyLevel,name
```

---

## 🧪 Testing

### Backend Tests
```bash
cd server
npm run test           # Watch mode
npm run test:once      # Single run with coverage
```

### Frontend Tests
```bash
cd client
npm test               # Watch mode
npm run test:coverage  # Coverage report
```

---

## 📦 Key Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT creation & verification
- **bcryptjs**: Password hashing
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Environment variables
- **nodemon**: Development server auto-reload
- **jest**: Testing framework
- **supertest**: HTTP assertion library

### Frontend
- **react**: UI library
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **recharts**: Data visualization
- **react-scripts**: Build & test configuration

---

## 🔒 Security Features

1. **Password Security**
   - Hashed with bcrypt (10 salt rounds)
   - Never stored in plain text
   - Never returned in API responses

2. **JWT Security**
   - Signed with SECRET_KEY
   - Expires after 30 days
   - Verified on protected routes
   - Stored in localStorage (frontend)

3. **API Security**
   - CORS enabled (configured origin only)
   - Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
   - Input validation on all endpoints
   - Mongoose schema validation

4. **Authorization**
   - Users can only access their own skills
   - Ownership checks on update/delete operations

---

## 📊 Dashboard Stats

The `/api/skills/stats` endpoint returns:
```json
{
  "totalSkills": 5,
  "averageProficiency": 3.5,
  "categoryBreakdown": {
    "frontend": 2,
    "backend": 2,
    "database": 1
  },
  "recentUpdates": [
    {
      "id": "...",
      "name": "React",
      "lastUpdated": "2024-11-12T10:00:00Z"
    }
  ]
}
```

---

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set `REACT_APP_API_URL` environment variable to backend URL
4. Auto-deploys on push

### Backend (Render)
1. Push code to GitHub
2. Create Web Service on Render
3. Set environment variables:
   - `NODE_ENV=production`
   - `MONGO_URI=<connection-string>`
   - `JWT_SECRET=<secret>`
   - `CLIENT_URL=<frontend-url>`
4. Deploy from GitHub

### Docker (Optional)
```bash
# Build
docker build -t skilltrack-backend .

# Run
docker run -p 5000:5000 --env-file .env skilltrack-backend
```

---

## 📈 Features Implementation Checklist

### Phase 1: Core Backend
- [x] User model with password hashing
- [x] Skill model with schema
- [x] Authentication controller (register, login)
- [x] Skills controller (CRUD)
- [x] JWT middleware
- [x] Error handling
- [ ] **TODO**: Add missing methods to User model

### Phase 2: Core Frontend
- [x] Auth context & hooks
- [x] Skills context & hooks
- [ ] **TODO**: Complete SkillsContext implementation
- [ ] **TODO**: Login & Register pages
- [ ] **TODO**: Dashboard with stats visualization
- [ ] **TODO**: Skills list & management page
- [ ] **TODO**: API service layer

### Phase 3: Advanced Features
- [ ] Skill filtering by category
- [ ] Progress tracking visualization
- [ ] Learning resources management
- [ ] Skill charts (bar, radar, pie)
- [ ] Mobile responsiveness
- [ ] User preferences/settings

### Phase 4: Testing & Deployment
- [ ] Unit tests for models & controllers
- [ ] Integration tests for API routes
- [ ] Frontend component tests
- [ ] E2E tests
- [ ] Docker containerization
- [ ] GitHub Actions CI/CD
- [ ] Vercel frontend deployment
- [ ] Render backend deployment

---

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
```
Error: MongoDB Connection Error
Solution: Verify MONGO_URI in .env and MongoDB Atlas IP whitelist
```

### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS
Solution: Verify CLIENT_URL in .env matches frontend origin
```

### JWT Token Invalid
```
Error: Not authorized to access this route
Solution: Check JWT_SECRET is same in .env, verify token format
```

### Port Already in Use
```bash
# Kill process on port 5000
# Linux/Mac: lsof -ti:5000 | xargs kill -9
# Windows: netstat -ano | findstr :5000, then taskkill /PID <PID>
```

---

## 📚 Learning Resources

### Authentication & Security
- [JWT.io](https://jwt.io/) - JWT documentation
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)

### MongoDB & Mongoose
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Schema Validation](https://docs.mongodb.com/manual/core/schema-validation/)

### React
- [React Hooks](https://react.dev/reference/react)
- [Context API](https://react.dev/reference/react/useContext)

### Express
- [Express.js Guide](https://expressjs.com/)
- [RESTful API Design](https://restfulapi.net/)

---

## 📞 Git Best Practices

```bash
# Feature branch workflow
git checkout -b feature/skill-crud
git add .
git commit -m "feat: add skill CRUD operations"
git push origin feature/skill-crud
# Create Pull Request on GitHub

# Commit message format
feat: add new feature
fix: bug fix
docs: documentation
test: tests
refactor: code refactoring
style: formatting changes
chore: dependencies, config
```

---

## ✅ Next Steps

1. **Complete User Model** - Add `getSignedJwtToken()` and `matchPassword()` methods
2. **Build API Service Layer** - Create axios service for frontend API calls
3. **Implement Auth Pages** - Create Login & Register components
4. **Build Dashboard** - Stats visualization with charts
5. **Skills Management** - List, add, edit, delete skills
6. **Add Tests** - Unit & integration tests
7. **Deploy** - Vercel (frontend) & Render (backend)
8. **GitHub** - Push with clean commits

---

## 📝 Notes

- **Environment Variables**: Never commit `.env` files - use `.env.example`
- **API Base URL**: Update `REACT_APP_API_URL` in client/.env for production
- **MongoDB Atlas**: Set IP whitelist to allow connections
- **JWT Secret**: Use strong random string in production
- **CORS**: Update `CLIENT_URL` when deploying frontend

---

**Last Updated**: November 12, 2025
**Version**: 1.0
