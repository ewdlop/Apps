const express = require('express');
const bcrypt = require('bcryptjs');
const { generateToken, generateRefreshToken, authenticateToken } = require('../middleware/auth');
const { validateUser, validateLogin, validatePasswordChange } = require('../middleware/validation');
const { users } = require('../data/sampleData');

const router = express.Router();

// POST /api/auth/register
router.post('/register', validateUser, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({
        error: {
          message: 'User with this email already exists',
          status: 409,
        },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      role: 'user',
      bio: '',
      avatar: `https://i.pravatar.cc/150?img=${users.length + 1}`,
      skills: [],
      preferences: {
        emailNotifications: true,
        pushNotifications: false,
        darkMode: false,
      },
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

    // Add to users array (in a real app, this would be saved to database)
    users.push(newUser);

    // Generate tokens
    const token = generateToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    // Remove password from response
    const { password: _, ...userResponse } = newUser;

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error during registration',
        status: 500,
      },
    });
  }
});

// POST /api/auth/login
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        error: {
          message: 'Invalid email or password',
          status: 401,
        },
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: {
          message: 'Invalid email or password',
          status: 401,
        },
      });
    }

    // Update last login
    user.lastLogin = new Date().toISOString();

    // Generate tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      message: 'Login successful',
      user: userResponse,
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error during login',
        status: 500,
      },
    });
  }
});

// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        error: {
          message: 'Refresh token required',
          status: 401,
        },
      });
    }

    // Verify refresh token (simplified for demo)
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

    jwt.verify(refreshToken, JWT_SECRET + '_refresh', (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error: {
            message: 'Invalid refresh token',
            status: 403,
          },
        });
      }

      // Find user
      const user = users.find(u => u.id === decoded.id);
      if (!user) {
        return res.status(404).json({
          error: {
            message: 'User not found',
            status: 404,
          },
        });
      }

      // Generate new access token
      const newToken = generateToken(user);

      res.json({
        token: newToken,
        message: 'Token refreshed successfully',
      });
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error during token refresh',
        status: 500,
      },
    });
  }
});

// POST /api/auth/logout
router.post('/logout', authenticateToken, (req, res) => {
  // In a real application, you would invalidate the token
  // For now, we'll just return a success message
  res.json({
    message: 'Logout successful',
  });
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404,
        },
      });
    }

    // Remove password from response
    const { password: _, ...userResponse } = user;

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

// POST /api/auth/change-password
router.post('/change-password', authenticateToken, validatePasswordChange, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Find user
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404,
        },
      });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        error: {
          message: 'Current password is incorrect',
          status: 400,
        },
      });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    res.json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error during password change',
        status: 500,
      },
    });
  }
});

module.exports = router; 