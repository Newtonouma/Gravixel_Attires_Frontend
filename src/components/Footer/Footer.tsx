'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '../Icons/Icons';
import './Footer.css';

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="footer-accordion-section">
      <button 
        className="footer-accordion-header" 
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
      </button>
      <div className={`footer-accordion-content ${isOpen ? 'open' : ''}`}>
        <div className="footer-accordion-body">
          {children}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Desktop Layout */}
        <div className="footer-desktop">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-title">Company</h3>
              <ul className="footer-links">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Services</h3>
              <ul className="footer-links">
                <li><Link href="/collections">Collections</Link></li>
                <li><Link href="/book-consultation">Consultation</Link></li>
                <li><Link href="/products">Products</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Support</h3>
              <ul className="footer-links">
                <li><Link href="/orders">Track Order</Link></li>
                <li><Link href="/contact">Help Center</Link></li>
                <li><Link href="/contact">Size Guide</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Connect</h3>
              <ul className="footer-links">
                <li><a href="mailto:info@gravixel.com">Email</a></li>
                <li><a href="tel:+1234567890">Phone</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Accordion Layout */}
        <div className="footer-mobile">
          <AccordionSection
            title="Company"
            isOpen={openSections.company}
            onToggle={() => toggleSection('company')}
          >
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </AccordionSection>
          
          <AccordionSection
            title="Services"
            isOpen={openSections.services}
            onToggle={() => toggleSection('services')}
          >
            <ul className="footer-links">
              <li><Link href="/collections">Collections</Link></li>
              <li><Link href="/book-consultation">Consultation</Link></li>
              <li><Link href="/products">Products</Link></li>
            </ul>
          </AccordionSection>
          
          <AccordionSection
            title="Support"
            isOpen={openSections.support}
            onToggle={() => toggleSection('support')}
          >
            <ul className="footer-links">
              <li><Link href="/orders">Track Order</Link></li>
              <li><Link href="/contact">Help Center</Link></li>
              <li><Link href="/contact">Size Guide</Link></li>
            </ul>
          </AccordionSection>
          
          <AccordionSection
            title="Connect"
            isOpen={openSections.connect}
            onToggle={() => toggleSection('connect')}
          >
            <ul className="footer-links">
              <li><a href="mailto:info@gravixel.com">Email</a></li>
              <li><a href="tel:+1234567890">Phone</a></li>
            </ul>
          </AccordionSection>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="footer-logo">Gravixel Attires</span>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Gravixel Attires. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;