"use client";
import React, { useEffect, useState } from 'react';
import OrderForm from '@/components/OrderForm/OrderForm';
import Link from 'next/link';
import './order.css';

const OrderPage: React.FC = () => {
  const [orderProduct, setOrderProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = window.sessionStorage.getItem('orderProduct');
    if (stored) {
      setOrderProduct(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="order-page-loading">
        <div className="loading-spinner"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!orderProduct) {
    return (
      <div className="order-page-error">
        <div className="error-content">
          <div className="error-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7L12 3L4 7V17L12 21L20 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>No Product Selected</h2>
          <p>It looks like you haven't selected a product to order yet.</p>
          <Link href="/products" className="back-to-products">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = orderProduct.price * orderProduct.quantity;

  return (
    <div className="order-page">
      <div className="order-container">
        <div className="order-header">
          <h1>Complete Your Order</h1>
          <p>Please provide your details to complete the purchase</p>
        </div>

        <div className="order-content">
          <div className="order-summary">
            <div className="summary-header">
              <h2>Order Summary</h2>
            </div>
            
            <div className="product-card">
              <div className="product-image">
                {orderProduct.imageUrl ? (
                  <img src={orderProduct.imageUrl} alt={orderProduct.name} />
                ) : (
                  <div className="image-placeholder">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="product-details">
                <h3>{orderProduct.name}</h3>
                <div className="product-specs">
                  <div className="spec-item">
                    <span className="spec-label">Size:</span>
                    <span className="spec-value">{orderProduct.size}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Color:</span>
                    <span className="spec-value">{orderProduct.color || 'Default'}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Quantity:</span>
                    <span className="spec-value">{orderProduct.quantity}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Unit Price:</span>
                    <span className="spec-value">KES {orderProduct.price?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal ({orderProduct.quantity} item{orderProduct.quantity > 1 ? 's' : ''})</span>
                <span>KES {totalPrice?.toLocaleString()}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span className="shipping-note">Calculated at checkout</span>
              </div>
              <div className="price-row total-row">
                <span>Total</span>
                <span>KES {totalPrice?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="order-form-section">
            <div className="form-header">
              <h2>Delivery Information</h2>
              <p>Enter your details for order processing and delivery</p>
            </div>
            <OrderForm products={[orderProduct]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
