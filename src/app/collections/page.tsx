'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { products, Product } from '@/data/products';
import './collections.css';

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
  badge?: string;
  filterFunction: (product: Product) => boolean;
}

const CollectionsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Define collections based on product data analysis
  const collections: Collection[] = [
    // Occasion-Based Collections
    {
      id: 'wedding-special',
      title: 'Wedding & Special Occasions',
      description: 'Perfect attire for your most memorable moments. From wedding suits to special event wear.',
      image: '/images/FeaturedProducts/3.jpg',
      featured: true,
      badge: 'Popular',
      filterFunction: (product) => 
        product.tags.includes('wedding') || 
        product.subcategory === 'Wedding' || 
        product.category === 'Tuxedos' ||
        product.tags.includes('special-occasion'),
      productCount: 0
    },
    {
      id: 'business-professional',
      title: 'Business & Professional',
      description: 'Command attention in the boardroom with our professional business suits.',
      image: '/images/FeaturedProducts/1.jpg',
      featured: true,
      badge: 'Bestseller',
      filterFunction: (product) => 
        product.subcategory === 'Business' || 
        product.tags.includes('business') || 
        product.tags.includes('professional'),
      productCount: 0
    },
    {
      id: 'three-piece-collection',
      title: 'Three Piece Collection',
      description: 'Complete sophistication with matching jacket, trousers, and vest.',
      image: '/images/FeaturedProducts/6.jpg',
      featured: true,
      filterFunction: (product) => 
        product.variant === 'Three Piece' || 
        product.tags.includes('three-piece'),
      productCount: 0
    },

    // Style-Based Collections
    {
      id: 'slim-fit-collection',
      title: 'Slim Fit Collection',
      description: 'Modern, tailored silhouettes for the contemporary gentleman.',
      image: '/images/FeaturedProducts/2.jpg',
      featured: true,
      filterFunction: (product) => 
        product.subcategory === 'Slim Fit' || 
        product.tags.includes('slim-fit') || 
        product.tags.includes('modern'),
      productCount: 0
    },
    {
      id: 'classic-collection',
      title: 'Classic Essentials',
      description: 'Timeless pieces that never go out of style. Essential wardrobe foundations.',
      image: '/images/FeaturedProducts/5.jpg',
      featured: false,
      filterFunction: (product) => 
        product.subcategory === 'Classic' || 
        product.tags.includes('classic') || 
        product.tags.includes('essential') ||
        product.tags.includes('timeless'),
      productCount: 0
    },

    // Seasonal Collections
    {
      id: 'summer-collection',
      title: 'Summer Collection',
      description: 'Lightweight, breathable fabrics perfect for warm weather occasions.',
      image: '/images/FeaturedProducts/4.jpg',
      featured: false,
      badge: 'Seasonal',
      filterFunction: (product) => 
        product.material === 'Linen' || 
        product.tags.includes('summer') || 
        product.tags.includes('lightweight') ||
        product.subcategory === 'Summer',
      productCount: 0
    },
    {
      id: 'winter-collection',
      title: 'Winter Collection',
      description: 'Rich textures and warm materials for autumn and winter elegance.',
      image: '/images/FeaturedProducts/2.jpg',
      featured: false,
      badge: 'Seasonal',
      filterFunction: (product) => 
        product.material === 'Tweed' || 
        product.material === 'Velvet' || 
        product.tags.includes('autumn') ||
        product.tags.includes('winter'),
      productCount: 0
    },

    // Color-Based Collections
    {
      id: 'neutral-tones',
      title: 'Neutral Tones',
      description: 'Versatile navy, charcoal, black, and grey suits for any occasion.',
      image: '/images/FeaturedProducts/1.jpg',
      featured: false,
      filterFunction: (product) => 
        ['Navy', 'Black', 'Charcoal', 'Grey', 'Light Grey'].includes(product.color),
      productCount: 0
    },
    {
      id: 'luxury-colors',
      title: 'Luxury Colors',
      description: 'Stand out with our premium colored suits and unique fabric choices.',
      image: '/images/FeaturedProducts/5.jpg',
      featured: false,
      badge: 'Premium',
      filterFunction: (product) => 
        ['Burgundy', 'Ivory', 'Midnight Blue', 'Olive'].includes(product.color) ||
        product.material === 'Velvet' ||
        product.material === 'Silk Blend',
      productCount: 0
    },

    // Price-Based Collections
    {
      id: 'premium-collection',
      title: 'Premium Collection',
      description: 'Our finest craftsmanship and materials in luxury suits and tuxedos.',
      image: '/images/FeaturedProducts/3.jpg',
      featured: true,
      badge: 'Premium',
      filterFunction: (product) => product.price >= 45000,
      productCount: 0
    },
    {
      id: 'essential-collection',
      title: 'Essential Collection',
      description: 'Quality suits at accessible prices without compromising on style.',
      image: '/images/FeaturedProducts/1.jpg',
      featured: false,
      badge: 'Value',
      filterFunction: (product) => product.price >= 30000 && product.price < 40000,
      productCount: 0
    },

    // Special Collections
    {
      id: 'bestsellers',
      title: 'Bestsellers',
      description: 'Our most popular suits loved by customers. Proven favorites.',
      image: '/images/FeaturedProducts/1.jpg',
      featured: true,
      badge: 'Bestseller',
      filterFunction: (product) => product.featured || product.reviews > 100,
      productCount: 0
    }
  ];

  // Calculate product counts for each collection
  const collectionsWithCounts = collections.map(collection => ({
    ...collection,
    productCount: products.filter(collection.filterFunction).length
  }));

  // Filter collections based on selected filter
  const filteredCollections = collectionsWithCounts.filter(collection => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'featured') return collection.featured;
    if (selectedFilter === 'occasion') return ['wedding-special', 'business-professional'].includes(collection.id);
    if (selectedFilter === 'style') return ['slim-fit-collection', 'classic-collection', 'three-piece-collection'].includes(collection.id);
    if (selectedFilter === 'seasonal') return ['summer-collection', 'winter-collection'].includes(collection.id);
    if (selectedFilter === 'premium') return collection.badge === 'Premium';
    return true;
  });

  const filterOptions = [
    { value: 'all', label: 'All Collections' },
    { value: 'featured', label: 'Featured' },
    { value: 'occasion', label: 'By Occasion' },
    { value: 'style', label: 'By Style' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'premium', label: 'Premium' }
  ];

  return (
    <div className="collections-page">
      <div className="collections-container">
        {/* Header Section */}
        <div className="collections-header">
          <h1 className="collections-title">Our Collections</h1>
          <p className="collections-subtitle">
            Discover curated collections designed to meet every style preference and occasion. 
            From timeless classics to contemporary designs, find your perfect suit.
          </p>
        </div>

        {/* Stats Section */}
        <div className="collections-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{collectionsWithCounts.length}</div>
              <div className="stat-label">Collections</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{products.length}</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{collectionsWithCounts.filter(c => c.featured).length}</div>
              <div className="stat-label">Featured</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{new Set(products.map(p => p.category)).size}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="collections-filters">
          <div className="filter-tabs">
            {filterOptions.map(option => (
              <button
                key={option.value}
                className={`filter-tab ${selectedFilter === option.value ? 'active' : ''}`}
                onClick={() => setSelectedFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Collections Grid */}
        <div className="collections-grid">
          {filteredCollections.map(collection => (
            <div key={collection.id} className="collection-card">
              <div className="collection-image-container">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="collection-image"
                />
                <div className="collection-overlay">
                  <Link 
                    href={`/collections/${collection.id}`} 
                    className="collection-link"
                  >
                    View Collection
                  </Link>
                </div>
                {collection.badge && (
                  <div className={`collection-badge ${collection.badge.toLowerCase()}`}>
                    {collection.badge}
                  </div>
                )}
              </div>
              
              <div className="collection-content">
                <h3 className="collection-title">{collection.title}</h3>
                <p className="collection-description">{collection.description}</p>
                
                <div className="collection-meta">
                  <span className="collection-count">
                    {collection.productCount} {collection.productCount === 1 ? 'Product' : 'Products'}
                  </span>
                  {collection.featured && (
                    <span className="collection-featured">⭐ Featured</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="collections-cta">
          <div className="cta-content">
            <h2>Need Help Choosing?</h2>
            <p>Our expert tailors are here to help you find the perfect collection for your needs.</p>
            <div className="cta-buttons">
              <Link href="/book-consultation" className="cta-primary">
                Book Consultation
              </Link>
              <Link href="/contact" className="cta-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Highlights */}
        <div className="collections-highlights">
          <h2>Why Choose Our Collections?</h2>
          <div className="highlights-grid">
            <div className="highlight-item">
              <div className="highlight-icon">🎯</div>
              <h3>Curated Selection</h3>
              <p>Carefully selected pieces that work together harmoniously</p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">✨</div>
              <h3>Premium Quality</h3>
              <p>Only the finest materials and craftsmanship in every collection</p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">📏</div>
              <h3>Perfect Fit</h3>
              <p>Available in multiple sizes with custom tailoring options</p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🎨</div>
              <h3>Style Variety</h3>
              <p>From classic to contemporary, find your perfect style</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
