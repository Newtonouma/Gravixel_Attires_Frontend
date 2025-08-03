'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import './Navigation.css';

interface DropdownItem {
  title: string;
  href: string;
  description?: string;
}

interface NavItem {
  title: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const Navigation: React.FC = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('nav-menu-open');
    } else {
      document.body.classList.remove('nav-menu-open');
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('nav-menu-open');
    };
  }, [isMenuOpen]);

  const navigationItems: NavItem[] = [
    {
      title: "Shop",
      href: "/products"
    },
    {
      title: "Collections",
      dropdown: [
        { title: "View All Collections", href: "/collections", description: "Browse our complete collection range" },
        { title: "Wedding & Special Occasions", href: "/collections/wedding-special", description: "Perfect attire for memorable moments" },
        { title: "Business & Professional", href: "/collections/business-professional", description: "Command attention in the boardroom" },
        { title: "Three Piece Collection", href: "/collections/three-piece-collection", description: "Complete sophistication with matching pieces" },
        { title: "Slim Fit Collection", href: "/collections/slim-fit-collection", description: "Modern, tailored silhouettes" },
        { title: "Premium Collection", href: "/collections/premium-collection", description: "Our finest craftsmanship and materials" },
        { title: "Bestsellers", href: "/collections/bestsellers", description: "Our most popular suits loved by customers" }
      ]
    },
    {
      title: "Services",
      dropdown: [
        { title: "Book Consultation", href: "/book-consultation", description: "Schedule your personal fitting" },
        { title: "Smart Tailoring", href: "/services/smart-tailoring", description: "AI-powered perfect fit" },
        { title: "Personal Styling", href: "/services/styling", description: "Expert wardrobe consultation" },
        { title: "Alterations", href: "/services/alterations", description: "Professional garment adjustments" },
        { title: "Corporate Packages", href: "/services/corporate", description: "Bulk orders for businesses" },
        { title: "Virtual Consultation", href: "/services/virtual", description: "Online styling sessions" }
      ]
    },
    {
      title: "About",
      dropdown: [
        { title: "Our Story", href: "/about/story", description: "The Gravixel Attires journey" },
        { title: "Craftsmanship", href: "/about/craftsmanship", description: "Art of bespoke tailoring" },
        { title: "Sustainability", href: "/about/sustainability", description: "Ethical fashion practices" },
        { title: "Team", href: "/about/team", description: "Meet our master tailors" }
      ]
    },
    {
      title: "Blog",
      href: "/blog"
    },
    {
      title: "Contact",
      href: "/contact"
    }
  ];

  const handleMouseEnter = (itemTitle: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(itemTitle);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="modern-navigation">
      <div className="nav-container">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <span className="logo-text">Gravixel</span>
          <span className="logo-subtitle">Attires</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu-desktop">
          {navigationItems.map((item) => (
            <div
              key={item.title}
              className="nav-item"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
            >
              {item.href ? (
                <Link href={item.href} className="nav-link">
                  {item.title}
                </Link>
              ) : (
                <button className="nav-link nav-dropdown-trigger">
                  {item.title}
                  <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                  </svg>
                </button>
              )}

              {/* Dropdown Menu */}
              {item.dropdown && activeDropdown === item.title && (
                <div 
                  className="nav-dropdown"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="dropdown-content">
                    <div className="dropdown-grid">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="dropdown-item"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <h4 className="dropdown-item-title">{dropdownItem.title}</h4>
                          {dropdownItem.description && (
                            <p className="dropdown-item-description">{dropdownItem.description}</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side actions */}
        <div className="nav-actions">
          <button className="nav-search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Link href="/cart" className="nav-cart-btn" aria-label="Shopping cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-content">
          {navigationItems.map((item) => (
            <div key={item.title} className="mobile-nav-item">
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ) : (
                <>
                  <button 
                    className="mobile-nav-link mobile-dropdown-trigger"
                    onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                  >
                    {item.title}
                    <svg className={`mobile-dropdown-arrow ${activeDropdown === item.title ? 'active' : ''}`} width="12" height="12" viewBox="0 0 24 24">
                      <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                    </svg>
                  </button>
                  {item.dropdown && activeDropdown === item.title && (
                    <div className="mobile-dropdown">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="mobile-dropdown-item"
                          onClick={() => {
                            setActiveDropdown(null);
                            setIsMenuOpen(false);
                          }}
                        >
                          <span className="mobile-dropdown-title">{dropdownItem.title}</span>
                          {dropdownItem.description && (
                            <span className="mobile-dropdown-description">{dropdownItem.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />}
    </nav>
  );
};

export default Navigation;
