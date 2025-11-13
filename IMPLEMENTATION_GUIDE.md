# SkillTrack Implementation Guide 📚

Complete step-by-step guide for understanding and extending the SkillTrack application.

---

## 📖 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Authentication Flow](#authentication-flow)
3. [Database Schema](#database-schema)
4. [API Documentation](#api-documentation)
5. [Frontend Architecture](#frontend-architecture)
6. [State Management](#state-management)
7. [Adding New Features](#adding-new-features)
8. [Testing](#testing)
9. [Deployment](#deployment)

---

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
│                      Port 3000 (Vercel)                          │
├─────────────────────────────────────────────────────────────────┤
│  Pages: Login, Register, Dashboard, Skills                       │
│  Context: AuthContext, SkillsContext                             │
│  Components: ProtectedRoute, SkillCard, Forms                    │
│  Services: API Service Layer (Axios)                             │
└─────────────────────────────────────────────────────────────────┘
                            ↓ (HTTP/REST)
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                     │
│                    Port 5000 (Render)                            │
├─────────────────────────────────────────────────────────────────┤
│  Routes: /api/auth, /api/skills                                  │
│  Controllers: authController, skillsController                   │
│  Middleware: JWT Auth, Error Handler, CORS                       │
│  Models: User, Skill (Mongoose)                                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓ (MongoDB Driver)
┌─────────────────────────────────────────────────────────────────┐
│              Database (MongoDB Atlas)                             │
│  Collections: users, skills                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

### Registration Flow

```
User Input (name, email, password)
         ↓
Register Form Component
         ↓
authService.register(data) - Axios POST
         ↓
Backend: /api/auth/register
         ↓
Validate input
         ↓
Check if user exists
         ↓
Hash password with bcryptjs
         ↓
Create user in MongoDB
         ↓
Generate JWT token
         ↓
Return token + user data
         ↓
Frontend: AuthContext stores token in localStorage
         ↓
Set Authorization header: "Bearer <token>"
         ↓
Redirect to /dashboard
```

### Login Flow

```
User Input (email, password)
         ↓
Login Form Component
         ↓
authService.login(data) - Axios POST
         ↓
Backend: /api/auth/login
         ↓
Find user by email
         ↓
Compare password with hash
         ↓
Generate JWT token
         ↓
Return token + user data
         ↓
Frontend: AuthContext stores token in localStorage
         ↓
Redirect to /dashboard
```

### Protected Route Flow

```
User visits /dashboard
         ↓
ProtectedRoute component checks isAuthenticated
         ↓
If true: Render Dashboard component
If false: Redirect to /login
         ↓
On each API call:
- Axios interceptor adds Authorization header
- Backend middleware verifies token
- If valid: Process request
- If invalid: Return 401, frontend clears token and redirects to /login
```

### JWT Token Structure

```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "id": "507f1f77bcf86cd799439011",
  "iat": 1699785600,  // issued at
  "exp": 1702377600   // expires at
}

Signature: HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  JWT_SECRET
)
```

---

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String (required, max 50 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min 6 chars),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}

// Example
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$...", // bcrypt hash
  "createdAt": ISODate("2024-11-12T10:00:00Z"),
  "updatedAt": ISODate("2024-11-12T10:00:00Z")
}
```

### Skill Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  name: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  category: String (enum, required),
    // 'frontend' | 'backend' | 'database' | 'devops' | 'testing' | 'other'
  proficiencyLevel: Number (required, 1-5),
  progressPercentage: Number (0-100, default 0),
  learningGoal: String (optional, max 300 chars),
  resources: [
    {
      _id: ObjectId,
      title: String (required),
      url: String (required, valid URL),
      type: String (enum)
        // 'documentation' | 'tutorial' | 'video' | 'article' | 'course' | 'other'
    }
  ],
  startedAt: Date (default now),
  lastUpdated: Date (default now),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}

// Example
{
  "_id": ObjectId("607f1f77bcf86cd799439012"),
  "user": ObjectId("507f1f77bcf86cd799439011"),
  "name": "React",
  "description": "Building UIs with React and Hooks",
  "category": "frontend",
  "proficiencyLevel": 4,
  "progressPercentage": 80,
  "learningGoal": "Master advanced patterns like compound components",
  "resources": [
    {
      "_id": ObjectId("607f1f77bcf86cd799439013"),
      "title": "React Official Documentation",
      "url": "https://react.dev",
      "type": "documentation"
    }
  ],
  "startedAt": ISODate("2024-10-01T00:00:00Z"),
  "lastUpdated": ISODate("2024-11-12T10:00:00Z"),
  "createdAt": ISODate("2024-10-01T00:00:00Z"),
  "updatedAt": ISODate("2024-11-12T10:00:00Z")
}
```

### Database Indexes

```javascript
// On skills collection for faster queries
db.skills.createIndex({ user: 1, category: 1 })
db.skills.createIndex({ user: 1, proficiencyLevel: 1 })
db.skills.createIndex({ user: 1, lastUpdated: -1 })

// On users collection
db.users.createIndex({ email: 1 }, { unique: true })
```

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Common Headers
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

### Response Format
```json
{
  "success": true|false,
  "data": {},
  "error": "error message",
  "count": 5,
  "statusCode": 200
}
```

### Authentication Endpoints

#### POST /auth/register
Register a new user.

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

Response (201):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /auth/login
Login user.

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

Response (200):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### GET /auth/me
Get current authenticated user.

```http
GET /api/auth/me
Authorization: Bearer <token>
```

Response (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-11-12T10:00:00Z",
    "updatedAt": "2024-11-12T10:00:00Z"
  }
}
```

### Skills Endpoints

#### GET /skills
Get all user skills with optional filtering.

```http
GET /api/skills?category=frontend&sort=-proficiencyLevel
Authorization: Bearer <token>
```

Query Parameters:
- `category`: frontend | backend | database | devops | testing | other
- `sort`: field names (prefix with `-` for descending)

Response (200):
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "607f1f77bcf86cd799439012",
      "user": "507f1f77bcf86cd799439011",
      "name": "React",
      "category": "frontend",
      "proficiencyLevel": 4,
      "progressPercentage": 80,
      "lastUpdated": "2024-11-12T10:00:00Z"
    }
  ]
}
```

#### GET /skills/stats
Get user skill statistics.

```http
GET /api/skills/stats
Authorization: Bearer <token>
```

Response (200):
```json
{
  "success": true,
  "data": {
    "totalSkills": 5,
    "averageProficiency": 3.8,
    "categoryBreakdown": {
      "frontend": 2,
      "backend": 2,
      "database": 1
    },
    "recentUpdates": [
      {
        "id": "607f1f77bcf86cd799439012",
        "name": "React",
        "lastUpdated": "2024-11-12T10:00:00Z"
      }
    ]
  }
}
```

#### GET /skills/:id
Get single skill by ID.

```http
GET /api/skills/607f1f77bcf86cd799439012
Authorization: Bearer <token>
```

#### POST /skills
Create new skill.

```http
POST /api/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "React",
  "description": "Building UIs with React",
  "category": "frontend",
  "proficiencyLevel": 4,
  "progressPercentage": 80,
  "learningGoal": "Master advanced patterns",
  "resources": [
    {
      "title": "React Docs",
      "url": "https://react.dev",
      "type": "documentation"
    }
  ]
}
```

#### PUT /skills/:id
Update skill.

```http
PUT /api/skills/607f1f77bcf86cd799439012
Authorization: Bearer <token>
Content-Type: application/json

{
  "proficiencyLevel": 5,
  "progressPercentage": 100
}
```

#### DELETE /skills/:id
Delete skill.

```http
DELETE /api/skills/607f1f77bcf86cd799439012
Authorization: Bearer <token>
```

---

## Frontend Architecture

### Context API Setup

```
App
├── AuthProvider
│   ├── useAuth hook
│   ├── State: user, loading, error
│   ├── Methods: register, login, logout
│   └── Provides token management
├── SkillsProvider
│   ├── useSkills hook
│   ├── State: skills, stats, loading, error
│   └── Methods: CRUD operations
```

### Component Hierarchy

```
App
├── Login (public)
├── Register (public)
├── Dashboard (protected)
│   ├── StatCard components
│   ├── PieChart (Recharts)
│   └── BarChart (Recharts)
├── Skills (protected)
│   ├── SkillCard (repeating)
│   ├── SkillForm (modal)
│   └── Filters
└── NotFound
```

### Data Flow

```
Page Component
     ↓
useAuth & useSkills hooks
     ↓
Call services (fetchSkills, createSkill, etc)
     ↓
API Service (Axios with interceptors)
     ↓
Backend API
     ↓
Response
     ↓
Update context state
     ↓
Component re-render
```

---

## State Management

### AuthContext

```javascript
{
  user: {
    id: "507f...",
    name: "John Doe",
    email: "john@example.com"
  },
  loading: false,
  error: null,
  isAuthenticated: true,
  register: async (data) => {},
  login: async (credentials) => {},
  logout: () => {}
}
```

### SkillsContext

```javascript
{
  skills: [
    {
      _id: "607f...",
      name: "React",
      category: "frontend",
      proficiencyLevel: 4
    }
  ],
  stats: {
    totalSkills: 5,
    averageProficiency: 3.8,
    categoryBreakdown: { frontend: 2 }
  },
  loading: false,
  error: null,
  filters: { category: null },
  fetchSkills: async () => {},
  fetchStats: async () => {},
  createSkill: async (data) => {},
  updateSkill: async (id, data) => {},
  deleteSkill: async (id) => {},
  updateFilters: (newFilters) => {},
  clearFilters: () => {}
}
```

---

## Adding New Features

### Example: Add Skill Difficulty Level

#### Step 1: Update Backend

**models/Skill.js**
```javascript
difficultyLevel: {
  type: String,
  enum: ['beginner', 'intermediate', 'advanced', 'expert'],
  default: 'beginner'
}
```

**controllers/skillsController.js** - No changes needed if using `req.body` directly

#### Step 2: Update Frontend

**Update SkillForm Component**
```javascript
<select name="difficultyLevel" value={formData.difficultyLevel}>
  <option value="beginner">Beginner</option>
  <option value="intermediate">Intermediate</option>
  <option value="advanced">Advanced</option>
  <option value="expert">Expert</option>
</select>
```

**Update Skills.js**
```javascript
const formData = {
  // ... other fields
  difficultyLevel: 'beginner'
};
```

#### Step 3: Update UI Display

**Update SkillCard Component**
```javascript
<div className="skill-difficulty">
  <span>Level: {skill.difficultyLevel}</span>
</div>
```

#### Step 4: Test

1. Create/Edit skill with difficulty level
2. Verify it's saved in MongoDB
3. Verify it displays correctly

---

## Testing

### Backend Testing Structure

```bash
server/
├── __tests__/
│   ├── auth.test.js
│   ├── skills.test.js
│   └── middleware.test.js
```

### Example Test

```javascript
// auth.test.js
const request = require('supertest');
const app = require('../server');

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });
});
```

### Frontend Testing

```javascript
// Dashboard.test.js
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

jest.mock('../context/AuthContext');
jest.mock('../context/SkillsContext');

describe('Dashboard', () => {
  it('should render dashboard header', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });
});
```

---

## Deployment

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] CORS settings correct
- [ ] Error handling in place
- [ ] Loading states implemented
- [ ] Responsive design tested
- [ ] Security headers set
- [ ] JWT secret strong

### Backend Deployment (Render)

1. Push code to GitHub
2. Create Web Service on Render
3. Connect GitHub repository
4. Set environment variables:
   ```
   NODE_ENV=production
   MONGO_URI=<atlas-connection>
   JWT_SECRET=<strong-random-string>
   CLIENT_URL=<vercel-frontend-url>
   ```
5. Deploy

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project on Vercel
3. Set environment variables:
   ```
   REACT_APP_API_URL=<render-backend-url>/api
   ```
4. Deploy

### Production Optimizations

**Backend**:
- Enable compression: `app.use(compression())`
- Use environment-specific settings
- Implement rate limiting
- Add request logging
- Use connection pooling

**Frontend**:
- Code splitting
- Minification (automatic)
- Image optimization
- Lazy loading
- Tree shaking

---

## Troubleshooting Guide

### Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| MongoDB connection fails | Invalid URI or IP whitelist | Verify MONGO_URI, update IP whitelist |
| CORS error | Wrong CLIENT_URL | Update CLIENT_URL in .env |
| Token expired | JWT expiration | Login again, update JWT_EXPIRE if needed |
| API 404 | Wrong endpoint path | Check API route definitions |
| Password hash fails | Old bcrypt version | Update bcryptjs to latest |

---

## Performance Tips

1. **Database**: Use indexes on frequently queried fields
2. **API**: Implement pagination for large datasets
3. **Frontend**: Use React.memo for expensive components
4. **Caching**: Implement token refresh strategy
5. **Images**: Optimize and compress images
6. **Bundling**: Analyze and optimize bundle size

---

**Last Updated**: November 12, 2025

