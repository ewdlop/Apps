const express = require('express');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');
const { validateProduct, validateId, validatePagination } = require('../middleware/validation');
const { products, categories } = require('../data/sampleData');

const router = express.Router();

// GET /api/products/categories - Get all categories
router.get('/categories', (req, res) => {
  try {
    res.json({
      categories,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/products/featured - Get featured products
router.get('/featured', (req, res) => {
  try {
    const featuredProducts = products.filter(product => product.featured);
    
    res.json({
      products: featuredProducts,
      count: featuredProducts.length,
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/products - Get all products with pagination, search, and filtering
router.get('/', optionalAuth, validatePagination, (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      category = '', 
      minPrice, 
      maxPrice,
      minRating,
      featured,
      inStock 
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    // Filter products
    let filteredProducts = products;

    // Search filter
    if (search) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Category filter
    if (category && category !== 'All Categories') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category
      );
    }

    // Price range filter
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= parseFloat(minPrice)
      );
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= parseFloat(maxPrice)
      );
    }

    // Rating filter
    if (minRating) {
      filteredProducts = filteredProducts.filter(product => 
        product.rating >= parseFloat(minRating)
      );
    }

    // Featured filter
    if (featured !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.featured === (featured === 'true')
      );
    }

    // Stock filter
    if (inStock !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.inStock === (inStock === 'true')
      );
    }

    // Sort products (by default: featured first, then by rating)
    filteredProducts.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });

    // Paginate results
    const paginatedProducts = filteredProducts.slice(offset, offset + limitNum);

    res.json({
      products: paginatedProducts,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(filteredProducts.length / limitNum),
        totalProducts: filteredProducts.length,
        hasNext: offset + limitNum < filteredProducts.length,
        hasPrev: pageNum > 1,
      },
      filters: {
        categories: categories,
        priceRange: {
          min: Math.min(...products.map(p => p.price)),
          max: Math.max(...products.map(p => p.price)),
        },
        ratingRange: {
          min: Math.min(...products.map(p => p.rating)),
          max: Math.max(...products.map(p => p.rating)),
        },
      },
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', validateId, (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({
        error: {
          message: 'Product not found',
          status: 404,
        },
      });
    }

    res.json({
      product,
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// POST /api/products - Create new product (admin only)
router.post('/', authenticateToken, requireAdmin, validateProduct, (req, res) => {
  try {
    const { name, description, price, category, subcategory, tags = [], featured = false } = req.body;

    // Generate new product
    const newProduct = {
      id: products.length + 1,
      name,
      description,
      price: parseFloat(price),
      originalPrice: parseFloat(price) * 1.2, // 20% higher original price
      category,
      subcategory: subcategory || 'General',
      rating: 0,
      reviewCount: 0,
      image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(name)}`,
      tags: Array.isArray(tags) ? tags : [tags],
      featured,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to products array
    products.push(newProduct);

    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// PUT /api/products/:id - Update product (admin only)
router.put('/:id', authenticateToken, requireAdmin, validateId, validateProduct, (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({
        error: {
          message: 'Product not found',
          status: 404,
        },
      });
    }

    // Update product fields
    const { name, description, price, category, subcategory, tags, featured, inStock } = req.body;
    
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = parseFloat(price);
    if (category !== undefined) product.category = category;
    if (subcategory !== undefined) product.subcategory = subcategory;
    if (tags !== undefined) product.tags = Array.isArray(tags) ? tags : [tags];
    if (featured !== undefined) product.featured = featured;
    if (inStock !== undefined) product.inStock = inStock;
    
    product.updatedAt = new Date().toISOString();

    res.json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

// DELETE /api/products/:id - Delete product (admin only)
router.delete('/:id', authenticateToken, requireAdmin, validateId, (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({
        error: {
          message: 'Product not found',
          status: 404,
        },
      });
    }

    // Remove product from array
    products.splice(productIndex, 1);

    res.json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});



// POST /api/products/:id/rating - Add/update product rating
router.post('/:id/rating', authenticateToken, validateId, (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({
        error: {
          message: 'Product not found',
          status: 404,
        },
      });
    }

    const { rating, review } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        error: {
          message: 'Rating must be between 1 and 5',
          status: 400,
        },
      });
    }

    // In a real app, you would save individual ratings and calculate average
    // For demo purposes, we'll just update the average rating
    const newRating = parseFloat(rating);
    const currentTotal = product.rating * product.reviewCount;
    product.reviewCount += 1;
    product.rating = parseFloat(((currentTotal + newRating) / product.reviewCount).toFixed(1));

    res.json({
      message: 'Rating submitted successfully',
      product: {
        id: product.id,
        name: product.name,
        rating: product.rating,
        reviewCount: product.reviewCount,
      },
    });
  } catch (error) {
    console.error('Rate product error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }
});

module.exports = router; 