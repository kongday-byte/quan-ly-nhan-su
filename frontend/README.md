# 🎨 FritProject Frontend

Giao diện web hiện đại cho ứng dụng quản lý User, được xây dựng bằng HTML, CSS, và JavaScript thuần.

## 🌟 Tính năng

### ✅ **Quản lý Users**
- 📋 Xem danh sách users với bảng đẹp
- ➕ Thêm user mới
- ✏️ Chỉnh sửa thông tin user
- 🗑️ Xóa user
- 🔍 Tìm kiếm theo tên/email
- 🏷️ Lọc theo trạng thái (Active/Inactive)

### ✅ **Giao diện hiện đại**
- 🎨 Design gradient đẹp mắt
- 📱 Responsive (tương thích mobile)
- 🌈 Animations mượt mà
- 🔔 Toast notifications
- 📊 Loading states
- 🎯 Modal dialogs

### ✅ **Test API**
- ❤️ Health check endpoint
- ℹ️ Server info endpoint
- 🧪 Test POST data
- 📊 Hiển thị JSON response

## 🚀 Cách chạy

### **Bước 1: Khởi động Backend**
```bash
cd ../backend
npm start
```
Backend sẽ chạy tại: `http://localhost:3001`

### **Bước 2: Mở Frontend**
1. Mở file `index.html` bằng trình duyệt
2. Hoặc sử dụng Live Server (VS Code extension)
3. Hoặc chạy local server:

```bash
# Sử dụng Python
python -m http.server 8000

# Sử dụng Node.js (nếu có npx)
npx serve .

# Sử dụng PHP
php -S localhost:8000
```

## 📁 Cấu trúc file

```
frontend/
├── index.html          # Trang chính
├── styles.css          # CSS styling
├── script.js           # JavaScript logic
└── README.md          # Tài liệu này
```

## 🎯 Các tab chính

### **1. 👥 Users Tab**
- Hiển thị danh sách users
- Tìm kiếm và lọc
- Chỉnh sửa/xóa users

### **2. ➕ Thêm User Tab**
- Form thêm user mới
- Validation dữ liệu
- Gửi request tới API

### **3. 🧪 Test API Tab**
- Test các endpoint
- Hiển thị response JSON
- Debug API connection

## 🔧 Cấu hình API

File `script.js` có cấu hình API endpoints:

```javascript
const API_BASE_URL = 'http://localhost:3001';
const API_ENDPOINTS = {
    users: `${API_BASE_URL}/api/users`,
    health: `${API_BASE_URL}/health`,
    info: `${API_BASE_URL}/api/info`,
    test: `${API_BASE_URL}/api/test`
};
```

## 🎨 Tính năng UI/UX

### **Colors & Theme**
- Primary: `#667eea` (Blue gradient)
- Secondary: `#764ba2` (Purple gradient)
- Success: `#28a745` (Green)
- Warning: `#ffc107` (Yellow)
- Danger: `#dc3545` (Red)

### **Typography**
- Font: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Icons: Font Awesome 6.0.0

### **Responsive Breakpoints**
- Desktop: > 768px
- Tablet: 768px - 480px
- Mobile: < 480px

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] Load users từ API
- [ ] Thêm user mới
- [ ] Chỉnh sửa user
- [ ] Xóa user
- [ ] Tìm kiếm users
- [ ] Lọc theo trạng thái
- [ ] Test API endpoints
- [ ] Responsive design
- [ ] Error handling

### **Browser Compatibility**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🐛 Troubleshooting

### **Không load được users?**
1. Kiểm tra backend đã chạy chưa (`http://localhost:3001`)
2. Mở Developer Tools → Console để xem lỗi
3. Kiểm tra CORS settings trong backend

### **API calls bị lỗi?**
1. Kiểm tra network tab trong DevTools
2. Verify API endpoints trong `script.js`
3. Test trực tiếp API bằng Postman/curl

### **Giao diện bị vỡ?**
1. Hard refresh (Ctrl+F5)
2. Kiểm tra file CSS đã load chưa
3. Kiểm tra console có lỗi JavaScript không

## 📚 Học thêm

### **HTML/CSS/JS Resources**
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)
- [CSS Tricks](https://css-tricks.com/)

### **API Integration**
- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Async/Await Tutorial](https://javascript.info/async-await)

### **Next Steps**
1. 📱 Học React.js để tạo app hiện đại hơn
2. 🗄️ Tích hợp database thật
3. 🔐 Thêm authentication
4. 🚀 Deploy lên hosting

## 🤝 Contributing

Đây là project học tập, bạn có thể:
1. Fork và cải thiện code
2. Thêm tính năng mới
3. Cải thiện UI/UX
4. Tối ưu performance

## 📄 License

MIT License - Tự do sử dụng cho mục đích học tập và phát triển.

---

**🎉 Chúc mừng! Bạn đã có một frontend hoàn chỉnh!**
