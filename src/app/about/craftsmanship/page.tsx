import React from 'react';
import Link from 'next/link';
import { 
  ThreadIcon, 
  ScissorsIcon, 
  SearchIcon, 
  TargetIcon, 
  DiamondIcon, 
  TrophyIcon, 
  SparklesIcon 
} from '@/components/Icons';
import './craftsmanship.css';

const CraftsmanshipPage: React.FC = () => {
  return (
    <div className="craftsmanship-page">
      {/* Navigation */}
      <div className="craftsmanship-nav">
        <div className="craftsmanship-nav-content">
          <Link href="/about" className="back-link">
            ← Back to About
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="craftsmanship-hero">
        <div className="craftsmanship-hero-content">
          <h1 className="craftsmanship-hero-title">Our Craftsmanship</h1>
          <p className="craftsmanship-hero-subtitle">
            Where time-honored traditions meet modern precision
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="craftsmanship-intro">
        <div className="craftsmanship-container">
          <div className="intro-content">
            <h2>The Art of Bespoke Tailoring</h2>
            <p>
              At Gravixel Attires, craftsmanship is not just a skill—it&apos;s a passion that has been refined over generations. Our master tailors combine centuries-old techniques with modern innovation to create garments that are not only perfectly fitted but also works of art that stand the test of time.
            </p>
            <p>
              Every piece we create tells a story of dedication, precision, and unwavering attention to detail. From the initial consultation to the final fitting, each step in our process is executed with the utmost care and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="craftsmanship-process">
        <div className="craftsmanship-container">
          <h2 className="process-title">Our Crafting Process</h2>
          <div className="process-grid">
            
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Consultation & Design</h3>
                <p>
                  We begin with an in-depth consultation to understand your style preferences, lifestyle needs, and personal vision. Our design experts work with you to create a unique garment that reflects your personality.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Precision Measurements</h3>
                <p>
                  Using our Smart Tailoring technology combined with traditional measuring techniques, we capture over 30 precise measurements to ensure a perfect fit that complements your unique body shape.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Pattern Creation</h3>
                <p>
                  Our master pattern makers create a unique pattern specifically for you. This blueprint becomes the foundation for your garment, ensuring consistency and perfection in every detail.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Fabric Selection</h3>
                <p>
                  Choose from our extensive collection of premium fabrics sourced from the world&apos;s finest mills. Our experts guide you in selecting materials that perfectly complement your design and intended use.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">05</div>
              <div className="step-content">
                <h3>Hand Cutting</h3>
                <p>
                  Each piece is carefully hand-cut by our skilled craftsmen, ensuring maximum precision and minimal waste. This traditional technique allows for the subtle adjustments that machine cutting cannot achieve.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">06</div>
              <div className="step-content">
                <h3>Basting & First Fitting</h3>
                <p>
                  We create a preliminary version of your garment for the first fitting. This allows us to make any necessary adjustments to achieve the perfect silhouette and comfort level.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">07</div>
              <div className="step-content">
                <h3>Hand Stitching</h3>
                <p>
                  Our master tailors employ traditional hand-stitching techniques for critical areas, ensuring durability and a superior finish that machine stitching simply cannot match.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">08</div>
              <div className="step-content">
                <h3>Final Fitting & Delivery</h3>
                <p>
                  After meticulous crafting, we conduct a final fitting to ensure perfection. Your completed garment is then carefully packaged and delivered, ready to become a treasured part of your wardrobe.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Techniques Section */}
      <section className="craftsmanship-techniques">
        <div className="craftsmanship-container">
          <h2 className="techniques-title">Traditional Techniques</h2>
          <div className="techniques-grid">
            
            <div className="technique-card">
              <div className="technique-icon"><ThreadIcon size={32} /></div>
              <h3>Hand Pad Stitching</h3>
              <p>Creates the perfect lapel roll and collar shape that maintains its form over time.</p>
            </div>

            <div className="technique-card">
              <div className="technique-icon"><ScissorsIcon size={32} /></div>
              <h3>Canvas Construction</h3>
              <p>Full canvas construction ensures the jacket drapes naturally and ages beautifully.</p>
            </div>

            <div className="technique-card">
              <div className="technique-icon"><SearchIcon size={32} /></div>
              <h3>Floating Chest Piece</h3>
              <p>Hand-padded chest pieces that move with your body for superior comfort and fit.</p>
            </div>

            <div className="technique-card">
              <div className="technique-icon"><TargetIcon size={32} /></div>
              <h3>Pick Stitching</h3>
              <p>Subtle hand-stitched details that add both strength and elegance to critical seams.</p>
            </div>

            <div className="technique-card">
              <div className="technique-icon"><ThreadIcon size={32} /></div>
              <h3>Hand-Set Sleeves</h3>
              <p>Perfectly fitted sleeves with natural armhole shaping for unrestricted movement.</p>
            </div>

            <div className="technique-card">
              <div className="technique-icon"><DiamondIcon size={32} /></div>
              <h3>Milanese Buttonholes</h3>
              <p>Hand-sewn buttonholes with silk thread for durability and refined appearance.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="craftsmanship-quality">
        <div className="craftsmanship-container">
          <div className="quality-content">
            <h2>Our Quality Promise</h2>
            <div className="quality-points">
              <div className="quality-point">
                <span className="quality-icon"><SparklesIcon size={24} /></span>
                <div>
                  <h4>Lifetime Craftsmanship Guarantee</h4>
                  <p>We stand behind every stitch with our comprehensive craftsmanship warranty.</p>
                </div>
              </div>
              <div className="quality-point">
                <span className="quality-icon"><TrophyIcon size={24} /></span>
                <div>
                  <h4>Master Tailor Certification</h4>
                  <p>All our tailors are certified masters with decades of experience in bespoke tailoring.</p>
                </div>
              </div>
              <div className="quality-point">
                <span className="quality-icon"><SparklesIcon size={24} /></span>
                <div>
                  <h4>Premium Materials Only</h4>
                  <p>We use only the finest fabrics and materials sourced from renowned mills worldwide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="craftsmanship-cta">
        <div className="craftsmanship-container">
          <div className="cta-content">
            <h2>Experience True Craftsmanship</h2>
            <p>
              Ready to experience the difference that true craftsmanship makes? 
              Schedule a consultation and begin your journey to owning a masterpiece.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="cta-primary">Schedule Consultation</Link>
              <Link href="/about/team" className="cta-secondary">Meet Our Craftsmen</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CraftsmanshipPage;
