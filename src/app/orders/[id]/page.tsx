"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetchOrder(token);
  }, []);

  const fetchOrder = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch order');
      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading order...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div className="order-detail-page">
      <h1>Order #{order.id}</h1>
      <p>Status: {order.status}</p>
      <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
      <h2>Products</h2>
      <ul>
        {order.products?.map((p: any, idx: number) => (
          <li key={idx}>{p.name} x {p.quantity || 1} - KES {p.price}</li>
        ))}
      </ul>
      <p>Total: KES {order.products?.reduce((sum: number, p: any) => sum + (p.price * (p.quantity || 1)), 0)}</p>
    </div>
  );
};

export default OrderDetailPage;
