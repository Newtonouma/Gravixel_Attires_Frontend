'use client';

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './OutfitInspiration.css';

const images = [
  '/images/inspirations/1.jpg',
  '/images/inspirations/2.jpg',
  '/images/inspirations/3.jpg',
  '/images/inspirations/4.jpg',
  '/images/inspirations/5.jpg',
];

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const OutfitInspiration: React.FC = () => {
  return (
    <section className="outfit-inspiration-section">
      <h2 className="outfit-inspiration-title">Style Inspirations</h2>
      <p className="outfit-inspiration-desc">
        Be inspired by our community—real customers showcasing their unique style with custom outfits made from Hockerty garments.
      </p>
      <Slider {...sliderSettings} className="outfit-inspiration-slider">
        {images.map((src, idx) => (
          <div key={idx} className="inspiration-image-wrapper">
            <Image src={src} alt={`Inspiration ${idx + 1}`} className="inspiration-image" width={300} height={300} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default OutfitInspiration; 