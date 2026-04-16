import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FiX, FiTrash2, FiShoppingCart } from "react-icons/fi";
import "../styles/wishlistdrawer.css";

function WishlistDrawer({ isOpen, onClose }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>

        {/* Header */}
        <div className="drawer-header">
          <h3>Wishlist ({wishlist.length})</h3>
          <FiX size={22} onClick={onClose} className="drawer-close" />
        </div>

        {/* Items */}
        <div className="drawer-items">
          {wishlist.length === 0 ? (
            <div className="empty-cart">
              <p>Your wishlist is empty</p>
              <span>Save items you love!</span>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="drawer-item">
                <img src={item.images?.[0]} alt={item.title} />
                <div className="drawer-item-info">
                  <h4>{item.title}</h4>
                  <p className="drawer-price">${item.price}</p>
                  <button
                    className="move-to-cart-btn"
                    onClick={() => {
                      addToCart(item);
                      toggleWishlist(item);
                      onClose();
                    }}
                  >
                    <FiShoppingCart size={13} />
                    Move to Cart
                  </button>
                </div>
                <FiTrash2
                  size={16}
                  className="remove-item"
                  onClick={() => toggleWishlist(item)}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="drawer-footer">
            <button className="checkout-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default WishlistDrawer;