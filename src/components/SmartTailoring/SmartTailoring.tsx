'use client';

import React from 'react';
import './SmartTailoring.css';

const SmartTailoring: React.FC = () => {
  return (
    <section className="smart-tailoring-section">
      <div className="smart-tailoring-container">
        <div className="smart-tailoring-left">
          <h2 className="smart-tailoring-title">Smart tailoring, made to fit every body.</h2>
          <p className="smart-tailoring-desc">
            You can feel the difference when your clothes are made with intention. Before our skilled tailors craft your piece by hand, our smart sizing algorithm—built on over 10 years of data—ensures a precise fit. It sounds incredible, but we make it undeniable.
          </p>
          <a href="#" className="smart-tailoring-cta">Know More</a>
        </div>
        <div className="smart-tailoring-right">
          <div className="smart-tailoring-video-container">
            <video
              className="smart-tailoring-video"
              src="/videos/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              poster="/images/FeaturedProducts/1.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartTailoring; 