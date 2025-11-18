import React, { useState } from 'react';
import { apiClient } from '@/lib/api';
import './OrderForm.css';

interface OrderFormProps {
  products: any[];
  onSuccess?: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ products, onSuccess }) => {
  const [form, setForm] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    city: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Use apiClient to place order
      await apiClient.placeOrder({ ...form, products });
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input 
            id="email"
            name="email" 
            type="email" 
            placeholder="your@email.com" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input 
            id="name"
            name="name" 
            type="text" 
            placeholder="Enter your full name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input 
            id="phoneNumber"
            name="phoneNumber" 
            type="tel" 
            placeholder="+254 700 000 000" 
            value={form.phoneNumber} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">Town/City *</label>
          <input 
            id="city"
            name="city" 
            type="text" 
            placeholder="Enter your city" 
            value={form.city} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="address">Delivery Address</label>
          <input 
            id="address"
            name="address" 
            type="text" 
            placeholder="Street address, building, apartment (optional)" 
            value={form.address} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="submit-button">
        {loading ? (
          <>
            <span className="button-spinner"></span>
            Processing Order...
          </>
        ) : (
          <>
            <svg className="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 7L12 12.5L5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 7H19V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20H7C6.46957 20 5.96086 19.7893 5.58579 19.4142C5.21071 19.0391 5 18.5304 5 18V7Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 11V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 11V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16 11V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Place Order
          </>
        )}
      </button>

      {error && (
        <div className="message error-message">
          <svg className="message-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="message success-message">
          <svg className="message-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Order placed successfully! Check your email for confirmation.</span>
        </div>
      )}
    </form>
  );
};

export default OrderForm;
