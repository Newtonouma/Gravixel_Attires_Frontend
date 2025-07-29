'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, categories, subcategories, colors, materials, sizes, variants, priceRanges } from '@/data/products';
import './products.css';

interface Filters {
  category: string;
  subcategory: string;
  color: string;
  material: string;
  size: string;
  priceRange: { min: number; max: number };
  inStock: boolean;
  search: string;
  variant: string;
}

const ProductsPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    category: 'All',
    subcategory: 'All',
    color: 'All',
    material: 'All',
    size: 'All',
    priceRange: { min: 0, max: Infinity },
    inStock: false,
    search: '',
    variant: 'All'
  });

  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'rating' | 'newest'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      if (filters.category !== 'All' && product.category !== filters.category) return false;
      if (filters.subcategory !== 'All' && product.subcategory !== filters.subcategory) return false;
      if (filters.color !== 'All' && product.color !== filters.color) return false;
      if (filters.material !== 'All' && product.material !== filters.material) return false;
      if (filters.size !== 'All' && !product.size.includes(filters.size)) return false;
      if (filters.variant !== 'All' && product.variant !== filters.variant) return false;
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;
      if (filters.inStock && !product.inStock) return false;
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [filters, sortBy]);

  const updateFilter = (key: keyof Filters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      subcategory: 'All',
      color: 'All',
      material: 'All',
      size: 'All',
      priceRange: { min: 0, max: Infinity },
      inStock: false,
      search: '',
      variant: 'All'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-title">All Products</h1>
        <p className="products-subtitle">Discover our complete collection of premium suits, tuxedos, and blazers</p>
      </div>

      <div className="products-container">
        {/* Filters Sidebar */}
        <div className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button onClick={clearFilters} className="clear-filters">Clear All</button>
          </div>

          {/* Search */}
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          <div className="filter-group">
            <label>Type</label>
            <select
              value={filters.subcategory}
              onChange={(e) => updateFilter('subcategory', e.target.value)}
              className="filter-select"
            >
              {subcategories.map(subcategory => (
                <option key={subcategory} value={subcategory}>{subcategory}</option>
              ))}
            </select>
          </div>

          {/* Color Filter */}
          <div className="filter-group">
            <label>Color</label>
            <select
              value={filters.color}
              onChange={(e) => updateFilter('color', e.target.value)}
              className="filter-select"
            >
              {colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          {/* Material Filter */}
          <div className="filter-group">
            <label>Material</label>
            <select
              value={filters.material}
              onChange={(e) => updateFilter('material', e.target.value)}
              className="filter-select"
            >
              {materials.map(material => (
                <option key={material} value={material}>{material}</option>
              ))}
            </select>
          </div>

          {/* Size Filter */}
          <div className="filter-group">
            <label>Size</label>
            <select
              value={filters.size}
              onChange={(e) => updateFilter('size', e.target.value)}
              className="filter-select"
            >
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Variant Filter */}
          <div className="filter-group">
            <label>Variant</label>
            <select
              value={filters.variant}
              onChange={(e) => updateFilter('variant', e.target.value)}
              className="filter-select"
            >
              {variants.map(variant => (
                <option key={variant} value={variant}>{variant}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <label>Price Range</label>
            <select
              value={JSON.stringify(filters.priceRange)}
              onChange={(e) => updateFilter('priceRange', JSON.parse(e.target.value))}
              className="filter-select"
            >
              {priceRanges.map(range => (
                <option key={range.label} value={JSON.stringify({ min: range.min, max: range.max })}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* In Stock Filter */}
          <div className="filter-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => updateFilter('inStock', e.target.checked)}
                className="filter-checkbox"
              />
              In Stock Only
            </label>
          </div>
        </div>

        {/* Products Section */}
        <div className="products-section">
          {/* Controls */}
          <div className="products-controls">
            <div className="results-info">
              <span>{filteredProducts.length} products found</span>
            </div>

            <div className="controls-right">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price-low' | 'price-high' | 'rating')}
                className="sort-select"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>

              {/* View Mode Toggle */}
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  ⊞
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className={`products-grid ${viewMode}`}>
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <Link href={`/products/${product.slug}`} className="product-link">
                    <div className="product-image-container">
                      <Image src={product.image} alt={product.name} className="product-image" width={300} height={400} />
                      {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
                      {product.originalPrice && (
                        <div className="sale-badge">Sale</div>
                      )}
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-rating">
                        {renderStars(product.rating)}
                        <span className="rating-text">({product.reviews})</span>
                      </div>
                      <div className="product-details">
                        <span className="product-category">{product.category} • {product.color}</span>
                        <span className="product-material">{product.material} • {product.variant}</span>
                      </div>
                      <div className="product-price">
                        {product.originalPrice && (
                          <span className="original-price">KES {product.originalPrice.toLocaleString()}</span>
                        )}
                        <span className="current-price">KES {product.price.toLocaleString()}</span>
                      </div>
                      <div className="product-sizes">
                        <span>Available in: {product.size.join(', ')}</span>
                      </div>
                      {viewMode === 'list' && (
                        <p className="product-description">{product.description}</p>
                      )}
                    </div>
                  </Link>
                  <div className="product-actions">
                    <button className="add-to-cart-btn" disabled={!product.inStock}>
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
