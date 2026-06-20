# StyleLoom — MERN E-Commerce Website

## Description

StyleLoom is a full-stack fashion e-commerce website built using the MERN stack.

It has a customer website where users can browse products, add items to cart, place orders, and view their order history.

It also has a separate admin panel where the admin can add products, upload product images, delete products, view orders, and update order status.

This project helped me practice React, Node.js, Express, MongoDB, authentication, image uploads, payments, admin panel features, and deployment.

## Live Demo

* **Customer Website:** https://styleloom-ecommerce-proj.vercel.app/

* **Admin Panel:** https://styleloom-ecommerce-admin.vercel.app/

* **Backend API:** https://styleloom-ecommerce.vercel.app/

## Features

* **Customer Website**
  Users can browse products, view product details, add products to cart, checkout, and view their orders.

* **User Login and Register**
  Users can create an account and log in securely using JWT authentication.

* **Product Browsing**
  Users can explore products by category, search products, and sort them by price.

* **Product Details Page**
  Users can view product images, description, price, available sizes, and related products.

* **Cart System**
  Users can add products with selected sizes, update quantities, and remove items from the cart.

* **Cart Save After Login**
  If a user adds products before logging in, the cart items are saved after login or registration.

* **Checkout System**
  Users can enter shipping details and place orders.

* **Payment Options**
  The project supports Cash on Delivery and Razorpay Test Mode payments.

* **Order History**
  Users can view their placed orders and order status.

* **Admin Panel**
  Admin can add products, view products, delete products, view customer orders, and update order status.

* **Image Uploads**
  Product images are uploaded and stored using Cloudinary and Multer.

* **Responsive Design**
  The website works on desktop, tablet, and mobile screens.

* **Deployment**
  Customer website, admin panel, and backend are deployed separately using Vercel.

## Technologies Used

* **Frontend:** React, Vite, React Router, Tailwind CSS, Axios

* **Admin Panel:** React, Vite, React Router, Tailwind CSS, Axios

* **Backend:** Node.js, Express.js

* **Database:** MongoDB, Mongoose

* **Authentication:** JWT, bcrypt

* **Payments:** Razorpay, Cash on Delivery

* **Image Uploads:** Cloudinary, Multer

* **Deployment:** Vercel

* **Version Control:** Git, GitHub

## Project Structure

```text
ecommerce-site/
├── Frontend/                 # Customer website
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── utils/
│
├── admin/                    # Admin panel
│   └── src/
│       ├── assets/
│       ├── components/
│       └── pages/
│
├── Backend/                  # Backend API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

## How to Use

### Customer Side

1. Open the customer website.

2. Create a new account or log in.

3. Browse products from the Home or Collection page.

4. Use search, filters, or sorting to find products.

5. Open a product page.

6. Select a size and add the product to cart.

7. Go to the Cart page and update quantity if needed.

8. Proceed to checkout.

9. Enter shipping details.

10. Place the order using Cash on Delivery or Razorpay Test Mode.

11. View your orders from the Orders page.

### Admin Side

1. Open the admin panel.

2. Log in using admin credentials.

3. Add new products with images, category, subcategory, sizes, price, and description.

4. View all listed products.

5. Delete products if needed.

6. View customer orders.

7. Update order status from the admin panel.

## Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ecommerce-site
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
CLOUDINARY_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

Start the backend server:

```bash
npm run server
```

The backend runs at:

```text
http://localhost:4000
```

### 3. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

Create a `.env` file inside the `Frontend` folder:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the customer website:

```bash
npm run dev
```

The customer website runs at:

```text
http://localhost:5173
```

### 4. Install Admin Panel Dependencies

```bash
cd ../admin
npm install
```

Create a `.env` file inside the `admin` folder:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the admin panel:

```bash
npm run dev
```

The admin panel usually runs at:

```text
http://localhost:5174
```

## API Overview

### User Routes

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/user/register` | Register a new user |
| POST   | `/api/user/login`    | Login user          |
| POST   | `/api/user/admin`    | Login admin         |

### Product Routes

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/api/product/list`   | Get all products   |
| POST   | `/api/product/single` | Get single product |
| POST   | `/api/product/add`    | Add product        |
| POST   | `/api/product/remove` | Remove product     |

### Cart Routes

| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| POST   | `/api/cart/get`    | Get user cart               |
| POST   | `/api/cart/add`    | Add item to cart            |
| POST   | `/api/cart/update` | Update cart quantity        |
| POST   | `/api/cart/sync`   | Save guest cart after login |

### Order Routes

| Method | Endpoint                    | Description                  |
| ------ | --------------------------- | ---------------------------- |
| POST   | `/api/order/place`          | Place Cash on Delivery order |
| POST   | `/api/order/razorpay`       | Create Razorpay order        |
| POST   | `/api/order/verifyRazorpay` | Verify Razorpay payment      |
| POST   | `/api/order/userorders`     | Get user orders              |
| POST   | `/api/order/list`           | Get all orders for admin     |
| POST   | `/api/order/status`         | Update order status          |

## Basic Project Flow

```text
Admin adds product
→ Product images upload to Cloudinary
→ Product details are saved in MongoDB
→ User browses products
→ User selects size and adds product to cart
→ User places order using COD or Razorpay
→ Order appears in user order history
→ Admin updates the order status
```

## Payment Testing

Razorpay is used in Test Mode in this project.

No real payment is charged while using test credentials.

Before using real payments, payment verification, webhook handling, security checks, and live Razorpay credentials should be properly configured.

## Screenshots

Add screenshots inside a `screenshots` folder and update the paths below.

### Home Page

![Home Page](./screenshots/home.png)

### Collection Page

![Collection Page](./screenshots/collection.png)

### Product Page

![Product Page](./screenshots/product.png)

### Cart Page

![Cart Page](./screenshots/cart.png)

### Checkout Page

![Checkout Page](./screenshots/checkout.png)

### Orders Page

![Orders Page](./screenshots/orders.png)

### Admin Add Product Page

![Admin Add Product](./screenshots/admin-add-product.png)

### Admin Orders Page

![Admin Orders](./screenshots/admin-orders.png)

## What I Learned

While building StyleLoom, I learned and practiced:

* Building a full-stack MERN application

* Creating a responsive e-commerce UI

* Connecting React frontend with Express backend APIs

* Handling user login and registration with JWT

* Managing cart and order flows

* Uploading product images using Cloudinary and Multer

* Adding Razorpay Test Mode payment flow

* Creating a separate admin panel

* Managing products and orders from the admin side

* Fixing CORS, deployment, and environment variable issues

* Deploying frontend, backend, and admin projects on Vercel

## Future Improvements

* Google login

* Wishlist feature

* Product reviews and ratings

* Product edit/update option in admin panel

* Stock management

* Coupon and discount system

* Password reset and email verification

* Razorpay webhook and signature verification

* Admin analytics dashboard

* Better loading states and error messages

## Credits

This project was built as a learning project.

Reference / Tutorial Credit: https://youtu.be/7E6um7NGmeE?si=3tdDDz2_2CrXqJwe


## Disclaimer

This project is made for learning purposes. Product images are used only as demo content. StyleLoom is not a real commercial store and does not sell these products.

## Author

Kush
Frontend & Full-Stack Web Developer

GitHub: https://github.com/kush01007
