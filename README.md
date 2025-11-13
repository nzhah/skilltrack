# SkillTrack 🚀 - Developer Skill Tracking Application

A full-stack web application for developers to track their learning progress, rate proficiency levels, and visualize skill development over time.

## 🎯 Features

### Core Features ✅
- **🔐 Secure Authentication**: Register and login with JWT-based authentication
- **💾 Skill Management**: Add, edit, and delete skills with detailed information
- **📈 Progress Tracking**: Monitor proficiency levels (1-5 scale) and progress percentages
- **📚 Learning Resources**: Attach learning links (tutorials, documentation, videos)
- **🧠 Interactive Dashboard**: View statistics, charts, and recent updates
- **🎨 Beautiful UI**: Responsive design with Recharts visualizations

### Advanced Features
- Filter skills by category (Frontend, Backend, Database, DevOps, Testing, Other)
- Search functionality across skill names and categories
- Visual progress bars and proficiency stars
- Category breakdown pie and bar charts
- Recent updates timeline
- Optimized API service layer with error handling

---

## 🛠️ Tech Stack

### Frontend
- **React** 19 - UI library with Hooks & Context API
- **React Router** 7 - Client-side routing
- **Axios** - HTTP client with interceptors
- **Recharts** - Data visualization library
- **CSS3** - Modern styling with flexbox/grid

### Backend
- **Node.js** - Runtime environment
- **Express** 5 - Web framework
- **MongoDB** - NoSQL database with Atlas
- **Mongoose** 8 - ODM with schema validation
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing

### Testing & Development
- **Jest** - Testing framework
- **Nodemon** - Auto-reload development server
- **Supertest** - HTTP assertion library
- **dotenv** - Environment variable management

### Deployment
- **Vercel** - Frontend hosting
- **Render/Railway** - Backend hosting
- **MongoDB Atlas** - Managed database

---

## 📁 Project Structure

```
skilltrack/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   └── ProtectedRoute.js
│   │   ├── context/          # React Context
│   │   │   ├── AuthContext.js
│   │   │   └── SkillsContext.js
│   │   ├── pages/            # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Skills.js
│   │   │   └── NotFound.js
│   │   ├── services/         # API layer
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── server/                    # Express backend
│   ├── models/               # Mongoose schemas
│   │   ├── User.js
│   │   └── Skill.js
│   ├── controllers/          # Route handlers
│   │   ├── authController.js
│   │   └── skillsController.js
│   ├── middleware/           # Express middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   └── skills.js
│   ├── server.js             # Main server file
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── SETUP_GUIDE.md            # Detailed setup instructions
├── DEVELOPMENT_CHECKLIST.md  # Implementation checklist
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- MongoDB Atlas account (free tier)
- Git

### 1. Clone & Setup

```bash
# Clone repository
git clone <your-repo-url>
cd skilltrack

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

**Backend** - Create `server/.env`:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here-make-it-long
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

**Frontend** - Update `client/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# Runs on http://localhost:3000
```

### 4. Test the Application

- Register a new account
- Add your first skill
- View dashboard stats
- Edit and delete skills

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response (201):
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response (200):
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response (200):
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

### Skills Routes

#### Get All Skills
```
GET /skills?category=frontend&sort=-proficiencyLevel
Authorization: Bearer <token>

Query Parameters:
- category: frontend | backend | database | devops | testing | other
- sort: field names (prefix with - for descending)

Response (200):
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": "507f1f77bcf86cd799439010",
      "name": "React",
      "description": "React library for building UIs",
      "category": "frontend",
      "proficiencyLevel": 4,
      "progressPercentage": 80,
      "learningGoal": "Master advanced patterns",
      "resources": [],
      "startedAt": "2024-11-01T00:00:00Z",
      "lastUpdated": "2024-11-12T10:00:00Z"
    }
  ]
}
```

#### Get Single Skill
```
GET /skills/:id
Authorization: Bearer <token>
```

#### Create Skill
```
POST /skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "React",
  "description": "React library for building UIs",
  "category": "frontend",
  "proficiencyLevel": 4,
  "progressPercentage": 80,
  "learningGoal": "Master advanced patterns",
  "resources": [
    {
      "title": "React Official Docs",
      "url": "https://react.dev",
      "type": "documentation"
    }
  ]
}
```

#### Update Skill
```
PUT /skills/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "proficiencyLevel": 5,
  "progressPercentage": 100
}
```

#### Delete Skill
```
DELETE /skills/:id
Authorization: Bearer <token>
```

#### Get Statistics
```
GET /skills/stats
Authorization: Bearer <token>

Response (200):
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
        "id": "507f1f77bcf86cd799439011",
        "name": "React",
        "lastUpdated": "2024-11-12T10:00:00Z"
      }
    ]
  }
}
```

