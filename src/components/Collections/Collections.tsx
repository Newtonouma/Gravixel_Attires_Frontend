'use client';

import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import './Collections.css';

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  featured: boolean;
  filterFunction: (product: Product) => boolean;
}

export const featuredCollections: Collection[] = [
  {
    id: 'kenyan-women',
    title: 'Women’s Collection',
    description: 'Elegant and vibrant styles for Kenyan women',
    image: '/images/FeaturedProducts/kenyan-women.jpg',
    badge: 'Seasonal',
    featured: true,
    filterFunction: (product) => (product.tags?.includes('kenyan') ?? false) || (product.tags?.includes('women') ?? false) || (product.subcategory === 'Women')
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
      (product.tags?.includes('business') ?? false) || 
      (product.tags?.includes('professional') ?? false)
  },
  {
    id: 'kenyan-children',
    title: 'Children’s Collection',
    description: 'Fun, colorful, and comfortable for Kenyan kids',
    image: '/images/FeaturedProducts/kenyan-children.jpg',
    badge: 'Value',
    featured: true,
    filterFunction: (product) => (product.tags?.includes('kenyan') ?? false) || (product.tags?.includes('children') ?? false) || (product.subcategory === 'Children')
  },
  {
    id: 'three-piece-collection',
    title: 'Three Piece Collection',
    description: 'Complete sophistication with matching pieces',
    image: '/images/FeaturedProducts/6.jpg',
    featured: true,
    filterFunction: (product) => 
      product.variant === 'Three Piece' || 
      (product.tags?.includes('three-piece') ?? false)
  },
  {
    id: 'kenyan-girls',
    title: 'Girls Collection',
    description: 'Beautiful dresses and outfits for Kenyan girls',
    image: '/images/FeaturedProducts/kenyan-girls.jpg',
    badge: 'Popular',
    featured: true,
    filterFunction: (product) => (product.tags?.includes('kenyan') ?? false) || (product.tags?.includes('girls') ?? false) || (product.subcategory === 'Girls')
  },
  {
    id: 'wedding-special',
    title: 'Wedding & Special Occasions',
    description: 'Perfect attire for your most memorable moments',
    image: '/images/FeaturedProducts/3.jpg',
    badge: 'Popular',
    featured: true,
    filterFunction: (product) => 
      (product.tags?.includes('wedding') ?? false) || 
      product.subcategory === 'Wedding' || 
      product.category === 'Tuxedos' ||
      (product.tags?.includes('special-occasion') ?? false)
  },
  {
    id: 'kenyan-boys',
    title: 'Boys Collection',
    description: 'Smart and playful looks for Kenyan boys',
    image: '/images/FeaturedProducts/kenyan-boys.jpg',
    badge: 'Bestseller',
    featured: true,
    filterFunction: (product) => (product.tags?.includes('kenyan') ?? false) || (product.tags?.includes('boys') ?? false) || (product.subcategory === 'Boys')
  },
  {
    id: 'slim-fit-collection',
    title: 'Slim Fit Collection',
    description: 'Modern, tailored silhouettes',
    image: '/images/FeaturedProducts/2.jpg',
    featured: true,
    filterFunction: (product) => 
      product.subcategory === 'Slim Fit' || 
      (product.tags?.includes('slim-fit') ?? false) || 
      (product.tags?.includes('modern') ?? false)
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

const Collections: React.FC = () => {
  const { products, loading, error } = useProducts();

  // Calculate product counts
  const collectionsWithCounts = featuredCollections.map(collection => ({
    ...collection,
    productCount: products.filter(collection.filterFunction).length,
    image: (() => {
      const match = products.find(collection.filterFunction);
      return match?.imageUrls?.[0] || match?.imageUrl || collection.image;
    })()
  }));

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

  if (loading) {
    return (
      <section className="collections-section">
        <div className="collections-header">
          <h2 className="collections-title">Curated Collections, Tailored for You</h2>
        </div>
        <div className="loading-state">Loading collections...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="collections-section">
        <div className="collections-header">
          <h2 className="collections-title">Curated Collections, Tailored for You</h2>
        </div>
        <div className="error-state">Error loading collections: {error}</div>
      </section>
    );
  }

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
