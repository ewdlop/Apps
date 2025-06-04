# Express.js Backend API

A comprehensive RESTful API backend built with Express.js for the Angular Material frontend application.

## 🚀 Features

- **RESTful API**: Complete CRUD operations for users, products, and settings
- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Input Validation**: Comprehensive validation using express-validator
- **Security**: Helmet, CORS, rate limiting, password hashing
- **Error Handling**: Centralized error handling with detailed responses
- **Logging**: Request logging with Morgan
- **Data Compression**: Gzip compression for better performance
- **Hot Reload**: Development with nodemon for auto-restart

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Angular Material frontend app (for full-stack development)

## 🛠️ Installation

1. **Clone or navigate to the backend directory:**
   ```bash
   cd express-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   FRONTEND_URL=http://localhost:4200
   JWT_SECRET=your-super-secret-jwt-key-change-in-production-please
   JWT_EXPIRES_IN=24h
   CORS_ORIGIN=http://localhost:4200
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🎯 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run dev:frontend` - Start Angular frontend (from parent directory)
- `npm run dev:full` - Start both backend and frontend concurrently
- `npm run production` - Start in production mode

## 📡 API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/refresh` | Refresh JWT token | No |
| POST | `/logout` | User logout | Yes |
| GET | `/me` | Get current user | Yes |
| POST | `/change-password` | Change password | Yes |

### 👥 Users (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all users (admin only) | Yes (Admin) |
| GET | `/:id` | Get user by ID | Yes |
| PUT | `/:id` | Update user profile | Yes |
| DELETE | `/:id` | Delete user (admin only) | Yes (Admin) |
| PUT | `/:id/preferences` | Update user preferences | Yes |
| GET | `/:id/avatar` | Get user avatar | No |
| PUT | `/:id/avatar` | Update user avatar | Yes |

### 🛍️ Products (`/api/products`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all products (with filters) | No |
| GET | `/:id` | Get product by ID | No |
| POST | `/` | Create new product (admin only) | Yes (Admin) |
| PUT | `/:id` | Update product (admin only) | Yes (Admin) |
| DELETE | `/:id` | Delete product (admin only) | Yes (Admin) |
| GET | `/categories` | Get product categories | No |
| GET | `/featured` | Get featured products | No |
| POST | `/:id/rating` | Rate a product | Yes |

### 📊 Dashboard (`/api/dashboard`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/stats` | Get dashboard statistics | Yes |
| GET | `/activities` | Get recent activities | Yes |
| GET | `/projects` | Get project progress | Yes |
| GET | `/quick-actions` | Get quick actions | Yes |
| POST | `/quick-actions/:action` | Execute quick action | Yes |
| GET | `/analytics` | Get analytics data | Yes |
| GET | `/overview` | Get dashboard overview | Yes |
| POST | `/projects/:id/update` | Update project progress | Yes |

### ⚙️ Settings (`/api/settings`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all settings | Yes |
| GET | `/:category` | Get category settings | Yes |
| PUT | `/` | Update all settings | Yes |
| PUT | `/:category` | Update category settings | Yes |
| POST | `/reset` | Reset settings to defaults | Yes |
| POST | `/export` | Export settings | Yes |
| POST | `/import` | Import settings | Yes |
| GET | `/options/:category` | Get available options | No |

## 🔑 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```http
Authorization: Bearer your-jwt-token-here
```

### Login Example:
```javascript
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});

const data = await response.json();
console.log('Token:', data.token);
```

## 📝 Request/Response Examples

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 4,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Products with Filters
```http
GET /api/products?page=1&limit=6&search=angular&category=Web Development&minRating=4
```

Response:
```json
{
  "products": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalProducts": 8,
    "hasNext": true,
    "hasPrev": false
  },
  "filters": {
    "categories": ["All Categories", "Web Development", ...],
    "priceRange": { "min": 69.99, "max": 129.99 },
    "ratingRange": { "min": 4.4, "max": 4.9 }
  }
}
```

### Update Settings
```http
PUT /api/settings/display
Authorization: Bearer your-token-here
Content-Type: application/json

{
  "theme": "dark",
  "fontSize": 16,
  "animations": true
}
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-Origin Resource Sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Password Hashing**: bcrypt with 10 rounds
- **Input Validation**: Comprehensive validation and sanitization
- **JWT Security**: Secure token generation and validation

## 📊 Data Models

### User Model
```javascript
{
  id: Number,
  name: String,
  email: String,
  password: String (hashed),
  role: String ('user' | 'admin'),
  bio: String,
  avatar: String (URL),
  skills: Array<String>,
  preferences: {
    emailNotifications: Boolean,
    pushNotifications: Boolean,
    darkMode: Boolean
  },
  createdAt: String (ISO),
  lastLogin: String (ISO)
}
```

### Product Model
```javascript
{
  id: Number,
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  subcategory: String,
  rating: Number,
  reviewCount: Number,
  image: String (URL),
  tags: Array<String>,
  featured: Boolean,
  inStock: Boolean,
  createdAt: String (ISO),
  updatedAt: String (ISO)
}
```

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use a strong JWT secret
3. Configure proper CORS origins
4. Set up HTTPS
5. Use a process manager (PM2)
6. Configure environment variables

### Environment Variables
```env
NODE_ENV=production
PORT=3000
JWT_SECRET=your-production-secret-key
FRONTEND_URL=https://your-frontend-domain.com
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🧪 Testing

The API can be tested using:
- **Postman**: Import the API endpoints
- **curl**: Command-line testing
- **Frontend**: Angular Material app integration

### Test User Accounts
- **Admin**: john@example.com / password
- **User**: jane@example.com / password
- **User**: mike@example.com / password

## 📁 Project Structure

```
express-backend/
├── data/
│   └── sampleData.js        # Sample data for development
├── middleware/
│   ├── auth.js              # Authentication middleware
│   └── validation.js        # Input validation middleware
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User management routes
│   ├── products.js          # Product routes
│   ├── dashboard.js         # Dashboard routes
│   └── settings.js          # Settings routes
├── .env                     # Environment variables
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🤝 Integration with Angular Frontend

The backend is designed to work seamlessly with the Angular Material frontend:

1. **CORS configured** for `http://localhost:4200`
2. **Matching data structures** for products, users, and settings
3. **Compatible API responses** for frontend consumption
4. **JWT authentication** integration ready

Start both applications:
```bash
npm run dev:full
```

## 📞 Support

For questions or issues:
- Check the API responses for detailed error messages
- Verify authentication tokens
- Ensure proper request formatting
- Check CORS configuration for frontend integration

## 🔄 API Versioning

Current API version: `v1`
Base URL: `http://localhost:3000/api`

Future versions will maintain backward compatibility where possible.

---

Built with ❤️ using Express.js, designed to power modern Angular applications. 