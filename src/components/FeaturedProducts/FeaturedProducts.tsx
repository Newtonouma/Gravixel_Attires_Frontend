'use client';

import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useProducts } from '@/hooks/useProducts';
import './FeaturedProducts.css';

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

const FeaturedProducts: React.FC = () => {
  const { products, loading, error } = useProducts();
  
  // Get only featured products from the API data, fallback to first 4 products if no featured products
  const featuredProducts = products.filter(product => product.featured);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  if (loading) {
    return (
      <section className="featured-section">
        <div className="featured-header">
          <h2 className="featured-title">Personalized Perfection, Every Inch</h2>
        </div>
        <div className="loading-state">Loading featured products...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-section">
        <div className="featured-header">
          <h2 className="featured-title">Personalized Perfection, Every Inch</h2>
        </div>
        <div className="error-state">Error loading products: {error}</div>
      </section>
    );
  }

  if (displayProducts.length === 0) {
    return (
      <section className="featured-section">
        <div className="featured-header">
          <h2 className="featured-title">Personalized Perfection, Every Inch</h2>
        </div>
        <div className="empty-state">No products available</div>
      </section>
    );
  }

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2 className="featured-title">Personalized Perfection, Every Inch</h2>
        <Link href="/products" className="featured-cta">Shop All</Link>
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

export default FeaturedProducts; 