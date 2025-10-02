# 🚀 FritProject - Full Stack Web Application

Ứng dụng web full-stack hiện đại để quản lý người dùng, được xây dựng với Node.js, Express.js và JavaScript thuần.

## 📋 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Tech Stack](#tech-stack)
- [Cài đặt](#cài-đặt)
- [Sử dụng](#sử-dụng)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Cấu trúc project](#cấu-trúc-project)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

## 🎯 Giới thiệu

**FritProject** là một ứng dụng web full-stack được thiết kế để học tập và showcase kỹ năng phát triển web. Dự án bao gồm:

- **Backend API Server** (Node.js + Express.js)
- **Frontend Web Application** (HTML + CSS + JavaScript)
- **User Management System** với CRUD operations
- **Modern UI/UX** với responsive design
- **API Testing Tools** tích hợp

## ✨ Tính năng

### 🔧 Backend Features
- ✅ **RESTful API** với Express.js
- ✅ **User Management** (Create, Read, Update, Delete)
- ✅ **Security Middleware** (CORS, Helmet, Rate Limiting)
- ✅ **Error Handling** và validation
- ✅ **Health Check** endpoints
- ✅ **API Documentation** tự động
- ✅ **Modular Architecture** dễ mở rộng

### 🎨 Frontend Features
- ✅ **Modern UI/UX** với gradient design
- ✅ **Responsive Design** (Mobile-friendly)
- ✅ **User Management Interface**
- ✅ **Real-time Search & Filter**
- ✅ **Modal Dialogs** cho edit/delete
- ✅ **Toast Notifications**
- ✅ **API Testing Tools** tích hợp
- ✅ **Loading States** và error handling

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Security:** Helmet, CORS, Express Rate Limit
- **Utilities:** Morgan (logging), Compression

### Frontend
- **Languages:** HTML5, CSS3, ES6+ JavaScript
- **Styling:** CSS Grid, Flexbox, CSS Animations
- **Icons:** Font Awesome 6.0
- **API:** Fetch API với Async/Await

### Development Tools
- **Version Control:** Git + GitHub
- **Package Manager:** npm
- **Development:** Nodemon
- **Code Quality:** ESLint, Prettier (ready)

## 🚀 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

### Bước 1: Clone repository
```bash
git clone https://github.com/kongday-byte/fritproject.git
cd fritproject
```

### Bước 2: Cài đặt Backend
```bash
cd backend
npm install
```

### Bước 3: Khởi động Backend
```bash
npm start
# Hoặc development mode
npm run dev
```

Backend sẽ chạy tại: `http://localhost:3001`

### Bước 4: Mở Frontend
```bash
cd ../frontend
# Mở index.html bằng trình duyệt hoặc
# Sử dụng Live Server (VS Code extension)
```

## 🎮 Sử dụng

### 1. Khởi động Backend
```bash
cd backend
npm start
```

### 2. Mở Frontend
- Mở file `frontend/index.html` trong trình duyệt
- Hoặc sử dụng local server:
```bash
cd frontend
python -m http.server 8000
# Truy cập: http://localhost:8000
```

### 3. Sử dụng ứng dụng
1. **Users Tab:** Xem, thêm, sửa, xóa users
2. **Add User Tab:** Thêm user mới
3. **API Test Tab:** Test các API endpoints

## 📚 API Documentation

### Base URL
```
http://localhost:3001
```

### Endpoints

#### Health & Info
- `GET /health` - Health check
- `GET /api/info` - Server information
- `GET /api/docs` - API documentation

#### User Management
- `GET /api/users` - Lấy danh sách users
- `GET /api/users/:id` - Lấy user theo ID
- `POST /api/users` - Tạo user mới
- `PUT /api/users/:id` - Cập nhật user
- `DELETE /api/users/:id` - Xóa user
- `PATCH /api/users/:id/status` - Cập nhật trạng thái

#### Testing
- `POST /api/test` - Test POST endpoint

### Example Request
```javascript
// Tạo user mới
const response = await fetch('http://localhost:3001/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789'
  })
});
```

## 📸 Screenshots

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### User Management
![User Management](docs/screenshots/user-management.png)

### API Testing
![API Testing](docs/screenshots/api-testing.png)

## 📁 Cấu trúc Project

```
fritproject/
├── backend/                    # Backend API Server
│   ├── src/
│   │   └── server.js          # Main server file
│   ├── routes/
│   │   ├── userRoutes.js      # User routes
│   │   └── apiRoutes.js       # General API routes
│   ├── controllers/
│   │   └── userController.js  # User business logic
│   ├── config/                # Configuration files
│   ├── middleware/            # Custom middleware
│   ├── models/                # Data models
│   ├── utils/                 # Utility functions
│   ├── package.json           # Backend dependencies
│   └── README.md              # Backend documentation
│
├── frontend/                   # Frontend Web App
│   ├── index.html             # Main HTML file
│   ├── styles.css             # CSS styling
│   ├── script.js              # JavaScript logic
│   └── README.md              # Frontend documentation
│
├── docs/                      # Documentation
│   └── screenshots/           # App screenshots
│
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🗺️ Roadmap

### ✅ Phase 1: Basic Full-Stack App (Completed)
- [x] Backend API with Express.js
- [x] Frontend with HTML/CSS/JS
- [x] User CRUD operations
- [x] Modern UI/UX design
- [x] GitHub repository

### 🔄 Phase 2: Database Integration (Next)
- [ ] MongoDB integration với Mongoose
- [ ] Real database thay vì mock data
- [ ] Data persistence
- [ ] Advanced queries

### 🔄 Phase 3: Authentication System
- [ ] JWT-based authentication
- [ ] Login/Register system
- [ ] Protected routes
- [ ] User roles & permissions

### 🔄 Phase 4: Modern Frontend
- [ ] React.js frontend
- [ ] Component-based architecture
- [ ] State management
- [ ] Modern build tools

### 🔄 Phase 5: Production Ready
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Cloud deployment
- [ ] Performance optimization

## 🧪 Testing

### Manual Testing
1. Start backend server
2. Open frontend in browser
3. Test all CRUD operations
4. Verify API endpoints
5. Check responsive design

### API Testing với curl
```bash
# Health check
curl http://localhost:3001/health

# Get users
curl http://localhost:3001/api/users

# Create user
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

## 🤝 Contributing

Đây là project học tập, mọi đóng góp đều được chào đón!

### Cách contribute:
1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

### Development Setup:
```bash
# Clone repo
git clone https://github.com/kongday-byte/fritproject.git

# Install backend dependencies
cd backend && npm install

# Start development
npm run dev
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**KongDay** - [@kongday-byte](https://github.com/kongday-byte)

Project Link: [https://github.com/kongday-byte/fritproject](https://github.com/kongday-byte/fritproject)

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [Font Awesome](https://fontawesome.com/) - Beautiful icons
- [MDN Web Docs](https://developer.mozilla.org/) - Web development resources
- [Node.js](https://nodejs.org/) - JavaScript runtime

---

**⭐ Nếu project này hữu ích, hãy cho một star! ⭐**

**🚀 Happy Coding! 🚀**
