import React from 'react';
import Link from 'next/link';
import { BookIcon, ScissorsIcon, LeafIcon, UsersIcon } from '@/components/Icons';
import './about.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Gravixel Attires</h1>
          <p className="about-hero-subtitle">
            Where tradition meets innovation in the art of bespoke tailoring
          </p>
        </div>
      </section>

      {/* About Overview */}
      <section className="about-overview">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Vision</h2>
              <p>
                At Gravixel Attires, we believe that exceptional clothing is more than fabric and thread—it's an expression of personality, confidence, and craftsmanship that transcends time. Since our founding, we've been dedicated to creating bespoke garments that honor traditional tailoring while embracing modern innovation.
              </p>
              <p>
                Our commitment to excellence extends beyond the garments we create. We're passionate about sustainable practices, ethical sourcing, and building lasting relationships with our clients. Every piece we craft is a testament to our dedication to quality, attention to detail, and respect for the timeless art of tailoring.
              </p>
            </div>
            <div className="about-image">
              <img src="/images/about-hero.jpg" alt="Gravixel Attires Atelier" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="about-sections">
        <div className="about-container">
          <h2 className="sections-title">Discover More</h2>
          <div className="sections-grid">
            <Link href="/about/story" className="section-card">
              <div className="section-icon"><BookIcon size={32} /></div>
              <h3>Our Story</h3>
              <p>Learn about the Gravixel Attires journey, from our humble beginnings to becoming a leader in bespoke tailoring.</p>
            </Link>
            
            <Link href="/about/craftsmanship" className="section-card">
              <div className="section-icon"><ScissorsIcon size={32} /></div>
              <h3>Craftsmanship</h3>
              <p>Discover the meticulous art and traditional techniques behind every Gravixel Attires garment.</p>
            </Link>
            
            <Link href="/about/sustainability" className="section-card">
              <div className="section-icon"><LeafIcon size={32} /></div>
              <h3>Sustainability</h3>
              <p>Our commitment to ethical fashion practices and environmental responsibility in luxury tailoring.</p>
            </Link>
            
            <Link href="/about/team" className="section-card">
              <div className="section-icon"><UsersIcon size={32} /></div>
              <h3>Our Team</h3>
              <p>Meet the master tailors and artisans who bring your vision to life with skill and passion.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="about-container">
          <div className="cta-content">
            <h2>Ready to Experience Bespoke Excellence?</h2>
            <p>Schedule a consultation with our master tailors and begin your journey to perfectly tailored attire.</p>
            <div className="cta-buttons">
              <Link href="/contact" className="cta-primary">Schedule Consultation</Link>
              <Link href="/collections" className="cta-secondary">View Collections</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
