import { useState, useEffect } from "react";
import { fetchFurnitureProducts } from "../api/productsApi";
import "../styles/products.css";
import {
  FaShoppingCart,
  FaHeart,
  FaTimes,
  FaCheck,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animating, setAnimating] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [addedMap, setAddedMap] = useState({});

  const handleProductClick = (product) => {
    setAnimating(false);
    setSelectedProduct(product);
    requestAnimationFrame(() => setAnimating(true));
  };

  const handleCloseModal = () => {
    setAnimating(false);
    setTimeout(() => setSelectedProduct(null), 250);
  };

  const handleAddToCart = (product, e) => {
    e?.stopPropagation();
    addToCart(product);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleToggleWishlist = (product, e) => {
    e?.stopPropagation();
    toggleWishlist(product);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchFurnitureProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

 
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.round(rating) ? (
          <FaStar key={i} className="star-filled" />
        ) : (
          <FaRegStar key={i} className="star-empty" />
        )
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <section className="products-section">
        <div className="skeleton-grid">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-img" />
              <div className="skeleton-text title" />
              <div className="skeleton-text price" />
              <div className="skeleton-text rating" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="products-section">
      <div className="products-header">
        <h2 className="products-title">Featured Products</h2>
        <p className="products-subtitle">
          Handpicked furniture for your space
        </p>
      </div>

      <div className="products-grid">
        {products.map((product) => {
          const wishlisted = isWishlisted(product.id);
          const added = addedMap[product.id];

          return (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="card-image-wrap">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
                <button
                  className={`card-wishlist ${wishlisted ? "active" : ""}`}
                  onClick={(e) => handleToggleWishlist(product, e)}
                >
                  <FaHeart />
                </button>
                {added && (
                  <span className="card-added-badge">
                    <FaCheck /> Added
                  </span>
                )}
              </div>

              <div className="product-info">
                <span className="card-category">{product.category}</span>
                <h3>{product.title}</h3>
                <p className="price">${product.price}</p>
                <div className="rating">
                  {renderStars(product.rating)}
                  <span className="rating-num">{product.rating}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div
          className={`modal-overlay ${animating ? "show" : ""}`}
          onClick={handleCloseModal}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* LEFT — Image */}
            <div className="modal-left">
              <img
                src={selectedProduct.images?.[0]}
                alt={selectedProduct.title}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/400")
                }
              />
            </div>

            {/* RIGHT — Info */}
            <div className="modal-right">
              <div className="modal-top">
                <div>
                  <span className="modal-category">
                    {selectedProduct.category}
                  </span>
                  <h2>{selectedProduct.title}</h2>
                </div>
                <button
                  className="close-btn"
                  onClick={handleCloseModal}
                >
                  <FaTimes />
                </button>
              </div>

              <p className="price-large">${selectedProduct.price}</p>

              <div className="rating">
                {renderStars(selectedProduct.rating)}
                <span className="rating-num">
                  {selectedProduct.rating} rating
                </span>
              </div>

              <div className="meta-row">
                <span className="meta-chip">
                  {selectedProduct.brand}
                </span>
                <span className="meta-chip">
                  {selectedProduct.category}
                </span>
              </div>

              <div className={`stock-badge ${selectedProduct.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                <span className="stock-dot" />
                {selectedProduct.stock > 0
                  ? `In Stock (${selectedProduct.stock})`
                  : "Out of Stock"}
              </div>

              <div className="desc-wrapper">
                <p className="desc">{selectedProduct.description}</p>
              </div>

              <div className="modal-buttons">
                <button
                  className={`cart-btn ${addedMap[selectedProduct.id] ? "added" : ""}`}
                  onClick={(e) => handleAddToCart(selectedProduct, e)}
                  disabled={selectedProduct.stock === 0}
                >
                  {addedMap[selectedProduct.id] ? (
                    <>
                      <FaCheck /> Added
                    </>
                  ) : (
                    <>
                      <FaShoppingCart /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  className={`like-btn ${isWishlisted(selectedProduct.id) ? "active" : ""}`}
                  onClick={(e) => handleToggleWishlist(selectedProduct, e)}
                >
                  <FaHeart />
                  {isWishlisted(selectedProduct.id)
                    ? "Wishlisted"
                    : "Wishlist"}
                </button>
              </div>

              <button
                className="back-link"
                onClick={handleCloseModal}
              >
                 Back to Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Products;