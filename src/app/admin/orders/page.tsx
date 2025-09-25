"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';

const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiClient.getOrders();
        if (!mounted) return;
        setOrders(data);
      } catch (e: any) {
        console.error('Failed to fetch admin orders:', e);
        if (!mounted) return;
        setError(e.message || 'Failed to fetch orders');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="admin-orders-page">
      <h1>All Orders</h1>
      {loading && <div>Loading orders...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (!orders || orders.length === 0) && <div>No orders found.</div>}
      {!loading && !error && orders && orders.length > 0 && (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>{order.products?.reduce((sum: number, p: any) => sum + (p.price * (p.quantity || 1)), 0)}</td>
                <td><button onClick={() => router.push(`/admin/orders/${order.id}`)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrdersPage;
