'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Icons } from '@/components/Icons';
import { ProductForm } from '@/components/ProductForm';
import Toast, { ToastType } from '@/components/Toast';
import { useProducts } from '@/hooks/useProducts';
import { Product, CreateProductDto, UpdateProductDto } from '@/types/product';
import { products as mockProducts } from '@/data/products';
import { users } from '@/data/users';
import { apiClient } from '@/lib/api';
import { generateCsv, downloadCsv } from '@/lib/csv';
import './admin.css';

// Orders will be fetched from the backend API
const mockOrders: any[] = [];

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
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });
  
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  const [ordersFromBackend, setOrdersFromBackend] = useState<any[] | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderActionLoading, setOrderActionLoading] = useState(false);
  const [ordersFilter, setOrdersFilter] = useState<string>('all');
  const [usersFromBackend, setUsersFromBackend] = useState<any[] | null>(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [userFilter, setUserFilter] = useState<string>('all');

  // Use the products hook for backend integration
  const { 
    products: backendProducts, 
    loading: productsLoading, 
    error: productsError,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts
  } = useProducts();

  // For demo purposes, show backend products if available, otherwise use mock data
  const displayProducts = (backendProducts && backendProducts.length > 0) ? backendProducts : mockProducts;

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showProductForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showProductForm]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showProductForm) {
        handleCloseProductForm();
      }
    };

    if (showProductForm) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showProductForm]);

  useEffect(() => {
    // Calculate basic product/user stats
    if (!displayProducts || !Array.isArray(displayProducts)) return;

    setStats(prev => ({
      ...prev,
      totalProducts: displayProducts.length,
      totalUsers: users.length,
    }));
  }, [displayProducts]);

  // Fetch orders for admin dashboard
  useEffect(() => {
    let mounted = true;
    const loadOrders = async () => {
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const data = await apiClient.getOrders();
        if (!mounted) return;
        setOrdersFromBackend(data || []);
        // compute stats
        const totalOrders = (data || []).length;
        const totalRevenue = (data || []).reduce((sum: number, o: any) => {
          const orderTotal = o.products?.reduce((s: number, p: any) => s + (p.price * (p.quantity || 1)), 0) || 0;
          return sum + orderTotal;
        }, 0);
        setStats(prev => ({
          ...prev,
          totalOrders,
          totalRevenue,
          recentOrders: (data || []).slice(0, 5),
        }));
      } catch (e: any) {
        console.error('Failed to load orders for admin dashboard:', e);
        if (!mounted) return;
        setOrdersError(e.message || 'Failed to load orders');
        setOrdersFromBackend([]);
      } finally {
        if (mounted) setOrdersLoading(false);
      }
    };
    loadOrders();
    // also load users for Users tab
    const loadUsers = async () => {
      setUsersLoading(true);
      try {
        const data = await apiClient.getUsers();
        if (!mounted) return;
        setUsersFromBackend(data || []);
      } catch (e: any) {
        console.error('Failed to load users:', e);
        if (!mounted) return;
        setUsersError(e.message || 'Failed to load users');
      } finally {
        if (mounted) setUsersLoading(false);
      }
    };
    loadUsers();
    return () => { mounted = false; };
  }, []);

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  // CSV export helpers — exclude sensitive fields like passwords, tokens
  const exportOrdersCsv = () => {
    const rows = (ordersFromBackend || []).filter(o => ordersFilter === 'all' ? true : o.status === ordersFilter);
    const headers = [
      { key: 'id', label: 'Order ID' },
      { key: 'name', label: 'Customer Name' },
      { key: 'email', label: 'Customer Email' },
      { key: 'phoneNumber', label: 'Phone' },
      { key: 'status', label: 'Status' },
      { key: 'createdAt', label: 'Created At' },
      { key: 'total', label: 'Total' },
    ];
    const csv = generateCsv(rows, headers, (o) => ({
      id: o.id,
      name: o.name || o.customerName || '',
      email: o.email || o.customerEmail || '',
      phoneNumber: o.phoneNumber || '',
      status: o.status,
      createdAt: o.createdAt || o.date,
      total: (o.products || o.items || []).reduce((s: number, p: any) => s + (p.price * (p.quantity || 1)), 0),
    }));
    downloadCsv(`orders-${Date.now()}.csv`, csv);
  };

  const exportUsersCsv = () => {
    const rows = (usersFromBackend || []).filter(u => userFilter === 'all' ? true : String(u.role) === userFilter);
    const headers = [
      { key: 'id', label: 'User ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'createdAt', label: 'Created At' },
    ];
    const csv = generateCsv(rows, headers, (u) => ({
      id: u.id,
      name: u.firstName ? `${u.firstName} ${u.lastName || ''}` : (u.name || ''),
      email: u.email,
      role: String(u.role),
      createdAt: u.createdAt,
    }));
    downloadCsv(`users-${Date.now()}.csv`, csv);
  };

  const exportProductsCsv = () => {
    const rows = (backendProducts || []).slice();
    const headers = [
      { key: 'id', label: 'Product ID' },
      { key: 'name', label: 'Name' },
      { key: 'price', label: 'Price' },
      { key: 'category', label: 'Category' },
      { key: 'inStock', label: 'In Stock' },
    ];
    const csv = generateCsv(rows, headers, (p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      inStock: p.inStock,
    }));
    downloadCsv(`products-${Date.now()}.csv`, csv);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'processing': return '#f59e0b';
      case 'pending': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // Toast functions
  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  // Product management functions
  const handleCreateProduct = async (productData: CreateProductDto, imageFiles?: File[], imagesToDelete?: string[]) => {
    setIsFormLoading(true);
    try {
      console.log('Creating product with data:', productData);
      console.log('Image files:', imageFiles);
      console.log('Current user:', user);
      console.log('User role:', user?.role);
      console.log('User role type:', typeof user?.role);
      await createProduct(productData, imageFiles, imagesToDelete);
      setShowProductForm(false);
      showToast('Product created successfully!', 'success');
      console.log('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create product';
      showToast(`Error: ${errorMessage}`, 'error');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleUpdateProduct = async (productData: UpdateProductDto, imageFiles?: File[], imagesToDelete?: string[]) => {
    if (!editingProduct?.id) return;
    
    setIsFormLoading(true);
    try {
      await updateProduct(editingProduct.id, productData, imageFiles, imagesToDelete);
      setEditingProduct(null);
      setShowProductForm(false);
      showToast('Product updated successfully!', 'success');
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update product';
      showToast(`Error: ${errorMessage}`, 'error');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        // Show success message
        console.log('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        // Show error message
      }
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleCloseProductForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = async (productData: CreateProductDto | UpdateProductDto, imageFiles?: File[], imagesToDelete?: string[]) => {
    if (editingProduct) {
      await handleUpdateProduct(productData as UpdateProductDto, imageFiles, imagesToDelete);
    } else {
      await handleCreateProduct(productData as CreateProductDto, imageFiles, imagesToDelete);
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
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button 
                      className="view-all-btn"
                      onClick={() => setActiveTab('orders')}
                    >
                      View All
                    </button>
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
                  </div>
                  
                  {stats.recentOrders.map((order) => {
                    const items = order.items || order.products || [];
                    const customerName = order.customerName || order.name || 'Customer';
                    const customerEmail = order.customerEmail || order.email || '';
                    const total = order.total ?? items.reduce((s: number, p: any) => s + (p.price * (p.quantity || 1)), 0);
                    const date = order.date || order.createdAt;
                    return (
                      <div key={order.id} className="table-row">
                        <div className="order-id">{order.id}</div>
                        <div className="customer-info">
                          <div className="customer-name">{customerName}</div>
                          <div className="customer-email">{customerEmail}</div>
                        </div>
                        <div className="order-items">
                          {items.length} item{items.length !== 1 ? 's' : ''}
                        </div>
                        <div className="order-total">{formatCurrency(total)}</div>
                        <div className="order-status">
                          <select
                            className="status-select"
                            value={order.status}
                            style={{ borderColor: getStatusColor(order.status) }}
                            title="Update order status"
                            onChange={async (e) => {
                              const newStatus = e.target.value;
                              try {
                                const updated = await apiClient.updateOrderStatus(order.id, newStatus);
                                // Update recentOrders in stats
                                setStats(prev => ({ ...prev, recentOrders: (prev.recentOrders || []).map(r => r.id === updated.id ? updated : r) }));
                                // Also update full orders list if present
                                setOrdersFromBackend(prev => prev ? prev.map(o => o.id === updated.id ? updated : o) : prev);
                              } catch (err) {
                                console.error('Failed to update order status:', err);
                              }
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        <div className="order-date">{date ? new Date(date).toLocaleDateString() : ''}</div>
                      </div>
                    );
                  })}
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
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button className="add-btn" onClick={handleAddProduct} title="Add product">
                      <Icons.PlusIcon size={16} />
                      <span style={{ marginLeft: 6 }}>Add</span>
                    </button>
                    <button className="download-btn" title="Download products as CSV" onClick={exportProductsCsv}>
                      <Icons.DownloadIcon size={16} />
                      <span style={{ marginLeft: 6 }}>CSV</span>
                    </button>
                  </div>
                </div>
                
                {productsLoading && (
                  <div className="loading-section">
                    <Icons.LoadingIcon size={24} />
                    Loading products...
                  </div>
                )}
                
                {productsError && (
                  <div className="error-section">
                    <Icons.AlertIcon size={20} />
                    Error loading products: {productsError}
                    <button onClick={refreshProducts} className="retry-btn">
                      <Icons.RefreshIcon size={16} />
                      Retry
                    </button>
                  </div>
                )}
                
                <div className="products-grid">
                  {displayProducts && Array.isArray(displayProducts) ? (
                    displayProducts.slice(0, 12).map((product) => (
                      <div key={product.id} className="product-card">
                        <div className="product-image">
                          <img
                            src={product.imageUrl || '/images/placeholder.jpg'}
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
                          <p className="product-category">{product.category} • {product.subcategory}</p>

                          <div className="product-status">
                            <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>

                          <div className="product-actions">
                            <button
                              className="edit-btn"
                              title="Edit Product"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Icons.EditIcon size={16} />
                            </button>
                            <button
                              className="delete-btn"
                              title="Delete Product"
                              onClick={() => handleDeleteProduct(product.id!)}
                            >
                              <Icons.TrashIcon size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-products">
                      <p>No products found.</p>
                    </div>
                  )}
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
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div className="orders-filters">
                      <select className="filter-select" title="Filter orders by status" value={ordersFilter} onChange={(e) => setOrdersFilter(e.target.value)}>
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <button className="download-btn" title="Download orders CSV" onClick={exportOrdersCsv}>
                      <Icons.DownloadIcon size={16} />
                      <span style={{ marginLeft: 6 }}>CSV</span>
                    </button>
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
                  
                  {ordersLoading ? (
                    <div style={{ padding: '20px' }}>Loading orders...</div>
                  ) : ordersError ? (
                    <div style={{ padding: '20px', color: '#b91c1c' }}>Failed to load orders: {ordersError}</div>
                  ) : (ordersFromBackend || []).length === 0 ? (
                    <div style={{ padding: '20px' }}>No orders found.</div>
                  ) : (
                    // apply client-side filter
                    ((ordersFromBackend || []).filter(o => ordersFilter === 'all' ? true : (o.status === ordersFilter))).map((order) => (
                      <div key={order.id} className="table-row" onClick={() => { setSelectedOrder(order); setOrderModalOpen(true); }}>
                        <div className="order-id">{order.id}</div>
                        <div className="customer-info">
                          <div className="customer-name">{order.name || order.customerName || 'Customer'}</div>
                          <div className="customer-email">{order.email || order.customerEmail}</div>
                        </div>
                        <div className="order-items">
                          <div className="items-summary">
                            {(order.products || order.items || []).map((item: any, index: number) => (
                              <div key={index} className="item-line">
                                {item.quantity || 1}x {item.name}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="order-total">{formatCurrency((order.products || order.items || []).reduce((s: number, p: any) => s + (p.price * (p.quantity || 1)), 0))}</div>
                        <div className="order-status" onClick={(e) => e.stopPropagation()}>
                          <select 
                              className="status-select"
                              value={order.status}
                              style={{ borderColor: getStatusColor(order.status) }}
                              title="Update order status"
                              onClick={(e) => e.stopPropagation()}
                              onChange={async (e) => {
                                const newStatus = e.target.value;
                                try {
                                  const updated = await apiClient.updateOrderStatus(order.id, newStatus);
                                  // Update local states
                                  setOrdersFromBackend(prev => prev ? prev.map(o => o.id === updated.id ? updated : o) : prev);
                                  setStats(prev => ({ ...prev, recentOrders: (prev.recentOrders || []).map(r => r.id === updated.id ? updated : r) }));
                                  // if this row is selected, update it too
                                  setSelectedOrder(prev => prev && prev.id === updated.id ? updated : prev);
                                } catch (err) {
                                  console.error('Failed to update order status:', err);
                                }
                              }}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="order-date">{new Date(order.createdAt || order.date).toLocaleDateString()}</div>
                        <div className="order-actions">
                          <button className="view-btn" title="View Order Details">
                            <Icons.SearchIcon size={16} />
                          </button>
                          <button className="edit-btn" title="Edit Order">
                            <Icons.EditIcon size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
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
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
                      <option value="all">All roles</option>
                      <option value="ADMIN">Admin</option>
                      <option value="CUSTOMER">Customer</option>
                    </select>
                    <button className="download-btn" title="Download users CSV" onClick={exportUsersCsv}>
                      <Icons.DownloadIcon size={16} />
                      <span style={{ marginLeft: 6 }}>CSV</span>
                    </button>
                    <button className="add-btn" title="Add user">
                      <Icons.PlusIcon size={16} />
                      <span style={{ marginLeft: 6 }}>Add</span>
                    </button>
                  </div>
                </div>
                
                <div className="users-table">
                  <div className="table-header">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Created</div>
                    <div>Actions</div>
                  </div>
                  {usersLoading ? (
                    <div style={{ padding: 12 }}>Loading users...</div>
                  ) : usersError ? (
                    <div style={{ padding: 12, color: '#b91c1c' }}>Error loading users: {usersError}</div>
                  ) : (
                    ((usersFromBackend || []).filter(u => userFilter === 'all' ? true : (String(u.role) === userFilter))).map((user) => (
                      <div key={user.id} className="table-row">
                        <div className="user-name">
                          <Icons.UserIcon size={20} />
                          {user.firstName ? `${user.firstName} ${user.lastName || ''}` : (user.name || 'User')}
                        </div>
                        <div className="user-email">{user.email}</div>
                        <div className="user-role">
                          <span className={`role-badge ${String(user.role).toLowerCase()}`}>
                            {String(user.role) === 'ADMIN' ? 'Admin' : 'Customer'}
                          </span>
                        </div>
                        <div className="user-created">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
                        </div>
                        <div className="user-actions">
                          <button className="edit-btn" title="Edit User">
                            <Icons.SettingsIcon size={16} />
                          </button>
                          <button className="delete-btn" title="Delete User" onClick={async () => {
                            if (!confirm('Delete this user?')) return;
                            try {
                              await apiClient.deleteUser(user.id);
                              setUsersFromBackend(prev => prev ? prev.filter(uu => uu.id !== user.id) : prev);
                              showToast('User deleted', 'success');
                            } catch (err) {
                              console.error('Failed to delete user:', err);
                              showToast('Failed to delete user', 'error');
                            }
                          }}>
                            <Icons.TrashIcon size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="modal-overlay" onClick={handleCloseProductForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingProduct ? 'Edit Product' : 'Create New Product'}
              </h2>
              <button 
                className="modal-close"
                onClick={handleCloseProductForm}
                title="Close"
              >
                <Icons.CloseIcon size={20} />
              </button>
            </div>
            <div className="modal-body">
              <ProductForm
                product={editingProduct || undefined}
                onSubmit={handleFormSubmit}
                onCancel={handleCloseProductForm}
                loading={isFormLoading}
              />
            </div>
          </div>
        </div>
      )}
      {/* Order Details Modal */}
      {orderModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={() => { setOrderModalOpen(false); setSelectedOrder(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Order Details — {selectedOrder.id}</h2>
              <button className="modal-close" onClick={() => { setOrderModalOpen(false); setSelectedOrder(null); }} title="Close">
                <Icons.CloseIcon size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="order-detail-grid">
                <div>
                  <h3>Customer</h3>
                  <input className="modal-input" value={selectedOrder.name || selectedOrder.customerName || ''} onChange={(e) => setSelectedOrder(prev => ({ ...prev, name: e.target.value }))} />
                  <input className="modal-input" value={selectedOrder.email || selectedOrder.customerEmail || ''} onChange={(e) => setSelectedOrder(prev => ({ ...prev, email: e.target.value }))} />
                  <input className="modal-input" value={selectedOrder.phoneNumber || ''} onChange={(e) => setSelectedOrder(prev => ({ ...prev, phoneNumber: e.target.value }))} />
                </div>
                <div>
                  <h3>Shipping</h3>
                  <input className="modal-input" value={selectedOrder.address || selectedOrder.shippingAddress || ''} onChange={(e) => setSelectedOrder(prev => ({ ...prev, address: e.target.value }))} />
                  <input className="modal-input" value={selectedOrder.city || ''} onChange={(e) => setSelectedOrder(prev => ({ ...prev, city: e.target.value }))} />
                </div>
                <div>
                  <h3>Items</h3>
                  <div>
                    {(selectedOrder.products || selectedOrder.items || []).map((it: any, i: number) => (
                      <div key={i} className="order-item-line">{it.quantity || 1}x {it.name} — KES {it.price}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>Total</h3>
                  <p>{formatCurrency((selectedOrder.products || selectedOrder.items || []).reduce((s: number, p: any) => s + (p.price * (p.quantity || 1)), 0))}</p>
                </div>
              </div>

              <div className="order-actions-row">
                <label>Change status:</label>
                <select
                  value={selectedOrder.status}
                  onChange={async (e) => {
                    const newStatus = e.target.value;
                    setOrderActionLoading(true);
                    try {
                      const updated = await apiClient.updateOrderStatus(selectedOrder.id, newStatus);
                      setOrdersFromBackend(prev => prev ? prev.map(o => o.id === updated.id ? updated : o) : prev);
                      setStats(prev => ({ ...prev, recentOrders: (prev.recentOrders || []).map(r => r.id === updated.id ? updated : r) }));
                      setSelectedOrder(updated);
                    } catch (err) {
                      console.error('Failed to update status from modal:', err);
                    } finally {
                      setOrderActionLoading(false);
                    }
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>

                <button className="primary" onClick={async () => {
                  // Send an email via backend
                  const subject = `Regarding your order ${selectedOrder.id}`;
                  const message = `Hello ${selectedOrder.name || ''},\n\nWe are contacting you regarding your order ${selectedOrder.id}.\n\nRegards,\nTeam`;
                  setOrderActionLoading(true);
                  try {
                    await apiClient.contactCustomer(selectedOrder.id, subject, message);
                    showToast('Customer contacted successfully', 'success');
                  } catch (err) {
                    console.error('Failed to contact customer via backend:', err);
                    showToast('Failed to contact customer', 'error');
                  } finally { setOrderActionLoading(false); }
                }} disabled={orderActionLoading}>Contact Customer</button>

                <button onClick={async () => {
                  // Example managerial action: mark as shipped -> set status to completed
                  if (!confirm('Mark this order as shipped/completed?')) return;
                  setOrderActionLoading(true);
                  try {
                    const updated = await apiClient.updateOrderStatus(selectedOrder.id, 'completed');
                    setOrdersFromBackend(prev => prev ? prev.map(o => o.id === updated.id ? updated : o) : prev);
                    setStats(prev => ({ ...prev, recentOrders: (prev.recentOrders || []).map(r => r.id === updated.id ? updated : r) }));
                    setSelectedOrder(updated);
                  } catch (err) {
                    console.error('Failed to mark shipped:', err);
                  } finally { setOrderActionLoading(false); }
                }} disabled={orderActionLoading}>Mark as Shipped</button>

                <button className="save-btn" onClick={async () => {
                  // Persist editable fields
                  setOrderActionLoading(true);
                  try {
                    const payload = {
                      name: selectedOrder.name,
                      email: selectedOrder.email,
                      phoneNumber: selectedOrder.phoneNumber,
                      address: selectedOrder.address,
                      city: selectedOrder.city,
                      status: selectedOrder.status,
                    };
                    const updated = await apiClient.updateOrder(selectedOrder.id, payload);
                    setOrdersFromBackend(prev => prev ? prev.map(o => o.id === updated.id ? updated : o) : prev);
                    setStats(prev => ({ ...prev, recentOrders: (prev.recentOrders || []).map(r => r.id === updated.id ? updated : r) }));
                    setSelectedOrder(updated);
                    showToast('Order updated successfully', 'success');
                  } catch (err) {
                    console.error('Failed to save order changes:', err);
                    showToast('Failed to save changes', 'error');
                  } finally { setOrderActionLoading(false); }
                }}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ProtectedRoute>
  );
}
