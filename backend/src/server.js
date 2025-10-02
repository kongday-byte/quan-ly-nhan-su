// ============================================================================
// FRITPROJECT BACKEND SERVER
// Node.js + Express.js API Server
// ============================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Import routes
const userRoutes = require('../routes/userRoutes');
const apiRoutes = require('../routes/apiRoutes');

// Khởi tạo ứng dụng Express
const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ============================================================================
// SECURITY & MIDDLEWARE
// ============================================================================

// Security headers
app.use(helmet());

// CORS configuration - Allow all origins for development
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false // Set to false when using origin: '*'
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Quá nhiều requests từ IP này, vui lòng thử lại sau 15 phút'
  }
});
app.use('/api/', limiter);

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Static files
app.use(express.static('../public'));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

// ============================================================================
// ROUTES
// ============================================================================

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'FritProject Backend đang hoạt động',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
    }
  });
});

// Main route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Chào mừng đến với FritProject Backend API!',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/health',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api', apiRoutes);

// API Documentation route
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'FritProject API Documentation',
    version: '1.0.0',
    baseUrl: `http://localhost:${PORT}`,
    endpoints: {
      health: {
        method: 'GET',
        url: '/health',
        description: 'Kiểm tra trạng thái server'
      },
      users: {
        getAll: { method: 'GET', url: '/api/users', description: 'Lấy danh sách users' },
        getById: { method: 'GET', url: '/api/users/:id', description: 'Lấy user theo ID' },
        create: { method: 'POST', url: '/api/users', description: 'Tạo user mới' },
        update: { method: 'PUT', url: '/api/users/:id', description: 'Cập nhật user' },
        delete: { method: 'DELETE', url: '/api/users/:id', description: 'Xóa user' }
      },
      test: {
        method: 'POST',
        url: '/api/test',
        description: 'Test endpoint cho POST data'
      }
    }
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint không tồn tại',
    requestedUrl: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = NODE_ENV === 'development' ? err.message : 'Lỗi server nội bộ';
  
  res.status(statusCode).json({
    success: false,
    message: message,
    timestamp: new Date().toISOString(),
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================================================
// START SERVER
// ============================================================================

const server = app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 FRITPROJECT BACKEND SERVER STARTED SUCCESSFULLY!');
  console.log('='.repeat(60));
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`🕐 Started at: ${new Date().toLocaleString('vi-VN')}`);
  console.log(`🔧 Environment: ${NODE_ENV}`);
  console.log(`📦 Node.js: ${process.version}`);
  console.log(`💾 Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);
  console.log('='.repeat(60));
  console.log('📋 AVAILABLE ENDPOINTS:');
  console.log(`   🏠 GET  http://localhost:${PORT}/`);
  console.log(`   ❤️  GET  http://localhost:${PORT}/health`);
  console.log(`   📚 GET  http://localhost:${PORT}/api/docs`);
  console.log(`   👥 GET  http://localhost:${PORT}/api/users`);
  console.log(`   👤 GET  http://localhost:${PORT}/api/users/:id`);
  console.log(`   ➕ POST http://localhost:${PORT}/api/users`);
  console.log(`   ✏️  PUT  http://localhost:${PORT}/api/users/:id`);
  console.log(`   🗑️  DEL  http://localhost:${PORT}/api/users/:id`);
  console.log(`   🧪 POST http://localhost:${PORT}/api/test`);
  console.log('='.repeat(60));
  console.log('✅ Server is ready to accept connections!');
  console.log('='.repeat(60) + '\n');
});

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  server.close(() => {
    console.log('✅ HTTP server closed.');
    console.log('👋 FritProject Backend shutdown complete.');
    process.exit(0);
  });
  
  // Force close after 10 seconds
  setTimeout(() => {
    console.log('⚠️  Forcing shutdown after 10 seconds...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;

