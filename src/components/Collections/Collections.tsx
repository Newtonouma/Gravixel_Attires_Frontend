'use client';

import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { products, Product } from '@/data/products';
import './Collections.css';

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  featured: boolean;
  filterFunction: (product: Product) => boolean;
}

const Collections: React.FC = () => {
  // Define featured collections for homepage (matching FeaturedProducts style)
  const featuredCollections: Collection[] = [
    {
      id: 'wedding-special',
      title: 'Wedding & Special Occasions',
      description: 'Perfect attire for your most memorable moments',
      image: '/images/FeaturedProducts/3.jpg',
      badge: 'Popular',
      featured: true,
      filterFunction: (product) => 
        product.tags.includes('wedding') || 
        product.subcategory === 'Wedding' || 
        product.category === 'Tuxedos' ||
        product.tags.includes('special-occasion')
    },
    {
      id: 'business-professional',
      title: 'Business & Professional',
      description: 'Command attention in the boardroom',
      image: '/images/FeaturedProducts/1.jpg',
      badge: 'Bestseller',
      featured: true,
      filterFunction: (product) => 
        product.subcategory === 'Business' || 
        product.tags.includes('business') || 
        product.tags.includes('professional')
    },
    {
      id: 'three-piece-collection',
      title: 'Three Piece Collection',
      description: 'Complete sophistication with matching pieces',
      image: '/images/FeaturedProducts/6.jpg',
      featured: true,
      filterFunction: (product) => 
        product.variant === 'Three Piece' || 
        product.tags.includes('three-piece')
    },
    {
      id: 'slim-fit-collection',
      title: 'Slim Fit Collection',
      description: 'Modern, tailored silhouettes',
      image: '/images/FeaturedProducts/2.jpg',
      featured: true,
      filterFunction: (product) => 
        product.subcategory === 'Slim Fit' || 
        product.tags.includes('slim-fit') || 
        product.tags.includes('modern')
    },
    {
      id: 'premium-collection',
      title: 'Premium Collection',
      description: 'Our finest craftsmanship and materials',
      image: '/images/FeaturedProducts/5.jpg',
      badge: 'Premium',
      featured: true,
      filterFunction: (product) => product.price >= 45000
    }
  ];

  // Calculate product counts
  const collectionsWithCounts = featuredCollections.map(collection => ({
    ...collection,
    productCount: products.filter(collection.filterFunction).length
  }));

  // Slider settings matching FeaturedProducts
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

  return (
    <section className="collections-section">
      <div className="collections-header">
        <h2 className="collections-title">Curated Collections, Tailored for You</h2>
        <Link href="/collections" className="collections-cta">View All</Link>
      </div>
      <Slider {...sliderSettings} className="collections-slider">
        {collectionsWithCounts.map((collection) => (
          <div key={collection.id} className="collection-card">
            <Link href={`/collections/${collection.id}`} className="collection-link">
              <div 
                className="collection-image" 
                style={{ backgroundImage: `url(${collection.image})` }} 
              >
                {collection.badge && (
                  <div className={`collection-badge ${collection.badge.toLowerCase()}`}>
                    {collection.badge}
                  </div>
                )}
              </div>
              <div className="collection-info">
                <h3 className="collection-name">{collection.title}</h3>
                <p className="collection-description">{collection.description}</p>
                <span className="collection-count">{collection.productCount} Products</span>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Collections;
