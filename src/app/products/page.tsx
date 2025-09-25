'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, MenuIcon, CloseIcon } from '@/components/Icons';
import { useCart } from '@/contexts/CartContext';
import { useProducts } from '@/hooks/useProducts';
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
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();
  
  // Generate filter options dynamically from products
  const filterOptions = useMemo(() => {
    if (!products.length) return {
      categories: [],
      subcategories: [],
      colors: [],
      materials: [],
      sizes: [],
      priceRanges: [
        { label: 'Under KES 10,000', min: 0, max: 10000 },
        { label: 'KES 10,000 - 25,000', min: 10000, max: 25000 },
        { label: 'KES 25,000 - 50,000', min: 25000, max: 50000 },
        { label: 'Over KES 50,000', min: 50000, max: Infinity }
      ]
    };

    return {
      categories: [...new Set(products.map(p => p.category))],
      subcategories: [...new Set(products.map(p => p.subcategory))],
      colors: [...new Set(products.flatMap(p => p.colors || []))],
      materials: [...new Set(products.flatMap(p => p.materials || []))],
      sizes: [...new Set(products.flatMap(p => p.sizes || []))],
      priceRanges: [
        { label: 'Under KES 10,000', min: 0, max: 10000 },
        { label: 'KES 10,000 - 25,000', min: 10000, max: 25000 },
        { label: 'KES 25,000 - 50,000', min: 25000, max: 50000 },
        { label: 'Over KES 50,000', min: 50000, max: Infinity }
      ]
    };
  }, [products]);

  const [filters, setFilters] = useState<Filters>({
    category: 'All',
    subcategory: 'All',
    color: 'All',
    material: 'All',
    size: 'All',
    priceRange: { min: 0, max: Infinity },
    inStock: true,
    search: '',
    variant: 'All'
  });

  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'rating' | 'newest'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }
      if (filters.subcategory !== 'All' && product.subcategory !== filters.subcategory) {
        return false;
      }
      if (filters.color !== 'All' && !(product.colors || []).includes(filters.color)) {
        return false;
      }
      if (filters.material !== 'All' && !(product.materials || []).includes(filters.material)) {
        return false;
      }
      if (filters.size !== 'All' && !(product.sizes || []).includes(filters.size)) {
        return false;
      }
      
      // Convert price to number for comparison
      const productPrice = Number(product.price);
      if (productPrice < filters.priceRange.min || productPrice > filters.priceRange.max) {
        return false;
      }
      // Skip inStock filtering for now - all products are in stock
      // if (filters.inStock === true && product.inStock !== true) {
      //   return false;
      // }
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [products, filters, sortBy]);

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
        <StarIcon size={16} />
      </span>
    ));
  };

  const handleQuickAddToCart = (product: any, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent navigation to product details
    event.stopPropagation();
    
    // Add with the first available size (most common approach for quick add)
    const defaultSize = product.sizes[0];
    addToCart(product, defaultSize, 1);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">✓</span>
        <span class="notification-text">Added ${product.name} (${defaultSize}) to cart!</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-title">All Products</h1>
        <p className="products-subtitle">Discover our complete collection of premium suits, tuxedos, and blazers</p>
      </div>

      <div className="products-container">
        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-toggle">
          <button 
            className="filter-toggle-btn"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <span className="filter-icon"><MenuIcon size={18} /></span>
            Filters
          </button>
        </div>

        {/* Filters Sidebar */}
        <div className={`filters-sidebar ${isMobileFiltersOpen ? 'mobile-open' : ''}`}>
          {/* Mobile Filter Header */}
          <div className="mobile-filter-header">
            <h3>Filters</h3>
            <button 
              className="close-filters-btn"
              onClick={() => setIsMobileFiltersOpen(false)}
              aria-label="Close filters"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          <div className="filters-header desktop-only">
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
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              {filterOptions.categories.map((category: string) => (
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
              aria-label="Filter by subcategory"
            >
              <option value="All">All Types</option>
              {filterOptions.subcategories.map((subcategory: string) => (
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
              aria-label="Filter by color"
            >
              <option value="All">All Colors</option>
              {filterOptions.colors.map((color: string) => (
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
              aria-label="Filter by material"
            >
              <option value="All">All Materials</option>
              {filterOptions.materials.map((material: string) => (
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
              aria-label="Filter by size"
            >
              <option value="All">All Sizes</option>
              {filterOptions.sizes.map((size: string) => (
                <option key={size} value={size}>{size}</option>
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
              aria-label="Filter by price range"
            >
              <option value={JSON.stringify({ min: 0, max: Infinity })}>All Prices</option>
              {filterOptions.priceRanges.map((range: any) => (
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

          {/* Mobile Clear Filters */}
          <div className="mobile-filter-actions">
            <button onClick={clearFilters} className="clear-filters mobile-clear">Clear All</button>
            <button 
              className="apply-filters-btn"
              onClick={() => setIsMobileFiltersOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMobileFiltersOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
        )}

        {/* Products Section */}
        <div className="products-section">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>Error loading products: {error}</p>
              <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
          ) : (
            <>
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
                    aria-label="Sort products"
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
                      aria-label="List view"
                    >
                      <MenuIcon size={18} />
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
                      <Image src={product.imageUrl || '/images/placeholder.jpg'} alt={product.name} className="product-image" width={300} height={400} />
                      {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
                      {product.originalPrice && (
                        <div className="sale-badge">Sale</div>
                      )}
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-rating">
                        {renderStars(product.rating || 0)}
                        <span className="rating-text">({product.reviews || 0})</span>
                      </div>
                      <div className="product-details">
                        <span className="product-category">{product.category} • {product.color || product.colors[0] || 'N/A'}</span>
                        <span className="product-material">{product.material || product.materials[0] || 'N/A'} • {product.variant || 'Standard'}</span>
                      </div>
                      <div className="product-price">
                        {product.originalPrice && (
                          <span className="original-price">KES {product.originalPrice.toLocaleString()}</span>
                        )}
                        <span className="current-price">KES {product.price.toLocaleString()}</span>
                      </div>
                      <div className="product-sizes">
                        <span>Available in: {product.sizes.join(', ')}</span>
                      </div>
                      {viewMode === 'list' && (
                        <p className="product-description">{product.description}</p>
                      )}
                    </div>
                  </Link>
                  <div className="product-actions">
                    <button 
                      className="add-to-cart-btn" 
                      disabled={!product.inStock}
                      onClick={(e) => handleQuickAddToCart(product, e)}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
