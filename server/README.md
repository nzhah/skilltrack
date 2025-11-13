# SkillTrack Backend API

Express.js REST API server for the SkillTrack application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests once with coverage
npm run test:once

# Start production server
npm start
```

Server runs on `http://localhost:5000` by default.

## 📋 Requirements

- Node.js v14+
- MongoDB Atlas account
- Environment variables (.env file)

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

## 🏗️ Project Structure

```
server/
├── models/              # Mongoose schemas
│   ├── User.js         # User model
│   └── Skill.js        # Skill model
├── controllers/         # Business logic
│   ├── authController.js
│   └── skillsController.js
├── middleware/          # Express middleware
│   ├── auth.js         # JWT authentication
│   └── errorHandler.js # Error handling
├── routes/              # API routes
│   ├── auth.js
│   └── skills.js
├── server.js            # Main server file
└── package.json
```

## 📚 API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Skills
- `GET /api/skills` - Get all skills (Protected)
- `GET /api/skills/:id` - Get single skill (Protected)
- `POST /api/skills` - Create skill (Protected)
- `PUT /api/skills/:id` - Update skill (Protected)
- `DELETE /api/skills/:id` - Delete skill (Protected)
- `GET /api/skills/stats` - Get statistics (Protected)

## 🔒 Security

- Password hashing with bcryptjs
- JWT authentication
- CORS enabled
- Security headers
- Input validation
- MongoDB injection prevention

## 🧪 Testing

```bash
# Run tests in watch mode
npm test

# Run tests once with coverage
npm run test:once
```

## 🚀 Deployment

### Render Deployment

1. Push code to GitHub
2. Create Web Service on Render
3. Set environment variables
4. Deploy from GitHub

### Environment Variables for Production

```
NODE_ENV=production
MONGO_URI=<MongoDB Atlas connection>
JWT_SECRET=<secure random string>
CLIENT_URL=<Vercel frontend URL>
```

## 📖 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT tokens
- **bcryptjs** - Password hashing
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **nodemon** (dev) - Auto reload
- **jest** (dev) - Testing
- **supertest** (dev) - HTTP assertions

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MONGO_URI in .env
- Check IP whitelist in MongoDB Atlas
- Ensure password doesn't contain special characters

### Port Already in Use
```bash
# Kill process on port 5000
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### JWT Token Issues
- Check JWT_SECRET is set
- Verify token format: "Bearer <token>"
- Ensure token hasn't expired

## 📝 API Error Responses

```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad request
- 401: Unauthorized
- 404: Not found
- 500: Server error

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Commit with clear messages
5. Push and create PR

## 📄 License

MIT License

---

**Last Updated**: November 12, 2025
