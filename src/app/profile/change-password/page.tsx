'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Icons } from '@/components/Icons';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('Not authenticated');
      const API_URL = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL
        : 'http://localhost:3001';

      const res = await fetch(`${API_URL}/users/${user?.id}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to change password');
      router.push('/profile');
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  // If the app knows the user is not authenticated, show a helpful message
  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: 600 }}>
          <div className="auth-header">
            <Icons.LockIcon />
            <h1>Change Password</h1>
            <p className="muted">You must be signed in to change your password.</p>
          </div>

          <div className="error-message">
            <Icons.AlertIcon />
            Not authenticated — please <a href="/auth/login">sign in</a> or use the verification link sent to your email.
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: 600 }}>
        <div className="auth-header">
          <Icons.LockIcon />
          <h1>Change Password</h1>
          <p>Enter your current password (or temporary OTP) and choose a new password.</p>
        </div>

        {error && (
          <div className="error-message">
            <Icons.AlertIcon />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Current Password / OTP</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6} required />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength={6} required />
          </div>
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <Icons.LoadingIcon />
                Changing...
              </>
            ) : (
              'Change Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
