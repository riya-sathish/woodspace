import { useCart } from "../context/CartContext";
import { FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import "../styles/cartdrawer.css";

function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="drawer-header">
          <h3>Your Cart ({cart.length})</h3>
          <FiX size={22} onClick={onClose} className="drawer-close" />
        </div>

        {/* Items */}
        <div className="drawer-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <span>Add some furniture you love!</span>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="drawer-item">
                <img src={item.images?.[0]} alt={item.title} />
                <div className="drawer-item-info">
                  <h4>{item.title}</h4>
                  <p className="drawer-price">${item.price}</p>
                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}>
                      <FiMinus size={12} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>
                      <FiPlus size={12} />
                    </button>
                  </div>
                </div>
                <FiTrash2
                  size={16}
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <button className="continue-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;