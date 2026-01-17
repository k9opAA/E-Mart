# API Utility Documentation

This file provides centralized API configuration and utility functions for the E-mart application.

## Location

`src/utils/api.js`

## Purpose

- Centralize all API endpoint definitions
- Provide reusable API functions with consistent error handling
- Allow easy configuration through environment variables
- Reduce code duplication across components

## Configuration

### Environment Variables

Create a `.env.local` file in the client directory (copy from `.env.example`):

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

If not set, it defaults to `http://localhost:4000/api`

## Usage Examples

### Orders API

#### Create an Order
```javascript
import { orderAPI } from '../utils/api';

const orderData = {
  name: "John Doe",
  email: "john@example.com",
  address: "123 Main St",
  town: "Springfield",
  phone: "1234567890",
  products: [
    {
      productId: "507f1f77bcf86cd799439011",
      name: "Product Name",
      quantity: 2,
      price: 29.99
    }
  ],
  totalAmount: 59.98,
  orderStatus: "pending"
};

const result = await orderAPI.create(orderData);

if (result.success) {
  console.log('Order created:', result.data);
} else {
  console.error('Error:', result.error);
}
```

#### Get All Orders
```javascript
const result = await orderAPI.getAll();

if (result.success) {
  const orders = result.data;
  // Process orders
}
```

#### Get Order by ID
```javascript
const result = await orderAPI.getById('507f1f77bcf86cd799439011');

if (result.success) {
  const order = result.data;
  // Display order details
}
```

#### Update Order Status
```javascript
const result = await orderAPI.updateStatus('507f1f77bcf86cd799439011', 'shipped');

if (result.success) {
  console.log('Order status updated');
}
```

#### Delete Order
```javascript
const result = await orderAPI.delete('507f1f77bcf86cd799439011');

if (result.success) {
  console.log('Order deleted');
}
```

### Products API

#### Get All Products
```javascript
import { productAPI } from '../utils/api';

const result = await productAPI.getAll();

if (result.success) {
  const products = result.data;
  setProducts(products);
}
```

#### Get Product by ID
```javascript
const result = await productAPI.getById('507f1f77bcf86cd799439011');

if (result.success) {
  const product = result.data;
  // Display product details
}
```

### Categories API

#### Get All Categories
```javascript
import { categoryAPI } from '../utils/api';

const result = await categoryAPI.getAll();

if (result.success) {
  const categories = result.data;
  setCategories(categories);
}
```

#### Get Category by ID
```javascript
const result = await categoryAPI.getById('507f1f77bcf86cd799439011');

if (result.success) {
  const category = result.data;
  // Display category details
}
```

### Custom API Requests

For custom endpoints not covered by the predefined functions:

```javascript
import { apiRequest, API_ENDPOINTS } from '../utils/api';

// Custom GET request
const result = await apiRequest(API_ENDPOINTS.PRODUCTS);

// Custom POST request
const result = await apiRequest('http://localhost:4000/api/custom-endpoint', {
  method: 'POST',
  body: JSON.stringify({ data: 'value' })
});

// Custom request with headers
const result = await apiRequest('http://localhost:4000/api/protected-route', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer token123'
  }
});
```

## API Endpoints Reference

### Available Endpoints

All endpoints are prefixed with the base URL (`http://localhost:4000/api` by default):

```javascript
// Products
PRODUCTS: '/api/products'
PRODUCT_CREATE: '/api/products/create'
PRODUCT_BY_ID(id): '/api/products/{id}'

// Categories
CATEGORIES: '/api/category'
CATEGORY_CREATE: '/api/category/create'
CATEGORY_BY_ID(id): '/api/category/{id}'

// Orders
ORDERS: '/api/orders'
ORDER_CREATE: '/api/orders/create'
ORDER_BY_ID(id): '/api/orders/{id}'
```

## Response Format

All API functions return a standardized response:

### Success Response
```javascript
{
  success: true,
  data: { /* API response data */ }
}
```

### Error Response
```javascript
{
  success: false,
  error: "Error message string"
}
```

## Error Handling

The API utility automatically handles:
- Network errors
- HTTP error status codes
- JSON parsing errors
- Backend error messages

Errors are logged to the console automatically.

## Migrating Existing Code

To migrate existing fetch calls to use the API utility:

### Before
```javascript
const response = await fetch('http://localhost:4000/api/orders/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData)
});

const result = await response.json();

if (!response.ok) {
  throw new Error(result.message || 'Failed');
}
```

### After
```javascript
import { orderAPI } from '../utils/api';

const result = await orderAPI.create(orderData);

if (!result.success) {
  // Handle error: result.error
}
```

## Benefits

1. **Consistency** - All API calls follow the same pattern
2. **Maintainability** - Change base URL in one place
3. **Error Handling** - Automatic error handling and logging
4. **Type Safety** - Centralized endpoint definitions prevent typos
5. **Reusability** - Common API operations defined once
6. **Testing** - Easier to mock API calls in tests
7. **Environment Support** - Easy switch between dev/staging/production

## Future Enhancements

Consider adding:
- Request/response interceptors
- Authentication token handling
- Request caching
- Retry logic for failed requests
- Request cancellation
- Loading state management
- Rate limiting
