'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Icons } from '@/components/Icons';
import '../auth/auth.css';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: '600px' }}>
          <div className="auth-header">
            <Icons.UserIcon />
            <h1>My Profile</h1>
            <p>Manage your account information</p>
          </div>

          <div className="profile-section">
            <div className="profile-field">
              <label>Full Name</label>
              <div className="profile-value">{user?.name}</div>
            </div>
            
            <div className="profile-field">
              <label>Email Address</label>
              <div className="profile-value">{user?.email}</div>
            </div>
            
            <div className="profile-field">
              <label>Account Type</label>
              <div className="profile-value">
                <span className={`role-badge ${user?.role}`}>
                  {user?.role === 'admin' ? 'Administrator' : 'Customer'}
                </span>
              </div>
            </div>
            
            <div className="profile-field">
              <label>Member Since</label>
              <div className="profile-value">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="auth-button">
              <Icons.SettingsIcon size={16} />
              Edit Profile
            </button>
            <button className="auth-button" style={{ background: '#6b7280' }} onClick={() => window.location.href = '/profile/change-password'}>
              <Icons.LockIcon size={16} />
              Change Password
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
