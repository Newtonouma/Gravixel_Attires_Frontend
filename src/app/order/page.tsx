"use client";
import React, { useEffect, useState } from 'react';
import OrderForm from '@/components/OrderForm/OrderForm';
import './order.css';

const OrderPage: React.FC = () => {
  const [orderProduct, setOrderProduct] = useState<any | null>(null);

  useEffect(() => {
    const stored = window.sessionStorage.getItem('orderProduct');
    if (stored) {
      setOrderProduct(JSON.parse(stored));
    }
  }, []);

  if (!orderProduct) {
    return <div className="order-page-error">No product selected for order.</div>;
  }

  return (
    <div className="order-page">
      <h1>Order Product</h1>
      <div className="order-product-details">
        <h2>{orderProduct.name}</h2>
        <p>Size: {orderProduct.size}</p>
        <p>Quantity: {orderProduct.quantity}</p>
        <p>Price: KES {orderProduct.price}</p>
      </div>
      <OrderForm products={[orderProduct]} />
    </div>
  );
};

export default OrderPage;
