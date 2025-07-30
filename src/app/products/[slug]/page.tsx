'use client';

import { useState, use } from 'react';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@/components/Icons';
import './product.css';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = products.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  const [selectedSize, setSelectedSize] = useState(product.size[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // For demonstration, we'll use the same image multiple times
  // In a real app, you'd have multiple product images
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', {
      product: product.name,
      size: selectedSize,
      quantity: quantity
    });
    alert('Product added to cart!');
  };

  const handleOrderNow = () => {
    // Order now logic here - could redirect to checkout with this product
    console.log('Order now:', {
      product: product.name,
      size: selectedSize,
      quantity: quantity
    });
    alert('Redirecting to checkout...');
  };

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
            <Image
              src={productImages[activeImageIndex]}
              alt={product.name}
              width={500}
              height={600}
              className="main-product-image"
            />
            {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
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
                <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                  <StarIcon />
                </span>
              ))}
            </div>
            <span className="rating-text">({product.rating}) {product.reviews} reviews</span>
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
              <span className="value">{product.material}</span>
            </div>
            <div className="detail-item">
              <span className="label">Brand:</span>
              <span className="value">{product.brand}</span>
            </div>
            <div className="detail-item">
              <span className="label">Color:</span>
              <span className="value">{product.color}</span>
            </div>
            <div className="detail-item">
              <span className="label">Variant:</span>
              <span className="value">{product.variant}</span>
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
              {product.size.map(size => (
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
              disabled={!product.inStock}
              className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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
            {product.tags.map(tag => (
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
                    src={relatedProduct.image}
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
