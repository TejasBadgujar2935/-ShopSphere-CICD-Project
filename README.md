# ShopSphere - Modern Ecommerce Platform

A production-ready, full-featured ecommerce platform built with React.js, Vite, and modern web technologies.

## 🚀 Features

### Customer Features
- **Product Browsing**: Advanced filtering, sorting, and search functionality
- **Product Details**: Image gallery, specifications, reviews, and related products
- **Shopping Cart**: Add/remove items, quantity updates, coupon codes
- **Checkout**: Complete checkout flow with shipping and payment
- **User Authentication**: Login, register, forgot password with JWT support
- **User Dashboard**: Profile management, order history, wishlist, addresses
- **Wishlist**: Save favorite products for later
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Admin Features
- **Dashboard**: Overview of sales, orders, customers, and products
- **Product Management**: Add, edit, delete products
- **Order Management**: View and process customer orders
- **Customer Management**: View customer details and order history

### Technical Features
- **State Management**: Redux Toolkit + Context API
- **Routing**: React Router DOM with protected routes
- **Animations**: Framer Motion for smooth transitions
- **Styling**: Tailwind CSS for modern, responsive UI
- **Icons**: React Icons for consistent iconography
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🛠 Tech Stack

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 5.1.4
- **Styling**: Tailwind CSS 3.4.1
- **State Management**: Redux Toolkit 2.2.1 + Context API
- **Routing**: React Router DOM 6.22.0
- **Animations**: Framer Motion 11.0.8
- **Icons**: React Icons 5.0.1
- **HTTP Client**: Axios 1.6.7

## 📁 Project Structure

```
shopsphere/
├── public/
├── src/
│   ├── components/
│   │   ├── home/          # Home page components
│   │   ├── layout/        # Navbar, Footer
│   │   └── products/      # ProductCard, FilterPanel
│   ├── context/           # Context providers (Cart, Auth, Wishlist)
│   ├── data/              # Mock data (products, categories, reviews)
│   ├── pages/
│   │   ├── admin/         # Admin dashboard pages
│   │   ├── auth/          # Authentication pages
│   │   ├── user/          # User dashboard
│   │   ├── About.jsx
│   │   ├── Cart.jsx
│   │   ├── Contact.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   └── Wishlist.jsx
│   ├── redux/
│   │   ├── slices/        # Redux slices
│   │   └── store.js       # Redux store configuration
│   ├── router/
│   │   └── AppRouter.jsx  # Route configuration
│   ├── utils/
│   │   └── helpers.js     # Utility functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .eslintrc.cjs
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd E-cart
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🔧 Configuration

### Tailwind CSS
The Tailwind configuration is in `tailwind.config.js`. You can customize:
- Colors
- Fonts
- Animations
- Breakpoints

### Vite
The Vite configuration is in `vite.config.js`. You can customize:
- Port number
- Build options
- Plugins

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔐 Authentication

The application uses mock authentication for demonstration. To integrate real authentication:

1. Replace the mock login/register functions in `src/context/AuthContext.jsx`
2. Implement JWT token validation
3. Add API endpoints for authentication
4. Configure protected routes in `src/router/AppRouter.jsx`

## 🗄️ Backend Integration

To connect to a real backend:

1. Configure API base URL in a separate config file
2. Replace mock data in `src/data/products.js` with API calls
3. Implement error handling and loading states
4. Add request/response interceptors for Axios

## 🚀 Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will automatically detect Vite and deploy

### Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Or connect to Git for automatic deployments

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

Build and run:
```bash
docker build -t shopsphere .
docker run -p 3000:3000 shopsphere
```

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://your-api.com
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

## 🧪 Testing

To add testing:

1. Install testing dependencies:
```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

2. Create test files alongside components
3. Run tests:
```bash
npm run test
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    // Your primary colors
  },
  secondary: {
    // Your secondary colors
  }
}
```

### Fonts
Add custom fonts in `index.html` and configure in `tailwind.config.js`.

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by the ShopSphere team

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, email support@shopsphere.com or open an issue in the repository.

---

**Note**: This is a demonstration project. For production use, implement proper backend integration, security measures, and payment processing.
