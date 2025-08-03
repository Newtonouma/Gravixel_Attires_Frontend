'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Icons } from '@/components/Icons';
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
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };

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
            <Icons.SearchIcon size={20} />
          </button>
          
          <Link href="/cart" className="nav-cart-btn" aria-label="Shopping cart">
            <Icons.CartIcon size={20} />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>

          {/* Authentication Controls */}
          {isAuthenticated ? (
            <div className="nav-user-menu">
              <button 
                className="nav-user-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User menu"
              >
                <Icons.UserIcon size={20} />
                <span className="user-name">{user?.name}</span>
                <Icons.MenuIcon size={12} className={`user-menu-arrow ${isUserMenuOpen ? 'active' : ''}`} />
              </button>
              
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <Icons.UserIcon size={16} />
                    <div>
                      <div className="user-dropdown-name">{user?.name}</div>
                      <div className="user-dropdown-email">{user?.email}</div>
                      <div className="user-dropdown-role">{user?.role}</div>
                    </div>
                  </div>
                  
                  <div className="user-dropdown-divider"></div>
                  
                  {user?.role === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="user-dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Icons.DashboardIcon size={16} />
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <Link 
                    href="/profile" 
                    className="user-dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icons.UserIcon size={16} />
                    Profile
                  </Link>
                  
                  <Link 
                    href="/orders" 
                    className="user-dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icons.PackageIcon size={16} />
                    My Orders
                  </Link>
                  
                  <Link 
                    href="/settings" 
                    className="user-dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icons.SettingsIcon size={16} />
                    Settings
                  </Link>
                  
                  <div className="user-dropdown-divider"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="user-dropdown-item logout"
                  >
                    <Icons.LogoutIcon size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-auth-buttons">
              <Link href="/auth/login" className="nav-auth-btn login">
                <Icons.LoginIcon size={16} />
                Login
              </Link>
              <Link href="/auth/register" className="nav-auth-btn register">
                <Icons.UserIcon size={16} />
                Sign Up
              </Link>
            </div>
          )}
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
          {/* User Info (if authenticated) */}
          {isAuthenticated && (
            <div className="mobile-user-info">
              <Icons.UserIcon size={20} />
              <div className="mobile-user-details">
                <div className="mobile-user-name">{user?.name}</div>
                <div className="mobile-user-email">{user?.email}</div>
                <div className="mobile-user-role">{user?.role}</div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
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

          {/* Cart Link */}
          <div className="mobile-nav-item">
            <Link 
              href="/cart" 
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <Icons.CartIcon size={20} />
              Cart {totalItems > 0 && `(${totalItems})`}
            </Link>
          </div>

          {/* Authentication Controls */}
          {isAuthenticated ? (
            <>
              <div className="mobile-nav-divider"></div>
              
              {user?.role === 'admin' && (
                <div className="mobile-nav-item">
                  <Link 
                    href="/admin" 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icons.DashboardIcon size={20} />
                    Admin Dashboard
                  </Link>
                </div>
              )}
              
              <div className="mobile-nav-item">
                <Link 
                  href="/profile" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icons.UserIcon size={20} />
                  Profile
                </Link>
              </div>
              
              <div className="mobile-nav-item">
                <Link 
                  href="/orders" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icons.PackageIcon size={20} />
                  My Orders
                </Link>
              </div>
              
              <div className="mobile-nav-item">
                <Link 
                  href="/settings" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icons.SettingsIcon size={20} />
                  Settings
                </Link>
              </div>
              
              <div className="mobile-nav-item">
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mobile-nav-link logout"
                >
                  <Icons.LogoutIcon size={20} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mobile-nav-divider"></div>
              <div className="mobile-nav-item">
                <Link 
                  href="/auth/login" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icons.LoginIcon size={20} />
                  Login
                </Link>
              </div>
              <div className="mobile-nav-item">
                <Link 
                  href="/auth/register" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icons.UserIcon size={20} />
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />}
    </nav>
  );
};

export default Navigation;
