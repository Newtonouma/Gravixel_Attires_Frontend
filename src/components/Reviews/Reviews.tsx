'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Reviews.css';

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
  location: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Michael Thompson",
    rating: 5,
    review: "Absolutely incredible quality! The fit is perfect and the attention to detail is outstanding. I've never had a suit that fits this well off the rack.",
    location: "New York, NY",
    date: "2024-12-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 5,
    review: "The smart tailoring technology is amazing. My dress fits like it was made specifically for me, which it was! The fabric quality is exceptional.",
    location: "Los Angeles, CA",
    date: "2024-12-10"
  },
  {
    id: 3,
    name: "David Chen",
    rating: 5,
    review: "I was skeptical about ordering custom clothing online, but Gravixel exceeded all my expectations. The craftsmanship is top-notch.",
    location: "Chicago, IL",
    date: "2024-12-08"
  },
  {
    id: 4,
    name: "Emma Williams",
    rating: 4,
    review: "Beautiful designs and excellent customer service. The delivery was fast and the packaging was luxurious. Highly recommended!",
    location: "Miami, FL",
    date: "2024-12-05"
  },
  {
    id: 5,
    name: "James Rodriguez",
    rating: 5,
    review: "The best investment I've made in my wardrobe. The quality speaks for itself and I get compliments every time I wear their pieces.",
    location: "Houston, TX",
    date: "2024-12-01"
  }
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
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

const Reviews: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="reviews-section">
      <h2 className="reviews-title">What Our Customers Say</h2>
      <p className="reviews-desc">
        Don&apos;t just take our word for it. Hear from our satisfied customers who have experienced the Gravixel difference.
      </p>
      <Slider {...sliderSettings} className="reviews-slider">
        {reviews.map((review) => (
          <div key={review.id} className="review-card-wrapper">
            <div className="review-card">
              <div className="review-stars">
                {renderStars(review.rating)}
              </div>
              <p className="review-text">&ldquo;{review.review}&rdquo;</p>
              <div className="review-author">
                <div className="author-info">
                  <h4 className="author-name">{review.name}</h4>
                  <p className="author-location">{review.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Reviews;
