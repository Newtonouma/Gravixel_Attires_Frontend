import React from 'react';
import Link from 'next/link';
import './team.css';

const TeamPage: React.FC = () => {
  return (
    <div className="team-page">
      {/* Navigation */}
      <div className="team-nav">
        <div className="team-nav-content">
          <Link href="/about" className="back-link">
            ← Back to About
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="team-hero">
        <div className="team-hero-content">
          <h1 className="team-hero-title">Meet Our Team</h1>
          <p className="team-hero-subtitle">
            The master craftsmen and visionaries behind Gravixel Attires
          </p>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="team-intro">
        <div className="team-container">
          <div className="intro-content">
            <h2>Craftsmanship Runs in Our DNA</h2>
            <p>
              Our team brings together decades of experience, passion, and expertise in the art of bespoke tailoring. Each member of our family contributes their unique skills and dedication to create garments that exceed expectations and stand the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="team-leadership">
        <div className="team-container">
          <h2 className="section-title">Leadership Team</h2>
          <div className="team-grid">
            
            <div className="team-member">
              <div className="member-image">
                <img src="/images/team/alexander-gravix.jpg" alt="Alexander Gravix, Founder & Master Tailor" />
              </div>
              <div className="member-info">
                <h3>Alexander Gravix</h3>
                <p className="member-role">Founder & Master Tailor</p>
                <p className="member-bio">
                  With over 25 years of experience in bespoke tailoring, Alexander founded Gravixel Attires with a vision to blend traditional craftsmanship with modern innovation. Trained on Savile Row, he brings unparalleled expertise to every garment.
                </p>
                <div className="member-credentials">
                  <span>Master Tailor Certification</span>
                  <span>Savile Row Trained</span>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="/images/team/sophia-chen.jpg" alt="Sophia Chen, Head of Design" />
              </div>
              <div className="member-info">
                <h3>Sophia Chen</h3>
                <p className="member-role">Head of Design</p>
                <p className="member-bio">
                  Sophia brings a fresh perspective to classic tailoring with her background in fashion design from Parsons. She specializes in creating contemporary silhouettes that honor traditional techniques while embracing modern aesthetics.
                </p>
                <div className="member-credentials">
                  <span>Parsons Graduate</span>
                  <span>15+ Years Experience</span>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="/images/team/marco-rosetti.jpg" alt="Marco Rosetti, Master Pattern Maker" />
              </div>
              <div className="member-info">
                <h3>Marco Rosetti</h3>
                <p className="member-role">Master Pattern Maker</p>
                <p className="member-bio">
                  Originally from Milan, Marco is renowned for his precision in pattern making. His expertise ensures every garment achieves the perfect fit, combining Italian tailoring traditions with innovative measurement techniques.
                </p>
                <div className="member-credentials">
                  <span>Milan Trained</span>
                  <span>Pattern Making Expert</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Master Craftsmen */}
      <section className="team-craftsmen">
        <div className="team-container">
          <h2 className="section-title">Master Craftsmen</h2>
          <div className="craftsmen-grid">
            
            <div className="craftsman-card">
              <div className="craftsman-image">
                <img src="/images/team/elena-williams.jpg" alt="Elena Williams, Senior Tailor" />
              </div>
              <div className="craftsman-info">
                <h4>Elena Williams</h4>
                <p className="craftsman-role">Senior Tailor</p>
                <p className="craftsman-specialty">Specializes in women&apos;s bespoke suits and evening wear</p>
                <span className="experience">18 years experience</span>
              </div>
            </div>

            <div className="craftsman-card">
              <div className="craftsman-image">
                <img src="/images/team/james-thompson.jpg" alt="James Thompson, Master Tailor" />
              </div>
              <div className="craftsman-info">
                <h4>James Thompson</h4>
                <p className="craftsman-role">Master Tailor</p>
                <p className="craftsman-specialty">Expert in formal menswear and tuxedos</p>
                <span className="experience">22 years experience</span>
              </div>
            </div>

            <div className="craftsman-card">
              <div className="craftsman-image">
                <img src="/images/team/maria-santos.jpg" alt="Maria Santos, Alterations Specialist" />
              </div>
              <div className="craftsman-info">
                <h4>Maria Santos</h4>
                <p className="craftsman-role">Alterations Specialist</p>
                <p className="craftsman-specialty">Precision alterations and garment refinement</p>
                <span className="experience">16 years experience</span>
              </div>
            </div>

            <div className="craftsman-card">
              <div className="craftsman-image">
                <img src="/images/team/david-kim.jpg" alt="David Kim, Quality Control Manager" />
              </div>
              <div className="craftsman-info">
                <h4>David Kim</h4>
                <p className="craftsman-role">Quality Control Manager</p>
                <p className="craftsman-specialty">Ensures every garment meets our exacting standards</p>
                <span className="experience">14 years experience</span>
              </div>
            </div>

            <div className="craftsman-card">
              <div className="craftsman-image">
                <img src="/images/team/anna-mueller.jpg" alt="Anna Mueller, Sustainability Coordinator" />
              </div>
              <div className="craftsman-info">
                <h4>Anna Mueller</h4>
                <p className="craftsman-role">Sustainability Coordinator</p>
                <p className="craftsman-specialty">Oversees ethical sourcing and environmental initiatives</p>
                <span className="experience">8 years experience</span>
              </div>
            </div>

            <div className="craftsman-card">
              <div className="craftsman-image">
                <img src="/images/team/robert-clark.jpg" alt="Robert Clark, Client Relations Manager" />
              </div>
              <div className="craftsman-info">
                <h4>Robert Clark</h4>
                <p className="craftsman-role">Client Relations Manager</p>
                <p className="craftsman-specialty">Dedicated to exceptional client experiences</p>
                <span className="experience">12 years experience</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="team-values">
        <div className="team-container">
          <h2 className="values-title">What Drives Our Team</h2>
          <div className="values-grid">
            
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Pursuit of Excellence</h3>
              <p>Every team member is committed to achieving perfection in their craft, continuously learning and refining their skills to deliver exceptional results.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Collaborative Spirit</h3>
              <p>We work together as a unified team, sharing knowledge and supporting each other to create garments that reflect our collective expertise.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation & Tradition</h3>
              <p>We honor time-tested techniques while embracing new technologies and methods that enhance our ability to serve our clients better.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Passion for Craft</h3>
              <p>Our love for the art of tailoring drives us to go beyond expectations, creating not just clothing, but wearable works of art.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="team-careers">
        <div className="team-container">
          <div className="careers-content">
            <h2>Join Our Family</h2>
            <p>
              Are you passionate about craftsmanship and excellence? We&apos;re always looking for talented individuals who share our commitment to creating exceptional bespoke garments.
            </p>
            <div className="careers-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">🎓</span>
                <span>Continuous Learning Opportunities</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🏆</span>
                <span>Master Craftsman Development Programs</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🌱</span>
                <span>Sustainable Work Environment</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💼</span>
                <span>Competitive Benefits Package</span>
              </div>
            </div>
            <Link href="/contact" className="careers-cta">View Open Positions</Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="team-cta">
        <div className="team-container">
          <div className="cta-content">
            <h2>Experience Our Team&apos;s Expertise</h2>
            <p>
              Ready to work with our master craftsmen? Schedule a consultation and discover how our team&apos;s combined expertise can create the perfect garment for you.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="cta-primary">Schedule Consultation</Link>
              <Link href="/about/craftsmanship" className="cta-secondary">Learn About Our Process</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
