# SkillTrack Quick Reference Card 🎯

**Bookmark this for quick access to common commands and info!**

---

## 🚀 Start Development

```bash
# Terminal 1: Backend
cd server && npm run dev
# 🟢 Runs on http://localhost:5000

# Terminal 2: Frontend  
cd client && npm start
# 🟢 Runs on http://localhost:3000
```

---

## 📚 Key Documentation

| Command | Use This Guide |
|---------|----------------|
| `npm install` issues | **SETUP_GUIDE.md** |
| What to build next | **DEVELOPMENT_CHECKLIST.md** |
| How API works | **IMPLEMENTATION_GUIDE.md** |
| How to commit | **GIT_WORKFLOW.md** |
| Project overview | **PROJECT_SUMMARY.md** |

---

## 🔗 Key Endpoints

```
POST   /api/auth/register      → Register user
POST   /api/auth/login         → Login user
GET    /api/auth/me            → Get user info

GET    /api/skills             → List all skills
GET    /api/skills/:id         → Get skill
GET    /api/skills/stats       → Get statistics
POST   /api/skills             → Create skill
PUT    /api/skills/:id         → Update skill
DELETE /api/skills/:id         → Delete skill
```

---

## 🔐 Environment Variables

### Backend (server/.env)
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

### Frontend (client/.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `server/server.js` | Main backend file |
| `server/models/User.js` | User database schema |
| `server/models/Skill.js` | Skill database schema |
| `client/src/App.js` | Frontend router |
| `client/src/context/AuthContext.js` | Auth state |
| `client/src/context/SkillsContext.js` | Skills state |
| `client/src/services/api.js` | API requests |

---

## 🧪 Testing

```bash
# Backend tests
cd server && npm test

# Frontend tests
cd client && npm test

# Coverage reports
cd server && npm run test:once
cd client && npm run test:coverage
```

---

## 🔨 Common Issues & Fixes

### Port Already in Use
```bash
# Kill process on port 5000
# Windows: netstat -ano | findstr :5000, then taskkill /PID <PID>
# Mac/Linux: lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
```
✅ Check: MONGO_URI in .env
✅ Check: IP whitelist in MongoDB Atlas
✅ Check: Username/password correct
```

### CORS Error
```
✅ Verify: CLIENT_URL in backend .env
✅ Verify: REACT_APP_API_URL in frontend .env
✅ Verify: Both servers running
```

---

## 💡 Git Quick Commands

```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "feat(skills): add feature description"

# Push to GitHub
git push origin feature/your-feature

# Create pull request
# (Go to GitHub website)

# Update branch from main
git pull origin main

# View commits
git log --oneline

# Undo last commit
git reset --soft HEAD~1
```

---

## 🎨 Component Structure

```
App
├── Login (public)
├── Register (public)
├── Dashboard (protected)
│   ├── Stat Cards
│   ├── Pie Chart
│   └── Recent Updates
├── Skills (protected)
│   ├── Skill List
│   ├── Skill Cards
│   └── Skill Form Modal
└── NotFound (public)
```

---

## 📊 Context Hooks

```javascript
// In any component:
import { useAuth } from '../context/AuthContext';
import { useSkills } from '../context/SkillsContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  const { skills, createSkill, deleteSkill } = useSkills();
  
  // Use them...
}
```

---

## 🌐 Deployment Commands

### Deploy Backend (Render)
```bash
git push origin main
# Render auto-deploys from GitHub
```

### Deploy Frontend (Vercel)
```bash
git push origin main
# Vercel auto-deploys from GitHub
```

---

## 📞 Helpful Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list

# Clear npm cache
npm cache clean --force

# Install specific package version
npm install package@1.2.3

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 🔍 Debugging Tips

```javascript
// In React components:
console.log('Value:', value);  // Simple logging
console.table(array);          // Table view
console.error('Error:', err);  // Error logging

