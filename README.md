<div align="center">

# 🛒 Ecommerce Frontend Design

A React + Vite storefront UI inspired by B2B marketplaces like Alibaba — browse categories, filter products, view supplier details, and manage a persistent cart.

</div>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&labelColor=20232A" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" />
  <img alt="React Router" src="https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white" />
  <img alt="Axios" src="https://img.shields.io/badge/Axios-1.11-5A29E4?logo=axios&logoColor=white" />
</p>

## Features

- 🏠 **Home page** built from stacked sections — hero banner, daily deals, two product showcase rows, a quotation/RFQ form, recommended products, services, and a suppliers strip
- 🗂️ **Product catalog** with sidebar filtering by category, brand, feature, condition, rating, and price range, plus list/grid view toggle and "applied filters" chips with one-click removal
- 🔍 **Product detail page** with an image gallery + thumbnail switcher, star ratings, bulk-pricing tiers, supplier card (verified seller, worldwide shipping, send inquiry), related products, and "you may like" recommendations
- 🛍️ **Persistent cart** powered by React Context and `localStorage` — add to cart, adjust quantity, remove items, and clear the whole cart
- 💾 **Save for later** — move items between the cart and a saved list without losing them on refresh
- 🧾 **Cart summary** with subtotal/discount/tax breakdown, a coupon input, checkout button, and supported payment method icons
- 🌐 **Mock REST API** served from `public/api/*.json` (`products.json`, `products_category.json`, `recommended-products.json`, `suppliers.json`) and fetched with Axios — no backend required to run
- 🧭 **Client-side routing** via React Router for Home, Products, Product detail (`/product/:productId`), and Cart

## Tech Stack

| Category         | Technology                          |
| ----------------- | ------------------------------------ |
| Library            | React 19                             |
| Build tool          | Vite 7                               |
| Routing             | React Router DOM 7                   |
| HTTP client         | Axios                                |
| State management    | React Context API + `localStorage`   |
| Icons               | React Icons                          |
| Styling             | Plain CSS (per-component stylesheets)|
| Linting             | ESLint 9 (`eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/umarilyas02/ecommerce-frontend-design.git
cd ecommerce-frontend-design

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app runs on Vite's dev server (default `http://localhost:5173`).

### Other scripts

```bash
npm run build     # Production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Project Structure

```
ecommerce-frontend-design/
├── pages/                     # Route-level pages
│   ├── Home.jsx
│   ├── Products.jsx           # Catalog with filters, sorting, view modes
│   ├── ProductPage.jsx        # Product detail + related items
│   └── CartPage.jsx           # Cart, saved items, order summary
├── public/
│   ├── api/                   # Mock JSON "backend" consumed via Axios
│   └── assets/                # Category/product images
├── src/
│   ├── components/
│   │   ├── Home/               # Hero, Deals, Product sections, Quotation form, Suppliers, Services
│   │   └── Layout/              # Navbar, Footer, Newsletter, Layout wrapper
│   ├── CartContext.jsx         # Cart + saved-items state, persisted to localStorage
│   ├── App.jsx                 # Route definitions
│   └── main.jsx                # App entry point
└── vite.config.js
```

## Notes

- 1rem = 10px throughout the project (`html { font-size: 62.5% }`) for easier spacing math.
- From the product listing, click a card in the Deals section (or any product card) to open its dedicated product page.

---

<p align="center">Made by <a href="https://umarilyas.dev">Umar Ilyas</a></p>
