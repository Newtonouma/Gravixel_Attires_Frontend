'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './blog.css';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'ultimate-guide-to-custom-suits',
    title: 'The Ultimate Guide to Custom Suits: Everything You Need to Know',
    excerpt: 'Discover the world of bespoke tailoring and learn why a custom suit is the perfect investment for your wardrobe.',
    content: 'Full content here...',
    author: 'James Wilson',
    date: '2024-07-25',
    category: 'Style Guide',
    tags: ['Suits', 'Custom Tailoring', 'Menswear'],
    image: '/images/FeaturedProducts/1.jpg',
    readTime: '8 min read'
  },
  {
    id: 2,
    slug: 'seasonal-fashion-trends-2024',
    title: 'Seasonal Fashion Trends 2024: What\'s Hot This Year',
    excerpt: 'Stay ahead of the fashion curve with our comprehensive guide to this year\'s most exciting trends.',
    content: 'Full content here...',
    author: 'Sarah Mitchell',
    date: '2024-07-20',
    category: 'Trends',
    tags: ['Fashion Trends', '2024', 'Style'],
    image: '/images/FeaturedProducts/2.jpg',
    readTime: '6 min read'
  },
  {
    id: 3,
    slug: 'caring-for-your-luxury-garments',
    title: 'Caring for Your Luxury Garments: Maintenance Tips',
    excerpt: 'Learn how to properly care for and maintain your high-quality clothing to ensure they last for years.',
    content: 'Full content here...',
    author: 'Michael Chen',
    date: '2024-07-18',
    category: 'Care Tips',
    tags: ['Garment Care', 'Maintenance', 'Luxury'],
    image: '/images/FeaturedProducts/3.jpg',
    readTime: '5 min read'
  },
  {
    id: 4,
    slug: 'art-of-color-coordination',
    title: 'The Art of Color Coordination in Fashion',
    excerpt: 'Master the science and art of color matching to create stunning, cohesive outfits every time.',
    content: 'Full content here...',
    author: 'Emma Rodriguez',
    date: '2024-07-15',
    category: 'Style Guide',
    tags: ['Color Theory', 'Styling', 'Fashion'],
    image: '/images/FeaturedProducts/4.jpg',
    readTime: '7 min read'
  },
  {
    id: 5,
    slug: 'sustainable-fashion-choices',
    title: 'Making Sustainable Fashion Choices: A Modern Guide',
    excerpt: 'Explore how to build a sustainable wardrobe without compromising on style or quality.',
    content: 'Full content here...',
    author: 'David Thompson',
    date: '2024-07-12',
    category: 'Sustainability',
    tags: ['Sustainable Fashion', 'Environment', 'Ethical'],
    image: '/images/FeaturedProducts/5.jpg',
    readTime: '9 min read'
  },
  {
    id: 6,
    slug: 'building-capsule-wardrobe',
    title: 'Building the Perfect Capsule Wardrobe',
    excerpt: 'Learn how to create a versatile, minimalist wardrobe that works for every occasion.',
    content: 'Full content here...',
    author: 'Lisa Anderson',
    date: '2024-07-10',
    category: 'Style Guide',
    tags: ['Capsule Wardrobe', 'Minimalism', 'Essentials'],
    image: '/images/FeaturedProducts/6.jpg',
    readTime: '6 min read'
  }
];

const categories = ['All', 'Style Guide', 'Trends', 'Care Tips', 'Sustainability'];
const tags = ['Custom Tailoring', 'Fashion Trends', 'Style Guide', 'Sustainable Fashion', 'Color Theory', 'Menswear'];
const archives = ['July 2024', 'June 2024', 'May 2024', 'April 2024'];

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Fashion & Style Blog</h1>
          <p className="blog-hero-subtitle">
            Discover the latest trends, style guides, and fashion insights from our expert team
          </p>
        </div>
      </section>

      <div className="blog-container">
        {/* Main Blog Posts Section */}
        <section className="blog-posts-grid">       
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <article key={post.id} className="blog-post-card">
                <Link href={`/blog/${post.slug}`} className="blog-post-link">
                  <div className="blog-post-image-container">
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="blog-post-image"
                      width={400}
                      height={250}
                    />
                  </div>
                  
                  <div className="blog-post-content">
                    <div className="blog-post-meta">
                      <span className="blog-post-date">{formatDate(post.date)}</span>
                      <span className="blog-post-category">{post.category}</span>
                    </div>
                    
                    <h2 className="blog-post-title">{post.title}</h2>
                    <p className="blog-post-excerpt">{post.excerpt}</p>
                    
                    <button className="read-more-btn">Read More</button>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="no-posts">
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </section>

        {/* Sidebar Section */}
        <aside className="blog-sidebar">
          {/* Search */}
          <div className="sidebar-section">
            <h3>Search</h3>
            <div className="search-section">
              <input
                type="text"
                placeholder="Search posts..."
                className="blog-search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Popular Posts */}
          <div className="sidebar-section">
            <h3>Popular Posts</h3>
            <div className="featured-posts">
              {blogPosts.slice(0, 3).map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="featured-post">
                  <div className="featured-post-image">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="featured-post-info">
                    <h4>{post.title}</h4>
                    <div className="blog-post-meta">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="sidebar-section">
            <h3>Categories</h3>
            <div className="category-filters">
              <select 
                className="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="All">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Newsletter */}
          <div className="sidebar-section">
            <h3>Newsletter</h3>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <p>Subscribe to get the latest tailoring tips and offers</p>
              <input 
                type="email" 
                placeholder="Your email address" 
                required 
                className="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="subscribe-btn">Subscribe</button>
            </form>
          </div>

          {/* Tags */}
          <div className="sidebar-section">
            <h3>Tags</h3>
            <div className="popular-tags">
              {tags.map(tag => (
                <a key={tag} href={`#${tag}`} className="popular-tag">{tag}</a>
              ))}
            </div>
          </div>

          {/* Archive */}
          <div className="sidebar-section">
            <h3>Archive</h3>
            <ul className="archive-list">
              {archives.map(archive => (
                <li key={archive}><a href={`#${archive}`}>{archive}</a></li>
              ))}
            </ul>
          </div>

          {/* Social Share */}
          <div className="sidebar-section">
            <h3>Follow Us</h3>
            <div className="social-share">
              <a href="https://facebook.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="social-btn facebook"
                 title="Follow us on Facebook"
                 aria-label="Follow us on Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="social-btn twitter"
                 title="Follow us on Twitter"
                 aria-label="Follow us on Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="social-btn instagram"
                 title="Follow us on Instagram"
                 aria-label="Follow us on Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://pinterest.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="social-btn pinterest"
                 title="Follow us on Pinterest"
                 aria-label="Follow us on Pinterest">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12.013C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;
