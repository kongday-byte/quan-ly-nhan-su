# 🚀 FritProject Backend

Backend API server cho FritProject sử dụng Node.js và Express.js

## 📋 Mục lục

- [Cài đặt](#cài-đặt)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Chạy ứng dụng](#chạy-ứng-dụng)
- [API Endpoints](#api-endpoints)
- [Môi trường phát triển](#môi-trường-phát-triển)

## 🛠️ Cài đặt

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- npm >= 8.0.0

### Các bước cài đặt

1. **Clone repository và di chuyển vào thư mục backend:**
   ```bash
   cd backend
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Tạo file .env (tùy chọn):**
   ```bash
   cp .env.example .env
   ```
   Sau đó chỉnh sửa các giá trị trong file `.env` theo môi trường của bạn.

## 📁 Cấu trúc thư mục

```
backend/
├── src/
│   └── server.js          # File server chính
├── routes/
│   ├── userRoutes.js      # Routes cho user management
│   └── apiRoutes.js       # Routes API chung
├── controllers/
│   └── userController.js  # Controller xử lý logic user
├── middleware/            # Custom middleware (sẽ mở rộng)
├── models/               # Data models (sẽ mở rộng)
├── config/               # Cấu hình (sẽ mở rộng)
├── utils/                # Utility functions (sẽ mở rộng)
├── public/               # Static files
├── package.json          # Dependencies và scripts
├── .gitignore           # Git ignore rules
└── README.md            # Tài liệu này
```

## 🚀 Chạy ứng dụng

### Development mode (với nodemon - auto restart)
```bash
npm run dev
```

### Production mode
```bash
npm start
```

### Chạy tests (khi có)
```bash
npm test
```

### Lint code
```bash
npm run lint
npm run lint:fix
```

## 🌐 API Endpoints

### Health Check
- **GET** `/health` - Kiểm tra trạng thái server

### Main Routes
- **GET** `/` - Trang chủ API
- **GET** `/api/docs` - API Documentation

### User Management
- **GET** `/api/users` - Lấy danh sách users
  - Query params: `page`, `limit`, `status`, `search`
- **GET** `/api/users/:id` - Lấy user theo ID
- **POST** `/api/users` - Tạo user mới
- **PUT** `/api/users/:id` - Cập nhật user
- **DELETE** `/api/users/:id` - Xóa user
- **PATCH** `/api/users/:id/status` - Cập nhật trạng thái user

### General API
- **GET** `/api/status` - Trạng thái API
- **GET** `/api/info` - Thông tin server
- **POST** `/api/test` - Test endpoint

## 🧪 Test API

### Sử dụng curl:

```bash
# Health check
curl http://localhost:3001/health

# Lấy danh sách users
curl http://localhost:3001/api/users

# Tạo user mới
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"0123456789"}'

# Test endpoint
curl -X POST http://localhost:3001/api/test \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello from client"}'
```

### Sử dụng Postman:
Import collection từ file `postman_collection.json` (sẽ tạo sau)

## 🔧 Môi trường phát triển

### Environment Variables (.env)
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Scripts có sẵn
- `npm start` - Chạy server production
- `npm run dev` - Chạy server development với nodemon
- `npm test` - Chạy tests
- `npm run lint` - Kiểm tra code style
- `npm run lint:fix` - Tự động fix code style

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Giới hạn requests
- **Input Validation** - Validate dữ liệu đầu vào
- **Error Handling** - Xử lý lỗi an toàn

## 📝 Logging

Server tự động log:
- Tất cả HTTP requests
- Errors và exceptions
- Server startup/shutdown events

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

FritProject Team - fritproject@example.com

Project Link: [https://github.com/fritproject/backend](https://github.com/fritproject/backend)
