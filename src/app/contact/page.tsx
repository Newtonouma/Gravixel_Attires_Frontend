'use client';

import React, { useState } from 'react';
import './contact.css';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-section">
              <h2>Contact Information</h2>
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div className="info-details">
                    <h3>Address</h3>
                    <p>123 Fashion Street<br />Nairobi, Kenya</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">📞</div>
                  <div className="info-details">
                    <h3>Phone</h3>
                    <p>+254 700 000 000</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">✉️</div>
                  <div className="info-details">
                    <h3>Email</h3>
                    <p>info@gravixelattires.com</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">🕒</div>
                  <div className="info-details">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br />
                       Saturday: 10:00 AM - 4:00 PM<br />
                       Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="services-section">
              <h2>Our Services</h2>
              <ul className="services-list">
                <li>Custom Suit Tailoring</li>
                <li>Formal Wear Design</li>
                <li>Alterations & Repairs</li>
                <li>Wedding Attire</li>
                <li>Corporate Uniforms</li>
                <li>Personal Styling</li>
              </ul>
            </div>
          </div>

          <div className="contact-form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="form-message success">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="form-message error">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="custom-order">Custom Order</option>
                    <option value="alterations">Alterations</option>
                    <option value="appointment">Book Appointment</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="form-textarea"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
