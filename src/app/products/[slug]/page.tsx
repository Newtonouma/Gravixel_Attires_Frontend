'use client';

import { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@/components/Icons';
import { useCart } from '@/contexts/CartContext';
import './product.css';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const { products, loading, refreshProducts } = useProducts();
  const { addToCart } = useCart();

  // Initialize state
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const product = products.find(p => p.slug === slug);

  // Update selectedSize when product changes
  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  // Auto-fetch products if none loaded
  useEffect(() => {
    if (products.length === 0 && !loading) {
      refreshProducts();
    }
  }, [products.length, loading, refreshProducts]);

  // Product images
  const productImages = product ? (
    product.imageUrls && product.imageUrls.length > 0 
      ? product.imageUrls 
      : product.imageUrl 
        ? [product.imageUrl] 
        : ['/images/placeholder.jpg']
  ) : ['/images/placeholder.jpg'];

  // Show loading state
  if (loading) {
    return (
      <div className="product-page-loading">
        <div className="loading-spinner">Loading product...</div>
      </div>
    );
  }

  // Show error state
  if (!product) {
    return (
      <div className="product-page-error">
        <h2>Product not found</h2>
        <p>The product with slug "{slug}" could not be found.</p>
        <Link href="/products" className="back-to-products-btn">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      addToCart(product, selectedSize, quantity);
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'cart-notification';
      notification.innerHTML = `
        <div class="notification-content">
          <span class="notification-icon">✓</span>
          <span>Added to cart!</span>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => notification.remove(), 3000);
      
    } catch (error) {
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleOrderNow = () => {
    // Redirect to order form with selected product and options
    const orderProduct = {
      ...product,
      size: selectedSize,
      quantity,
    };
    // Store order product in sessionStorage for retrieval in order form
    window.sessionStorage.setItem('orderProduct', JSON.stringify(orderProduct));
    window.location.href = '/order';
  };

  // Calculate related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="product-page">
      {/* Modern Breadcrumb */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li><Link href="/" className="breadcrumb-link">Home</Link></li>
          <li className="breadcrumb-separator">/</li>
          <li><Link href="/products" className="breadcrumb-link">Products</Link></li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-current">{product.name}</li>
        </ol>
      </nav>

      <div className="product-hero">
        {/* Enhanced Product Images Gallery */}
        <div className="product-gallery">
          {/* Thumbnail Strip on Left */}
          <div className="gallery-thumbnails">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`thumbnail-btn ${activeImageIndex === index ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  width={80}
                  height={100}
                  className="thumbnail-image"
                />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="gallery-main">
            <div className="main-image-container">
              <div className="main-image-wrapper">
                <Image
                  src={productImages[activeImageIndex]}
                  alt={product.name}
                  width={400}
                  height={500}
                  className="main-product-image"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Info Panel */}
        <div className="product-info-panel">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-subtitle">{product.material || 'Tech Jersey'}</p>
          </div>

          <div className="pricing-section">
            <div className="price-wrapper">
              {product.originalPrice && (
                <span className="original-price">KES {product.originalPrice.toLocaleString()}</span>
              )}
              <span className="current-price">KES {product.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="selection-row">
            <div className="color-section">
              <div className="section-header">
                <div className="section-info">
                  <span className="section-label">Color:</span>
                  <span className="section-value">{product.color || product.colors?.[0] || 'Olive'}</span>
                </div>
              </div>
              <div className="color-options">
                <button className="color-option active" style={{backgroundColor: '#000000'}}></button>
                <button className="color-option" style={{backgroundColor: '#f0f0f0'}}></button>
              </div>
            </div>

            <div className="size-section">
              <div className="section-header">
                <div className="section-info">
                  <span className="section-label">Size:</span>
                </div>
                <a href="#" className="size-guide">📏 Size Guide</a>
              </div>
              <div className="size-options">
                {(product.sizes ?? ['XXS', 'XS', 'S', 'M', 'L', 'XL']).map((size: string) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bottom-actions-section">
            <div className="action-buttons-row">
              <div className="quantity-add-to-cart">
                <div className="quantity-wrapper">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn minus"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="quantity-input"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn plus"
                  >
                    +
                  </button>
                </div>
                
                <button
                  className={`main-add-to-cart-btn ${!selectedSize ? 'disabled' : ''}`}
                  onClick={handleAddToCart}
                  disabled={!selectedSize || isAddingToCart}
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                  {!selectedSize ? 'SELECT SIZE' : isAddingToCart ? 'Adding...' : 'ADD TO CART'}
                </button>
              </div>
              
              <button
                className="buy-now-btn"
                onClick={handleOrderNow}
                disabled={!selectedSize || !product.inStock}
              >
                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2.05v2.02c4.39.54 7.5 4.53 6.96 8.92A8 8 0 0 1 9.5 20c-4.39-.54-7.5-4.53-6.96-8.92A8 8 0 0 1 11 3.05V2.05c-5.05.5-8.5 5.06-7.99 10.11S8.06 21.5 13.11 20.99 22.5 15.94 21.99 10.89 16.94 1.5 11.89 2.01L13 2.05z"/>
                </svg>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="description-section-full">
        <div className="description-container">
          <button 
            className="description-accordion-header"
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            aria-expanded={isDescriptionOpen}
            type="button"
          >
            <h2 className="description-title">Description</h2>
            <span className={`accordion-icon ${isDescriptionOpen ? 'open' : ''}`}>−</span>
          </button>
          <div className={`description-content ${isDescriptionOpen ? 'open' : ''}`}>
            <p className="product-description">
              {product.description || `Experience the perfect blend of comfort and style with our ${product.name}. 
              Crafted with attention to detail and made from premium ${product.material || 'materials'}, 
              this piece is designed to elevate your wardrobe with its timeless appeal and exceptional quality.`}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2>You May also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.map(relatedProduct => (
              <Link href={`/products/${relatedProduct.slug}`} key={relatedProduct.id} className="related-product-card">
                <div className="related-product-image">
                  <Image
                    src={relatedProduct.imageUrl || ""}
                    alt={relatedProduct.name}
                    width={250}
                    height={300}
                  />
                </div>
                <div className="related-product-info">
                  <h3>{relatedProduct.name}</h3>
                  <p className="related-product-price">KES {relatedProduct.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