---

## 🔐 Security Features

### Password Security
- Passwords hashed with bcrypt (10 salt rounds)
- Never stored or transmitted in plain text
- Never returned in API responses

### JWT Security
- Tokens signed with SECRET_KEY
- 30-day expiration
- Verified on all protected routes
- Stored in localStorage on client

### API Security
- CORS enabled with origin validation
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- Input validation on all endpoints
- MongoDB schema validation
- Authorization checks (users can only access their own data)

---

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test              # Watch mode
npm run test:once     # Single run with coverage
```

### Frontend Tests
```bash
cd client
npm test              # Watch mode
npm run test:coverage # Coverage report
```

---

## 📦 Installation & Dependencies

### Frontend Dependencies
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.9.5",
  "axios": "^1.13.2",
  "recharts": "^3.3.0"
}
```

### Backend Dependencies
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.3",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3"
}
```

---

## 🚀 Deployment

### Deploy Frontend (Vercel)

1. Push code to GitHub
2. Connect your GitHub repo to Vercel
3. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   ```
4. Vercel auto-deploys on every push

**Deployed Frontend URL**: `https://skilltrack-app.vercel.app`

### Deploy Backend (Render)

1. Push code to GitHub
2. Create Web Service on Render
3. Set environment variables:
   ```
   NODE_ENV=production
   MONGO_URI=<your-mongodb-atlas-connection>
   JWT_SECRET=<secure-random-string>
   CLIENT_URL=<your-vercel-frontend-url>
   ```
4. Deploy from GitHub

**Deployed Backend URL**: `https://skilltrack-api.onrender.com`

### MongoDB Atlas Setup

1. Create free M0 cluster
2. Create database user with strong password
3. Add IP to IP whitelist (0.0.0.0/0 for development)
4. Get connection string from "Connect" button
5. Replace `<username>`, `<password>`, `<database>` in string

---

## 📈 Performance Optimization

### Frontend
- Code splitting with React.lazy
- Memoization with useMemo & useCallback
- CSS-in-JS for dynamic styling
- Lazy loading images

### Backend
- Database indexing on frequently queried fields
- Query optimization with select()
- Pagination for large result sets
- Caching with Redis (optional)

### Database
- Indexes on user_id and category fields
- Connection pooling
- Aggregation pipelines for analytics

---

## 🐛 Common Issues & Solutions

### MongoDB Connection Failed
```
Error: MongooseError: Cannot connect to MongoDB

Solution:
1. Verify MONGO_URI in .env
2. Check IP whitelist in MongoDB Atlas
3. Ensure password doesn't contain special characters
```

### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS

Solution:
1. Verify CLIENT_URL in .env matches frontend origin
2. Check CORS middleware is enabled in server.js
3. For production, update CLIENT_URL to Vercel URL
```

### Token Expired
```
Error: Not authorized to access this route

Solution:
1. Clear localStorage in browser DevTools
2. Login again to get new token
3. Token stored in Authorization header
```

---

## 📚 Learning Resources

### Web Development
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)

### React
- [React Official Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)

### Node.js & Express
- [Express.js Guide](https://expressjs.com/)
- [Node.js Official Docs](https://nodejs.org/docs/)

### Database
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/)

### Security
- [JWT.io](https://jwt.io/)
- [OWASP Security](https://owasp.org/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m "feat: add new feature"`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

### Commit Convention
```
feat: new feature
fix: bug fix
docs: documentation
test: tests
refactor: code refactoring
style: styling changes
chore: dependencies
```

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🎓 Skills Showcased

This project demonstrates proficiency in:

- ✅ **Full Stack Development** - Frontend + Backend + Database
- ✅ **ES6+** - Arrow functions, destructuring, async/await
- ✅ **React** - Hooks, Context API, routing
- ✅ **Node.js** - Express, RESTful APIs
- ✅ **MongoDB** - Schema design, validation, aggregation
- ✅ **Security** - JWT, bcrypt, CORS, input validation
- ✅ **Testing** - Jest, unit & integration tests
- ✅ **Git** - Version control, clean commits
- ✅ **Deployment** - Vercel, Render, cloud services
- ✅ **Problem Solving** - Error handling, debugging

---

## 📞 Contact & Support

- **GitHub**: [Your GitHub Profile](https://github.com/yourusername)
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- **Email**: your.email@example.com

---

## 🙏 Acknowledgments

- MongoDB Atlas for free database hosting
- Vercel for frontend deployment
- Render for backend hosting
- Recharts for beautiful visualizations
- The React & Node.js communities

---

**Happy coding! 🚀** Keep tracking your skills and never stop learning!

*Last Updated: November 12, 2025*
