'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { PlusIcon, MinusIcon, TrashIcon, CartIcon } from '@/components/Icons';
import Link from 'next/link';
import Image from 'next/image';
import './cart.css';
import OrderForm from '@/components/OrderForm/OrderForm';

const CartPage: React.FC = () => {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <p className="cart-subtitle">Your cart is currently empty</p>
          </div>

          <div className="empty-cart">
            <div className="empty-cart-icon">
              <CartIcon size={64} color="#e0e0e0" />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet. Discover our collections and find the perfect suit for you.</p>
            <div className="empty-cart-actions">
              <Link href="/products" className="btn-primary">
                Continue Shopping
              </Link>
              <Link href="/collections" className="btn-secondary">
                Browse Collections
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p className="cart-subtitle">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-items-header">
              <span>Product</span>
              <span>Size</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Total</span>
              <span></span>
            </div>

            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="cart-item-product">
                  <div className="cart-item-image">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      width={80}
                      height={100}
                    />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-variant">{item.variant}</p>
                    <p className="cart-item-color">Color: {item.color}</p>
                  </div>
                </div>

                <div className="cart-item-size">
                  <span className="size-badge">{item.size}</span>
                </div>

                <div className="cart-item-quantity">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="quantity-btn"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon size={16} />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="quantity-btn"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon size={16} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-price">
                  <span>KES {item.price.toLocaleString()}</span>
                </div>

                <div className="cart-item-total">
                  <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                </div>

                <div className="cart-item-actions">
                  <button 
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="remove-btn"
                    aria-label="Remove item"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                <span>KES {totalPrice.toLocaleString()}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>KES {totalPrice.toLocaleString()}</span>
              </div>

              <div className="summary-actions">
                <OrderForm products={items} onSuccess={clearCart} />
                <Link href="/products" className="btn-secondary">
                  Continue Shopping
                </Link>
              </div>

              <div className="summary-features">
                <div className="feature">
                  <span className="feature-icon">🚚</span>
                  <span>Free shipping on orders over KES 30,000</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🔒</span>
                  <span>Secure checkout</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">↩️</span>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-actions">
          <button 
            onClick={clearCart}
            className="btn-outline clear-cart-btn"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
