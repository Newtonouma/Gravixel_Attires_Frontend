'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TargetIcon, SparklesIcon, RulerIcon, PaletteIcon, StarIcon } from '@/components/Icons';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import { featuredCollections, Collection } from '@/components/Collections/Collections';
import './collections.css';

// Collection interface now imported
// Collection interface now imported

const CollectionsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Define collections based on product data analysis
 
  const { products, loading, error } = useProducts();

  // Calculate product counts and dynamic images for each collection
  const collectionsWithCounts = featuredCollections.map(collection => {
    const productCount = products.filter(collection.filterFunction).length;
    const match = products.find(collection.filterFunction);
    const image = match?.imageUrls?.[0] || match?.imageUrl || collection.image;
    return {
      ...collection,
      productCount,
      image,
    };
  });

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
            <Link href={`/collections/${collection.id}`} className="collection-card collection-link-full">
              <div className="collection-image-container">
                <img 
                  src={collection.image}
                  alt={collection.title}
                  className="collection-image"
                />
                <div className="collection-overlay"></div>
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
                    <span className="collection-featured"><StarIcon /> Featured</span>
                  )}
                </div>
              </div>
            </Link>
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
              <div className="highlight-icon"><TargetIcon size={32} /></div>
              <h3>Curated Selection</h3>
              <p>Carefully selected pieces that work together harmoniously</p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon"><SparklesIcon size={32} /></div>
              <h3>Premium Quality</h3>
              <p>Only the finest materials and craftsmanship in every collection</p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon"><RulerIcon size={32} /></div>
              <h3>Perfect Fit</h3>
              <p>Available in multiple sizes with custom tailoring options</p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon"><PaletteIcon size={32} /></div>
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
