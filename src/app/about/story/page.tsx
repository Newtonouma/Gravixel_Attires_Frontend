import React from 'react';
import Link from 'next/link';
import './story.css';

const StoryPage: React.FC = () => {
  return (
    <div className="story-page">
      {/* Navigation */}
      <div className="story-nav">
        <div className="story-nav-content">
          <Link href="/about" className="back-link">
            ← Back to About
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="story-hero">
        <div className="story-hero-content">
          <h1 className="story-hero-title">Our Story</h1>
          <p className="story-hero-subtitle">
            A journey of passion, craftsmanship, and timeless elegance
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="story-content">
        <div className="story-container">
          <div className="story-timeline">
            
            <div className="timeline-item">
              <div className="timeline-year">2015</div>
              <div className="timeline-content">
                <h3>The Beginning</h3>
                <p>
                  Gravixel Attires was born from a simple yet powerful vision: to create exceptional bespoke clothing that honors traditional craftsmanship while embracing modern innovation. Founded by master tailor Alexander Gravix, our journey began in a small atelier with a commitment to excellence that would define our future.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">2017</div>
              <div className="timeline-content">
                <h3>Growing Recognition</h3>
                <p>
                  As word spread about our meticulous attention to detail and personalized service, Gravixel Attires quickly gained recognition among discerning clients. We expanded our team, welcoming skilled artisans who shared our passion for creating garments that tell a story.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">2019</div>
              <div className="timeline-content">
                <h3>Innovation Meets Tradition</h3>
                <p>
                  We introduced our revolutionary Smart Tailoring technology, combining AI-powered measurements with traditional hand-crafting techniques. This innovation allowed us to achieve unprecedented precision while maintaining the human touch that makes each garment unique.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <h3>Sustainable Luxury</h3>
                <p>
                  Recognizing our responsibility to the environment, we pioneered sustainable practices in luxury tailoring. From ethically sourced materials to zero-waste production methods, we proved that exceptional quality and environmental consciousness go hand in hand.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>Global Expansion</h3>
                <p>
                  With a growing international clientele, we opened our flagship showroom and established partnerships with premium fabric mills worldwide. Our commitment to excellence earned us recognition as leaders in the bespoke tailoring industry.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">Today</div>
              <div className="timeline-content">
                <h3>Continuing the Legacy</h3>
                <p>
                  Today, Gravixel Attires stands as a testament to the power of combining time-honored traditions with innovative technology. Every garment we create carries forward our founding principles: exceptional quality, personalized service, and unwavering attention to detail.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="story-values">
        <div className="story-container">
          <h2 className="values-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🎯</div>
              <h3>Excellence</h3>
              <p>We pursue perfection in every stitch, every detail, and every client interaction.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>Partnership</h3>
              <p>We build lasting relationships with our clients, understanding their unique style and needs.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>We are committed to ethical practices and environmental responsibility in all we do.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We continuously evolve, integrating new technologies while honoring traditional methods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="story-cta">
        <div className="story-container">
          <div className="cta-content">
            <h2>Be Part of Our Story</h2>
            <p>
              Join the thousands of satisfied clients who have experienced the Gravixel Attires difference. 
              Let us create something extraordinary for you.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="cta-primary">Start Your Journey</Link>
              <Link href="/about/craftsmanship" className="cta-secondary">Discover Our Craft</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoryPage;
