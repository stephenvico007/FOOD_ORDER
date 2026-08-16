## FoodFlow – Food Ordering & Restaurant Management API

**Problem:**
Many restaurants still manage food orders manually through phone calls, WhatsApp, paper records, or spreadsheets. This can lead to incorrect orders, unavailable meals being ordered, poor tracking of order status, and difficulty managing customers, meals, categories, and deliveries.

**FoodFlow** will be a backend API that allows restaurants to manage their food menu and customers to place and track food orders.

### User Roles

**Admin**

* Manage users
* Manage food items
* Manage food categories
* View all orders
* Update order status
* Manage restaurant information

**Staff**

* View food items
* Create food items
* Update food items
* Manage orders
* Update order status

**Customer**

* Register/Login
* View available food
* Search and filter food
* Add food to an order
* Place orders
* View order history
* Track order status

### Models

**User**

* Full Name
* Email
* Password
* Avatar
* Role
* Phone Number
* Address

**Category**

* Name
* Description

**Food**

* Name
* Description
* Price
* Image
* Category (Reference)
* Availability
* Created By (Reference)
* Deleted At

**Order**

* Customer (Reference)
* Items
* Total Price
* Delivery Address
* Payment Status
* Order Status
* Created At

**Order Item**

* Food (Reference)
* Quantity
* Price

### Relationships

* One Category → Many Foods
* One User → Many Orders
* One User → Many Foods
* One Order → Many Order Items
* One Food → Many Order Items

### Features

**Authentication**

* Register
* Login
* Logout
* Change Password
* Forgot Password
* Reset Password

**Categories**

* Create
* View
* Update
* Delete

**Food**

* Create
* Read
* Update
* Delete
* Restore
* Upload Food Image
* Mark food as available/unavailable

**Orders**

* Create Order
* View Order
* Cancel Order
* View Order History
* Update Order Status
* View All Orders

**Order Status**

```text
Pending
Confirmed
Preparing
Ready
Out for Delivery
Delivered
Cancelled
```

**Search & Filtering**

* Search food by name
* Filter by category
* Filter by price
* Sort by price
* Filter available foods
* Pagination

**Security**

* JWT Authentication
* Role-based Authorization
* Password Hashing
* Helmet
* CORS
* Rate Limiting
* Input Validation
* Global Error Handling

### Example API Routes

```text
/auth/register
/auth/login
/auth/logout

/category/create
/category
/category/:id
/category/:id

/food/create
/food
/food/:id
/food/:id
/food/:id/image

/order/create
/order
/order/:id
/order/:id/cancel
/order/:id/status
/order/history
```

### The main difference from StockFlow

Your original project is:

**StockFlow → managing products + inventory + stock movements**

The food-ordering version becomes:

**FoodFlow → managing food + customers + orders + order status**

So you can actually reuse a lot of what you're learning in StockFlow—**JWT, controllers, routes, middleware, models, role authorization, Cloudinary uploads, validation, error handling, etc.**—while changing the business logic.

If this is for your assignment, **FoodFlow is a very good choice because it maps almost one-to-one with the StockFlow requirements while still being a different business domain.**

I can also map **every StockFlow model/route into its FoodFlow equivalent** so you know exactly what to build.
