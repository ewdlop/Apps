const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { dashboardStats } = require('../data/sampleData');

const router = express.Router();

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', authenticateToken, (req, res) => {
  try {
    // Return current stats with some real-time variation
    const stats = {
      totalUsers: dashboardStats.totalUsers + Math.floor(Math.random() * 10),
      totalRevenue: dashboardStats.totalRevenue + (Math.random() * 1000),
      totalOrders: dashboardStats.totalOrders + Math.floor(Math.random() * 5),
      conversionRate: dashboardStats.conversionRate + (Math.random() * 2 - 1),
      growthMetrics: {
        usersGrowth: '+12.5%',
        revenueGrowth: '+8.3%',
        ordersGrowth: '+15.7%',
        conversionGrowth: '+2.1%',
      },
      lastUpdated: new Date().toISOString(),
    };

    res.json({
      stats,
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/dashboard/activities - Get recent activities
router.get('/activities', authenticateToken, (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const limitNum = parseInt(limit);

    // Get recent activities with limit
    const activities = dashboardStats.recentActivities.slice(0, limitNum);

    res.json({
      activities,
      total: dashboardStats.recentActivities.length,
    });
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/dashboard/projects - Get project progress
router.get('/projects', authenticateToken, (req, res) => {
  try {
    const projects = dashboardStats.projectProgress.map(project => ({
      ...project,
      // Add some dynamic progress updates
      progress: Math.min(100, project.progress + Math.floor(Math.random() * 5)),
    }));

    res.json({
      projects,
      summary: {
        total: projects.length,
        active: projects.filter(p => p.status === 'active').length,
        completed: projects.filter(p => p.progress === 100).length,
        pending: projects.filter(p => p.status === 'planning').length,
      },
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/dashboard/quick-actions - Get quick actions
router.get('/quick-actions', authenticateToken, (req, res) => {
  try {
    res.json({
      actions: dashboardStats.quickActions,
    });
  } catch (error) {
    console.error('Get quick actions error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// POST /api/dashboard/quick-actions/:action - Execute quick action
router.post('/quick-actions/:action', authenticateToken, (req, res) => {
  try {
    const { action } = req.params;
    const { data } = req.body;

    // Simulate action execution
    const actionMap = {
      add_user: 'User added successfully',
      create_course: 'Course created successfully',
      generate_report: 'Report generated successfully',
      view_analytics: 'Analytics dashboard opened',
      manage_orders: 'Order management opened',
      user_support: 'Support ticket created',
    };

    const message = actionMap[action] || 'Action executed successfully';

    // Add activity to recent activities
    const newActivity = {
      id: dashboardStats.recentActivities.length + 1,
      user: req.user.name || 'Current User',
      action: 'executed action',
      target: message,
      timestamp: 'just now',
      type: 'action',
    };

    dashboardStats.recentActivities.unshift(newActivity);

    // Keep only last 20 activities
    if (dashboardStats.recentActivities.length > 20) {
      dashboardStats.recentActivities = dashboardStats.recentActivities.slice(0, 20);
    }

    res.json({
      message,
      action,
      executedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Execute action error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/dashboard/analytics - Get analytics data
router.get('/analytics', authenticateToken, (req, res) => {
  try {
    const { period = '7d' } = req.query;

    // Generate mock analytics data based on period
    const generateData = (days) => {
      const data = [];
      const now = new Date();
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        data.push({
          date: date.toISOString().split('T')[0],
          users: Math.floor(Math.random() * 100) + 50,
          revenue: Math.floor(Math.random() * 5000) + 1000,
          orders: Math.floor(Math.random() * 20) + 5,
          pageViews: Math.floor(Math.random() * 1000) + 200,
        });
      }
      
      return data;
    };

    const periodDays = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
    };

    const days = periodDays[period] || 7;
    const analytics = generateData(days);

    // Calculate totals and averages
    const totals = analytics.reduce((acc, day) => ({
      users: acc.users + day.users,
      revenue: acc.revenue + day.revenue,
      orders: acc.orders + day.orders,
      pageViews: acc.pageViews + day.pageViews,
    }), { users: 0, revenue: 0, orders: 0, pageViews: 0 });

    const averages = {
      users: Math.round(totals.users / days),
      revenue: Math.round(totals.revenue / days),
      orders: Math.round(totals.orders / days),
      pageViews: Math.round(totals.pageViews / days),
    };

    res.json({
      period,
      data: analytics,
      summary: {
        totals,
        averages,
        period: `${days} days`,
      },
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/dashboard/overview - Get complete dashboard overview
router.get('/overview', authenticateToken, (req, res) => {
  try {
    const overview = {
      stats: {
        totalUsers: dashboardStats.totalUsers,
        totalRevenue: dashboardStats.totalRevenue,
        totalOrders: dashboardStats.totalOrders,
        conversionRate: dashboardStats.conversionRate,
      },
      recentActivities: dashboardStats.recentActivities.slice(0, 5),
      projectProgress: dashboardStats.projectProgress,
      quickActions: dashboardStats.quickActions,
      lastUpdated: new Date().toISOString(),
    };

    res.json(overview);
  } catch (error) {
    console.error('Get dashboard overview error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// POST /api/dashboard/projects/:id/update - Update project progress
router.post('/projects/:id/update', authenticateToken, (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const { progress, status } = req.body;

    const project = dashboardStats.projectProgress.find(p => p.id === projectId);
    
    if (!project) {
      return res.status(404).json({
        error: {
          message: 'Project not found',
          status: 404,
        },
      });
    }

    if (progress !== undefined) {
      project.progress = Math.min(100, Math.max(0, parseInt(progress)));
    }
    
    if (status !== undefined) {
      project.status = status;
    }

    // Add activity
    const newActivity = {
      id: dashboardStats.recentActivities.length + 1,
      user: req.user.name || 'Current User',
      action: 'updated project',
      target: project.name,
      timestamp: 'just now',
      type: 'project',
    };

    dashboardStats.recentActivities.unshift(newActivity);

    res.json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

module.exports = router; 