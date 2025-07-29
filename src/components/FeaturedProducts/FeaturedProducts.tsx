'use client';

import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { products } from '@/data/products';
import './FeaturedProducts.css';

// Get only featured products
const featuredProducts = products.filter(product => product.featured);

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  arrows: true,
  centerMode: false,
  centerPadding: '0px',
  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
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
  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2 className="featured-title">Personalized Perfection, Every Inch</h2>
        <Link href="/products" className="featured-cta">Shop All</Link>
      </div>
      <Slider {...sliderSettings} className="featured-slider">
        {featuredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link href={`/products/${product.slug}`} className="product-link">
              <div 
                className="product-image" 
                style={{ backgroundImage: `url(${product.image})` }} 
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