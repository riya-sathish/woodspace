# Woodspace — Furniture E-Commerce App

A responsive furniture shopping web app built with React.js. Users can browse furniture products, add items to cart, manage a wishlist, and view detailed product information — all with a clean, smooth UI.

Live Demo: [https://woodspace-tahg.vercel.app/](https://woodspace-tahg.vercel.app/)

## Features

-  **Product Listing** — Furniture products fetched from a live API (DummyJSON)
-  **Add to Cart** — Add, remove, increase or decrease item quantity
-  **Wishlist** — Save favourite products for later
-  **Product Modal** — Click any product to view full details with smooth animation
-  **Cart Persistence** — Cart data saved in localStorage, survives page refresh
-  **Star Ratings** — Visual star rating display for each product
-  **Skeleton Loading** — Skeleton cards shown while products are being fetched
-  **Stock Status** — Shows live stock count and out-of-stock state

---

## Tech Stack

| Technology | Usage |

| React.js | UI components and state management |
| Context API | Global cart and wishlist state |
| Axios | API calls to fetch products |
| LocalStorage | Cart data persistence |
| CSS (component-level) | Styling per component |
| Vercel | Deployment |

---

## Project Structure

src/
├── api/            # Axios API call (fetchFurnitureProducts)
├── assets/         # Static assets
├── components/     # Reusable UI components (Navbar, Products, CartDrawer, etc.)
├── context/        # CartContext and WishlistContext (React Context API)
├── layouts/        # Layout wrapper component
├── pages/          # Page-level components (Home)
└── styles/         # Component-level CSS files


## What I Learned

- Managing global state with **React Context API** (cart + wishlist)
- Persisting data using **localStorage** across page refreshes
- Fetching external API data with **Axios** and handling loading/error states
- Building reusable components with clean separation of concerns
- Handling **event bubbling** with `stopPropagation()` for nested click events
- Improving UX with **skeleton loading**, **modal animations**, and **scroll lock**
