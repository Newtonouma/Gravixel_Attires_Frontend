'use client';

import { useState, useEffect, useCallback } from 'react';
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

  // Initialize state with default values
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  console.log('ProductPage - Looking for slug:', slug);
  console.log('ProductPage - Available products:', products.length);
  console.log('ProductPage - Product slugs:', products.map(p => ({ id: p.id, name: p.name, slug: p.slug })));
  
  const product = products.find(p => p.slug === slug);
  console.log('ProductPage - Found product:', product ? `${product.name} (ID: ${product.id})` : 'Not found');

  // Update selectedSize when product changes
  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  // Manual fetch for debugging
  const handleManualFetch = () => {
    console.log('Manual fetch triggered');
    refreshProducts();
  };

  // Auto-trigger fetch if no products and not loading
  useEffect(() => {
    console.log('ProductPage useEffect - products.length:', products.length, 'loading:', loading);
    if (products.length === 0 && !loading) {
      console.log('ProductPage - Auto-triggering fetch because no products loaded');
      refreshProducts();
    }
  }, [products.length, loading, refreshProducts]);

  // Use the product's imageUrls array, fallback to imageUrl, or default image
  const productImages = product ? (
    product.imageUrls && product.imageUrls.length > 0 
      ? product.imageUrls 
      : product.imageUrl 
        ? [product.imageUrl] 
        : ['/images/placeholder.jpg']
  ) : ['/images/placeholder.jpg'];

  console.log('Product images to display:', productImages);
  console.log('Active image index:', activeImageIndex);

  // Image navigation functions
  const goToPrevImage = useCallback(() => {
    setActiveImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  }, [productImages.length]);

  const goToNextImage = useCallback(() => {
    setActiveImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  }, [productImages.length]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === 'ArrowLeft') goToPrevImage();
        if (e.key === 'ArrowRight') goToNextImage();
        if (e.key === 'Escape') closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen, goToPrevImage, goToNextImage, closeModal]);

  // Show loading state while products are being fetched
  if (loading) {
    return (
      <div className="product-page-loading">
        <div className="loading-spinner">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page-error">
        <h2>Product not found</h2>
        <p>The product with slug "{slug}" could not be found.</p>
        <button onClick={handleManualFetch} style={{marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
          Try Manual Fetch
        </button>
        <Link href="/products">
          <button style={{marginTop: '10px', marginLeft: '10px', padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
            Back to Products
          </button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      addToCart(product, selectedSize, quantity);
      
      // Show success message
      const notification = document.createElement('div');
      notification.className = 'cart-notification';
      notification.innerHTML = `
        <div class="notification-content">
          <span class="notification-icon">✓</span>
          <span>Added to cart!</span>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
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

  // Calculate related products from the loaded products
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
          <div className="gallery-main">
            <div className="main-image-container">
              {/* Stock Status Badge */}
              <div className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                <span className="stock-icon">{product.inStock ? '✓' : '⚠'}</span>
                <span className="stock-text">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
              </div>
              
              {/* Navigation Arrows */}
              {productImages.length > 1 && (
                <>
                  <button 
                    className="gallery-nav-btn prev-btn" 
                    onClick={goToPrevImage}
                    aria-label="Previous image"
                  >
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                    </svg>
                  </button>
                  <button 
                    className="gallery-nav-btn next-btn" 
                    onClick={goToNextImage}
                    aria-label="Next image"
                  >
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </button>
                </>
              )}
              
              <div className="main-image-wrapper" onClick={openModal}>
                <Image
                  src={productImages[activeImageIndex]}
                  alt={product.name}
                  width={600}
                  height={750}
                  className="main-product-image"
                  priority
                />
                <div className="zoom-hint">
                  <svg className="zoom-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  <span>Click to enlarge</span>
                </div>
              </div>
              
              {/* Image counter */}
              {productImages.length > 1 && (
                <div className="image-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${((activeImageIndex + 1) / productImages.length) * 100}%`}}
                    ></div>
                  </div>
                  <span className="progress-text">{activeImageIndex + 1} of {productImages.length}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Enhanced Thumbnail Grid */}
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
                  width={100}
                  height={120}
                  className="thumbnail-image"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Product Info Panel */}
        <div className="product-info-panel">
          <div className="product-header">
            <div className="category-badge">{product.category}</div>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-meta">
              <div className="rating-section">
                <div className="stars-wrapper">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < Math.floor(product.rating ?? 0) ? 'filled' : ''}`}>
                      <StarIcon />
                    </span>
                  ))}
                </div>
                <span className="rating-details">
                  <strong>{product.rating || 0}</strong> ({product.reviews || 0} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="pricing-section">
            <div className="price-wrapper">
              <span className="current-price">KES {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="original-price">KES {product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            {product.originalPrice && (
              <div className="savings-badge">
                Save KES {(product.originalPrice - product.price).toLocaleString()}
              </div>
            )}
          </div>

          <div className="description-section">
            <button 
              className="accordion-header"
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              aria-expanded={isDescriptionOpen}
              type="button"
            >
              <h3 className="section-title">Description</h3>
              <span className={`accordion-icon ${isDescriptionOpen ? 'open' : ''}`}>▼</span>
            </button>
            <div className={`accordion-content ${isDescriptionOpen ? 'open' : ''}`}>
              <p className="product-description">{product.description}</p>
            </div>
          </div>

          <div className="specifications-section">
            <h3 className="section-title">Specifications</h3>
            <div className="spec-grid">
              <div className="spec-item">
                <span className="spec-label">Material</span>
                <span className="spec-value">{product.material || product.materials?.[0] || 'Premium Quality'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Color</span>
                <span className="spec-value">{product.color || product.colors?.[0] || 'As Shown'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Style</span>
                <span className="spec-value">{product.variant || 'Classic'}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Size & Quantity Selection */}
          <div className="selection-section">
            <div className="size-selection">
              <label className="selection-label">Size</label>
              <div className="size-options">
                {(product.sizes ?? []).map((size: string) => (
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

            <div className="quantity-selection">
              <label className="selection-label">Quantity</label>
              <div className="quantity-wrapper">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn minus"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13H5v-2h14v2z"/>
                  </svg>
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="quantity-input"
                  aria-label="Quantity"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn plus"
                  aria-label="Increase quantity"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="actions-section">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              className={`action-btn primary ${!product.inStock ? 'disabled' : ''}`}
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 7h-1V6a4 4 0 0 0-8 0v1H9a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10.5 6a2.5 2.5 0 0 1 5 0v1h-5V6zM20 19a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V9h.5v1a1 1 0 0 0 2 0V9h5v1a1 1 0 0 0 2 0V9H20v10z"/>
              </svg>
              <span>{isAddingToCart ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
            
            <button
              onClick={handleOrderNow}
              disabled={!product.inStock}
              className={`action-btn secondary ${!product.inStock ? 'disabled' : ''}`}
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2.05v2.02c4.39.54 7.5 4.53 6.96 8.92A8 8 0 0 1 9.5 20c-4.39-.54-7.5-4.53-6.96-8.92A8 8 0 0 1 11 3.05V2.05c-5.05.5-8.5 5.06-7.99 10.11S8.06 21.5 13.11 20.99 22.5 15.94 21.99 10.89 16.94 1.5 11.89 2.01L13 2.05z"/>
                <path d="M12.5 7v4.25l3.5 2.08-.72 1.21L11 12V7h1.5z"/>
              </svg>
              <span>{product.inStock ? 'Buy Now' : 'Out of Stock'}</span>
            </button>
          </div>

          {/* Enhanced Product Tags */}
          {(product.tags && product.tags.length > 0) && (
            <div className="tags-section">
              <h4 className="tags-title">Tags</h4>
              <div className="tags-wrapper">
                {product.tags.map(tag => (
                  <span key={tag} className="product-tag">#{tag}</span>
                ))}
              </div>
            </div>
          )}
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

      {/* Image Modal */}
      {isModalOpen && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              ×
            </button>
            
            {/* Navigation Arrows in Modal */}
            {productImages.length > 1 && (
              <>
                <button 
                  className="modal-nav-arrow prev-arrow" 
                  onClick={goToPrevImage}
                  aria-label="Previous image"
                >
                  &#8249;
                </button>
                <button 
                  className="modal-nav-arrow next-arrow" 
                  onClick={goToNextImage}
                  aria-label="Next image"
                >
                  &#8250;
                </button>
              </>
            )}
            
            <Image
              src={productImages[activeImageIndex]}
              alt={product.name}
              width={800}
              height={800}
              className="modal-image"
              style={{ objectFit: 'contain' }}
            />
            
            {/* Image counter in modal */}
            {productImages.length > 1 && (
              <div className="modal-image-counter">
                {activeImageIndex + 1} / {productImages.length}
              </div>
            )}
            
            {/* Thumbnail navigation in modal */}
            <div className="modal-thumbnails">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`modal-thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    width={60}
                    height={60}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
