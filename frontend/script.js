// ============================================================================
// FRITPROJECT FRONTEND JAVASCRIPT
// Kết nối với Backend API và quản lý giao diện
// ============================================================================

// API Configuration
const API_BASE_URL = 'http://localhost:3001';
const API_ENDPOINTS = {
    users: `${API_BASE_URL}/api/users`,
    health: `${API_BASE_URL}/health`,
    info: `${API_BASE_URL}/api/info`,
    test: `${API_BASE_URL}/api/test`
};

// Global Variables
let currentUsers = [];
let currentTab = 'users';

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadUsers();
    showToast('Chào mừng đến với FritProject!', 'success');
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(e.target.dataset.tab);
        });
    });

    // Refresh button
    document.getElementById('refresh-btn').addEventListener('click', loadUsers);

    // Search functionality
    document.getElementById('search-input').addEventListener('input', filterUsers);
    document.getElementById('status-filter').addEventListener('change', filterUsers);

    // Add user form
    document.getElementById('add-user-form').addEventListener('submit', handleAddUser);

    // Edit user form
    document.getElementById('edit-user-form').addEventListener('submit', handleEditUser);

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close modal when clicking outside
    document.getElementById('edit-modal').addEventListener('click', (e) => {
        if (e.target.id === 'edit-modal') {
            closeModal();
        }
    });
}

// ============================================================================
// TAB MANAGEMENT
// ============================================================================

function switchTab(tabName) {
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Show corresponding tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');

    currentTab = tabName;

    // Load data if switching to users tab
    if (tabName === 'users') {
        loadUsers();
    }
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

async function apiRequest(url, options = {}) {
    try {
        showLoading();
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, { ...defaultOptions, ...options });
        const data = await response.json();

        hideLoading();

        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        hideLoading();
        console.error('API Request Error:', error);
        showToast(`Lỗi API: ${error.message}`, 'error');
        throw error;
    }
}

// ============================================================================
// USER MANAGEMENT FUNCTIONS
// ============================================================================

async function loadUsers() {
    try {
        const response = await apiRequest(API_ENDPOINTS.users);
        
        if (response.success) {
            currentUsers = response.data || [];
            displayUsers(currentUsers);
            showToast(`Đã tải ${currentUsers.length} users`, 'success');
        } else {
            throw new Error(response.message || 'Không thể tải danh sách users');
        }
    } catch (error) {
        showEmptyState();
        showToast('Không thể kết nối với server. Hãy kiểm tra backend đã chạy chưa!', 'error');
    }
}

