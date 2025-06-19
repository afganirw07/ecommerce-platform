
# 🛒 E-Commerce Frontend

A modern and responsive e-commerce frontend built with **React.js** and **Tailwind CSS**, connected to a RESTful API powered by Express.js. This project enables users to browse products, manage cart and wishlist, perform checkout, and view order history.

> 👉 This is the **frontend repository**.  
> 🔗 Backend repo: [E-Commerce Backend](https://github.com/afganirw07/be-projek-web-progdas)

---

## 📺 Preview

![Preview](https://i.imgur.com/yR1IQtz.gif)


> ✨ The preview above demonstrates the main features and UI interactions of the application.

---
## 📌 Features

- 🛍️ Browse & Filter Products  
- 💬 AI Chat Assistant  
- 🧡 Wishlist Management  
- 🛒 Cart Management  
- 🧾 Purchase History  
- 🔐 JWT-based Login & Register  
- 💳 Checkout Process  
- 📦 Invoice Order 
- 📱 Fully Responsive Layout  
- ✨ And More...


---

## 🧱 Project Structure

```bash
client/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page views (Home, Cart, Login, etc.)
│   ├── service/          # Axios service functions
│   ├── assets/           # Images and icons
│   ├── App.jsx           # Main App component
│   └── main.jsx          # App entry point
├── tailwind.config.js    # Tailwind CSS config
└── package.json
```

---

## ⚙️ Tech Stack

- **Framework:** React  
- **Styling:** Tailwind CSS  
- **Routing:** React Router DOM  
- **HTTP Client:** Axios  
- **State Management:** useState, useEffect, Context API
- **Auth:** Token-based authentication (JWT via backend)  

---

## 🚀 Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/afganirw07/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Make sure your backend is running at the specified URL.

### 4. Run the app

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🔌 Consumed API Endpoints

Provided by [E-Commerce Backend](https://github.com/afganirw07/be-projek-web-progdas):

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/users/:id`
- `POST /api/cart`
- `GET /api/wishlist/:userId`
- `POST /api/orders`
- `GET /api/orders/:userId`
- And more...

---

## 📦 Deployment

Build for production:

```bash
npm run build
```

---

## 🤝 Contributing

Contributions are welcome. Feel free to fork and submit a pull request. For major changes, open an issue first.

---

## 📄 License

Licensed under the **MIT License**.

---

## 👨‍💻 Author

**Afgan Irwansyah Hidayat**  
📧 afgandevs@gmail.com  
🔗 [GitHub](https://github.com/afganirw07)
