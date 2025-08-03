'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Icons } from '@/components/Icons';
import { products } from '@/data/products';
import { users } from '@/data/users';
import './admin.css';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      { name: 'Classic Navy Suit', quantity: 1, price: 35900 }
    ],
    total: 35900,
    status: 'completed',
    date: '2024-12-01',
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      { name: 'Charcoal Slim Fit', quantity: 1, price: 38900 },
      { name: 'Ivory Wedding Tux', quantity: 1, price: 49900 }
    ],
    total: 88800,
    status: 'processing',
    date: '2024-12-02',
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    items: [
      { name: 'Classic Black Suit', quantity: 2, price: 34900 }
    ],
    total: 69800,
    status: 'pending',
    date: '2024-12-03',
  },
];

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: typeof mockOrders;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  useEffect(() => {
    // Calculate stats
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
    
    setStats({
      totalProducts: products.length,
      totalUsers: users.length,
      totalOrders: mockOrders.length,
      totalRevenue,
      recentOrders: mockOrders.slice(0, 5),
    });
  }, []);

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
    <ProtectedRoute requireAdmin={true}>
      <div className="admin-dashboard">
        <div className="admin-container">
          {/* Header */}
          <div className="admin-header">
            <div className="admin-header-content">
              <h1>Admin Dashboard</h1>
              <p>Welcome back, {user?.name}</p>
            </div>
            <div className="admin-header-actions">
              <span className="admin-role-badge">Administrator</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="admin-tabs">
            <button
              className={`admin-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Icons.DashboardIcon size={20} />
              Dashboard
            </button>
            <button
              className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Icons.PackageIcon size={20} />
              Products
            </button>
            <button
              className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Icons.CartIcon size={20} />
              Orders
            </button>
            <button
              className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Icons.UsersIcon size={20} />
              Users
            </button>
          </div>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="admin-content">
              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon products">
                    <Icons.PackageIcon size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.totalProducts}</h3>
                    <p>Total Products</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon users">
                    <Icons.UsersIcon size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.totalUsers}</h3>
                    <p>Total Users</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon orders">
                    <Icons.CartIcon size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.totalOrders}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon revenue">
                    <Icons.TrophyIcon size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{formatCurrency(stats.totalRevenue)}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="admin-section">
                <div className="section-header">
                  <h2>Recent Orders</h2>
                  <button 
                    className="view-all-btn"
                    onClick={() => setActiveTab('orders')}
                  >
                    View All
                  </button>
                </div>
                
                <div className="orders-table">
                  <div className="table-header">
                    <div>Order ID</div>
                    <div>Customer</div>
                    <div>Items</div>
                    <div>Total</div>
                    <div>Status</div>
                    <div>Date</div>
                  </div>
                  
                  {stats.recentOrders.map((order) => (
                    <div key={order.id} className="table-row">
                      <div className="order-id">{order.id}</div>
                      <div className="customer-info">
                        <div className="customer-name">{order.customerName}</div>
                        <div className="customer-email">{order.customerEmail}</div>
                      </div>
                      <div className="order-items">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </div>
                      <div className="order-total">{formatCurrency(order.total)}</div>
                      <div className="order-status">
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(order.status) }}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="order-date">{order.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="admin-content">
              <div className="admin-section">
                <div className="section-header">
                  <h2>Products Management</h2>
                  <button className="add-btn">
                    <Icons.PlusIcon size={16} />
                    Add Product
                  </button>
                </div>
                
                <div className="products-grid">
                  {products.slice(0, 12).map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p className="product-price">{formatCurrency(product.price)}</p>
                        <p className="product-category">{product.category} • {product.variant}</p>
                        <div className="product-status">
                          <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                      <div className="product-actions">
                        <button className="edit-btn" title="Edit Product">
                          <Icons.SettingsIcon size={16} />
                        </button>
                        <button className="delete-btn" title="Delete Product">
                          <Icons.TrashIcon size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="admin-content">
              <div className="admin-section">
                <div className="section-header">
                  <h2>Orders Management</h2>
                  <div className="orders-filters">
                    <select className="filter-select" title="Filter orders by status">
                      <option value="all">All Orders</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                <div className="orders-table">
                  <div className="table-header">
                    <div>Order ID</div>
                    <div>Customer</div>
                    <div>Items</div>
                    <div>Total</div>
                    <div>Status</div>
                    <div>Date</div>
                    <div>Actions</div>
                  </div>
                  
                  {mockOrders.map((order) => (
                    <div key={order.id} className="table-row">
                      <div className="order-id">{order.id}</div>
                      <div className="customer-info">
                        <div className="customer-name">{order.customerName}</div>
                        <div className="customer-email">{order.customerEmail}</div>
                      </div>
                      <div className="order-items">
                        <div className="items-summary">
                          {order.items.map((item, index) => (
                            <div key={index} className="item-line">
                              {item.quantity}x {item.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="order-total">{formatCurrency(order.total)}</div>
                      <div className="order-status">
                        <select 
                          className="status-select"
                          defaultValue={order.status}
                          style={{ borderColor: getStatusColor(order.status) }}
                          title="Update order status"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div className="order-date">{order.date}</div>
                      <div className="order-actions">
                        <button className="view-btn" title="View Order Details">
                          <Icons.SearchIcon size={16} />
                        </button>
                        <button className="edit-btn" title="Edit Order">
                          <Icons.SettingsIcon size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="admin-content">
              <div className="admin-section">
                <div className="section-header">
                  <h2>Users Management</h2>
                  <button className="add-btn">
                    <Icons.PlusIcon size={16} />
                    Add User
                  </button>
                </div>
                
                <div className="users-table">
                  <div className="table-header">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Created</div>
                    <div>Actions</div>
                  </div>
                  
                  {users.map((user) => (
                    <div key={user.id} className="table-row">
                      <div className="user-name">
                        <Icons.UserIcon size={20} />
                        {user.name}
                      </div>
                      <div className="user-email">{user.email}</div>
                      <div className="user-role">
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </div>
                      <div className="user-created">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                      <div className="user-actions">
                        <button className="edit-btn" title="Edit User">
                          <Icons.SettingsIcon size={16} />
                        </button>
                        <button className="delete-btn" title="Delete User">
                          <Icons.TrashIcon size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
