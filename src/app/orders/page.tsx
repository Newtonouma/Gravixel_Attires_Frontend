'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Icons } from '@/components/Icons';
import '../auth/auth.css';

const mockUserOrders = [
  {
    id: 'ORD-001',
    items: [
      { name: 'Classic Navy Suit', quantity: 1, price: 35900 }
    ],
    total: 35900,
    status: 'completed',
    date: '2024-12-01',
  },
  {
    id: 'ORD-002',
    items: [
      { name: 'Charcoal Slim Fit', quantity: 1, price: 38900 }
    ],
    total: 38900,
    status: 'processing',
    date: '2024-12-02',
  },
];

export default function OrdersPage() {
  const { user } = useAuth();

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

            {mockUserOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Icons.PackageIcon size={60} color="#ccc" />
                <h3 style={{ color: '#666', marginTop: '20px' }}>No orders yet</h3>
                <p style={{ color: '#999' }}>Start shopping to see your orders here</p>
              </div>
            ) : (
              <div className="orders-list">
                {mockUserOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order {order.id}</h3>
                        <p>{new Date(order.date).toLocaleDateString()}</p>
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
                      {order.items.map((item, index) => (
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
                        <strong>Total: {formatCurrency(order.total)}</strong>
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
