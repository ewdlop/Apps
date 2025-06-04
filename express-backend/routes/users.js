const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateProfile, validateId, validatePagination } = require('../middleware/validation');
const { users } = require('../data/sampleData');

const router = express.Router();

// GET /api/users - Get all users (admin only) with pagination and search
router.get('/', authenticateToken, requireAdmin, validatePagination, (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    // Filter users by search term
    let filteredUsers = users;
    if (search) {
      filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.bio.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Remove passwords from response
    const safeUsers = filteredUsers.map(({ password, ...user }) => user);

    // Paginate results
    const paginatedUsers = safeUsers.slice(offset, offset + limitNum);

    res.json({
      users: paginatedUsers,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(filteredUsers.length / limitNum),
        totalUsers: filteredUsers.length,
        hasNext: offset + limitNum < filteredUsers.length,
        hasPrev: pageNum > 1,
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', authenticateToken, validateId, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404,
        },
      });
    }

    // Check if user can access this profile
    const isOwner = req.user.id === userId;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        error: {
          message: 'Access denied',
          status: 403,
        },
      });
    }

    // Remove password from response
    const { password, ...userResponse } = user;

    res.json({
      user: userResponse,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// PUT /api/users/:id - Update user profile
router.put('/:id', authenticateToken, validateId, validateProfile, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404,
        },
      });
    }

    // Check if user can update this profile
    const isOwner = req.user.id === userId;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        error: {
          message: 'Access denied',
          status: 403,
        },
      });
    }

    // Update user fields
    const { name, email, bio, skills } = req.body;
    
    if (name !== undefined) user.name = name;
    if (email !== undefined) {
      // Check if email is already taken by another user
      const emailExists = users.find(u => u.email === email && u.id !== userId);
      if (emailExists) {
        return res.status(409).json({
          error: {
            message: 'Email already taken by another user',
            status: 409,
          },
        });
      }
      user.email = email;
    }
    if (bio !== undefined) user.bio = bio;
    if (skills !== undefined) user.skills = skills;

    // Remove password from response
    const { password, ...userResponse } = user;

    res.json({
      message: 'Profile updated successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// PUT /api/users/:id/preferences - Update user preferences
router.put('/:id/preferences', authenticateToken, validateId, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404,
        },
      });
    }

    // Check if user can update this profile
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        error: {
          message: 'Access denied',
          status: 403,
        },
      });
    }

    // Update preferences
    const { emailNotifications, pushNotifications, darkMode } = req.body;
    
    if (!user.preferences) user.preferences = {};
    
    if (emailNotifications !== undefined) user.preferences.emailNotifications = emailNotifications;
    if (pushNotifications !== undefined) user.preferences.pushNotifications = pushNotifications;
    if (darkMode !== undefined) user.preferences.darkMode = darkMode;

    res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences,
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// DELETE /api/users/:id - Delete user (admin only)
router.delete('/:id', authenticateToken, requireAdmin, validateId, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404,
        },
      });
    }

    // Remove user from array
    users.splice(userIndex, 1);

    res.json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/users/:id/avatar - Get user avatar
router.get('/:id/avatar', validateId, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404,
        },
      });
    }

    res.json({
      avatar: user.avatar,
    });
  } catch (error) {
    console.error('Get avatar error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// PUT /api/users/:id/avatar - Update user avatar
router.put('/:id/avatar', authenticateToken, validateId, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404,
        },
      });
    }

    // Check if user can update this avatar
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        error: {
          message: 'Access denied',
          status: 403,
        },
      });
    }

    const { avatar } = req.body;
    if (!avatar) {
      return res.status(400).json({
        error: {
          message: 'Avatar URL is required',
          status: 400,
        },
      });
    }

    user.avatar = avatar;

    res.json({
      message: 'Avatar updated successfully',
      avatar: user.avatar,
    });
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

module.exports = router; 