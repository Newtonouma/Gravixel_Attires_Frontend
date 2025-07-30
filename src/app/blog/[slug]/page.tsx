'use client';

import React from 'react';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './blog-post.css';

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
    content: `
      <h2>Introduction to Custom Suits</h2>
      <p>A custom suit represents the pinnacle of menswear craftsmanship. Unlike off-the-rack alternatives, a bespoke suit is created specifically for you, taking into account your unique body measurements, style preferences, and lifestyle needs.</p>
      
      <h2>The Benefits of Going Custom</h2>
      <p>When you invest in a custom suit, you're not just buying clothing – you're investing in confidence, comfort, and timeless style. Here are the key advantages:</p>
      
      <h3>Perfect Fit</h3>
      <p>The most obvious benefit is the impeccable fit. Every measurement is taken into account, from shoulder width to trouser length, ensuring the suit complements your body perfectly.</p>
      
      <h3>Quality Materials</h3>
      <p>Custom suits use premium fabrics sourced from renowned mills around the world. You can choose from a wide selection of wools, cottons, and luxury blends.</p>
      
      <h3>Personal Style</h3>
      <p>Express your personality through countless customization options – lapel styles, button choices, lining colors, and more.</p>
      
      <h2>The Custom Suit Process</h2>
      <p>Creating a custom suit is a journey that typically involves several fittings and can take 6-8 weeks to complete. The process includes:</p>
      
      <ol>
        <li><strong>Initial Consultation:</strong> Discuss your needs, style preferences, and lifestyle</li>
        <li><strong>Fabric Selection:</strong> Choose from hundreds of premium fabrics</li>
        <li><strong>Measurements:</strong> Precise measurements are taken by expert tailors</li>
        <li><strong>First Fitting:</strong> Try on the basted suit for initial adjustments</li>
        <li><strong>Final Fitting:</strong> Fine-tune the fit and make final adjustments</li>
        <li><strong>Delivery:</strong> Receive your perfectly tailored suit</li>
      </ol>
      
      <h2>Caring for Your Investment</h2>
      <p>A well-made custom suit can last decades with proper care. Here are essential maintenance tips:</p>
      
      <ul>
        <li>Hang your suit on quality wooden hangers</li>
        <li>Allow the suit to air out between wears</li>
        <li>Professional dry cleaning only when necessary</li>
        <li>Steam rather than iron when possible</li>
        <li>Store in a breathable garment bag</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>A custom suit is more than an article of clothing – it's a statement of personal style and attention to detail. While the initial investment may be higher than ready-to-wear options, the superior fit, quality, and longevity make it a worthwhile investment for any discerning gentleman.</p>
    `,
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
    content: `
      <h2>Spring/Summer 2024 Trends</h2>
      <p>This year's fashion landscape is defined by a beautiful balance between comfort and sophistication, with sustainability taking center stage.</p>
      
      <h3>Color Palette</h3>
      <p>The color story for 2024 is rich and varied:</p>
      <ul>
        <li><strong>Digital Lime:</strong> A vibrant, energizing green</li>
        <li><strong>Peach Fuzz:</strong> Pantone's Color of the Year</li>
        <li><strong>Classic Navy:</strong> Timeless and versatile</li>
        <li><strong>Warm Neutrals:</strong> Beige, cream, and soft browns</li>
      </ul>
      
      <h3>Key Silhouettes</h3>
      <p>This season's silhouettes emphasize both structure and flow:</p>
      <ul>
        <li>Oversized blazers with cinched waists</li>
        <li>Wide-leg trousers and palazzo pants</li>
        <li>Midi and maxi dresses with dramatic sleeves</li>
        <li>Cropped jackets and bolero styles</li>
      </ul>
      
      <h2>Fall/Winter 2024 Preview</h2>
      <p>Looking ahead to the cooler months, we see a return to luxury textures and rich, deep colors.</p>
      
      <h3>Fabric Focus</h3>
      <ul>
        <li>Plush velvet and corduroy</li>
        <li>Sustainable wool alternatives</li>
        <li>Recycled cashmere blends</li>
        <li>Technical fabrics with natural fibers</li>
      </ul>
      
      <h2>Sustainable Fashion Forward</h2>
      <p>2024 marks a significant shift toward sustainable fashion practices, with consumers increasingly conscious of their environmental impact.</p>
      
      <h2>How to Incorporate These Trends</h2>
      <p>Remember, the best fashion trends are those that work with your existing wardrobe and personal style. Start with small additions and build from there.</p>
    `,
    author: 'Sarah Mitchell',
    date: '2024-07-20',
    category: 'Trends',
    tags: ['Fashion Trends', '2024', 'Style'],
    image: '/images/FeaturedProducts/2.jpg',
    readTime: '6 min read'
  }
  // Add more posts as needed
];

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ params }) => {
  const { slug } = use(params);
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <h1>Article Not Found</h1>
        <p>The article you're looking for doesn't exist.</p>
        <Link href="/blog" className="back-to-blog">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 3);

  return (
    <div className="blog-post-page">
      {/* Back Navigation */}
      <div className="blog-nav">
        <Link href="/blog" className="back-link">
          ← Back to Articles
        </Link>
      </div>

      {/* Post Header */}
      <header className="blog-post-header">
        <div className="blog-post-header-content">
          <div className="blog-post-category-tag">{post.category}</div>
          <h1 className="blog-post-main-title">{post.title}</h1>
          <p className="blog-post-main-excerpt">{post.excerpt}</p>
          
          <div className="blog-post-meta-info">
            <div className="blog-post-author-info">
              <span className="author-name">By {post.author}</span>
              <span className="post-date">{formatDate(post.date)}</span>
              <span className="read-time">{post.readTime}</span>
            </div>
            
            <div className="blog-post-share">
              <span>Share:</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="share-btn share-twitter"
                 title="Share on Twitter"
                 aria-label="Share on Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="share-btn share-linkedin"
                 title="Share on LinkedIn"
                 aria-label="Share on LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="share-btn share-facebook"
                 title="Share on Facebook"
                 aria-label="Share on Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="blog-post-featured-image">
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={600}
          className="featured-image"
        />
      </div>

      <div className="blog-post-container">
        {/* Post Content */}
        <article className="blog-post-content">
          <div 
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Tags */}
          <div className="blog-post-tags-section">
            <h4>Tags:</h4>
            <div className="blog-post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="blog-post-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="blog-post-sidebar">
          <div className="sidebar-section">
            <h3>Table of Contents</h3>
            <div className="table-of-contents">
              <a href="#introduction">Introduction</a>
              <a href="#benefits">Benefits</a>
              <a href="#process">The Process</a>
              <a href="#care">Care Tips</a>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Related Articles</h3>
            <div className="related-posts">
              {relatedPosts.map(relatedPost => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="related-post">
                  <div className="related-post-image">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      width={80}
                      height={60}
                    />
                  </div>
                  <div className="related-post-info">
                    <h4>{relatedPost.title}</h4>
                    <span>{formatDate(relatedPost.date)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h3>Stay Updated</h3>
          <p>Get the latest fashion insights and style tips delivered to your inbox.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
