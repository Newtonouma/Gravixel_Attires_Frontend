'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Hero.css';

interface SlideData {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const slideData: SlideData[] = [
  {
    id: 1,
    image: '/images/1.jpg',
    title: 'Elegant Suits for Every Occasion',
    description: 'Discover our premium collection of handcrafted suits that combine timeless elegance with modern sophistication.',
    ctaText: 'Shop Collection',
    ctaLink: '/collection'
  },
  {
    id: 2,
    image: '/images/2.jpg',
    title: 'Custom Tailored Excellence',
    description: 'Experience the perfect fit with our bespoke tailoring service. Every suit is crafted to your exact measurements.',
    ctaText: 'Book Consultation',
    ctaLink: '/consultation'
  },
  {
    id: 3,
    image: '/images/3.jpg',
    title: 'Wedding & Special Events',
    description: 'Make your special day unforgettable with our exclusive wedding and formal event collections.',
    ctaText: 'View Wedding Collection',
    ctaLink: '/wedding'
  },
  {
    id: 4,
    image: '/images/4.jpg',
    title: 'Professional Business Attire',
    description: 'Command attention in the boardroom with our professional business suits designed for success.',
    ctaText: 'Business Collection',
    ctaLink: '/business'
  }
];

const Hero: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  return (
    <section className="hero-section">
      <Slider {...settings} className="hero-slider">
        {slideData.map((slide) => (
          <div key={slide.id} className="hero-slide">
            <div 
              className="hero-slide-background"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-slide-overlay">
                <div className="hero-content">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-description">{slide.description}</p>
                  <a href={slide.ctaLink} className="hero-cta">
                    {slide.ctaText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero; 