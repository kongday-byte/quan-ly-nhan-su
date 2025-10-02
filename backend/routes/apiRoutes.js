// ============================================================================
// API ROUTES
// Định nghĩa các route API chung
// ============================================================================

const express = require('express');
const router = express.Router();

// ============================================================================
// GENERAL API ROUTES
// ============================================================================

// POST /api/test - Test endpoint
router.post('/test', (req, res) => {
  try {
    const { body, headers, query } = req;
    
    res.json({
      success: true,
      message: 'Test endpoint hoạt động thành công!',
      data: {
        receivedBody: body,
        receivedQuery: query,
        userAgent: headers['user-agent'],
        contentType: headers['content-type'],
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi trong test endpoint',
      error: error.message
    });
  }
});

// GET /api/status - Trạng thái API
router.get('/status', (req, res) => {
  res.json({
    success: true,
    message: 'API đang hoạt động bình thường',
    data: {
      status: 'active',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0'
    }
  });
});

// GET /api/info - Thông tin server
router.get('/info', (req, res) => {
  res.json({
    success: true,
    data: {
      serverName: 'FritProject Backend',
      version: '1.0.0',
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = router;

