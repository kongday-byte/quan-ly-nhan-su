// ============================================================================
// USER ROUTES
// Định nghĩa các route liên quan đến user management
// ============================================================================

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ============================================================================
// USER ROUTES
// ============================================================================

// GET /api/users - Lấy danh sách tất cả users
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Lấy thông tin user theo ID
router.get('/:id', userController.getUserById);

// POST /api/users - Tạo user mới
router.post('/', userController.createUser);

// PUT /api/users/:id - Cập nhật thông tin user
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id - Xóa user
router.delete('/:id', userController.deleteUser);

// PATCH /api/users/:id/status - Cập nhật trạng thái user
router.patch('/:id/status', userController.updateUserStatus);

module.exports = router;

