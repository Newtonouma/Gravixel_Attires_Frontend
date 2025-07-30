'use client';

import React, { useState } from 'react';
import { SuitIcon, RulerIcon, PaletteIcon, ClockIcon, CloseIcon, CalendarIcon } from '@/components/Icons';
import './book-consultation.css';

interface ConsultationFormData {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  additionalNotes: string;
}

const BookConsultationPage: React.FC = () => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: '',
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showCalendly, setShowCalendly] = useState(false);

  const consultationTypes = [
    { value: '', label: 'Select consultation type' },
    { value: 'bridal-wear', label: 'Bridal Wear' },
    { value: 'formal-wear', label: 'Formal Wear' },
    { value: 'casual-everyday', label: 'Casual/Everyday' },
    { value: 'other', label: 'Other' }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

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
    setSubmitStatus('idle');

    try {
      // Here you would integrate with your backend API
      const response = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          preferredDate: '',
          preferredTime: '',
          consultationType: '',
          additionalNotes: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalendlyBooking = () => {
    setShowCalendly(true);
  };

  // Get tomorrow's date as minimum date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="book-consultation-page">
      <div className="consultation-container">
        {/* Header Section */}
        <div className="consultation-header">
          <h1 className="consultation-title">Book Your Personal Consultation</h1>
          <p className="consultation-subtitle">
            Schedule a one-on-one consultation with our expert tailors to discuss your perfect attire. 
            We'll help bring your vision to life with personalized recommendations and precise measurements.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="consultation-benefits">
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon"><SuitIcon size={32} /></div>
              <h3>Expert Guidance</h3>
              <p>Get personalized advice from our experienced tailors</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><RulerIcon size={32} /></div>
              <h3>Precise Measurements</h3>
              <p>Professional fitting to ensure perfect tailoring</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><PaletteIcon size={32} /></div>
              <h3>Style Consultation</h3>
              <p>Discover styles that complement your personality</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><ClockIcon size={32} /></div>
              <h3>Flexible Scheduling</h3>
              <p>Choose a time that works best for your schedule</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="consultation-content">
          {/* Booking Options */}
          {/* <div className="booking-options">
            <h2>Choose Your Booking Method</h2>
            <div className="booking-methods">
              <div className="booking-method">
                <h3>Quick Schedule</h3>
                <p>Use our integrated calendar to book instantly</p>
                <button 
                  className="calendly-btn"
                  onClick={handleCalendlyBooking}
                >
                  Book with Calendar
                </button>
              </div>
              <div className="booking-divider">
                <span>OR</span>
              </div>
              <div className="booking-method">
                <h3>Request Consultation</h3>
                <p>Fill out the form and we'll confirm your appointment</p>
              </div>
            </div>
          </div> */}

          {/* Calendly Integration */}
          {showCalendly && (
            <div className="calendly-container">
              <div className="calendly-header">
                <h3>Select Your Preferred Time</h3>
                <button 
                  className="close-calendly"
                  onClick={() => setShowCalendly(false)}
                  aria-label="Close calendar"
                >
                  <CloseIcon size={20} />
                </button>
              </div>
              {/* Replace with your actual Calendly embed URL */}
              <div className="calendly-embed">
                <iframe
                  src="https://calendly.com/your-calendly-url"
                  width="100%"
                  height="630"
                  frameBorder="0"
                  title="Book Consultation"
                ></iframe>
                {/* Fallback message for demo */}
                <div className="calendly-placeholder">
                  <p><CalendarIcon size={24} /> Calendly Integration</p>
                  <p>Replace the iframe src with your actual Calendly URL</p>
                  <p>Example: https://calendly.com/gravixel-attires/consultation</p>
                </div>
              </div>
            </div>
          )}

          {/* Consultation Form */}
          <div className="consultation-form-section">
            <form className="consultation-form" onSubmit={handleSubmit}>
              <h2>Consultation Request Form</h2>
              
              {submitStatus === 'success' && (
                <div className="form-message success">
                  <h4>Consultation Request Received!</h4>
                  <p>Thank you for booking with Gravixel Attires. We'll contact you within 24 hours to confirm your appointment details.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="form-message error">
                  <h4>Booking Failed</h4>
                  <p>Sorry, there was an error processing your consultation request. Please try again or contact us directly.</p>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
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
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="+254 700 000 000"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="consultationType">Type of Consultation *</label>
                  <select
                    id="consultationType"
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    {consultationTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="preferredDate">Preferred Date *</label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    min={getTomorrowDate()}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="preferredTime">Preferred Time *</label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select preferred time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="additionalNotes">Additional Notes</label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={4}
                  className="form-textarea"
                  placeholder="Tell us about your specific requirements, event details, style preferences, or any questions you have..."
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Request...' : 'Request Consultation'}
              </button>

              <p className="form-note">
                * Required fields. We'll contact you within 24 hours to confirm your appointment.
              </p>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="consultation-contact">
          <div className="contact-grid">
            <div className="contact-item">
              <h3>Have Questions?</h3>
              <p>Call us directly at <strong>+254 700 000 000</strong></p>
            </div>
            <div className="contact-item">
              <h3>Visit Our Studio</h3>
              <p>123 Fashion Street, Nairobi, Kenya</p>
            </div>
            <div className="contact-item">
              <h3>Business Hours</h3>
              <p>Mon-Fri: 9AM-6PM<br />Sat: 10AM-4PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConsultationPage;
