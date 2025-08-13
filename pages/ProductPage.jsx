import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';
import { useCart } from '../src/CartContext.jsx';

const StarRating = ({ rating = 0 }) => {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return (
    <div className="star-rating" aria-hidden>
      {Array.from({ length: full }).map((_, i) => <span key={'f' + i}>★</span>)}
      {Array.from({ length: empty }).map((_, i) => <span key={'e' + i}>☆</span>)}
    </div>
  );
};

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [activeTab, setActiveTab] = useState('Description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [youMayLike, setYouMayLike] = useState([]);
  const { saveItemForLater, addItemToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products_category.json');
        const products = response.data;

        // find current product
        const foundProduct = products.find(p => String(p.id) === String(productId));
        if (!foundProduct) {
          setProduct(null);
          return;
        }

        const parsedProduct = {
          ...foundProduct,
          price: foundProduct.price ? parseFloat(foundProduct.price) : 78.0,
          oldPrice: foundProduct.oldPrice ? parseFloat(foundProduct.oldPrice) : null
        };

        setProduct(parsedProduct);
        setMainImage(parsedProduct.image);

        // related products: same category, exclude current product
        const related = products.filter(
          p => p.category === foundProduct.category && p.id !== foundProduct.id
        );
        setRelatedProducts(related);

        // you may like: all except current product
        const mayLike = products.filter(p => p.id !== foundProduct.id);
        setYouMayLike(mayLike);

      } catch (err) {
        console.error('Fetch error', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) return <div className="product-page-container">Loading product details...</div>;
  if (!product) return <div className="product-page-container">Product not found.</div>;

  const thumbnails = product.images && product.images.length > 0
    ? product.images
    : Array.from({ length: 5 }).map(() => product.image || 'https://placehold.co/400x400');

  const handleSaveForLater = () => {
    if (product) {
      saveItemForLater(product);
      alert(`${product.name} has been saved for later!`);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItemToCart(product);
      alert(`${product.name} has been added to your cart!`);
    }
  };

  return (
    <div className="product-page-container">
      <section className="product-details-main">
        <div className="product-image-section">
          <div className="main-image-wrap">
            <img
              src={mainImage || thumbnails[0]}
              alt={product.name}
              className="main-product-image"
            />
          </div>

          <div className="thumbnail-images">
            {thumbnails.map((t, i) => (
              <img
                key={i}
                src={t}
                alt={`thumb-${i}`}
                className={`thumbnail ${mainImage === t ? 'active' : ''}`}
                onClick={() => setMainImage(t)}
              />
            ))}
          </div>
        </div>

        <div className="product-info-section">
          <div className="product-header">
            <span className="in-stock-badge">✓ In stock</span>
            <h1 className="product-name">{product.name}</h1>
          </div>

          <div className="product-meta">
            <StarRating rating={product.rating || 0} />
            <span className="product-orders">{product.orders || 0} orders</span>
            <span className="product-reviews">32 reviews</span>
          </div>

          <div className="product-price-section">
            <div className="price-box">
              <p className="current-price">
                ${product.price.toFixed(2)}
              </p>
              {product.oldPrice && (
                <p className="old-price">
                  ${product.oldPrice.toFixed(2)}
                </p>
              )}
            </div>

            <div className="bulk-prices">
              <div className="bulk-row">
                $98.00 <br />
                <span className="pieces">6 - 10 pcs</span>
              </div>
              <div className="bulk-row">
                $90.00 <br />
                <span>10 - 100 pcs</span>
              </div>
              <div className="bulk-row">
                $78.00 <br />
                <span>100+ pcs</span>
              </div>
            </div>
          </div>

          <div className="product-specs">
            <div className="spec-item labels">
              <p>Price:</p>
              <p>Type:</p>
              <p>Material:</p>
              <p>Design:</p>
            </div>
            <div className="spec-item values">
              <p>Negotiable</p>
              <p>Classic shoes</p>
              <p>Plastic material</p>
              <p>Modern nice</p>
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

        <aside className="supplier-info-section">
          <div className="supplier-card">
            <div className="supplier-header">
              <div className="supplier-logo">R</div>
              <div className="supplier-details">
                <h4>Supplier</h4>
                <p>Guangjo Trading LLC</p>
              </div>
            </div>

            <div className="supplier-location">
              <div>Germany, Berlin</div>
              <div className="verified-badge">✓ Verified Seller</div>
              <div className="worldwide-shipping">✓ Worldwide shipping</div>
            </div>

            <div className="supplier-actions">
              <button className="send-inquiry-button">Send Inquiry</button>
              <button className="sellers-profile-button">Seller's profile</button>
              <button
                className="save-for-later-button"
                onClick={handleSaveForLater}
              >
                Save for later
              </button>
            </div>
          </div>
        </aside>
      </section>

      <section className="product-bottom">
        <div className="left-column">
          {/* Tabs remain unchanged */}

          <div className="related-products">
            <h3>Related products</h3>
            <div className="related-products-grid">
              {relatedProducts.length > 0 ? (
                relatedProducts.map(rp => (
                  <div className="related-product-card" key={rp.id}>
                    <img src={rp.image} alt={rp.name} />
                    <p className="rp-name">{rp.name}</p>
                    <p className="rp-range">${rp.price}</p>
                  </div>
                ))
              ) : (
                <p>No related products found.</p>
              )}
            </div>
          </div>
        </div>

        <aside className="right-column">
          <div className="you-may-like">
            <h4>You may like</h4>
            {youMayLike.length > 0 ? (
              youMayLike.map(yl => (
                <div className="you-like-card" key={yl.id}>
                  <img src={yl.image} alt={yl.name} />
                  <div>
                    <p className="yl-title">{yl.name}</p>
                    <p className="yl-price">${yl.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No recommendations available.</p>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default ProductPage;
