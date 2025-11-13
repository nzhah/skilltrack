# SkillTrack Frontend

React-based frontend for the SkillTrack skill tracking application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Generate coverage report
npm run test:coverage
```

Frontend runs on `http://localhost:3000` by default.

## 📋 Requirements

- Node.js v14+
- npm or yarn
- Backend API running on `http://localhost:5000`

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

For production (Vercel):
```
REACT_APP_API_URL=https://your-backend-api.onrender.com/api
```

## 🏗️ Project Structure

```
client/src/
├── pages/                   # Page components
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   ├── Skills.js
│   └── NotFound.js
├── components/              # Reusable components
│   └── ProtectedRoute.js
├── context/                 # Context API
│   ├── AuthContext.js
│   └── SkillsContext.js
├── services/                # API service layer
│   └── api.js
├── App.js                   # Root component
├── index.js                 # Entry point
└── *.css                    # Styling
```

## 📖 Features

- **Authentication** - Register, login, logout
- **Dashboard** - View statistics and charts
- **Skills Management** - Add, edit, delete skills
- **Progress Tracking** - Visual progress bars
- **Charts & Analytics** - Recharts visualizations
- **Responsive Design** - Mobile-friendly UI

## 🔌 Context & Hooks

### useAuth Hook
```jsx
const { user, loading, register, login, logout, isAuthenticated } = useAuth();
```

### useSkills Hook
```jsx
const {
  skills,
  stats,
  loading,
  error,
  fetchSkills,
  fetchStats,
  createSkill,
  updateSkill,
  deleteSkill
} = useSkills();
```

## 📚 API Service

The `services/api.js` file provides Axios instance with:
- Automatic token injection in Authorization header
- Request/response interceptors
- Error handling
- Automatic logout on 401 errors

```javascript
import { authService, skillsService } from '../services/api';

// Auth
authService.register(data)
authService.login(data)
authService.getMe()

// Skills
skillsService.getAll(params)
skillsService.getById(id)
skillsService.create(data)
skillsService.update(id, data)
skillsService.delete(id)
skillsService.getStats()
```

## 🎨 Styling

- **CSS Grid** - Responsive layouts
- **Flexbox** - Component alignment
- **CSS Variables** - Color scheme
- **Mobile First** - Responsive design

## 🧪 Testing

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --watchAll=false

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
4. Vercel auto-deploys on push

## 📖 Dependencies

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **recharts** - Data visualization

## 🐛 Troubleshooting

### API Connection Error
- Verify `REACT_APP_API_URL` in .env
- Ensure backend is running
- Check CORS settings in backend
- Clear browser cache and localStorage

### Token Issues
- Clear localStorage
- Login again
- Check browser DevTools > Application > LocalStorage

## 📝 Code Conventions

- Use functional components with hooks
- Use context for global state
- Custom hooks for logic reuse
- Clear component naming

## 📄 License

MIT License

---

**Last Updated**: November 12, 2025

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
