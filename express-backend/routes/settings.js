const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { validateSettings } = require('../middleware/validation');
const { appSettings } = require('../data/sampleData');

const router = express.Router();

// GET /api/settings - Get all application settings
router.get('/', authenticateToken, (req, res) => {
  try {
    res.json({
      settings: appSettings,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/settings/:category - Get settings by category
router.get('/:category', authenticateToken, (req, res) => {
  try {
    const { category } = req.params;
    
    if (!appSettings[category]) {
      return res.status(404).json({
        error: {
          message: 'Settings category not found',
          status: 404,
        },
      });
    }

    res.json({
      category,
      settings: appSettings[category],
    });
  } catch (error) {
    console.error('Get category settings error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// PUT /api/settings - Update all settings
router.put('/', authenticateToken, validateSettings, (req, res) => {
  try {
    const { general, display, privacy, notifications } = req.body;

    // Update each category if provided
    if (general) {
      Object.assign(appSettings.general, general);
    }
    
    if (display) {
      Object.assign(appSettings.display, display);
    }
    
    if (privacy) {
      Object.assign(appSettings.privacy, privacy);
    }
    
    if (notifications) {
      Object.assign(appSettings.notifications, notifications);
    }

    res.json({
      message: 'Settings updated successfully',
      settings: appSettings,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// PUT /api/settings/:category - Update specific category settings
router.put('/:category', authenticateToken, (req, res) => {
  try {
    const { category } = req.params;
    const updates = req.body;

    if (!appSettings[category]) {
      return res.status(404).json({
        error: {
          message: 'Settings category not found',
          status: 404,
        },
      });
    }

    // Validate category-specific settings
    const validCategories = ['general', 'display', 'privacy', 'notifications'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: {
          message: 'Invalid settings category',
          status: 400,
        },
      });
    }

    // Update the specific category
    Object.assign(appSettings[category], updates);

    res.json({
      message: `${category} settings updated successfully`,
      category,
      settings: appSettings[category],
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Update category settings error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// POST /api/settings/reset - Reset settings to defaults
router.post('/reset', authenticateToken, (req, res) => {
  try {
    const { category } = req.body;

    // Default settings
    const defaultSettings = {
      general: {
        language: 'en',
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
      },
      display: {
        theme: 'light',
        fontSize: 14,
        sidebarCollapsed: false,
        animations: true,
      },
      privacy: {
        profileVisibility: 'public',
        showOnlineStatus: true,
        allowDataCollection: false,
        thirdPartySharing: false,
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: false,
        marketingEmails: false,
        securityAlerts: true,
      },
    };

    if (category) {
      // Reset specific category
      if (!defaultSettings[category]) {
        return res.status(400).json({
          error: {
            message: 'Invalid settings category',
            status: 400,
          },
        });
      }
      
      appSettings[category] = { ...defaultSettings[category] };
      
      res.json({
        message: `${category} settings reset to defaults`,
        category,
        settings: appSettings[category],
      });
    } else {
      // Reset all settings
      Object.assign(appSettings, defaultSettings);
      
      res.json({
        message: 'All settings reset to defaults',
        settings: appSettings,
      });
    }
  } catch (error) {
    console.error('Reset settings error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// POST /api/settings/export - Export settings
router.post('/export', authenticateToken, (req, res) => {
  try {
    const { format = 'json' } = req.body;

    const exportData = {
      settings: appSettings,
      exportedAt: new Date().toISOString(),
      exportedBy: req.user.id,
      version: '1.0.0',
    };

    if (format === 'json') {
      res.json({
        message: 'Settings exported successfully',
        data: exportData,
        filename: `settings-export-${new Date().toISOString().split('T')[0]}.json`,
      });
    } else {
      res.status(400).json({
        error: {
          message: 'Unsupported export format',
          status: 400,
        },
      });
    }
  } catch (error) {
    console.error('Export settings error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// POST /api/settings/import - Import settings
router.post('/import', authenticateToken, (req, res) => {
  try {
    const { data, overwrite = false } = req.body;

    if (!data || !data.settings) {
      return res.status(400).json({
        error: {
          message: 'Invalid import data',
          status: 400,
        },
      });
    }

    // Validate import data structure
    const requiredCategories = ['general', 'display', 'privacy', 'notifications'];
    const importSettings = data.settings;

    for (const category of requiredCategories) {
      if (!importSettings[category]) {
        return res.status(400).json({
          error: {
            message: `Missing required category: ${category}`,
            status: 400,
          },
        });
      }
    }

    if (overwrite) {
      // Replace all settings
      Object.assign(appSettings, importSettings);
    } else {
      // Merge settings
      for (const category of requiredCategories) {
        Object.assign(appSettings[category], importSettings[category]);
      }
    }

    res.json({
      message: 'Settings imported successfully',
      settings: appSettings,
      importedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Import settings error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/settings/options/:category - Get available options for a category
router.get('/options/:category', (req, res) => {
  try {
    const { category } = req.params;

    const options = {
      general: {
        languages: [
          { value: 'en', label: 'English' },
          { value: 'es', label: 'Español' },
          { value: 'fr', label: 'Français' },
          { value: 'de', label: 'Deutsch' },
          { value: 'it', label: 'Italiano' },
        ],
        timezones: [
          { value: 'UTC', label: 'UTC' },
          { value: 'PST', label: 'Pacific Standard Time' },
          { value: 'EST', label: 'Eastern Standard Time' },
          { value: 'GMT', label: 'Greenwich Mean Time' },
          { value: 'CET', label: 'Central European Time' },
        ],
        dateFormats: [
          { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
          { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
          { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
        ],
        currencies: [
          { value: 'USD', label: 'US Dollar' },
          { value: 'EUR', label: 'Euro' },
          { value: 'GBP', label: 'British Pound' },
          { value: 'JPY', label: 'Japanese Yen' },
        ],
      },
      display: {
        themes: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'auto', label: 'Auto' },
        ],
        fontSizes: [
          { value: 12, label: 'Small (12px)' },
          { value: 14, label: 'Medium (14px)' },
          { value: 16, label: 'Large (16px)' },
          { value: 18, label: 'Extra Large (18px)' },
        ],
      },
      privacy: {
        visibility: [
          { value: 'public', label: 'Public' },
          { value: 'friends', label: 'Friends Only' },
          { value: 'private', label: 'Private' },
        ],
      },
    };

    if (!options[category]) {
      return res.status(404).json({
        error: {
          message: 'Options for this category not found',
          status: 404,
        },
      });
    }

    res.json({
      category,
      options: options[category],
    });
  } catch (error) {
    console.error('Get options error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

module.exports = router; 