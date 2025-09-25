'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { StarIcon } from '@/components/Icons';
import { useProducts } from '@/hooks/useProducts';
import { featuredCollections, Collection } from '@/components/Collections/Collections';
import { Product } from '@/types/product';
import './collection-detail.css';

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  filterFunction: (product: Product) => boolean;
}

const CollectionDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [sortBy, setSortBy] = useState<string>('featured');
  const [filterBy, setFilterBy] = useState<string>('all');

  // Use shared collections
  const collections = featuredCollections;

  const currentCollection = collections.find(c => c.id === slug);

  const { products, loading, error } = useProducts();

  // Get products for this collection
  const collectionProducts = useMemo(() => {
    if (!currentCollection) return [];
    return products.filter(currentCollection.filterFunction);
  }, [currentCollection, products]);

  // Dynamic image logic for collection
  const match = products.find(currentCollection?.filterFunction ?? (() => false));
  const collectionImage = match?.imageUrls?.[0] || match?.imageUrl || currentCollection?.image;

  // Filter products based on filter selection
  const filteredProducts = useMemo(() => {
    let filtered = [...collectionProducts];
    
    if (filterBy !== 'all') {
      if (filterBy === 'in-stock') {
        filtered = filtered.filter(p => p.inStock);
      } else if (filterBy === 'featured') {
        filtered = filtered.filter(p => !!p.featured);
      } else if (filterBy === 'two-piece') {
        filtered = filtered.filter(p => p.variant === 'Two Piece');
      } else if (filterBy === 'three-piece') {
        filtered = filtered.filter(p => p.variant === 'Three Piece');
      }
    }

    // Sort products
    if (sortBy === 'featured') {
      filtered.sort((a, b) => ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)));
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === 'reviews') {
      filtered.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
    }

    return filtered;
  }, [collectionProducts, sortBy, filterBy]);

  if (!currentCollection) {
    return (
      <div className="collection-not-found">
        <h1>Collection Not Found</h1>
        <p>The collection you're looking for doesn't exist.</p>
        <Link href="/collections">← Back to Collections</Link>
      </div>
    );
  }

  const sortOptions = [
    { value: 'featured', label: 'Featured First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Products' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'featured', label: 'Featured' },
    { value: 'two-piece', label: 'Two Piece' },
    { value: 'three-piece', label: 'Three Piece' }
  ];

  return (
    <div className="collection-detail-page">
      <div className="collection-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">→</span>
          <Link href="/collections">Collections</Link>
          <span className="breadcrumb-separator">→</span>
          <span className="breadcrumb-current">{currentCollection.title}</span>
        </nav>

        {/* Collection Header */}
        <div className="collection-hero">
          <div className="collection-hero-content">
            <div className="collection-hero-text">
              <div className="collection-header-meta">
                <h1 className="collection-hero-title">{currentCollection.title}</h1>
                {currentCollection.badge && (
                  <span className={`collection-hero-badge ${currentCollection.badge.toLowerCase()}`}>
                    {currentCollection.badge}
                  </span>
                )}
              </div>
              <p className="collection-hero-description">{currentCollection.description}</p>
              <div className="collection-hero-stats">
                <span className="stat">{collectionProducts.length} Products</span>
                <span className="stat">•</span>
                <span className="stat">{collectionProducts.filter(p => p.inStock).length} In Stock</span>
                <span className="stat">•</span>
                <span className="stat">{collectionProducts.filter(p => !!p.featured).length} Featured</span>
              </div>
            </div>
            <div className="collection-hero-image">
              <img src={collectionImage} alt={currentCollection.title} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="collection-controls">
          <div className="controls-left">
            <div className="filter-group">
              <label htmlFor="filter">Filter:</label>
              <select
                id="filter"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="control-select"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="controls-right">
            <div className="sort-group">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="control-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="collection-products">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                    {product.featured && (
                      <div className="product-badge featured">Featured</div>
                    )}
                    {!product.inStock && (
                      <div className="product-badge out-of-stock">Out of Stock</div>
                    )}
                    <div className="product-overlay">
                      <Link href={`/products/${product.slug}`} className="product-link">
                        View Details
                      </Link>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.subcategory}</p>
                    
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`star ${i < Math.floor(product.rating ?? 0) ? 'filled' : ''}`}
                          >
                            <StarIcon size={16} />
                          </span>
                        ))}
                      </div>
                      <span className="rating-text">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="product-price">
                      <span className="current-price">KES {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="original-price">KES {product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    
                    <div className="product-tags">
                      {product.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="product-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="collection-cta">
          <div className="cta-content">
            <h2>Need Expert Advice?</h2>
            <p>Our professional stylists can help you choose the perfect pieces from this collection.</p>
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
      </div>
    </div>
  );
};

export default CollectionDetailPage;
