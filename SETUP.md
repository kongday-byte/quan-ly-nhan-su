# 🚀 HƯỚNG DẪN CHẠY FRITPROJECT

## 📋 Yêu cầu hệ thống
- Node.js >= 16.0.0
- npm >= 8.0.0
- Trình duyệt web hiện đại

## 🔧 Cài đặt và chạy

### Bước 1: Clone repository
```bash
git clone https://github.com/kongday-byte/quan-ly-nhan-su.git
cd quan-ly-nhan-su
```

### Bước 2: Cài đặt Backend
```bash
cd backend
npm install
```

### Bước 3: Khởi động Backend
```bash
# Từ thư mục backend
node src/server.js
```

**✅ Backend sẽ chạy tại: http://localhost:3001**

### Bước 4: Mở Frontend
1. Mở file `frontend/index.html` bằng trình duyệt
2. Hoặc sử dụng Live Server (VS Code extension)
3. Hoặc chạy local server:

```bash
# Từ thư mục frontend
cd ../frontend

# Sử dụng Python (nếu có)
python -m http.server 8000

# Sử dụng Node.js (nếu có serve)
npx serve .

# Sử dụng PHP (nếu có)
php -S localhost:8000
```

## 🧪 Test ứng dụng

### 1. Kiểm tra Backend
- Truy cập: http://localhost:3001/health
- Kết quả: JSON response với status "OK"

### 2. Test API
- Truy cập: http://localhost:3001/api/users
- Kết quả: Danh sách users mẫu

### 3. Test Frontend
- Mở `frontend/index.html`
- Kiểm tra các tab: Users, Thêm User, Test API
- Thử thêm user mới

## 🐛 Troubleshooting

### Lỗi "Cannot find module 'express'"
```bash
cd backend
npm install
```

### Lỗi CORS khi thêm user
- Đảm bảo backend đang chạy tại port 3001
- Kiểm tra console browser để xem lỗi cụ thể

### Frontend không load được users
1. Kiểm tra backend đã chạy: http://localhost:3001/health
2. Mở Developer Tools → Console để xem lỗi
3. Refresh trang frontend

## 📞 Liên hệ
Nếu gặp vấn đề, hãy tạo issue trên GitHub repository.