// In API calls:
// DevTools > Network tab to see requests/responses
// DevTools > Application > LocalStorage for tokens
// DevTools > Console for errors
```

---

## ✅ Before Committing

- [ ] Tests pass: `npm test`
- [ ] No console errors
- [ ] Code formatted
- [ ] Changes make sense
- [ ] Related issue referenced

---

## 🚀 Before Deployment

- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Environment variables set
- [ ] Database connection verified
- [ ] Features tested manually
- [ ] Responsive design checked
- [ ] Error messages clear
- [ ] Loading states visible

---

## 📊 Data Model Quick Reference

### User
```json
{
  "_id": "507f...",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "bcrypt_hash",
  "createdAt": "2024-11-12T10:00:00Z"
}
```

### Skill
```json
{
  "_id": "607f...",
  "user": "507f...",
  "name": "React",
  "category": "frontend",
  "proficiencyLevel": 4,
  "progressPercentage": 80,
  "resources": [],
  "lastUpdated": "2024-11-12T10:00:00Z"
}
```

---

## 🎯 Common Workflows

### Add New Feature
```bash
1. git checkout -b feature/my-feature
2. Make changes (both frontend & backend)
3. Test locally
4. npm test (pass all tests)
5. git commit -m "feat(scope): description"
6. git push origin feature/my-feature
7. Create PR on GitHub
8. Merge after review
9. Deploy
```

### Fix Bug
```bash
1. Create branch: git checkout -b fix/bug-name
2. Locate and fix bug
3. Test the fix
4. git commit -m "fix(scope): description of fix"
5. git push
6. Create PR
7. Merge and deploy
```

### Update Dependencies
```bash
1. npm outdated        # See what's outdated
2. npm update          # Update to minor version
3. npm install package@latest  # Update specific
4. npm test            # Verify tests pass
5. git commit -m "chore: update dependencies"
```

---

## 💬 API Response Examples

### Success Response (200)
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response (400-500)
```json
{
  "success": false,
  "error": "Error message explaining what went wrong"
}
```

### List Response
```json
{
  "success": true,
  "count": 5,
  "data": [ ... ]
}
```

---

## 🔑 Important URLs

| Service | URL |
|---------|-----|
| Frontend Dev | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API Health | http://localhost:5000/health |
| Frontend Test DB | /api/test-db |
| Vercel Deployed | your-name.vercel.app |
| Render Deployed | your-app.onrender.com |
| MongoDB Atlas | atlas.mongodb.com |

---

## 📱 Test User (for development)

After first signup, use these credentials:
```
Email: test@example.com
Password: TestPassword123
```

---

## 🎓 Quick Learning Path

1. **Day 1-2**: Setup & run locally (SETUP_GUIDE.md)
2. **Day 3-4**: Understand architecture (IMPLEMENTATION_GUIDE.md)  
3. **Day 5-7**: Implement checklist items (DEVELOPMENT_CHECKLIST.md)
4. **Day 8-9**: Write tests & fix issues
5. **Day 10**: Deploy & celebrate! 🎉

---

## 🏆 Success Criteria Checklist

- [ ] Runs locally without errors
- [ ] Register/Login works
- [ ] Can create skills
- [ ] Can edit/delete skills
- [ ] Dashboard shows stats & charts
- [ ] All tests passing
- [ ] Deployed to Vercel & Render
- [ ] GitHub repo with clean commits
- [ ] All documentation complete

---

## 🔗 Useful Links

- [React Docs](https://react.dev) - React learning
- [Express Docs](https://expressjs.com) - Backend learning
- [MongoDB Docs](https://docs.mongodb.com) - Database learning
- [JWT.io](https://jwt.io) - JWT explanation
- [Vercel Docs](https://vercel.com/docs) - Deployment help
- [Render Docs](https://render.com/docs) - Backend deployment

---

**Print this page or bookmark it for quick reference! 📌**

---

**Last Updated**: November 12, 2025
