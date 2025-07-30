import React from 'react';
import Link from 'next/link';
import { 
  LeafIcon, 
  RecycleIcon, 
  PlantIcon, 
  DropletIcon, 
  ZapIcon, 
  PackageIcon,
  TrophyIcon,
  GlobeIcon,
  SparklesIcon,
  HandshakeIcon,
  TargetIcon,
  WaveIcon,
  RefreshIcon
} from '@/components/Icons';
import './sustainability.css';

const SustainabilityPage: React.FC = () => {
  return (
    <div className="sustainability-page">
      {/* Navigation */}
      <div className="sustainability-nav">
        <div className="sustainability-nav-content">
          <Link href="/about" className="back-link">
            ← Back to About
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="sustainability-hero">
        <div className="sustainability-hero-content">
          <h1 className="sustainability-hero-title">Sustainable Luxury</h1>
          <p className="sustainability-hero-subtitle">
            Crafting the future with ethical practices and environmental responsibility
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="sustainability-intro">
        <div className="sustainability-container">
          <div className="intro-content">
            <h2>Our Commitment to the Planet</h2>
            <p>
              At Gravixel Attires, we believe that true luxury must be sustainable. Our commitment to environmental responsibility and ethical practices is woven into every aspect of our business, from sourcing materials to crafting garments and beyond.
            </p>
            <p>
              We&apos;re not just creating beautiful clothing—we&apos;re pioneering a new standard for sustainable luxury that proves environmental consciousness and exceptional quality can coexist harmoniously.
            </p>
          </div>
        </div>
      </section>

      {/* Practices Grid */}
      <section className="sustainability-practices">
        <div className="sustainability-container">
          <h2 className="practices-title">Our Sustainable Practices</h2>
          <div className="practices-grid">
            
            <div className="practice-card">
              <div className="practice-icon"><LeafIcon size={32} /></div>
              <h3>Ethical Sourcing</h3>
              <p>
                We partner exclusively with mills and suppliers who share our values of fair labor practices, environmental stewardship, and quality craftsmanship. Every material is traceable from source to garment.
              </p>
            </div>

            <div className="practice-card">
              <div className="practice-icon"><RecycleIcon size={32} /></div>
              <h3>Zero Waste Production</h3>
              <p>
                Our innovative cutting techniques and pattern optimization minimize fabric waste. Remaining materials are repurposed into accessories or donated to local fashion schools and artisan programs.
              </p>
            </div>

            <div className="practice-card">
              <div className="practice-icon"><PlantIcon size={32} /></div>
              <h3>Organic & Natural Fibers</h3>
              <p>
                We prioritize organic cotton, linen, wool from ethically-raised sheep, and other natural fibers that are biodegradable and produced without harmful chemicals or pesticides.
              </p>
            </div>

            <div className="practice-card">
              <div className="practice-icon"><DropletIcon size={32} /></div>
              <h3>Water Conservation</h3>
              <p>
                Our production processes use 70% less water than traditional methods. We employ innovative dyeing techniques and water recycling systems to minimize our environmental footprint.
              </p>
            </div>

            <div className="practice-card">
              <div className="practice-icon"><ZapIcon size={32} /></div>
              <h3>Renewable Energy</h3>
              <p>
                Our atelier runs on 100% renewable energy from solar and wind sources. We&apos;ve reduced our carbon footprint by 85% compared to traditional manufacturing facilities.
              </p>
            </div>

            <div className="practice-card">
              <div className="practice-icon"><PackageIcon size={32} /></div>
              <h3>Eco-Friendly Packaging</h3>
              <p>
                All packaging materials are either recyclable, biodegradable, or reusable. Our garment bags are made from organic cotton, and shipping boxes use recycled cardboard with soy-based inks.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="sustainability-impact">
        <div className="sustainability-container">
          <h2 className="impact-title">Our Environmental Impact</h2>
          <div className="impact-stats">
            
            <div className="stat-card">
              <div className="stat-number">85%</div>
              <div className="stat-label">Reduction in Carbon Footprint</div>
              <p>Compared to traditional tailoring operations through renewable energy and efficient processes.</p>
            </div>

            <div className="stat-card">
              <div className="stat-number">70%</div>
              <div className="stat-label">Less Water Usage</div>
              <p>Through innovative dyeing techniques and comprehensive water recycling systems.</p>
            </div>

            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Waste Diversion Rate</div>
              <p>Fabric scraps repurposed, donated, or recycled rather than sent to landfills.</p>
            </div>

            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Traceable Materials</div>
              <p>Complete transparency in our supply chain from raw materials to finished garments.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="sustainability-certifications">
        <div className="sustainability-container">
          <h2 className="certifications-title">Our Certifications</h2>
          <div className="certifications-grid">
            
            <div className="certification-card">
              <div className="cert-badge"><TrophyIcon size={24} /></div>
              <h4>GOTS Certified</h4>
              <p>Global Organic Textile Standard certification for organic fiber processing and environmental responsibility.</p>
            </div>

            <div className="certification-card">
              <div className="cert-badge"><GlobeIcon size={24} /></div>
              <h4>Carbon Neutral</h4>
              <p>Officially certified carbon neutral operations through verified offset programs and renewable energy.</p>
            </div>

            <div className="certification-card">
              <div className="cert-badge"><SparklesIcon size={24} /></div>
              <h4>B Corp Certified</h4>
              <p>Meets the highest standards of verified social and environmental performance, accountability, and transparency.</p>
            </div>

            <div className="certification-card">
              <div className="cert-badge"><HandshakeIcon size={24} /></div>
              <h4>Fair Trade Partner</h4>
              <p>Committed to fair wages, safe working conditions, and sustainable livelihoods for all workers in our supply chain.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="sustainability-goals">
        <div className="sustainability-container">
          <div className="goals-content">
            <h2>Our 2030 Sustainability Goals</h2>
            <div className="goals-list">
              
              <div className="goal-item">
                <span className="goal-icon"><TargetIcon size={24} /></span>
                <div>
                  <h4>Climate Positive Operations</h4>
                  <p>Achieve climate positive status by removing more carbon from the atmosphere than we produce.</p>
                </div>
              </div>

              <div className="goal-item">
                <span className="goal-icon"><WaveIcon size={24} /></span>
                <div>
                  <h4>Water Positive Impact</h4>
                  <p>Restore more water to nature than we use through conservation projects and watershed restoration.</p>
                </div>
              </div>

              <div className="goal-item">
                <span className="goal-icon"><RefreshIcon size={24} /></span>
                <div>
                  <h4>Circular Economy Leadership</h4>
                  <p>Pioneer circular fashion through take-back programs, repair services, and closed-loop material systems.</p>
                </div>
              </div>

              <div className="goal-item">
                <span className="goal-icon"><LeafIcon size={24} /></span>
                <div>
                  <h4>Regenerative Practices</h4>
                  <p>Support regenerative agriculture and manufacturing that improves ecosystem health.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="sustainability-cta">
        <div className="sustainability-container">
          <div className="cta-content">
            <h2>Join Our Sustainable Journey</h2>
            <p>
              When you choose Gravixel Attires, you&apos;re not just investing in exceptional clothing—you&apos;re supporting a more sustainable future for fashion. Together, we can prove that luxury and responsibility go hand in hand.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="cta-primary">Start Your Sustainable Wardrobe</Link>
              <Link href="/about/story" className="cta-secondary">Learn More About Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityPage;
