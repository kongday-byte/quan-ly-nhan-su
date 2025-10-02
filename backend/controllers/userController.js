// ============================================================================
// USER CONTROLLER
// Xử lý logic nghiệp vụ cho user management
// ============================================================================

// Mock data - trong thực tế sẽ kết nối với database
let users = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0987654321',
    status: 'active',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    phone: '0555666777',
    status: 'inactive',
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z'
  }
];

// ============================================================================
// CONTROLLER FUNCTIONS
// ============================================================================

// Lấy danh sách tất cả users
const getAllUsers = (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    let filteredUsers = [...users];
    
    // Filter by status
    if (status) {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }
    
    // Search by name or email
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      message: 'Lấy danh sách users thành công',
      data: paginatedUsers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredUsers.length / limit),
        totalItems: filteredUsers.length,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách users',
      error: error.message
    });
  }
};

// Lấy thông tin user theo ID
const getUserById = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user với ID này'
      });
    }
    
    res.json({
      success: true,
      message: 'Lấy thông tin user thành công',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin user',
      error: error.message
    });
  }
};

// Tạo user mới
const createUser = (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu thông tin bắt buộc: name và email'
      });
    }
    
    // Check email exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email đã tồn tại trong hệ thống'
      });
    }
    
    // Create new user
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name,
      email,
      phone: phone || null,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'Tạo user mới thành công',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo user mới',
      error: error.message
    });
  }
};

// Cập nhật thông tin user
const updateUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email, phone, status } = req.body;
    
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user với ID này'
      });
    }
    
    // Check email exists (exclude current user)
    if (email) {
      const existingUser = users.find(u => u.email === email && u.id !== userId);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email đã tồn tại trong hệ thống'
        });
      }
    }
    
    // Update user
    const updatedUser = {
      ...users[userIndex],
      ...(name && { name }),
      ...(email && { email }),
      ...(phone !== undefined && { phone }),
      ...(status && { status }),
      updatedAt: new Date().toISOString()
    };
    
    users[userIndex] = updatedUser;
    
    res.json({
      success: true,
      message: 'Cập nhật user thành công',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật user',
      error: error.message
    });
  }
};

// Xóa user
const deleteUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user với ID này'
      });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Xóa user thành công',
      data: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa user',
      error: error.message
    });
  }
};

// Cập nhật trạng thái user
const updateUserStatus = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status || !['active', 'inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Trạng thái không hợp lệ. Chỉ chấp nhận: active, inactive'
      });
    }
    
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user với ID này'
      });
    }
    
    users[userIndex].status = status;
    users[userIndex].updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      message: 'Cập nhật trạng thái user thành công',
      data: users[userIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật trạng thái user',
      error: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus
};
