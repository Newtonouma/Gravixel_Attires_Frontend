'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Icons } from '@/components/Icons';
import { apiClient } from '@/lib/api';
import '../auth/auth.css';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'processing': return '#f59e0b';
      case 'pending': return '#ef4444';
      default: return '#6b7280';
    }
  };

  useEffect(() => {
    let mounted = true;
    const fetchOrders = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const allOrders = await apiClient.getOrders();
        // Backend returns orders with userId set to the user UUID. Filter by user.id.
        const userOrders = (allOrders || []).filter((o: any) => {
          // support both userId as string and nested user object
          if (!o) return false;
          if (o.userId) return String(o.userId) === String(user.id) || String(o.userId) === user.email;
          if (o.user && o.user.id) return String(o.user.id) === String(user.id) || String(o.user.id) === user.email;
          // fallback: match by email
          return String(o.email) === String(user.email);
        });
        if (mounted) setOrders(userOrders);
      } catch (e: any) {
        console.error('Failed to fetch orders:', e);
        if (mounted) setError(e.message || 'Failed to fetch orders');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchOrders();
    return () => { mounted = false; };
  }, [user]);

  return (
    <ProtectedRoute>
      <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          <div className="auth-card" style={{ maxWidth: 'none', marginBottom: '30px' }}>
            <div className="auth-header">
              <Icons.PackageIcon />
              <h1>My Orders</h1>
              <p>Track and manage your orders</p>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Icons.PackageIcon size={60} color="#ccc" />
                <h3 style={{ color: '#666', marginTop: '20px' }}>Loading your orders...</h3>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Icons.PackageIcon size={60} color="#ccc" />
                <h3 style={{ color: '#666', marginTop: '20px' }}>Could not load orders</h3>
                <p style={{ color: '#999' }}>{error}</p>
              </div>
            ) : !orders || orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Icons.PackageIcon size={60} color="#ccc" />
                <h3 style={{ color: '#666', marginTop: '20px' }}>No orders yet</h3>
                <p style={{ color: '#999' }}>Start shopping to see your orders here</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order {order.id}</h3>
                        <p>{new Date(order.createdAt || order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="order-status">
                        <span 
                          className="status-badge"
                          style={{ 
                            backgroundColor: getStatusColor(order.status),
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'capitalize'
                          }}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-items">
                      {((order.products || order.items) as any[]).map((item, index) => (
                        <div key={index} className="order-item">
                          <div className="item-details">
                            <span className="item-name">{item.name}</span>
                            <span className="item-quantity">Qty: {item.quantity}</span>
                          </div>
                          <div className="item-price">
                            {formatCurrency(item.price)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-footer">
                      <div className="order-total">
                        <strong>Total: {formatCurrency(order.total || order.subtotal || order.products.reduce((s:any,p:any)=>s + (p.price * (p.quantity||1)),0))}</strong>
                      </div>
                      <div className="order-actions">
                        <button className="order-action-btn">
                          <Icons.SearchIcon size={16} />
                          View Details
                        </button>
                        {order.status === 'processing' && (
                          <button className="order-action-btn">
                            <Icons.RefreshIcon size={16} />
                            Track Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
