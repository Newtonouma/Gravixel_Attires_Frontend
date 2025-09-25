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
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">Home</Link> / 
        <Link href="/products">Products</Link> / 
        <span>{product.name}</span>
      </div>

      <div className="product-detail">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            {/* Navigation Arrows */}
            {productImages.length > 1 && (
              <>
                <button 
                  className="image-nav-arrow prev-arrow" 
                  onClick={goToPrevImage}
                  aria-label="Previous image"
                >
                  &#8249;
                </button>
                <button 
                  className="image-nav-arrow next-arrow" 
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
              width={500}
              height={600}
              className="main-product-image"
              onClick={openModal}
              style={{ cursor: 'pointer' }}
            />
            {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
            
            {/* Image counter */}
            {productImages.length > 1 && (
              <div className="image-counter">
                {activeImageIndex + 1} / {productImages.length}
              </div>
            )}
          </div>
          
          <div className="thumbnail-images">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  width={80}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating ?? 0) ? 'star filled' : 'star'}>
                  <StarIcon />
                </span>
              ))}
            </div>
            <span className="rating-text">({product.rating || 0}) {product.reviews || 0} reviews</span>
          </div>

          <div className="product-price">
            <span className="current-price">KES {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="original-price">KES {product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          <div className="product-details">
            <div className="detail-item">
              <span className="label">Category:</span>
              <span className="value">{product.category}</span>
            </div>
            <div className="detail-item">
              <span className="label">Material:</span>
              <span className="value">{product.material || product.materials?.[0] || 'N/A'}</span>
            </div>
            {/* Brand field removed: Product type has no 'brand' property */}
            <div className="detail-item">
              <span className="label">Color:</span>
              <span className="value">{product.color || product.colors?.[0] || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Variant:</span>
              <span className="value">{product.variant || 'Standard'}</span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="size-selection">
            <label htmlFor="size">Size:</label>
            <select
              id="size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="size-select"
              title="Select size"
            >
              {(product.sizes ?? []).map((size: string) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Quantity Selection */}
          <div className="quantity-selection">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="quantity-input"
              />
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
            >
              {isAddingToCart ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <button
              onClick={handleOrderNow}
              disabled={!product.inStock}
              className={`order-now-btn ${!product.inStock ? 'disabled' : ''}`}
            >
              {product.inStock ? 'Order Now' : 'Out of Stock'}
            </button>
          </div>

          {/* Product Tags */}
          <div className="product-tags">
            {(product.tags || []).map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
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
