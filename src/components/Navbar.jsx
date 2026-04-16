import { useState } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import "../styles/navbar.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import CartDrawer from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";

function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  const [activeLink, setActiveLink] = useState("Home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const navLinks = ["Home", "Products", "Shop", "Sale"];

  return (
    <>
      <nav className="navbar">

        {/* LOGO */}
        <div className="nav-logo">
          <span className="logo-wood">Wood</span>
          <span className="logo-space">Space</span>
        </div>

        {/* LINKS */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li
              key={link}
              className={activeLink === link ? "active" : ""}
              onClick={() => setActiveLink(link)}
            >
              {link}
            </li>
          ))}
        </ul>

        {/* ICONS */}
        <div className="nav-icons">

          {/* SEARCH */}
          <div className={`search-box ${searchOpen ? "open" : ""}`}>
            <FiSearch size={20} onClick={() => setSearchOpen(!searchOpen)} />
            <input
              type="text"
              placeholder="Search furniture..."
              className="search-input"
              onBlur={() => setSearchOpen(false)}
              autoFocus={searchOpen}
            />
          </div>

          {/* USER */}
          <FiUser size={20} />

          {/* WISHLIST */}
          <div className="wishlist-wrapper" onClick={() => setIsWishlistOpen(true)}>
            <FiHeart size={20} />
            {wishlist.length > 0 && (
              <span className="cart-badge">{wishlist.length}</span>
            )}
          </div>

          {/* CART */}
          <div className="cart-wrapper" onClick={() => setIsCartOpen(true)}>
            <FiShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </div>

        </div>
      </nav>

      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}

export default Navbar;