function displayUsers(users) {
    const tbody = document.getElementById('users-tbody');
    
    if (!users || users.length === 0) {
        showEmptyState();
        return;
    }

    hideEmptyState();
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td><strong>#${user.id}</strong></td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-user-circle" style="color: #667eea;"></i>
                    ${escapeHtml(user.name)}
                </div>
            </td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-envelope" style="color: #28a745;"></i>
                    ${escapeHtml(user.email)}
                </div>
            </td>
            <td>
                ${user.phone ? `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-phone" style="color: #17a2b8;"></i>
                        ${escapeHtml(user.phone)}
                    </div>
                ` : '<span style="color: #999;">Chưa có</span>'}
            </td>
            <td>
                <span class="status-badge status-${user.status}">
                    ${user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                </span>
            </td>
            <td>
                <small style="color: #666;">
                    ${formatDate(user.createdAt)}
                </small>
            </td>
            <td>
                <div style="display: flex; gap: 5px;">
                    <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})" title="Chỉnh sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function handleAddUser(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('user-name').value.trim(),
        email: document.getElementById('user-email').value.trim(),
        phone: document.getElementById('user-phone').value.trim()
    };

    if (!formData.name || !formData.email) {
        showToast('Vui lòng điền đầy đủ thông tin bắt buộc!', 'warning');
        return;
    }

    try {
        const response = await apiRequest(API_ENDPOINTS.users, {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        if (response.success) {
            showToast('Thêm user thành công!', 'success');
            document.getElementById('add-user-form').reset();
            switchTab('users');
            loadUsers();
        }
    } catch (error) {
        // Error already handled in apiRequest
    }
}

async function editUser(userId) {
    const user = currentUsers.find(u => u.id === userId);
    if (!user) {
        showToast('Không tìm thấy user!', 'error');
        return;
    }

    // Populate edit form
    document.getElementById('edit-user-id').value = user.id;
    document.getElementById('edit-user-name').value = user.name;
    document.getElementById('edit-user-email').value = user.email;
    document.getElementById('edit-user-phone').value = user.phone || '';
    document.getElementById('edit-user-status').value = user.status;

    // Show modal
    document.getElementById('edit-modal').classList.remove('hidden');
}

async function handleEditUser(e) {
    e.preventDefault();
    
    const userId = document.getElementById('edit-user-id').value;
    const formData = {
        name: document.getElementById('edit-user-name').value.trim(),
        email: document.getElementById('edit-user-email').value.trim(),
        phone: document.getElementById('edit-user-phone').value.trim(),
        status: document.getElementById('edit-user-status').value
    };

    try {
        const response = await apiRequest(`${API_ENDPOINTS.users}/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(formData)
        });

        if (response.success) {
            showToast('Cập nhật user thành công!', 'success');
            closeModal();
            loadUsers();
        }
    } catch (error) {
        // Error already handled in apiRequest
    }
}

async function deleteUser(userId) {
    const user = currentUsers.find(u => u.id === userId);
    if (!user) {
        showToast('Không tìm thấy user!', 'error');
        return;
    }

    if (!confirm(`Bạn có chắc muốn xóa user "${user.name}"?`)) {
        return;
    }

    try {
        const response = await apiRequest(`${API_ENDPOINTS.users}/${userId}`, {
            method: 'DELETE'
        });

        if (response.success) {
            showToast('Xóa user thành công!', 'success');
            loadUsers();
        }
    } catch (error) {
        // Error already handled in apiRequest
    }
}

// ============================================================================
// FILTER & SEARCH FUNCTIONS
// ============================================================================

function filterUsers() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;

    let filteredUsers = currentUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) ||
                            user.email.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || user.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    displayUsers(filteredUsers);
}

// ============================================================================
// API TEST FUNCTIONS
// ============================================================================

async function testHealthCheck() {
    try {
        const response = await fetch(API_ENDPOINTS.health);
        const data = await response.json();
        displayApiResponse(data);
        showToast('Health check thành công!', 'success');
    } catch (error) {
        displayApiResponse({ error: error.message });
        showToast('Health check thất bại!', 'error');
    }
}

async function testApiInfo() {
    try {
        const response = await fetch(API_ENDPOINTS.info);
        const data = await response.json();
        displayApiResponse(data);
        showToast('Lấy thông tin API thành công!', 'success');
    } catch (error) {
        displayApiResponse({ error: error.message });
        showToast('Lấy thông tin API thất bại!', 'error');
    }
}

async function testPostData() {
    const testData = {
        message: 'Hello from FritProject Frontend!',
        timestamp: new Date().toISOString(),
        testNumber: Math.floor(Math.random() * 1000)
    };

    try {
        const response = await fetch(API_ENDPOINTS.test, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });
        const data = await response.json();
        displayApiResponse(data);
        showToast('Test POST thành công!', 'success');
    } catch (error) {
        displayApiResponse({ error: error.message });
        showToast('Test POST thất bại!', 'error');
    }
}

function displayApiResponse(data) {
    const responseElement = document.getElementById('api-response-content');
    responseElement.textContent = JSON.stringify(data, null, 2);
}

// ============================================================================
// UI HELPER FUNCTIONS
// ============================================================================

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    hideEmptyState();
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

function showEmptyState() {
    document.getElementById('empty-state').classList.remove('hidden');
    document.getElementById('users-tbody').innerHTML = '';
    hideLoading();
}

function hideEmptyState() {
    document.getElementById('empty-state').classList.add('hidden');
}

function closeModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${escapeHtml(message)}</span>
        </div>
    `;

    document.getElementById('toast-container').appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);

    // Remove on click
    toast.addEventListener('click', () => {
        toast.remove();
    });
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return 'Invalid Date';
    }
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

window.addEventListener('error', function(e) {
    console.error('Global Error:', e.error);
    showToast('Đã xảy ra lỗi không mong muốn!', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    showToast('Đã xảy ra lỗi kết nối!', 'error');
});

// ============================================================================
// DEVELOPMENT HELPERS
// ============================================================================

// Expose some functions to global scope for debugging
window.FritProject = {
    loadUsers,
    testHealthCheck,
    testApiInfo,
    testPostData,
    currentUsers: () => currentUsers,
    apiEndpoints: API_ENDPOINTS
};

console.log('🚀 FritProject Frontend loaded successfully!');
console.log('💡 Available debug functions:', Object.keys(window.FritProject));
