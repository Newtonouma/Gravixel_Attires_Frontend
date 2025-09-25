'use client';

import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useProducts } from '@/hooks/useProducts';
import '../FeaturedProducts/FeaturedProducts.css';

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  autoplay: false,
  arrows: true,
  centerMode: false,
  centerPadding: '0px',
  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const BestsellingProducts: React.FC = () => {
  const { products, loading, error } = useProducts();

  // Filter products with the 'bestseller' tag
  const bestsellingProducts = products.filter(product =>
    product.tags && product.tags.includes('bestseller')
  );
  const displayProducts = bestsellingProducts.length > 0
    ? bestsellingProducts.slice(0, 7)
    : products.slice(0, 7);

  if (loading) {
    return (
      <section className="featured-section">
        <div className="featured-header">
          <h2 className="featured-title">Top Selling Pieces</h2>
        </div>
        <div className="loading-state">Loading top selling pieces...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-section">
        <div className="featured-header">
          <h2 className="featured-title">Bestsellers</h2>
        </div>
        <div className="error-state">Error loading products: {error}</div>
      </section>
    );
  }

  if (displayProducts.length === 0) {
    return (
      <section className="featured-section">
        <div className="featured-header">
          <h2 className="featured-title">Top Selling Pieces</h2>
        </div>
        <div className="empty-state">No top selling pieces available</div>
      </section>
    );
  }

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2 className="featured-title">Top Selling Pieces</h2>
        <Link href="/products?tag=bestseller" className="featured-cta">Shop Bestsellers</Link>
      </div>
      <Slider {...sliderSettings} className="featured-slider">
        {displayProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link href={`/products/${product.slug}`} className="product-link">
              <div 
                className="product-image"
                style={{
                  backgroundImage: `url(${product.imageUrl || '/images/placeholder.jpg'})`
                }}
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">KES {product.price.toLocaleString()}</span>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default BestsellingProducts;
