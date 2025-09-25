"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';


const AdminOrderDetailPage: React.FC = () => {
  const params = useParams() || {};
  const id = (params['id'] ?? '').toString();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
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
      setStatus(data.status);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    const token = localStorage.getItem('auth_token');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      // handle error
    }
  };

  if (loading) return <div>Loading order...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div className="admin-order-detail-page">
      <h1>Order #{order.id}</h1>
      <p>Customer: {order.name}</p>
      <p>Email: {order.email}</p>
      <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
      <label>
        Status:
        <select value={status} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>
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

export default AdminOrderDetailPage;
